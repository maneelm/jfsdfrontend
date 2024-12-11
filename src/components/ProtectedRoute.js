import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem('authToken') || Cookies.get('studentSession');
  return authToken ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
