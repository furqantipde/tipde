
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChatSession } from '../types';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  sessions: ChatSession[];
  currentSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
  onDeleteSession: (id: string) => void;
  onRenameSession: (id: string, newTitle: string) => void;
  onClearAll: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, setIsOpen, sessions, currentSessionId, onSelectSession, onNewChat, onDeleteSession, onRenameSession, onClearAll 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleRename = (id: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (editValue.trim()) {
      onRenameSession(id, editValue.trim());
    }
    setEditingId(null);
  };

  const startRename = (id: string, currentTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(id);
    setEditValue(currentTitle);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Delete this conversation?')) {
      onDeleteSession(id);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-80 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6">
            <button 
              onClick={() => {
                onNewChat();
                navigate('/chat');
              }}
              className="w-full flex items-center justify-center gap-3 py-4 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/10 active:scale-95"
            >
              <i className="fas fa-plus"></i> New Conversation
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1 custom-scrollbar">
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] px-3 mb-4">Chat History</p>
            {sessions.length === 0 ? (
              <div className="px-3 py-10 text-center space-y-3">
                 <i className="fas fa-ghost text-slate-800 text-2xl"></i>
                 <p className="text-xs text-slate-600 font-medium">Your creative history <br/> will appear here.</p>
              </div>
            ) : (
              sessions.map(session => (
                <div 
                  key={session.id}
                  className={`group relative flex items-center rounded-xl transition-all ${currentSessionId === session.id ? 'bg-slate-800 border border-slate-700' : 'hover:bg-slate-800/40 border border-transparent'}`}
                >
                  {editingId === session.id ? (
                    <form onSubmit={(e) => handleRename(session.id, e)} className="flex-1 p-2">
                      <input 
                        autoFocus
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={() => handleRename(session.id)}
                        className="w-full bg-slate-950 border border-blue-500 rounded-lg px-3 py-2 text-sm outline-none font-medium"
                      />
                    </form>
                  ) : (
                    <button 
                      onClick={() => {
                        onSelectSession(session.id);
                        navigate('/chat');
                      }}
                      className="flex-1 text-left px-4 py-3 text-sm truncate pr-20 font-medium text-slate-300 group-hover:text-white"
                    >
                      <i className="fas fa-message text-xs mr-3 text-slate-600"></i>
                      {session.title}
                    </button>
                  )}
                  
                  <div className={`absolute right-2 flex gap-1 transition-opacity ${currentSessionId === session.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    <button onClick={(e) => startRename(session.id, session.title, e)} className="p-2 hover:bg-slate-700 rounded-lg text-slate-500 hover:text-blue-400">
                      <i className="fas fa-pen text-[10px]"></i>
                    </button>
                    <button onClick={(e) => handleDelete(session.id, e)} className="p-2 hover:bg-slate-700 rounded-lg text-slate-500 hover:text-red-400">
                      <i className="fas fa-trash text-[10px]"></i>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 bg-slate-950/50 border-t border-slate-800 space-y-1">
            <button 
              onClick={onClearAll}
              className="w-full text-left px-4 py-3 text-xs font-bold text-slate-500 hover:text-red-400 hover:bg-red-500/5 rounded-xl flex items-center gap-3 transition-colors uppercase tracking-widest"
            >
              <i className="fas fa-broom"></i> Reset System
            </button>
            <div className="h-[1px] bg-slate-800/50 my-2"></div>
            <Link 
              to="/privacy"
              className={`w-full text-left px-4 py-3 text-sm rounded-xl flex items-center gap-3 transition-colors font-medium ${location.pathname === '/privacy' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:bg-slate-800/50 hover:text-slate-300'}`}
              onClick={() => setIsOpen(false)}
            >
              <i className="fas fa-shield-halved text-xs"></i> Privacy Policy
            </Link>
            <Link 
              to="/terms"
              className={`w-full text-left px-4 py-3 text-sm rounded-xl flex items-center gap-3 transition-colors font-medium ${location.pathname === '/terms' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:bg-slate-800/50 hover:text-slate-300'}`}
              onClick={() => setIsOpen(false)}
            >
              <i className="fas fa-file-contract text-xs"></i> Terms of Use
            </Link>
            <Link 
              to="/contact"
              className={`w-full text-left px-4 py-3 text-sm rounded-xl flex items-center gap-3 transition-colors font-medium ${location.pathname === '/contact' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:bg-slate-800/50 hover:text-slate-300'}`}
              onClick={() => setIsOpen(false)}
            >
              <i className="fas fa-envelope text-xs"></i> Contact
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
