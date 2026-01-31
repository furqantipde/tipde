import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 40px', color: '#ececf1', fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Privacy Policy</h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '2rem' }}>Last updated: {new Date().toLocaleDateString()}</p>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>1. Introduction</h2>
                <p>Welcome to Tipde.top ("we", "our", "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our AI chat services.</p>
                <p style={{ marginTop: '1rem' }}>If you have any questions or concerns about this policy or our practices regarding your personal information, please contact us through our <Link to="/contact" style={{ color: '#667eea', textDecoration: 'underline' }}>Contact page</Link>.</p>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>2. Information We Collect</h2>
                <p>We collect information that you provide directly to us and information automatically collected when you use our services.</p>

                <h3 style={{ fontSize: '1.3rem', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#667eea' }}>Information You Provide</h3>
                <ul style={{ paddingLeft: '1.5rem' }}>
                    <li style={{ marginBottom: '0.75rem' }}><strong>Account Information:</strong> Email address and password when you create an account</li>
                    <li style={{ marginBottom: '0.75rem' }}><strong>Profile Information:</strong> Optional name and preferences you choose to provide</li>
                    <li style={{ marginBottom: '0.75rem' }}><strong>Communications:</strong> Messages you send through our contact forms or support channels</li>
                    <li style={{ marginBottom: '0.75rem' }}><strong>Chat Content:</strong> Conversations with our AI assistant (stored locally in your browser)</li>
                </ul>

                <h3 style={{ fontSize: '1.3rem', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#667eea' }}>Automatically Collected Information</h3>
                <ul style={{ paddingLeft: '1.5rem' }}>
                    <li style={{ marginBottom: '0.75rem' }}><strong>Log Data:</strong> IP addresses, browser type, operating system, referring URLs, pages visited, and timestamps</li>
                    <li style={{ marginBottom: '0.75rem' }}><strong>Device Information:</strong> Device type, screen resolution, and device identifiers</li>
                    <li style={{ marginBottom: '0.75rem' }}><strong>Cookies:</strong> See our <Link to="/cookies" style={{ color: '#667eea', textDecoration: 'underline' }}>Cookie Policy</Link> for detailed information</li>
                </ul>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>3. How We Use Your Information</h2>
                <p>We use the information we collect for the following purposes:</p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
                    <li style={{ marginBottom: '0.75rem' }}>To provide, maintain, and improve our AI chat services</li>
                    <li style={{ marginBottom: '0.75rem' }}>To create and manage your account</li>
                    <li style={{ marginBottom: '0.75rem' }}>To personalize your experience and remember your preferences</li>
                    <li style={{ marginBottom: '0.75rem' }}>To communicate with you about service updates, security alerts, and support</li>
                    <li style={{ marginBottom: '0.75rem' }}>To analyze usage patterns and improve our website functionality</li>
                    <li style={{ marginBottom: '0.75rem' }}>To prevent fraud, abuse, and ensure security</li>
                    <li style={{ marginBottom: '0.75rem' }}>To comply with legal obligations</li>
                </ul>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>4. How We Share Your Information</h2>
                <p>We do not sell your personal information. We may share your information in the following circumstances:</p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
                    <li style={{ marginBottom: '0.75rem' }}><strong>Service Providers:</strong> With Firebase for authentication and hosting services</li>
                    <li style={{ marginBottom: '0.75rem' }}><strong>Advertising Partners:</strong> With Google AdSense for displaying relevant advertisements</li>
                    <li style={{ marginBottom: '0.75rem' }}><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                    <li style={{ marginBottom: '0.75rem' }}><strong>Business Transfers:</strong> In connection with any merger, sale, or acquisition</li>
                </ul>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>5. Data Storage and Security</h2>
                <p>We implement appropriate technical and organizational measures to protect your personal information:</p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
                    <li style={{ marginBottom: '0.75rem' }}>Encrypted connections (HTTPS/SSL)</li>
                    <li style={{ marginBottom: '0.75rem' }}>Secure Firebase authentication</li>
                    <li style={{ marginBottom: '0.75rem' }}>Regular security audits and updates</li>
                    <li style={{ marginBottom: '0.75rem' }}>Limited access to personal information</li>
                </ul>
                <p style={{ marginTop: '1rem' }}>Your chat conversations are stored locally in your browser's local storage and are not transmitted to our servers unless you explicitly choose to save them.</p>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>6. Your Rights and Choices</h2>
                <p>Depending on your location, you may have the following rights:</p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
                    <li style={{ marginBottom: '0.75rem' }}><strong>Access:</strong> Request access to your personal information</li>
                    <li style={{ marginBottom: '0.75rem' }}><strong>Correction:</strong> Request correction of inaccurate information</li>
                    <li style={{ marginBottom: '0.75rem' }}><strong>Deletion:</strong> Request deletion of your personal information</li>
                    <li style={{ marginBottom: '0.75rem' }}><strong>Portability:</strong> Request a copy of your information in a portable format</li>
                    <li style={{ marginBottom: '0.75rem' }}><strong>Opt-Out:</strong> Opt out of certain data processing activities</li>
                </ul>
                <p style={{ marginTop: '1rem' }}>To exercise these rights, please contact us through our <Link to="/contact" style={{ color: '#667eea', textDecoration: 'underline' }}>Contact page</Link>.</p>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>7. Google AdSense & Third-Party Advertising</h2>
                <p>We use Google AdSense to display advertisements on our website. Google uses cookies (DART cookies) to serve ads based on your visits to this and other websites.</p>
                <p style={{ marginTop: '1rem' }}>You may opt out of personalized advertising by visiting:</p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
                    <li style={{ marginBottom: '0.75rem' }}><a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: '#667eea', textDecoration: 'underline' }}>Google Ads Settings</a></li>
                    <li style={{ marginBottom: '0.75rem' }}><a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" style={{ color: '#667eea', textDecoration: 'underline' }}>Google Ad Policies</a></li>
                </ul>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>8. Children's Privacy</h2>
                <p>Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.</p>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>9. International Data Transfers</h2>
                <p>Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.</p>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>10. Changes to This Privacy Policy</h2>
                <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>11. Contact Us</h2>
                <p>If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us:</p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem', listStyle: 'none' }}>
                    <li style={{ marginBottom: '0.75rem' }}>📧 Through our <Link to="/contact" style={{ color: '#667eea', textDecoration: 'underline' }}>Contact Form</Link></li>
                    <li style={{ marginBottom: '0.75rem' }}>🌐 Website: Tipde.top</li>
                </ul>
            </section>

            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                <Link to="/" style={{ color: '#667eea', textDecoration: 'none', fontSize: '1rem' }}>← Back to Home</Link>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
