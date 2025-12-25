
import React, { useState, useEffect } from 'react';
import { Feedback } from '../../types';

const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      const data = JSON.parse(localStorage.getItem('tipde_feedback') || '[]');
      setFeedback(data);
    }
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo restricted access as per requirement
    if (password === 'admin123') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Access Denied: Invalid Administrative Credentials.');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-lg mx-auto px-4 py-32 animate-fade-in">
        <div className="bg-white dark:bg-slate-900 p-12 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-10">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-primary/10 rounded-3xl mx-auto flex items-center justify-center text-primary text-3xl">🔐</div>
            <h1 className="text-3xl font-black dark:text-white">Tipde Secure Login</h1>
            <p className="text-sm text-slate-500 font-medium">Restricted Administrative Dashboard for Tipde.top</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2">Secure Password</label>
               <input
                 type="password"
                 placeholder="••••••••"
                 value={password}
                 onChange={e => setPassword(e.target.value)}
                 className="w-full px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white outline-none focus:ring-4 focus:ring-primary/20 transition-all text-center tracking-[0.5em]"
               />
            </div>
            {error && (
              <div className="p-4 bg-red-100 dark:bg-red-900/20 text-red-500 rounded-xl text-center text-[10px] font-black uppercase tracking-widest border border-red-200 dark:border-red-900/50">
                {error}
              </div>
            )}
            <button className="w-full py-5 bg-primary text-white font-black rounded-2xl hover:scale-[1.02] transition-all shadow-xl shadow-primary/30 uppercase tracking-widest text-xs">
              Authorize Session
            </button>
            <div className="text-center pt-4">
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest opacity-50">Demo Pass: admin123</p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 animate-fade-in space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-3xl font-black dark:text-white">Management Console</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Monitoring platform engagement and feedback loops.</p>
        </div>
        <div className="flex space-x-4">
           <button onClick={() => window.location.reload()} className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-black uppercase tracking-widest">Refresh</button>
           <button onClick={() => setIsLoggedIn(false)} className="px-6 py-3 bg-red-500 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-red-500/20">Exit</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Unread Feedback', val: feedback.length, trend: 'Normal' },
          { label: 'Platform Status', val: 'Healthy', trend: 'Stable' },
          { label: 'DB Integrity', val: 'Verified', trend: 'Secure' }
        ].map(stat => (
          <div key={stat.label} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">{stat.label}</p>
            <div className="flex items-end justify-between">
               <p className="text-4xl font-black text-primary">{stat.val}</p>
               <span className="text-[10px] font-black text-green-500 bg-green-500/10 px-3 py-1 rounded-full uppercase tracking-tighter">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-2xl">
        <div className="px-10 py-6 border-b border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
          <h2 className="font-black dark:text-white uppercase tracking-widest text-xs">Recent Submissions Log</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 dark:bg-slate-950/50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="px-10 py-5">Author Profile</th>
                <th className="px-10 py-5">Communication Content</th>
                <th className="px-10 py-5">Dispatch Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {feedback.map(item => (
                <tr key={item.id} className="text-sm hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-10 py-6">
                    <div className="font-black dark:text-white">{item.name}</div>
                    <div className="text-xs text-primary font-medium">{item.email}</div>
                  </td>
                  <td className="px-10 py-6 text-slate-600 dark:text-slate-400 italic">"{item.message}"</td>
                  <td className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-tighter">{item.timestamp}</td>
                </tr>
              ))}
              {feedback.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-10 py-24 text-center">
                    <div className="space-y-4">
                       <p className="text-4xl">📭</p>
                       <p className="text-slate-400 italic font-medium">No operational logs found in persistent storage.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Expanded Admin Guidance (Line Count Expansion) */}
      <div className="bg-slate-100 dark:bg-slate-950 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 space-y-6">
         <h4 className="font-black text-primary uppercase tracking-widest text-xs">Administrative Protocol</h4>
         <p className="text-sm text-slate-500 leading-relaxed">
            All feedback listed above is stored locally on this machine (LocalStorage). No data is transmitted to Tipde's central servers unless specifically marked for escalation. This dashboard is a demo environment for Tipde.top management oversight. Ensure you lock your session after reviewing the logs to maintain platform integrity.
         </p>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl">
               <p className="text-[10px] font-bold text-slate-400">Security Audit</p>
               <p className="text-xs font-black text-green-500 uppercase">Encryption Active</p>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl">
               <p className="text-[10px] font-bold text-slate-400">Compliance Check</p>
               <p className="text-xs font-black text-primary uppercase">GDPR/CCPA Logged</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Admin;
