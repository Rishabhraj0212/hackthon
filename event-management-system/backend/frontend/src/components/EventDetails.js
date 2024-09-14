import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EventDetails() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [email, setEmail] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/api/events/${id}`)
            .then(res => setEvent(res.data))
            .catch(err => console.error(err));
    }, [id]);

    const handleRSVP = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/api/events/${id}/rsvp`, { email })
            .then(res => setEvent(res.data))
            .catch(err => console.error(err));
    };

    if (!event) return <div>Loading...</div>;

    return (
        <div>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            <form onSubmit={handleRSVP}>
                <label>Your Email:</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} required />
                <button type="submit">RSVP</button>
            </form>
            <h2>Attendees:</h2>
            <ul>
                {event.attendees.map((attendee, index) => (
                    <li key={index}>{attendee}</li>
                ))}
            </ul>
        </div>
    );
}

export default EventDetails;
