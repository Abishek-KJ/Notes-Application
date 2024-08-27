import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import axios from 'axios';
import './home.css'; // Make sure to update this if you changed the filename

function Home() {
    const [notes, setNotes] = useState([]);
    const [token, setToken] = useState('');

    const getNotes = async (token) => {
        console.log(token);
        const res = await axios.get('api/notes', {
            headers: { Authorization: token }
        });
        console.log(res);
        setNotes(res.data);
    };

    useEffect(() => {
        const token = localStorage.getItem('tokenStore');
        setToken(token);
        if (token) {
            getNotes(token);
        }
    }, []);

    const deleteNote = async (id) => {
        try {
            if (token) {
                await axios.delete(`/api/notes/${id}`, {
                    headers: { Authorization: token }
                });
                getNotes(token);
            }
        } catch (err) {
            window.location.href = '/';
        }
    };

    return (
        <div className="notes-wrapper">
            {notes.map(note => (
                <div className="card" key={note._id}>
                    <h4 title={note.title}>{note.title}</h4>
                    <div className="date">Last Modified: {format(note.date)}</div>
                    <div className="actions">
                        <Link to={`edit/${note._id}`}>
                            <span className="icon edit">&#9998;</span>
                        </Link>
                        <span className="icon delete" onClick={() => deleteNote(note._id)}>&#128465;</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;
