
import React, { useState, useEffect } from 'react';

const CookieBanner: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAction = (type: 'accept' | 'decline') => {
    localStorage.setItem('cookie-consent', type);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 animate-bounce-in">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-1">We value your privacy</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies in accordance with our <a href="#legal" className="text-primary hover:underline">Privacy Policy</a>.
          </p>
        </div>
        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => handleAction('decline')}
            className="px-6 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
          >
            Reject Non-Essential
          </button>
          <button
            onClick={() => handleAction('accept')}
            className="px-6 py-2 text-sm font-medium bg-primary text-white hover:bg-blue-600 rounded-xl transition-all shadow-lg shadow-primary/20"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
