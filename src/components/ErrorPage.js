import React from 'react';
import { useLocation } from 'react-router-dom';

const ErrorPage = () => {
  const location = useLocation();
  const message = location.state?.message || "An error occurred";

  return (
    <div>
      <h2>Error</h2>
      <p>{message}</p>
      <a href="/">Try Again</a>
    </div>
  );
};

export default ErrorPage;
