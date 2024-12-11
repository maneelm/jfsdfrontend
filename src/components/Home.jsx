import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    const containerStyle = {
        minHeight: '100vh',
        backgroundImage: 'url("/bg1.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: "'Poppins', sans-serif",
    };
    

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 1,
    };

    const navStyle = {
        width: '100%',
        padding: '20px',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '20px',
        position: 'absolute',
        top: 0,
        zIndex: 2,
    };

    const linkStyle = {
        padding: '12px 25px',
        backgroundColor: 'transparent',
        color: 'white',
        textDecoration: 'none',
        // borderRadius: '30px',
        fontWeight: '500',
        fontSize: '1rem',
        transition: 'all 0.3s ease',
        // border: '2px solid white',
        letterSpacing: '1px',
    };

    const contentStyle = {
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        marginTop: '30vh',
    };

    const titleStyle = {
        color: 'white',
        fontSize: '4.5rem',
        fontWeight: '600',
        marginBottom: '20px',
        letterSpacing: '8px',
        textTransform: 'uppercase',
        fontFamily: "'Montserrat', sans-serif", // More modern font for headings
    };

    const subtitleStyle = {
        color: 'white',
        fontSize: '1.3rem',
        marginBottom: '40px',
        fontWeight: '300',
        letterSpacing: '3px',
        fontFamily: "'Poppins', sans-serif",
    };

    // Hover effects
    // const handleMouseEnter = (e) => {
    //     e.target.style.backgroundColor = 'white';
    //     e.target.style.color = 'black';
    //     e.target.style.transform = 'translateY(-2px)';
    // };

    // const handleMouseLeave = (e) => {
    //     e.target.style.backgroundColor = 'transparent';
    //     e.target.style.color = 'white';
    //     e.target.style.transform = 'translateY(0)';
    // };

    return (
        <div style={containerStyle}>
            <div style={overlayStyle}></div>
            <nav style={navStyle}>
                <Link 
                    to="/student-login" 
                    style={linkStyle}
                    // onMouseEnter={handleMouseEnter}
                    // onMouseLeave={handleMouseLeave}
                >
                    Student Login
                </Link>
                <Link 
                    to="/admin" 
                    style={linkStyle}
                    // onMouseEnter={handleMouseEnter}
                    // onMouseLeave={handleMouseLeave}
                >
                    Admin Login
                </Link>
            </nav>
            <div style={contentStyle}>
                <h1 style={titleStyle}>ACADEMICS</h1>
                <p style={subtitleStyle}>Empowering Education, Enriching Futures</p>
            </div>
        </div>
    );
}

export default Home;