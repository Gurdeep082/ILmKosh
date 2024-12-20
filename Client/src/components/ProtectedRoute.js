import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (token) {
        alert('Logout first to login');
        return <Navigate to="/new" />;
    }
    return children;
};

const Protected = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please login or register first');
        return <Navigate to="/new" />;
    }
    return children;
};

export { ProtectedRoute, Protected };