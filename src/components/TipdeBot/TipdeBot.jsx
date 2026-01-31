import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import './TipdeBot.css';
import { callApi, API_URLS } from '../../utils/api';
import CookieBanner from '../CookieBanner/CookieBanner';
import SettingsModal from '../Settings/SettingsModal';

import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const TipdeBot = () => {
    const { signOut, user } = useAuth();
    const messagesEndRef = useRef(null);

    // Current Active Chat
    const [messages, setMessages] = useState(() => {
        const savedMessages = localStorage.getItem('tipde_current_session');
        if (savedMessages) {
            try {
                return JSON.parse(savedMessages).map(msg => ({
                    ...msg,
                    timestamp: new Date(msg.timestamp)
                }));
            } catch (e) {
                return [];
            }
        }
        return [];
    });

    // Saved Chat Archives
    const [savedChats, setSavedChats] = useState(() => {
        const archives = localStorage.getItem('tipde_saved_chats');
        if (archives) {
            try {
                return JSON.parse(archives);
            } catch (e) {
                return [];
            }
        }
        return [];
    });

    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true); // Desktop sidebar toggle
    const [selectedImage, setSelectedImage] = useState(null);
    const [showClearConfirm, setShowClearConfirm] = useState(false);

    const handleLogout = async () => {
        await signOut();
        window.location.href = '/signin';
    };

    // Custom Delete Chat Modal State
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // No longer used for single chats but keeping for structural consistency or removing if brave

    // Settings & Voice State
    const [showSettings, setShowSettings] = useState(false);
    const [voiceEnabled, setVoiceEnabled] = useState(() => localStorage.getItem('tipde_voice_enabled') === 'true');
    const [autoRead, setAutoRead] = useState(() => localStorage.getItem('tipde_auto_read') === 'true');
    const [userName, setUserName] = useState(() => localStorage.getItem('tipde_user_name') || ''); // User Name State
    const [isListening, setIsListening] = useState(false);
    const [expandedThoughts, setExpandedThoughts] = useState(new Set());

    // Chat Editing States
    const [editingChatId, setEditingChatId] = useState(null);
    const [editTitle, setEditTitle] = useState('');

    const chatContentRef = useRef(null);
    const recognitionRef = useRef(null);

    // Persistence Effects
    useEffect(() => {
        localStorage.setItem('tipde_current_session', JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        localStorage.setItem('tipde_saved_chats', JSON.stringify(savedChats));
    }, [savedChats]);

    useEffect(() => {
        localStorage.setItem('tipde_voice_enabled', voiceEnabled);
        localStorage.setItem('tipde_auto_read', autoRead);
        localStorage.setItem('tipde_user_name', userName); // Persist User Name
    }, [voiceEnabled, autoRead, userName]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    // Speech Recognition Setup
    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInputText(prev => prev + (prev ? ' ' : '') + transcript);
                setIsListening(false);
            };

            recognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error', event.error);
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }
    }, []);

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
        } else {
            setInputText(''); // Optional: clear or append? let's append in onresult basically
            recognitionRef.current?.start();
            setIsListening(true);
        }
    };

    // Text to Speech
    const speakText = (text) => {
        if (!voiceEnabled) return;
        window.speechSynthesis.cancel(); // Stop any current speech
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    };

    // Auto-read effect
    useEffect(() => {
        if (autoRead && messages.length > 0) {
            const lastMsg = messages[messages.length - 1];
            if (lastMsg.sender === 'bot' && lastMsg.type === 'text') {
                speakText(lastMsg.text);
            }
        }
    }, [messages, autoRead]);

    const toggleThought = (index) => {
        setExpandedThoughts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    // --- Chat Management Logic ---
    const handleDeleteChatClick = (e, id) => {
        e.stopPropagation();
        setSavedChats(prev => prev.filter(chat => chat.id !== id));
    };


    const startEditing = (e, chat) => {
        e.stopPropagation();
        setEditingChatId(chat.id);
        setEditTitle(chat.title);
    };

    const saveRename = (e, id) => {
        e.stopPropagation();
        if (editTitle.trim()) {
            setSavedChats(prev => prev.map(chat =>
                chat.id === id ? { ...chat, title: editTitle.trim() } : chat
            ));
        }
        setEditingChatId(null);
    };

    const handleKeyDownRename = (e, id) => {
        if (e.key === 'Enter') {
            saveRename(e, id);
        }
    };

    // --- Standard Chat Logic ---
    const handleClearChatClick = () => {
        setShowClearConfirm(true);
        setSidebarOpen(false);
    };

    // Fix: Make sure confirmClearChat doesn't wipe userName
    const confirmClearChat = () => {
        setMessages([]);
        setSavedChats([]);
        localStorage.removeItem('tipde_current_session');
        localStorage.removeItem('tipde_saved_chats');
        // Do NOT remove tipde_user_name
        setShowClearConfirm(false);
    };

    const cancelClearChat = () => {
        setShowClearConfirm(false);
    };

    const handleNewChat = () => {
        if (messages.length > 0) {
            // Archive current chat
            const newArchive = {
                id: Date.now(),
                title: messages[0].text.substring(0, 30) + (messages[0].text.length > 30 ? '...' : ''),
                date: new Date().toLocaleDateString(),
                messages: messages
            };
            setSavedChats(prev => [newArchive, ...prev]);
        }
        setMessages([]);
        setSidebarOpen(false);
    };

    const loadChat = (chat) => {
        if (editingChatId === chat.id) return;

        if (messages.length > 0) {
            // Logic to auto-save current usually goes here
        }

        setMessages(chat.messages.map(msg => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
        })));
        setSidebarOpen(false);
    };

    const processMessage = async (text) => {
        setIsLoading(true);
        let apiUrl = API_URLS.LLM;
        let prompt = text;
        let isImageRequest = false;

        if (text.toLowerCase().startsWith('/image')) {
            apiUrl = API_URLS.IMAGE;
            prompt = text.substring(6).trim();
            isImageRequest = true;
        }

        // Pass 'messages' history AND 'userName' to the API for context
        const result = await callApi(messages, apiUrl, prompt, !isImageRequest, userName);

        if (result.status === 'success') {
            if (isImageRequest) {
                addBotMessage('', 'image', result.imageUrl);
            } else {
                const botText = result.text.trim();

                if (botText.toLowerCase().startsWith('/image')) {
                    const imageDescription = botText.substring(botText.toLowerCase().indexOf('/image') + 6).trim();
                    const imageResult = await callApi(messages, API_URLS.IMAGE, imageDescription, false, userName);
                    if (imageResult.status === 'success') {
                        addBotMessage('', 'image', imageResult.imageUrl);
                    } else {
                        addBotMessage('Sorry, I tried to generate an image but something went wrong.');
                    }
                } else {
                    // Parse for <thought> tags
                    let thought = '';
                    let cleanText = botText;

                    const thoughtMatch = botText.match(/<thought>([\s\S]*?)<\/thought>/);
                    if (thoughtMatch) {
                        thought = thoughtMatch[1].trim();
                        cleanText = botText.replace(/<thought>[\s\S]*?<\/thought>/, '').trim();
                    }

                    addBotMessage(cleanText, 'text', null, thought);
                }
            }
        } else {
            addBotMessage('Error: ' + result.text);
        }
        setIsLoading(false);
    };

    const addBotMessage = (text, type = 'text', imageUrl = null, thought = '') => {
        setMessages(prev => [...prev, {
            text,
            sender: 'bot',
            timestamp: new Date(),
            type,
            imageUrl,
            thought
        }]);
    };

    const handleSendMessage = () => {
        if (!inputText.trim()) return;

        setMessages(prev => [...prev, {
            text: inputText,
            sender: 'user',
            timestamp: new Date(),
            type: 'text'
        }]);

        const currentInput = inputText;
        setInputText('');
        processMessage(currentInput);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const downloadImage = (url) => {
        const a = document.createElement('a');
        a.href = url;
        a.download = 'generated-image.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="tipde-bot-container">
            {/* Global Cookie Banner */}
            <CookieBanner />

            {/* Mobile Menu Button */}
            <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
                ☰
            </button>

            {/* Sidebar */}
            <aside className={`tipde-sidebar ${sidebarOpen ? 'open' : ''} ${!showSidebar ? 'desktop-collapsed' : ''}`}>
                <div className="sidebar-top-actions" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <button className="new-chat-btn" onClick={handleNewChat} style={{ flex: 1, marginBottom: 0 }}>
                        <span>+</span> New Chat
                    </button>
                    <button className="sidebar-toggle-btn" onClick={() => setShowSidebar(!showSidebar)} title="Toggle Sidebar">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 3V21M3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <div className="sidebar-menu">
                    {savedChats.length > 0 && (
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', padding: '10px', textTransform: 'uppercase' }}>
                            Previous Chats
                        </div>
                    )}
                    {savedChats.map(chat => (
                        <div key={chat.id} className="saved-chat-item" onClick={() => loadChat(chat)}>
                            {editingChatId === chat.id ? (
                                <input
                                    className="rename-input"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                    onKeyDown={(e) => handleKeyDownRename(e, chat.id)}
                                    onBlur={(e) => saveRename(e, chat.id)}
                                    autoFocus
                                />
                            ) : (
                                <>
                                    <span className="saved-chat-title">💬 {chat.title}</span>
                                    <div className="chat-actions">
                                        <button className="action-btn" onClick={(e) => startEditing(e, chat)}>✏️</button>
                                        <button className="action-btn" onClick={(e) => handleDeleteChatClick(e, chat.id)}>🗑️</button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                <div className="sidebar-footer">
                    {user && (
                        <div style={{ padding: '0 10px 10px', fontSize: '0.8rem', color: '#9ca3af', borderBottom: '1px solid var(--border-color)', marginBottom: '10px' }}>
                            Logged in as: <br />
                            <span style={{ color: '#fff', fontWeight: '500' }}>{user.email}</span>
                        </div>
                    )}
                    <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', padding: '10px 0' }}>
                        <button className="sidebar-item" onClick={() => setShowSettings(true)}>
                            ⚙️ Settings
                        </button>
                        <Link to="/" className="sidebar-item" style={{ fontSize: '0.85rem' }}>🏠 Home</Link>
                        <a href="/contact" className="sidebar-item" style={{ fontSize: '0.85rem' }}>✉️ Contact Us</a>
                        <button className="sidebar-item" onClick={handleLogout} style={{ color: '#ff6b6b' }}>
                            🚪 Log Out
                        </button>
                    </div>

                    <button className="sidebar-item" onClick={handleClearChatClick}>
                        🗑 Clear All History
                    </button>
                </div>

            </aside >

            {/* Main Chat */}
            < main className="tipde-main-chat" >
                {/* Desktop Toggle Button (Visible when sidebar is collapsed) */}
                {
                    !showSidebar && (
                        <button
                            className="sidebar-toggle-main-btn"
                            onClick={() => setShowSidebar(true)}
                            title="Open Sidebar"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 3V21M3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    )
                }
                <div className="chat-header-mobile">
                    Tipde Chat
                </div>

                <div className="chat-content" ref={chatContentRef}>
                    {messages.length === 0 ? (
                        <div className="empty-state">
                            <h1>Tipde Chat</h1>
                            <p>What can I help you with today{userName ? `, ${userName}` : ''}?</p>
                        </div>
                    ) : (
                        <>
                            {messages.map((msg, index) => (
                                <div key={index} className={`message-row ${msg.sender}`}>
                                    <div className="message-center">
                                        <div className={`avatar ${msg.sender}`}>
                                            {msg.sender === 'bot' ? '🤖' : '👤'}
                                        </div>
                                        <div className="message-text">
                                            {msg.type === 'text' ? (
                                                <>
                                                    {msg.thought && (
                                                        <div className={`thought-container ${expandedThoughts.has(index) ? 'expanded' : ''}`}>
                                                            <div className="thought-header" onClick={() => toggleThought(index)}>
                                                                <div className="thought-header-left">
                                                                    <span className="thought-icon">🧠</span>
                                                                    <span className="thought-label">Tipde Intelligence Thinking...</span>
                                                                </div>
                                                                <span className="thought-toggle-icon">▶</span>
                                                            </div>
                                                            {expandedThoughts.has(index) && (
                                                                <div className="thought-body">
                                                                    {msg.thought}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                                                    {msg.sender === 'bot' && voiceEnabled && (
                                                        <button
                                                            onClick={() => speakText(msg.text)}
                                                            className="speak-btn"
                                                            title="Read Aloud"
                                                        >
                                                            🔊
                                                        </button>
                                                    )}
                                                </>
                                            ) : (
                                                <img
                                                    src={msg.imageUrl}
                                                    alt="Generated"
                                                    className="chat-image"
                                                    onClick={() => setSelectedImage(msg.imageUrl)}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="message-row bot">
                                    <div className="message-center">
                                        <div className="avatar bot">🤖</div>
                                        <div className="message-text typing-indicator">
                                            <span></span><span></span><span></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </>
                    )}
                </div>

                <div className="input-container">
                    <div className="input-box-wrapper">
                        {voiceEnabled && (
                            <button
                                className={`voice-btn ${isListening ? 'listening' : ''}`}
                                onClick={toggleListening}
                                title="Voice Input"
                            >
                                {isListening ? '🛑' : '🎤'}
                            </button>
                        )}
                        <input
                            className="chat-input"
                            placeholder={isListening ? "Listening..." : "Send a message..."}
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isLoading}
                        />
                        <button
                            className="send-btn"
                            onClick={handleSendMessage}
                            disabled={!inputText.trim() || isLoading}
                        >
                            ➤
                        </button>
                    </div>
                </div>
            </main >

            {/* Settings Modal */}
            < SettingsModal
                isOpen={showSettings}
                onClose={() => setShowSettings(false)}
                voiceEnabled={voiceEnabled}
                setVoiceEnabled={setVoiceEnabled}
                autoRead={autoRead}
                setAutoRead={setAutoRead}
                userName={userName}
                setUserName={setUserName}
            />

            {/* Image Modal */}
            {
                selectedImage && (
                    <div className="image-modal-overlay" onClick={() => setSelectedImage(null)}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <img src={selectedImage} alt="Full Size" />
                            <div className="modal-actions">
                                <button className="modal-btn" onClick={() => downloadImage(selectedImage)}>Download</button>
                                <button className="modal-btn close" onClick={() => setSelectedImage(null)}>Close</button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Clear History Confirmation Popup */}
            {
                showClearConfirm && (
                    <div className="image-modal-overlay">
                        <div className="confirmation-popup" onClick={e => e.stopPropagation()}>
                            <h3>Clear All History</h3>
                            <p>Are you sure you want to delete all conversations? This action cannot be undone.</p>
                            <div className="confirmation-actions">
                                <button className="cancel-btn" onClick={cancelClearChat}>Cancel</button>
                                <button className="confirm-btn" onClick={confirmClearChat}>Yes, Clear All</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default TipdeBot;
