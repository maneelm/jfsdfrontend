import React, { useEffect, useState } from 'react';
import { getAllEvents, deleteEvent } from '../services/api';
import AdminNavbar from './AdminNavbar';
import './ViewEvent.css'; // Import a CSS file for styles

const ViewEvent = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventData = await getAllEvents();
                setEvents(eventData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteEvent(id);
            setEvents(events.filter(event => event.id !== id));
        } catch (err) {
            setError('Failed to delete event');
        }
    };

    if (loading) return <p className="loading">Loading events...</p>;
    if (error) return <p className="error">Error loading events: {error}</p>;
    if (events.length === 0) return <p className="no-events">No events available</p>;

    const formatDateTime = (dateString) => new Date(dateString).toLocaleString();

    return (
        <div>
            <AdminNavbar/>
        <div className="viewevent-container">
            
            <div className="event-list">
                <h2>All Events</h2>
                <div className="event-cards">
                    {events.map((event) => (
                        <div className="event-card" key={event.id}>
                            <img
                                src={`http://localhost:8080${event.eventCoverPhoto}`}
                                alt={event.eventTitle}
                                className="event-image"
                            />
                            <h3 className="event-title">{event.eventTitle}</h3>
                            <p className="event-description">{event.eventDescription}</p>
                            <p className="event-details"><strong>Registration Starts:</strong> {formatDateTime(event.registrationStartingTime)}</p>
                            <p className="event-details"><strong>Registration Ends:</strong> {formatDateTime(event.registrationEndingTime)}</p>
                            <p className="event-details"><strong>Scheduled:</strong> {formatDateTime(event.eventScheduleTime)}</p>
                            <p className="event-details"><strong>Limit:</strong> {event.eventLimit}</p>
                            <button 
                                className="delete-button"
                                onClick={() => handleDelete(event.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </div>
    );
};

export default ViewEvent;