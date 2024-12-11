import axios from 'axios';
const API_BASE_URL = 'http://localhost:8080/'; // Update with your actual base URL

// Base API instance with common settings
const api = axios.create({
    baseURL: 'API_BASE_URL', // Base URL for the API
    headers: {
        'Content-Type': 'application/json',
    },
});
export const login = async (loginData) => {
    try {
        const response = await api.post('/student/login', loginData);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};
const handleApiError = (error) => {
    if (error.response) {
        console.error('API Error:', error.response.data);
        throw new Error(error.response.data.message || 'An error occurred');
    } else {
        console.error('API Error:', error.message);
        throw new Error('Network error: ' + error.message);
    }
};
export const createEvent = async (formData) => {
    try {
        const response = await api.post('/events/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',  // For file uploads
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating event:', error);
    }
};

// Function to get all events
export const getAllEvents = async () => {
    try {
        const response = await api.get('/events/all');
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};
// api.js



/**
 * Register for a specific event.
 * @param {string} eventId - The ID of the event to register for.
 * @param {string} userId - The ID of the user registering for the event.
 * @returns {Promise<Object>} A promise that resolves to the registration response.
 */
export const registerForEvent = async (eventId, userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/register/${eventId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }), // Send userId in the request body
        });

        if (!response.ok) {
            throw new Error(`Failed to register for the event: ${response.status} ${response.statusText}`);
        }

        const result = await response.json(); // Assuming the response is in JSON format
        return result; // Return the result for further processing
    } catch (error) {
        console.error('Error registering for event:', error);
        throw error; // Propagate the error for further handling
    }
};

// If you want to use default exports
// api.js
export const deleteEvent = async (id) => {
    const response = await fetch(`http://localhost:8080/events/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete the event');
    }
};



export default api;