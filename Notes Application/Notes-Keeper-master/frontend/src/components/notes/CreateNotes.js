import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './createNotes.css';

function CreateNotes() {

  const [note, setNote] = useState({
    title: "",
    content: "",
    date: "",
  });

  const history = useNavigate();

  const onChangeInput = e => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const createNote = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('tokenStore');
      if (token) {
        const { title, content, date } = note;
        const newNote = { title, content, date };

        await axios.post('/api/notes', newNote, {
          headers: { Authorization: token }
        });

        history('/');
      }

    } catch (err) {
      window.location.href = "/";
    }
  };

  return (
    <div className="create-note">
      <h2>Create note</h2>

      <form onSubmit={createNote} autoComplete='off'>
        <div className="row">
          <input 
            type="text" 
            id='title' 
            name="title"
            placeholder="Title"
            value={note.title} 
            required 
            onChange={onChangeInput}
          />
        </div>

        <div className="row">
          <textarea 
            cols="30" 
            rows="10" 
            id='content'  
            name="content"
            placeholder="Take a note..."
            value={note.content} 
            required
            onChange={onChangeInput}
          ></textarea>
        </div>

        <div className="row">
          <input 
            type="date" 
            id='date' 
            name="date"
            value={note.date}
            onChange={onChangeInput}
          />
        </div>

        <button type='submit'>Save</button>
      </form>
    </div>
  );
}

export default CreateNotes;
