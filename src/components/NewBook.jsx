import { useState } from "react";

export default function NewBook({ fetchBooks }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('https://mern-backend-2x41.onrender.com/api/books/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        author: author,
        genre: genre
      })
    })
      .then(res => res.json())
      .then(() => {
        fetchBooks();
        event.target.reset();
      })
      .catch(err => console.log(err))
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="title" onChange={event => setTitle(event.target.value)} />
      <input type="text" placeholder="author" onChange={event => setAuthor(event.target.value)} />
      <input type="text" placeholder="genre" onChange={event => setGenre(event.target.value)} />
      <button>add book</button>
    </form>
  )
}