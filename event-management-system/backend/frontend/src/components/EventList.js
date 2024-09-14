import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function EventList() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/events')
            .then(res => setEvents(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1>Events</h1>
            <Link to="/create">Create Event</Link>
            <ul>
                {events.map(event => (
                    <li key={event._id}>
                        <Link to={`/event/${event._id}`}>{event.title}</Link> - {new Date(event.date).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EventList;
