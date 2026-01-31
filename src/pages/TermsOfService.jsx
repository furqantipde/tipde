import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 40px', color: '#ececf1', fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Terms of Service</h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '2rem' }}>Last updated: {new Date().toLocaleDateString()}</p>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>1. Acceptance of Terms</h2>
                <p>By accessing and using Tipde.top ("Service"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.</p>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>2. Description of Service</h2>
                <p>Tipde.top provides an AI-powered chat assistant that helps users with conversations, information retrieval, and creative tasks. The Service is provided "as is" and "as available" without warranties of any kind.</p>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>3. User Accounts</h2>
                <h3 style={{ fontSize: '1.3rem', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#667eea' }}>Registration</h3>
                <p>To use certain features, you must create an account. You agree to:</p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
                    <li style={{ marginBottom: '0.75rem' }}>Provide accurate and complete information</li>
                    <li style={{ marginBottom: '0.75rem' }}>Maintain the security of your account credentials</li>
                    <li style={{ marginBottom: '0.75rem' }}>Notify us immediately of any unauthorized access</li>
                    <li style={{ marginBottom: '0.75rem' }}>Be responsible for all activities under your account</li>
                </ul>

                <h3 style={{ fontSize: '1.3rem', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#667eea' }}>Account Termination</h3>
                <p>We reserve the right to suspend or terminate your account if you violate these Terms or engage in abusive behavior.</p>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>4. Acceptable Use Policy</h2>
                <p>You agree NOT to use the Service to:</p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
                    <li style={{ marginBottom: '0.75rem' }}>Violate any laws or regulations</li>
                    <li style={{ marginBottom: '0.75rem' }}>Infringe on intellectual property rights</li>
                    <li style={{ marginBottom: '0.75rem' }}>Transmit harmful, offensive, or illegal content</li>
                    <li style={{ marginBottom: '0.75rem' }}>Harass, abuse, or harm others</li>
                    <li style={{ marginBottom: '0.75rem' }}>Impersonate any person or entity</li>
                    <li style={{ marginBottom: '0.75rem' }}>Interfere with or disrupt the Service</li>
                    <li style={{ marginBottom: '0.75rem' }}>Attempt to gain unauthorized access to our systems</li>
                    <li style={{ marginBottom: '0.75rem' }}>Use automated tools to access the Service without permission</li>
                </ul>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>5. Intellectual Property</h2>
                <h3 style={{ fontSize: '1.3rem', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#667eea' }}>Our Content</h3>
                <p>All content, features, and functionality of the Service, including but not limited to text, graphics, logos, and software, are owned by Tipde.top and are protected by copyright, trademark, and other intellectual property laws.</p>

                <h3 style={{ fontSize: '1.3rem', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#667eea' }}>Your Content</h3>
                <p>You retain ownership of any content you submit to the Service. By submitting content, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and display your content solely for providing the Service.</p>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>6. AI-Generated Content</h2>
                <p>The AI responses provided by our Service are generated by artificial intelligence and may not always be accurate, complete, or appropriate. You acknowledge that:</p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
                    <li style={{ marginBottom: '0.75rem' }}>AI-generated content should not be considered professional advice</li>
                    <li style={{ marginBottom: '0.75rem' }}>You use AI responses at your own risk</li>
                    <li style={{ marginBottom: '0.75rem' }}>We are not responsible for decisions made based on AI responses</li>
                    <li style={{ marginBottom: '0.75rem' }}>AI responses may contain errors or biases</li>
                </ul>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>7. Third-Party Services</h2>
                <p>Our Service may contain links to third-party websites or services, including:</p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
                    <li style={{ marginBottom: '0.75rem' }}>Google AdSense for advertisements</li>
                    <li style={{ marginBottom: '0.75rem' }}>Firebase for authentication and hosting</li>
                    <li style={{ marginBottom: '0.75rem' }}>External APIs for AI capabilities</li>
                </ul>
                <p style={{ marginTop: '1rem' }}>We are not responsible for the content, privacy policies, or practices of third-party services.</p>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>8. Disclaimer of Warranties</h2>
                <p>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:</p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
                    <li style={{ marginBottom: '0.75rem' }}>Merchantability</li>
                    <li style={{ marginBottom: '0.75rem' }}>Fitness for a particular purpose</li>
                    <li style={{ marginBottom: '0.75rem' }}>Non-infringement</li>
                    <li style={{ marginBottom: '0.75rem' }}>Accuracy or reliability of content</li>
                </ul>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>9. Limitation of Liability</h2>
                <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, TIPDE.TOP SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:</p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
                    <li style={{ marginBottom: '0.75rem' }}>Loss of profits or revenue</li>
                    <li style={{ marginBottom: '0.75rem' }}>Loss of data or information</li>
                    <li style={{ marginBottom: '0.75rem' }}>Business interruption</li>
                    <li style={{ marginBottom: '0.75rem' }}>Personal injury or property damage</li>
                </ul>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>10. Indemnification</h2>
                <p>You agree to indemnify and hold harmless Tipde.top and its affiliates from any claims, damages, losses, or expenses arising from:</p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
                    <li style={{ marginBottom: '0.75rem' }}>Your use of the Service</li>
                    <li style={{ marginBottom: '0.75rem' }}>Your violation of these Terms</li>
                    <li style={{ marginBottom: '0.75rem' }}>Your violation of any rights of another party</li>
                </ul>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>11. Modifications to Service</h2>
                <p>We reserve the right to modify, suspend, or discontinue the Service at any time, with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Service.</p>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>12. Governing Law</h2>
                <p>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Tipde.top operates, without regard to its conflict of law provisions.</p>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>13. Changes to Terms</h2>
                <p>We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of the Service after changes constitutes acceptance of the new Terms.</p>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>14. Contact Information</h2>
                <p>If you have any questions about these Terms, please contact us through our <Link to="/contact" style={{ color: '#667eea', textDecoration: 'underline' }}>Contact page</Link>.</p>
            </section>

            <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'rgba(102, 126, 234, 0.1)', borderLeft: '4px solid #667eea', borderRadius: '8px' }}>
                <p style={{ margin: 0, fontSize: '0.95rem' }}><strong>Important:</strong> By using Tipde.top, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</p>
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <Link to="/" style={{ color: '#667eea', textDecoration: 'none', fontSize: '1rem' }}>← Back to Home</Link>
            </div>
        </div>
    );
};

export default TermsOfService;
