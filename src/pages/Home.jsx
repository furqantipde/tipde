import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
    const { user } = useAuth();

    return (
        <div className="home-container">
            <div className="hero-content">
                <h1 className="hero-title">
                    TipdeBot
                </h1>
                <p className="hero-subtitle">
                    Your intelligent companion for a smarter web. <br />
                    Experience the future of conversation with our advanced AI assistant.
                </p>

                <div className="cta-container">
                    <Link to="/chat" className="cta-button">
                        Start Chatting
                    </Link>
                </div>
            </div>

            <div className="features-grid">
                <FeatureCard
                    icon="⚡"
                    title="Instant Responses"
                    desc="Get lightning-fast answers to your questions powered by advanced AI algorithms designed for speed and accuracy."
                />
                <FeatureCard
                    icon="🛡️"
                    title="Privacy First"
                    desc="Your conversations are secure and private. We prioritize your data protection above all else."
                />
                <FeatureCard
                    icon="🎨"
                    title="Creative Suite"
                    desc="Unleash your creativity. Generate stunning images and unique content with our powerful creative tools."
                />
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="feature-card">
        <div className="feature-icon">{icon}</div>
        <h3 className="feature-title">{title}</h3>
        <p className="feature-desc">{desc}</p>
    </div>
);

export default Home;
