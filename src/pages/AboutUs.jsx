import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 40px', color: '#ececf1', fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textAlign: 'center' }}>About Tipde.top</h1>
            <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.2rem', marginBottom: '3rem' }}>Your Intelligent AI Companion for Smarter Conversations</p>

            <section style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#fff' }}>Our Mission</h2>
                <p style={{ fontSize: '1.1rem' }}>At Tipde.top, our mission is to make advanced AI technology accessible to everyone. We believe that intelligent conversation should be simple, intuitive, and helpful. Whether you're seeking information, brainstorming ideas, or just having a chat, TipdeBot is here to assist you with cutting-edge AI capabilities.</p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#fff' }}>What We Offer</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
                    <div style={{ background: 'rgba(102, 126, 234, 0.1)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(102, 126, 234, 0.3)' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🤖</div>
                        <h3 style={{ color: '#667eea', marginBottom: '0.75rem', fontSize: '1.3rem' }}>AI-Powered Chat</h3>
                        <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem' }}>Engage in natural conversations with our advanced AI assistant powered by state-of-the-art language models</p>
                    </div>

                    <div style={{ background: 'rgba(102, 126, 234, 0.1)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(102, 126, 234, 0.3)' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🔒</div>
                        <h3 style={{ color: '#667eea', marginBottom: '0.75rem', fontSize: '1.3rem' }}>Privacy First</h3>
                        <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem' }}>Your conversations are private. We prioritize data security and never sell your personal information</p>
                    </div>

                    <div style={{ background: 'rgba(102, 126, 234, 0.1)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(102, 126, 234, 0.3)' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>⚡</div>
                        <h3 style={{ color: '#667eea', marginBottom: '0.75rem', fontSize: '1.3rem' }}>Fast & Reliable</h3>
                        <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem' }}>Get instant responses powered by optimized infrastructure and modern web technologies</p>
                    </div>

                    <div style={{ background: 'rgba(102, 126, 234, 0.1)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(102, 126, 234, 0.3)' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>💡</div>
                        <h3 style={{ color: '#667eea', marginBottom: '0.75rem', fontSize: '1.3rem' }}>Smart Assistance</h3>
                        <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem' }}>From answering questions to helping with creative tasks, our AI adapts to your needs</p>
                    </div>

                    <div style={{ background: 'rgba(102, 126, 234, 0.1)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(102, 126, 234, 0.3)' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🎨</div>
                        <h3 style={{ color: '#667eea', marginBottom: '0.75rem', fontSize: '1.3rem' }}>Beautiful Design</h3>
                        <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem' }}>Clean, modern interface with dark mode design that's easy on your eyes</p>
                    </div>

                    <div style={{ background: 'rgba(102, 126, 234, 0.1)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(102, 126, 234, 0.3)' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🌐</div>
                        <h3 style={{ color: '#667eea', marginBottom: '0.75rem', fontSize: '1.3rem' }}>Always Available</h3>
                        <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem' }}>Access TipdeBot anytime, anywhere from any device with internet connection</p>
                    </div>
                </div>
            </section>

            <section style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#fff' }}>Who We Are</h2>
                <p style={{ fontSize: '1.05rem' }}>We are a dedicated team of developers, AI enthusiasts, and designers passionate about making technology more accessible. TipdeBot represents our commitment to combining cutting-edge artificial intelligence with user-friendly design.</p>
                <p style={{ fontSize: '1.05rem', marginTop: '1rem' }}>Our team continuously works to improve the AI's capabilities, ensuring you have the best possible experience with every conversation.</p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#fff' }}>Why Choose Tipde.top?</h2>
                <ul style={{ paddingLeft: '1.5rem', fontSize: '1.05rem' }}>
                    <li style={{ marginBottom: '1rem' }}><strong style={{ color: '#667eea' }}>Advanced AI Technology:</strong> Powered by state-of-the-art language models for accurate and helpful responses</li>
                    <li style={{ marginBottom: '1rem' }}><strong style={{ color: '#667eea' }}>User-Centric Design:</strong> Intuitive interface designed for seamless interactions</li>
                    <li style={{ marginBottom: '1rem' }}><strong style={{ color: '#667eea' }}>Continuous Improvement:</strong> Regular updates and enhancements based on user feedback</li>
                    <li style={{ marginBottom: '1rem' }}><strong style={{ color: '#667eea' }}>Free to Use:</strong> Core features available at no cost to all users</li>
                    <li style={{ marginBottom: '1rem' }}><strong style={{ color: '#667eea' }}>Community Focused:</strong> Built for users, by users who understand your needs</li>
                </ul>
            </section>

            <section style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#fff' }}>Our Commitment</h2>
                <p style={{ fontSize: '1.05rem' }}>We are committed to:</p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem', fontSize: '1.05rem' }}>
                    <li style={{ marginBottom: '1rem' }}>Protecting your privacy and data security</li>
                    <li style={{ marginBottom: '1rem' }}>Providing accurate and helpful AI responses</li>
                    <li style={{ marginBottom: '1rem' }}>Maintaining a safe and respectful environment</li>
                    <li style={{ marginBottom: '1rem' }}>Continuously improving our technology</li>
                    <li style={{ marginBottom: '1rem' }}>Listening to and acting on user feedback</li>
                </ul>
            </section>

            <section style={{ marginBottom: '3rem', textAlign: 'center', padding: '2rem', background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)', borderRadius: '16px', border: '1px solid rgba(102, 126, 234, 0.3)' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>Get Started Today</h2>
                <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'rgba(255, 255, 255, 0.9)' }}>Join thousands of users already experiencing the power of AI-assisted conversations</p>
                <Link to="/chat" style={{ display: 'inline-block', padding: '0.75rem 2rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', textDecoration: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '1.1rem', transition: 'transform 0.3s' }}>
                    Start Chatting →
                </Link>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#fff', textAlign: 'center' }}>Have Questions?</h2>
                <p style={{ textAlign: 'center', fontSize: '1.05rem' }}>
                    We'd love to hear from you! Visit our <Link to="/contact" style={{ color: '#667eea', textDecoration: 'underline' }}>Contact page</Link> to get in touch with our team.
                </p>
            </section>

            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                <Link to="/" style={{ color: '#667eea', textDecoration: 'none', fontSize: '1rem' }}>← Back to Home</Link>
            </div>
        </div>
    );
};

export default AboutUs;
