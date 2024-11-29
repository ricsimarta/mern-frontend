import { useState } from "react";
import "./book.css";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export default function Book({ id, title, author, genre, createdAt, updatedAt, fetchBooks }) {
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newAuthor, setNewAuthor] = useState(author);
  const [newGenre, setNewGenre] = useState(genre);

  const createDateFormat = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    return `${year}-${month}-${day} ${hour}:${minutes}`
  }

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
      <div className="buttons">
        <button onClick={handleDelete}>
          <DeleteForeverOutlinedIcon /> 
        </button>

        <button onClick={handleClick}>
          {edit 
            ? 
              <SaveOutlinedIcon /> 
            : 
              <EditOutlinedIcon />
          }
        </button>
      </div>

      <div className="book-data">
        <h5>{id}</h5>
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
      </div>

      <p className="dates">
        <span>
          <span>created:</span> 
          <span>{createDateFormat(createdAt)}</span>
        </span>

        <span>
          <span>updated:</span>
          <span>{createDateFormat(updatedAt)}</span>
        </span>
      </p>
    </div>
  )
}