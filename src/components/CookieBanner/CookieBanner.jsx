import React, { useState, useEffect } from 'react';

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('tipde_cookie_consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('tipde_cookie_consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '600px',
            backgroundColor: 'rgba(32, 33, 35, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid #444654',
            borderRadius: '20px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '15px',
            zIndex: 3000,
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            transition: 'all 0.3s ease',
            animation: 'slideUpFade 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
            <style>
                {`
                    @keyframes slideUpFade {
                        from { opacity: 0; transform: translate(-50%, 50px); }
                        to { opacity: 1; transform: translate(-50%, 0); }
                    }
                `}
            </style>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', textAlign: 'center', flexDirection: 'column' }}>
                <span style={{ fontSize: '2rem' }}>🍪</span>
                <p style={{ margin: 0, color: '#ececf1', fontSize: '0.95rem', lineHeight: '1.5' }}>
                    We use cookies to ensure you get the best experience on <strong>Tipde.top</strong>.
                    By continuing, you agree to our <a href="/privacy" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 'bold' }}>Privacy Policy</a>.
                </p>
            </div>
            <button
                onClick={handleAccept}
                style={{
                    backgroundColor: '#19c37d',
                    color: 'white',
                    border: 'none',
                    padding: '12px 30px',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '1rem',
                    transition: 'transform 0.2s, background 0.2s',
                    boxShadow: '0 4px 15px rgba(25, 195, 125, 0.3)',
                    marginTop: '5px'
                }}
                onMouseOver={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.backgroundColor = '#1a7f5a';
                }}
                onMouseOut={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.backgroundColor = '#19c37d';
                }}
            >
                Accept & Continue
            </button>
        </div>
    );
};

export default CookieBanner;
