import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventList from './components/EventList';
import CreateEvent from './components/CreateEvent';
import EventDetails from './components/EventDetails';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<EventList />} />
                <Route path="/create" element={<CreateEvent />} />
                <Route path="/event/:id" element={<EventDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
