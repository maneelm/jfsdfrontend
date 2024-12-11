import React, { useEffect, useState } from 'react';
import { getAllEvents, registerForEvent } from '../services/api';
import { getSession } from '../utils/cookie';  // Import the utility functions

const StudentViewEvent = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [registrationMessage, setRegistrationMessage] = useState('');
    const [registering, setRegistering] = useState(false);

    const userId = getSession('userId');  // Get userId from the session (cookie)

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

    const handleRegister = async (eventId) => {
        if (!userId) {
            setRegistrationMessage('You need to log in first.');
            setTimeout(() => {
                setRegistrationMessage('');
            }, 3000);
            return;
        }

        setRegistering(true);
        try {
            const response = await registerForEvent(eventId, userId);  // Pass the userId for registration
            setRegistrationMessage(response.message);
            setTimeout(() => {
                setRegistrationMessage('');
            }, 3000);
        } catch (err) {
            setRegistrationMessage(err.message);
            setTimeout(() => {
                setRegistrationMessage('');
            }, 3000);
        }
        setRegistering(false);
    };

    if (loading) return <p>Loading events...</p>;
    if (error) return <p>Error loading events: {error}</p>;
    if (events.length === 0) return <p>No events available</p>;

    const styles = {
        eventList: {
            textAlign: 'left',
            marginTop: '20px',
            padding: '20px',
            borderRadius: '10px',
            color: '#fff',
        },
        eventCards: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'left',
            gap: '15px',
        },
        eventCard: {
            border: '1px solid #2a9d8f',
            borderRadius: '10px',
            padding: '15px',
            width: '250px',
            boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            backgroundColor: '#1a1a1a',
        },
        eventImage: {
            width: '100%',
            height: '150px',
            objectFit: 'cover',
            borderRadius: '10px',
            marginBottom: '10px',
        },
        eventTitle: {
            fontSize: '20px',
            margin: '10px 0',
            color: '#2a9d8f',
            fontWeight: 'bold',
        },
        eventDescription: {
            fontSize: '14px',
            color: '#ccc',
            marginBottom: '10px',
        },
        eventDetails: {
            fontSize: '12px',
            color: '#bbb',
        },
        registerButton: {
            backgroundColor: '#2a9d8f',
            color: '#fff',
            padding: '10px',
            borderRadius: '5px',
            cursor: 'pointer',
            border: 'none',
            transition: 'background-color 0.3s',
        },
        registrationMessage: {
            color: '#2a9d8f',
            fontWeight: 'bold',
            margin: '10px 0',
        }
    };

    return (
        <div style={styles.eventList}>
            <h2>All Events</h2>
            <br /><br />
            {registrationMessage && <p style={styles.registrationMessage}>{registrationMessage}</p>}
            <div style={styles.eventCards}>
                {events.map((event) => (
                    <div
                        style={styles.eventCard}
                        key={event.id}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.transform = 'scale(1.05)')
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.transform = 'scale(1)')
                        }
                    >
                        <img
                            src={`http://localhost:8080${event.eventCoverPhoto}`}  // Handle the image URL correctly
                            alt={event.eventTitle}
                            style={styles.eventImage}
                        />
                        <h3 style={styles.eventTitle}>{event.eventTitle}</h3>
                        <p style={styles.eventDescription}>{event.eventDescription}</p>
                        <p style={styles.eventDetails}><strong>Registration Starts:</strong> {new Date(event.registrationStartingTime).toLocaleString()}</p>
                        <p style={styles.eventDetails}><strong>Registration Ends:</strong> {new Date(event.registrationEndingTime).toLocaleString()}</p>
                        <p style={styles.eventDetails}><strong>Limit:</strong> {event.eventLimit}</p>
                        <button 
                            style={styles.registerButton}
                            onClick={() => handleRegister(event.id)}
                            disabled={event.eventLimit <= 0 || 
                                    new Date() < new Date(event.registrationStartingTime) || 
                                    new Date() > new Date(event.registrationEndingTime) ||
                                    registering}
                        >
                            {registering ? 'Registering...' : 
                            event.eventLimit <= 0 ? 'Limit Reached' :
                            new Date() < new Date(event.registrationStartingTime) ? 'Not Started' :
                            new Date() > new Date(event.registrationEndingTime) ? 'Registration Closed' :
                            'Register'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentViewEvent;
