import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Basic Spinner while checking auth
const LoadingSpinner = () => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#16161a',
        color: '#94a1b2'
    }}>
        Scanning credentials...
    </div>
)

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth(); // Assuming 'loading' state handles the initial check

    // Note: If you didn't expose 'loading' from AuthContext, you should update AuthContext.
    // Assuming AuthContext exposes proper loading state.
    if (loading) {
        return <LoadingSpinner />;
    }

    if (!user) {
        // User not logged in, redirect to login
        // Replace with state passing if you want to redirect back after login
        return <Navigate to="/signin" replace />;
    }

    return children;
};

export default ProtectedRoute;
