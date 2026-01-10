
import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 animate-fade-in">
      <div className="inline-block px-4 py-1.5 bg-emerald-900/30 text-emerald-400 text-[10px] font-black rounded-full border border-emerald-500/20 mb-10 uppercase tracking-[0.25em]">
        Verified Sovereignty Protocol • v2.6.0
      </div>
      <h1 className="text-5xl md:text-6xl font-black mb-12 text-white tracking-tighter">Privacy Sovereignty Policy</h1>
      
      <div className="space-y-12 text-slate-400 leading-relaxed text-lg font-medium">
        <section className="p-8 bg-slate-900/50 rounded-[2.5rem] border border-slate-800 shadow-2xl">
          <p className="text-xl text-slate-200">
            At Tipde AI, we recognize that privacy is a fundamental human right. In the 2026 digital landscape, data has become the most valuable personal asset. Our platform is engineered to ensure that you retain absolute control over your information.
          </p>
        </section>
        
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-4">
             <i className="fas fa-server text-blue-500 text-xl"></i> 1. Local-First Persistence
          </h2>
          <p>
            Unlike traditional cloud-based AI services, Tipde AI utilizes a "Local-First" persistence model. Your chat history, session tokens, and specific preferences are stored exclusively within your browser's encrypted local storage (IndexedDB). We do not maintain centralized databases of your personal conversations, ensuring that your logic and creativity remain your own.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-4">
             <i className="fas fa-tunnel text-blue-500 text-xl"></i> 2. Neural Transmissions
          </h2>
          <p>
            When you initiate a query, your input is transmitted via a high-security SSL/TLS 1.3 tunnel to the Gemini API nodes for processing. This data is handled according to enterprise-grade privacy standards. We do not use your inputs to train public baseline models without your explicit opt-in via professional contribution programs.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-4">
             <i className="fas fa-cookie-bite text-blue-500 text-xl"></i> 3. Advertising & Cookies
          </h2>
          <p>
            To provide this professional-grade interface free of charge, Tipde AI utilizes advertising partners, including Google AdSense. These partners may use specialized identifiers (DART cookies) to serve relevant content based on your browsing patterns. You can manage these preferences via <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Google Ad Settings</a>.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-4">
             <i className="fas fa-user-gear text-blue-500 text-xl"></i> 4. User Rights
          </h2>
          <p>
            You have the absolute right to purge your neural history at any time using the "Reset System" command in the sidebar. This action immediately deletes all locally stored sessions.
          </p>
        </section>

        <div className="bg-slate-900 border border-slate-800 p-10 rounded-[3rem] text-center">
           <p className="text-sm text-slate-500 mb-6">For comprehensive privacy inquiries, contact our Data Sovereignty Officer:</p>
           <a href="mailto:fchattha206@gmail.com" className="text-white font-black text-xl hover:text-blue-500 transition-colors tracking-tight">fchattha206@gmail.com</a>
        </div>
      </div>
      
      <div className="mt-20 pt-10 border-t border-slate-900 flex justify-between items-center text-[10px] font-black text-slate-600 uppercase tracking-widest">
         <span>Tipde Intelligence Systems</span>
         <span>2026 Compliance Verified</span>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
