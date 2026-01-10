import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import ChatInterface from './components/ChatInterface';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import About from './components/About';
import Contact from './components/Contact';
import Sitemap from './components/Sitemap';
import { ChatSession, Message } from './types';

const Layout: React.FC<{
  children: React.ReactNode;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (o: boolean) => void;
  sessions: ChatSession[];
  currentSessionId: string | null;
  setCurrentSessionId: (id: string | null) => void;
  onNewChat: () => void;
  onDeleteSession: (id: string) => void;
  onRenameSession: (id: string, title: string) => void;
  onClearAll: () => void;
}> = ({ 
  children, isSidebarOpen, setIsSidebarOpen, sessions, currentSessionId, 
  setCurrentSessionId, onNewChat, onDeleteSession, onRenameSession, onClearAll 
}) => {
  const location = useLocation();
  const isChatRoute = location.pathname.startsWith('/chat');

  return (
    <div className="flex h-screen overflow-hidden bg-slate-900 text-slate-100">
      {isChatRoute && (
        <Sidebar 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen}
          sessions={sessions}
          currentSessionId={currentSessionId}
          onSelectSession={(id) => {
            setCurrentSessionId(id);
            setIsSidebarOpen(false);
          }}
          onNewChat={onNewChat}
          onDeleteSession={onDeleteSession}
          onRenameSession={onRenameSession}
          onClearAll={onClearAll}
        />
      )}

      <div className="flex flex-col flex-1 overflow-hidden relative">
        <Header onMenuClick={() => setIsSidebarOpen(true)} showMenuButton={isChatRoute} />
        
        <main className="flex-1 overflow-y-auto bg-slate-900">
          {children}
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem('tipde_ai_sessions');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('tipde_ai_sessions', JSON.stringify(sessions));
  }, [sessions]);

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Conversation',
      messages: [],
      updatedAt: Date.now(),
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    return newSession.id;
  };

  const deleteSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    if (currentSessionId === id) setCurrentSessionId(null);
  };

  const renameSession = (id: string, newTitle: string) => {
    setSessions(prev => prev.map(s => s.id === id ? { ...s, title: newTitle } : s));
  };

  const updateSessionMessages = (id: string, messages: Message[]) => {
    setSessions(prev => prev.map(s => {
      if (s.id === id) {
        let title = s.title;
        if ((title === 'New Conversation' || title === '') && messages.length > 0) {
          const firstUserMsg = messages.find(m => m.role === 'user');
          if (firstUserMsg) {
            title = firstUserMsg.content.slice(0, 30) + (firstUserMsg.content.length > 30 ? '...' : '');
          }
        }
        return { ...s, messages, title, updatedAt: Date.now() };
      }
      return s;
    }));
  };

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to delete all chat history? This action cannot be undone.')) {
      setSessions([]);
      setCurrentSessionId(null);
      localStorage.removeItem('tipde_ai_sessions');
    }
  };

  return (
    <Router>
      <Layout 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        sessions={sessions}
        currentSessionId={currentSessionId}
        setCurrentSessionId={setCurrentSessionId}
        onNewChat={createNewSession}
        onDeleteSession={deleteSession}
        onRenameSession={renameSession}
        onClearAll={clearHistory}
      >
        <Routes>
          <Route path="/" element={<Home onStartChat={() => createNewSession()} />} />
          <Route path="/chat" element={
            currentSessionId ? (
              <ChatInterface 
                session={sessions.find(s => s.id === currentSessionId)!}
                onUpdateMessages={(msgs) => updateSessionMessages(currentSessionId, msgs)}
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-4">
                 <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                    <i className="fas fa-comments text-4xl text-slate-600"></i>
                 </div>
                 <h2 className="text-2xl font-bold text-slate-300">Your conversations await</h2>
                 <p className="text-slate-500 mt-2 mb-8 text-center max-w-sm">
                    Start a fresh session to experience Tipde AI's advanced capabilities.
                 </p>
                 <button 
                    onClick={createNewSession}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-lg font-semibold"
                 >
                    Start New Chat
                 </button>
              </div>
            )
          } />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;