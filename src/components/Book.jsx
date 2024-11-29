import { useState } from "react"

export default function Book({ id, title, author, genre, createdAt, updatedAt, fetchBooks }) {
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newAuthor, setNewAuthor] = useState(author);
  const [newGenre, setNewGenre] = useState(genre);

  const handleDelete = () => fetch('https://mern-backend-2x41.onrender.com/api/books/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ _id: id })
  })
    .then(res => res.json())
    .then(() => fetchBooks())
    .catch(err => console.log(err))

  const handleSave = () => {
    /* const body = {}
    if (title !== newTitle) body.title = newTitle
    if (author !== newAuthor) body.author = newAuthor
    if (genre !== newGenre) body.genre = newGenre */

    fetch('https://mern-backend-2x41.onrender.com/api/books/edit', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: id,
        ...title === newTitle ? {} : { title: newTitle },
        ...author === newAuthor ? {} : { author: newAuthor },
        ...genre === newGenre ? {} : { genre: newGenre }
      })
    })
      .then(res => res.json())
      .then(() => {
        fetchBooks();
        setEdit(false);
      })
      .catch(err => console.log(err))
  }

  const handleClick = () => {
    if (!edit) setEdit(true)
    else {
      if (title !== newTitle || author !== newAuthor || genre !== newGenre) {
        console.log("change detected");
        handleSave();
      } else {
        setEdit(false);
      }
    }
  }

  return (
    <div className="book">
      <button onClick={handleDelete}>x</button>
      <button onClick={handleClick}>{edit ? "Save" : "Edit"}</button>
      {edit
        ?
        <>
          <input type="text" placeholder="title" value={newTitle} onChange={event => setNewTitle(event.target.value)} />
          <input type="text" placeholder="author" value={newAuthor} onChange={event => setNewAuthor(event.target.value)} />
          <input type="text" placeholder="genre" value={newGenre} onChange={event => setNewGenre(event.target.value)} />
        </>
        :
        <>
          <h2>{title}</h2>
          <h3>{author}</h3>
          <h4>{genre}</h4>
        </>
      }
      <h5>{id}</h5>
      <p>
        <span>{createdAt}</span>
        <span>{updatedAt}</span>
      </p>
    </div>
  )
}