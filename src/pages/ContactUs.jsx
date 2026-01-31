import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create mailto link
        const mailtoLink = `mailto:support@tipde.top?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
        window.location.href = mailtoLink;
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 40px', color: '#ececf1', fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textAlign: 'center' }}>Contact Us</h1>
            <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.1rem', marginBottom: '3rem' }}>We'd love to hear from you! Get in touch with our team.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                <div style={{ background: 'rgba(102, 126, 234, 0.1)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(102, 126, 234, 0.3)', textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✉️</div>
                    <h3 style={{ color: '#667eea', marginBottom: '0.75rem' }}>Email Us</h3>
                    <a href="mailto:support@tipde.top" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.1rem' }}>support@tipde.top</a>
                    <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.6)' }}>We typically respond within 24-48 hours</p>
                </div>

                <div style={{ background: 'rgba(102, 126, 234, 0.1)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(102, 126, 234, 0.3)', textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💬</div>
                    <h3 style={{ color: '#667eea', marginBottom: '0.75rem' }}>Live Chat</h3>
                    <Link to="/chat" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.1rem' }}>Chat with TipdeBot</Link>
                    <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.6)' }}>Get instant AI-powered assistance</p>
                </div>

                <div style={{ background: 'rgba(102, 126, 234, 0.1)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(102, 126, 234, 0.3)', textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌐</div>
                    <h3 style={{ color: '#667eea', marginBottom: '0.75rem' }}>Social Media</h3>
                    <div style={{ fontSize: '0.95rem' }}>
                        <a href="https://twitter.com/tipdeofficial" target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none', display: 'block', marginBottom: '0.5rem' }}>Twitter</a>
                        <a href="https://www.youtube.com/@tipdeofficial" target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none', display: 'block' }}>YouTube</a>
                    </div>
                </div>
            </div>

            <section style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#fff', textAlign: 'center' }}>Send Us a Message</h2>
                <form onSubmit={handleSubmit} style={{ background: 'rgba(68, 70, 84, 0.5)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(102, 126, 234, 0.3)' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#fff', fontWeight: '500' }}>Name *</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '0.75rem', background: 'rgba(32, 33, 35, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#fff', fontSize: '1rem', boxSizing: 'border-box' }}
                            placeholder="Your name"
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#fff', fontWeight: '500' }}>Email *</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '0.75rem', background: 'rgba(32, 33, 35, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#fff', fontSize: '1rem', boxSizing: 'border-box' }}
                            placeholder="your.email@example.com"
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#fff', fontWeight: '500' }}>Subject *</label>
                        <input
                            type="text"
                            name="subject"
                            required
                            value={formData.subject}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '0.75rem', background: 'rgba(32, 33, 35, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#fff', fontSize: '1rem', boxSizing: 'border-box' }}
                            placeholder="How can we help?"
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#fff', fontWeight: '500' }}>Message *</label>
                        <textarea
                            name="message"
                            required
                            rows="6"
                            value={formData.message}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '0.75rem', background: 'rgba(32, 33, 35, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#fff', fontSize: '1rem', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box' }}
                            placeholder="Tell us what's on your mind..."
                        />
                    </div>

                    <button
                        type="submit"
                        style={{ width: '100%', padding: '0.875rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer', transition: 'transform 0.2s' }}
                        onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        Send Message →
                    </button>
                </form>
            </section>

            <section style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#fff' }}>Frequently Asked Questions</h2>
                <div style={{ background: 'rgba(102, 126, 234, 0.1)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1rem' }}>
                    <h3 style={{ color: '#667eea', marginBottom: '0.75rem', fontSize: '1.2rem' }}>How quickly will I get a response?</h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>We aim to respond to all inquiries within 24-48 hours during business days. For immediate assistance, try chatting with TipdeBot!</p>
                </div>

                <div style={{ background: 'rgba(102, 126, 234, 0.1)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1rem' }}>
                    <h3 style={{ color: '#667eea', marginBottom: '0.75rem', fontSize: '1.2rem' }}>Can I suggest new features?</h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Absolutely! We love hearing from our users. Please email us with your suggestions and we'll consider them for future updates.</p>
                </div>

                <div style={{ background: 'rgba(102, 126, 234, 0.1)', padding: '1.5rem', borderRadius: '12px' }}>
                    <h3 style={{ color: '#667eea', marginBottom: '0.75rem', fontSize: '1.2rem' }}>Do you offer technical support?</h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Yes! If you're experiencing technical issues, please email us with details about the problem and we'll help you troubleshoot.</p>
                </div>
            </section>

            <section style={{ marginBottom: '2rem', padding: '2rem', background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)', borderRadius: '16px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>Business Inquiries</h2>
                <p style={{ fontSize: '1.05rem', marginBottom: '1rem' }}>For partnership opportunities, press inquiries, or business-related questions, please contact:</p>
                <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>CEO: M. FURQAN</p>
                <a href="mailto:support@tipde.top" style={{ color: '#667eea', textDecoration: 'none', fontSize: '1.05rem' }}>support@tipde.top</a>
            </section>

            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                <Link to="/" style={{ color: '#667eea', textDecoration: 'none', fontSize: '1rem' }}>← Back to Home</Link>
            </div>
        </div>
    );
};

export default ContactUs;
