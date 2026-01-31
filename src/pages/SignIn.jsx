import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './SignIn.css';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signIn, signInWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signIn(email, password);
            navigate('/chat');
        } catch (err) {
            // Firebase error codes
            if (err.code === 'auth/user-not-found') {
                setError('No account found with this email.');
            } else if (err.code === 'auth/wrong-password') {
                setError('Incorrect password.');
            } else if (err.code === 'auth/invalid-email') {
                setError('Invalid email address.');
            } else if (err.code === 'auth/invalid-credential') {
                setError('Invalid email or password.');
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            setError('');
            const { error: googleError } = await signInWithGoogle();
            if (googleError) {
                if (googleError.code === 'auth/popup-blocked') {
                    setError('Please allow popups for this site to sign in with Google.');
                } else if (googleError.code === 'auth/popup-closed-by-user') {
                    setError('Sign-in cancelled.');
                } else if (googleError.code === 'auth/cancelled-popup-request') {
                    // Ignore - user opened another popup
                    return;
                } else {
                    setError(googleError.message);
                }
            } else {
                navigate('/chat');
            }
        } catch (err) {
            setError(err.message || 'Failed to sign in with Google. Please try again.');
        }
    }

    return (
        <div className="signin-container">
            <div className="signin-box">
                <div className="signin-header">
                    <h2>Welcome Back</h2>
                    <p>Enter your details to sign in to your account</p>
                </div>

                {error && <div className="error-message" style={{ color: '#ff6b6b', marginBottom: '15px', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Enter your password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <div className="divider">OR CONTINUE WITH</div>

                <div className="social-login">
                    <button className="social-btn" onClick={handleGoogleSignIn}>
                        <span>G</span> Google
                    </button>
                    {/* Apple Sign In requires more setup, hiding for now or keeping as mock if desired used as mock button for now but without action to avoid errors */}
                    <button className="social-btn" style={{ opacity: 0.5, cursor: 'not-allowed' }} title="Available efficiently on production">
                        <span></span> Apple
                    </button>
                </div>

                <div className="divider">NEW TO TIPDEBOT?</div>

                <Link to="/signup" className="back-link" style={{ marginTop: '0' }}>
                    Create an account
                </Link>

                <Link to="/" className="back-link" style={{ marginTop: '15px' }}>
                    &larr; Back to Home
                </Link>
            </div>
        </div>
    );
};

export default SignIn;
