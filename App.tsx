
import React, { useState, useEffect } from 'react';
import { View } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import Home from './components/sections/Home';
import About from './components/sections/About';
import Mission from './components/sections/Mission';
import Tools from './components/sections/Tools';
import Contact from './components/sections/Contact';
import Admin from './components/sections/Admin';
import Legal from './components/sections/Legal';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Apply dark mode class to root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Handle Hash Routing & Smooth Scrolling
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as View;
      const validViews: View[] = ['home', 'about', 'mission', 'tools', 'contact', 'admin', 'legal'];
      
      if (validViews.includes(hash)) {
        setView(hash);
        // Ensure smooth transition to top of page
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        // Default behavior for root or unknown hashes
        if (!window.location.hash || window.location.hash === '#') {
          setView('home');
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check on load

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderView = () => {
    return (
      <div className="view-enter">
        {(() => {
          switch (view) {
            case 'home': return <Home />;
            case 'about': return <About />;
            case 'mission': return <Mission />;
            case 'tools': return <Tools />;
            case 'contact': return <Contact />;
            case 'admin': return <Admin />;
            case 'legal': return <Legal />;
            default: return <Home />;
          }
        })()}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/30">
      <Navbar currentView={view} darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="flex-grow pt-16">
        {renderView()}
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default App;
