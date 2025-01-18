import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem('token'); // Check if the token exists

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children; // Render the child components if authenticated
};

export default ProtectedRoute;
