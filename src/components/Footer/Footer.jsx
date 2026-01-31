import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const location = useLocation();
    const currentYear = new Date().getFullYear();

    // Don't show footer on /chat page
    if (location.pathname === '/chat') {
        return null;
    }

    return (
        <footer className="main-footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>Tipde AI</h3>
                    <p>Your intelligent AI companion for smarter conversations and creative solutions.</p>
                    <div className="footer-social">
                        {/* Add social media links here if needed */}
                    </div>
                </div>

                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/chat">Chat</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Legal</h4>
                    <ul className="footer-links">
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                        <li><Link to="/terms">Terms of Service</Link></li>
                        <li><Link to="/cookies">Cookie Policy</Link></li>
                        <li><Link to="/disclaimer">Disclaimer</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Resources</h4>
                    <ul className="footer-links">
                        <li><Link to="/about">About AI</Link></li>
                        <li><Link to="/contact">Support</Link></li>
                        <li><Link to="/about">FAQ</Link></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-container">
                    <p>&copy; {currentYear} Tipde AI. All rights reserved.</p>
                    <p className="footer-tagline">Powered by Advanced AI | Built with ❤️ for better conversations</p>
                    <p className="footer-ceo" style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.6)' }}>CEO: M. FURQAN</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
