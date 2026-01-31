import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import "../TipdeBot/TipdeBot.css"; // Reuse existing styles or add new ones

const SettingsModal = ({ isOpen, onClose, voiceEnabled, setVoiceEnabled, autoRead, setAutoRead, userName, setUserName }) => {
    if (!isOpen) return null;

    const { theme, toggleTheme } = useTheme();

    return (
        <div className="image-modal-overlay" onClick={onClose}>
            <div className="confirmation-popup" onClick={e => e.stopPropagation()} style={{ textAlign: 'left', minWidth: '350px' }}>
                <h3 style={{ marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Settings</h3>

                <div className="settings-group" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    {/* Personalization Section */}
                    <div className="setting-item" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Your Name</div>
                        <input
                            type="text"
                            placeholder="How should I call you?"
                            value={userName || ''}
                            onChange={(e) => setUserName(e.target.value)}
                            style={{
                                padding: '8px 12px',
                                borderRadius: '6px',
                                border: '1px solid var(--border-color)',
                                backgroundColor: 'var(--input-bg)',
                                color: 'var(--text-primary)',
                                outline: 'none'
                            }}
                        />
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>I'll remember this for all future chats.</div>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-color)', margin: '10px 0' }}></div>

                    {/* Theme Toggle */}
                    <div className="setting-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Theme</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</div>
                        </div>
                        <button
                            onClick={toggleTheme}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '6px',
                                border: '1px solid var(--border-color)',
                                backgroundColor: 'var(--bg-primary)',
                                color: 'var(--text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
                        </button>
                    </div>

                    {/* Voice Toggle */}
                    <div className="setting-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Voice Input</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Enable microphone</div>
                        </div>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={voiceEnabled}
                                onChange={(e) => setVoiceEnabled(e.target.checked)}
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>

                    {/* Auto-Read Toggle */}
                    <div className="setting-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Auto-Read Responses</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Read bot messages aloud</div>
                        </div>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={autoRead}
                                onChange={(e) => setAutoRead(e.target.checked)}
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>

                </div>

                <div className="confirmation-actions" style={{ marginTop: '30px' }}>
                    <button className="confirm-btn" onClick={onClose} style={{ width: '100%', backgroundColor: 'var(--accent-color)' }}>Done</button>
                </div>
            </div>
            <style>{`
                .switch {
                    position: relative;
                    display: inline-block;
                    width: 50px;
                    height: 24px;
                }
                .switch input { 
                    opacity: 0;
                    width: 0;
                    height: 0;
                }
                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: var(--bg-surface);
                    border: 1px solid var(--border-color);
                    transition: .4s;
                    border-radius: 34px;
                }
                .slider:before {
                    position: absolute;
                    content: "";
                    height: 16px;
                    width: 16px;
                    left: 4px;
                    bottom: 3px;
                    background-color: white;
                    transition: .4s;
                    border-radius: 50%;
                }
                input:checked + .slider {
                    background-color: var(--accent-color);
                }
                input:checked + .slider:before {
                    transform: translateX(26px);
                }
            `}</style>
        </div>
    );
};

export default SettingsModal;
