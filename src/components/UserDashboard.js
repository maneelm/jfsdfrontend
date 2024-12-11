import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import Cookies from 'js-cookie'; // For managing cookies

const UserDashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = Cookies.get('studentSession'); // Adjust cookie name
        if (!authToken) {
            navigate('/'); // Redirect to home if not authenticated
        }
    }, [navigate]);

    const handleLogout = () => {
        Cookies.remove('studentSession'); // Clear the session cookie
        localStorage.removeItem('authToken'); // Clear localStorage if applicable
        navigate('/'); // Redirect to the home page after logout
    };

    return (
        <div>
            {/* Navbar Section */}
            <nav style={styles.navbar}>
                <h2 style={styles.logo}>Student Dashboard</h2>
                <ul style={styles.navLinks}>
                    <li>
                        <Link to="/StudentViewEvent" style={styles.link}>Register Event</Link>
                    </li>
                    <li>
                        <Link to="/" style={styles.link} onClick={handleLogout}>Logout</Link>
                    </li>
                </ul>
            </nav>

            {/* Dashboard Section */}
            <h1>Welcome to the User Dashboard</h1>
            <p>You are now logged in as a student.</p>
        </div>
    );
};

// Styles for Navbar and Dashboard
const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: '#2a9d8f',
        color: '#fff',
    },
    logo: {
        margin: 0,
    },
    navLinks: {
        listStyle: 'none',
        display: 'flex',
        gap: '1rem',
        margin: 0,
        padding: 0,
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
    },
};

export default UserDashboard;
