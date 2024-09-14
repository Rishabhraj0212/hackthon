import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateEvent() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/events', { title, description, date })
            .then(() => navigate('/'))
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h1>Create Event</h1>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} required />
                <label>Description:</label>
                <input value={description} onChange={(e) => setDescription(e.target.value)} />
                <label>Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateEvent;
