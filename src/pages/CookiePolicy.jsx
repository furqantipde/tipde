import React from 'react';
import { Link } from 'react-router-dom';

const CookiePolicy = () => {
    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 40px', color: '#ececf1', fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Cookie Policy</h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '2rem' }}>Last updated: {new Date().toLocaleDateString()}</p>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>1. What Are Cookies?</h2>
                <p>Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and provide information to the site owners.</p>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>2. How We Use Cookies</h2>
                <p>Tipde.top uses cookies for the following purposes:</p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
                    <li style={{ marginBottom: '0.75rem' }}><strong>Essential Cookies:</strong> Required for the website to function properly, including user authentication and session management.</li>
                    <li style={{ marginBottom: '0.75rem' }}><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website by collecting anonymous information.</li>
                    <li style={{ marginBottom: '0.75rem' }}><strong>Preference Cookies:</strong> Remember your settings and preferences (such as dark mode, language) to enhance your experience.</li>
                    <li style={{ marginBottom: '0.75rem' }}><strong>Advertising Cookies:</strong> Used by Google AdSense and other advertising partners to serve relevant ads based on your browsing behavior.</li>
                </ul>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>3. Types of Cookies We Use</h2>

                <h3 style={{ fontSize: '1.3rem', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#667eea' }}>First-Party Cookies</h3>
                <p>These are cookies set directly by Tipde.top and can only be read by our website.</p>

                <h3 style={{ fontSize: '1.3rem', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#667eea' }}>Third-Party Cookies</h3>
                <p>These cookies are set by third-party services that appear on our pages:</p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
                    <li style={{ marginBottom: '0.75rem' }}><strong>Google AdSense:</strong> For displaying personalized advertisements</li>
                    <li style={{ marginBottom: '0.75rem' }}><strong>Firebase Authentication:</strong> For secure user authentication</li>
                    <li style={{ marginBottom: '0.75rem' }}><strong>Google Analytics (if applicable):</strong> For website traffic analysis</li>
                </ul>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>4. Google AdSense Cookies</h2>
                <p>Google AdSense uses cookies to serve ads based on your prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the Internet.</p>
                <p style={{ marginTop: '1rem' }}>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: '#667eea', textDecoration: 'underline' }}>Google Ads Settings</a> or by visiting <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" style={{ color: '#667eea', textDecoration: 'underline' }}>aboutads.info</a>.</p>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>5. Managing Cookies</h2>
                <p>You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by:</p>

                <h3 style={{ fontSize: '1.3rem', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#667eea' }}>Browser Settings</h3>
                <p>Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may impact your experience of our website.</p>

                <h3 style={{ fontSize: '1.3rem', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#667eea' }}>Our Cookie Banner</h3>
                <p>When you first visit our website, you'll see a cookie consent banner allowing you to accept or customize cookie preferences.</p>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>6. How to Control Cookies in Your Browser</h2>
                <ul style={{ paddingLeft: '1.5rem' }}>
                    <li style={{ marginBottom: '0.75rem' }}><strong>Google Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                    <li style={{ marginBottom: '0.75rem' }}><strong>Mozilla Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                    <li style={{ marginBottom: '0.75rem' }}><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                    <li style={{ marginBottom: '0.75rem' }}><strong>Microsoft Edge:</strong> Settings → Privacy, search, and services → Cookies and site permissions</li>
                </ul>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>7. Updates to This Policy</h2>
                <p>We may update our Cookie Policy from time to time to reflect changes in our practices or for operational, legal, or regulatory reasons. We will notify you of any significant changes by posting the new Cookie Policy on this page.</p>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>8. Contact Us</h2>
                <p>If you have any questions about our use of cookies, please contact us through our <Link to="/contact" style={{ color: '#667eea', textDecoration: 'underline' }}>Contact page</Link> or email us directly.</p>
            </section>

            <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'rgba(102, 126, 234, 0.1)', borderLeft: '4px solid #667eea', borderRadius: '8px' }}>
                <p style={{ margin: 0, fontSize: '0.95rem' }}><strong>Learn More:</strong> For more information about cookies and how to manage them, visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" style={{ color: '#667eea', textDecoration: 'underline' }}>allaboutcookies.org</a></p>
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <Link to="/" style={{ color: '#667eea', textDecoration: 'none', fontSize: '1rem' }}>← Back to Home</Link>
            </div>
        </div>
    );
};

export default CookiePolicy;
