import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './SignIn.css'; // Reusing styles

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signUp } = useAuth();
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signUp(email, password);
            navigate('/chat');
        } catch (err) {
            // Firebase error codes
            if (err.code === 'auth/email-already-in-use') {
                setError('An account with this email already exists.');
            } else if (err.code === 'auth/weak-password') {
                setError('Password should be at least 6 characters.');
            } else if (err.code === 'auth/invalid-email') {
                setError('Invalid email address.');
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signin-container">
            <div className="signin-box">
                <div className="signin-header">
                    <h2>Create Account</h2>
                    <p>Join TipdeBot today</p>
                </div>

                {error && <div className="error-message" style={{ color: '#ff6b6b', marginBottom: '15px', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}

                <form onSubmit={handleSignUp}>
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
                            placeholder="Create a password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="divider">ALREADY HAVE AN ACCOUNT?</div>

                <Link to="/signin" className="back-link">
                    Sign In
                </Link>

                <Link to="/" className="back-link" style={{ marginTop: '10px' }}>
                    &larr; Back to Home
                </Link>
            </div>
        </div>
    );
};

export default SignUp;
