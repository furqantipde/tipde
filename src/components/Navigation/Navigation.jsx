import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navigation.css';

const Navigation = () => {
    const { user, signOut } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const handleSignOut = async () => {
        await signOut();
        setMobileMenuOpen(false);
    };

    // Don't show navigation on /chat page (has its own header)
    if (location.pathname === '/chat') {
        return null;
    }

    return (
        <nav className="main-nav">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    <img src="/logo.png" alt="Tipde AI" className="logo-image" />
                    <span className="logo-text">Tipde AI</span>
                </Link>

                <button
                    className="mobile-menu-toggle"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? '✕' : '☰'}
                </button>

                <div className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
                    <Link
                        to="/"
                        className="nav-link"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        to="/chat"
                        className="nav-link"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Chat
                    </Link>
                    <Link
                        to="/about"
                        className="nav-link"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        About
                    </Link>
                    <Link
                        to="/contact"
                        className="nav-link"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Contact
                    </Link>

                    <div className="nav-divider"></div>

                    {user ? (
                        <div className="nav-user-section">
                            <span className="nav-user-email">{user.email}</span>
                            <button
                                onClick={handleSignOut}
                                className="nav-btn nav-btn-secondary"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <div className="nav-auth-buttons">
                            <Link
                                to="/signin"
                                className="nav-btn nav-btn-secondary"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/signup"
                                className="nav-btn nav-btn-primary"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
