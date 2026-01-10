
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
  showMenuButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, showMenuButton = false }) => {
  const location = useLocation();

  return (
    <header className="h-20 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between z-30 sticky top-0 backdrop-blur-md bg-slate-900/90">
      <div className="flex items-center gap-4">
        {showMenuButton && (
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-3 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700"
          >
            <i className="fas fa-bars-staggered text-xl"></i>
          </button>
        )}
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity group">
          <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform border border-blue-400/20">
            <i className="fas fa-terminal text-white text-xl"></i>
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">Tipde <span className="text-blue-500">AI</span></span>
        </Link>
      </div>

      <nav className="hidden md:flex items-center gap-10">
        <Link 
          to="/" 
          className={`text-xs font-black uppercase tracking-widest transition-all ${location.pathname === '/' ? 'text-blue-500 border-b-2 border-blue-500 pb-1' : 'text-slate-500 hover:text-slate-100 pb-1 border-b-2 border-transparent'}`}
        >
          Home
        </Link>
        <Link 
          to="/chat" 
          className={`text-xs font-black uppercase tracking-widest transition-all ${location.pathname === '/chat' ? 'text-blue-500 border-b-2 border-blue-500 pb-1' : 'text-slate-500 hover:text-slate-100 pb-1 border-b-2 border-transparent'}`}
        >
          Explore Chat
        </Link>
        <Link 
          to="/about" 
          className={`text-xs font-black uppercase tracking-widest transition-all ${location.pathname === '/about' ? 'text-blue-500 border-b-2 border-blue-500 pb-1' : 'text-slate-500 hover:text-slate-100 pb-1 border-b-2 border-transparent'}`}
        >
          Docs
        </Link>
        <Link 
          to="/contact" 
          className={`text-xs font-black uppercase tracking-widest transition-all ${location.pathname === '/contact' ? 'text-blue-500 border-b-2 border-blue-500 pb-1' : 'text-slate-500 hover:text-slate-100 pb-1 border-b-2 border-transparent'}`}
        >
          Contact
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <div className="hidden sm:block h-8 w-[1px] bg-slate-800 mx-2"></div>
        <div className="flex items-center gap-2 px-5 py-2 bg-slate-800/50 text-slate-400 text-[10px] font-black tracking-widest uppercase rounded-full border border-slate-700">
           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
           SYSTEM ONLINE
        </div>
      </div>
    </header>
  );
};

export default Header;
