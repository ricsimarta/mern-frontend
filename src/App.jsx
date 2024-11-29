import { useEffect, useState } from 'react'
import './App.css'
import Book from './components/Book';
import NewBook from './components/NewBook';

function App() {
  const [books, setBooks] = useState(null);

  const fetchBooks = () => fetch("https://mern-backend-2x41.onrender.com/api/books/all")
    .then(res => res.json())
    .then(data => setBooks(data))
    .catch(err => console.log(err))

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className='app'>
      {books &&
        <div className='content'>
          <NewBook fetchBooks={fetchBooks} />
          {books.map(book => <Book
            key={book._id}
            id={book._id}
            title={book.title}
            author={book.author}
            genre={book.genre}
            createdAt={book.createdAt}
            updatedAt={book.updatedAt}
            fetchBooks={fetchBooks}
          />)}
        </div>
      }
    </div>
  )
}

export default App
