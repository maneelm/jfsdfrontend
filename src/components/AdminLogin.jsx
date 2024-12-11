import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/admin/login", null, {
        params: { username, password },
      });
      if (response.status === 200) {
        const authToken = response.data;
        Cookies.set('authToken', authToken);
        navigate("/dashboard");
      }
    } catch (error) {
      setError("Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: 'url("/bg2.jpeg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      padding: '20px',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(10px)',
    },
    form: {
      position: 'relative',
      backgroundColor: 'rgba(15, 23, 42, 0.8)',
      padding: '40px',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      width: '100%',
      maxWidth: '400px',
      textAlign: 'center',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      animation: 'fadeIn 0.5s ease-out',
      boxSizing: 'border-box',
    },
    formContent: {
      width: '100%',
      maxWidth: '320px',
      margin: '0 auto',
    },
    heading: {
      color: 'white',
      fontSize: '28px',
      marginBottom: '8px',
      fontWeight: '600',
      animation: 'slideDown 0.5s ease-out',
    },
    subtitle: {
      color: '#94a3b8',
      fontSize: '14px',
      marginBottom: '24px',
      animation: 'fadeIn 0.5s ease-out delay-0.2s',
    },
    inputGroup: {
      marginBottom: '20px',
      textAlign: 'left',
      position: 'relative',
      animation: 'slideUp 0.5s ease-out',
      width: '100%',
    },
    label: {
      display: 'block',
      color: 'white',
      marginBottom: '8px',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'transform 0.2s ease',
    },
    inputWrapper: {
      position: 'relative',
      width: '100%',
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      paddingLeft: '40px',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      color: 'white',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      outline: 'none',
      boxSizing: 'border-box',
    },
    inputFocus: {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      borderColor: '#4f46e5',
      boxShadow: '0 0 0 2px rgba(79, 70, 229, 0.2)',
    },
    icon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '20px',
      height: '20px',
      color: '#94a3b8',
      transition: 'all 0.3s ease',
      pointerEvents: 'none',
    },
    button: {
      width: '100%',
      padding: '12px',
      border: 'none',
      backgroundColor: '#4f46e5',
      color: 'white',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '12px',
      outline: 'none',
      position: 'relative',
      overflow: 'hidden',
    },
    buttonHover: {
      backgroundColor: '#4338ca',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
    },
    buttonLoading: {
      backgroundColor: '#4338ca',
      cursor: 'not-allowed',
      opacity: 0.8,
    },
    loadingSpinner: {
      display: 'inline-block',
      width: '20px',
      height: '20px',
      marginRight: '8px',
      border: '3px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '50%',
      borderTopColor: 'white',
      animation: 'spin 1s linear infinite',
      verticalAlign: 'middle',
    },
    errorMessage: {
      backgroundColor: 'rgba(220, 38, 38, 0.2)',
      color: '#fecaca',
      padding: '12px',
      borderRadius: '8px',
      marginTop: '16px',
      fontSize: '14px',
      border: '1px solid rgba(220, 38, 38, 0.3)',
      animation: 'shake 0.5s ease-out',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

  const UserIcon = () => (
    <svg style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  const LockIcon = () => (
    <svg style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );

  const ErrorIcon = () => (
    <svg style={{ width: '20px', height: '20px', marginRight: '8px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12" y2="16" />
    </svg>
  );

  return (
    <div style={styles.container}>
      <div style={styles.overlay} />
      <form style={styles.form} onSubmit={handleLogin}>
        <div style={styles.formContent}>
          <h2 style={styles.heading}>Admin Login</h2>
          <p style={styles.subtitle}>Enter your credentials to access the dashboard</p>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <div style={styles.inputWrapper}>
              <UserIcon />
              <input
                type="text"
                style={styles.input}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                onFocus={(e) => {
                  Object.assign(e.target.style, styles.inputFocus);
                  e.target.previousSibling.style.color = '#4f46e5';
                }}
                onBlur={(e) => {
                  Object.assign(e.target.style, styles.input);
                  e.target.previousSibling.style.color = '#94a3b8';
                }}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <LockIcon />
              <input
                type="password"
                style={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                onFocus={(e) => {
                  Object.assign(e.target.style, styles.inputFocus);
                  e.target.previousSibling.style.color = '#4f46e5';
                }}
                onBlur={(e) => {
                  Object.assign(e.target.style, styles.input);
                  e.target.previousSibling.style.color = '#94a3b8';
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              ...styles.button,
              ...(isLoading ? styles.buttonLoading : {}),
            }}
            onMouseOver={(e) => !isLoading && Object.assign(e.target.style, {...styles.button, ...styles.buttonHover})}
            onMouseOut={(e) => !isLoading && Object.assign(e.target.style, styles.button)}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span style={styles.loadingSpinner} />
                Logging in...
              </>
            ) : 'Login'}
          </button>

          {error && (
            <div style={styles.errorMessage}>
              <ErrorIcon />
              {error}
            </div>
          )}
        </div>
      </form>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          @keyframes slideDown {
            0% { transform: translateY(-20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          @keyframes slideUp {
            0% { transform: translateY(20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
            20%, 40%, 60%, 80% { transform: translateX(2px); }
          }
        `}
      </style>
    </div>
  );
};

export default AdminLogin;