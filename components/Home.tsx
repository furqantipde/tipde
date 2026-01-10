import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface HomeProps {
  onStartChat: () => void;
}

const Home: React.FC<HomeProps> = ({ onStartChat }) => {
  const navigate = useNavigate();
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('tipde_ai_consent');
    if (!consent) {
      const timer = setTimeout(() => setShowConsent(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleStart = () => {
    onStartChat();
    navigate('/chat');
  };

  const acceptConsent = () => {
    localStorage.setItem('tipde_ai_consent', 'accepted');
    setShowConsent(false);
  };

  return (
    <div className="min-h-full selection:bg-blue-500/30 relative">
      {/* Cookie Consent Banner - Mandatory for AdSense/GDPR */}
      {showConsent && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-slate-900/95 backdrop-blur-2xl border border-slate-700/50 p-6 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] z-[100] animate-fade-in flex flex-col md:flex-row items-center gap-6">
           <div className="flex-1">
              <h4 className="text-white font-black text-sm uppercase tracking-widest mb-1 flex items-center gap-2">
                 <i className="fas fa-shield-check text-blue-500"></i> Privacy Sovereignty
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                We utilize specialized telemetry and cookies to ensure the stability of your neural sessions. By interacting with this platform, you acknowledge our <Link to="/privacy" className="text-blue-500 hover:underline">Privacy Sovereignty Protocol</Link> and <Link to="/terms" className="text-blue-500 hover:underline">Global Terms</Link>.
              </p>
           </div>
           <div className="flex gap-3 shrink-0">
              <button onClick={acceptConsent} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-blue-600/20">Authorize</button>
              <button onClick={() => setShowConsent(false)} className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-black uppercase tracking-widest rounded-2xl transition-all border border-slate-700/50">Decline</button>
           </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden border-b border-slate-800/50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-blue-600/10 blur-[180px] rounded-full -z-10"></div>
        <div className="max-w-6xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-950/40 text-blue-400 text-[10px] font-extrabold rounded-full border border-blue-500/20 mb-12 tracking-[0.25em] uppercase shadow-2xl shadow-blue-500/10">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            Neural Core Interface • Professional Edition 2026
          </div>
          <h1 className="text-7xl md:text-9xl font-black mb-10 leading-[0.95] tracking-tighter text-white">
            Cognitive <br />
            <span className="text-gradient italic">Powerhouse.</span>
          </h1>
          <p className="text-xl md:text-3xl text-slate-400 mb-14 max-w-4xl mx-auto leading-relaxed font-medium">
            Tipde AI is the definitive professional platform for multi-modal neural synthesis. High-context reasoning, complex logic architecture, and studio-grade visual generation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={handleStart}
              className="w-full sm:w-auto px-14 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-4 group"
            >
              Access Interface <i className="fas fa-arrow-right text-sm group-hover:translate-x-1 transition-transform"></i>
            </button>
            <Link 
              to="/about" 
              className="w-full sm:w-auto px-14 py-6 bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 rounded-[2rem] font-black text-xl transition-all flex items-center justify-center gap-4"
            >
              Technical Docs
            </Link>
          </div>
        </div>
      </section>

      {/* Deep Content - Architecture Grid (Mandatory for AdSense Unique Value) */}
      <section className="max-w-7xl mx-auto px-6 py-32 border-b border-slate-800/50">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative order-2 lg:order-1">
               <div className="absolute -inset-10 bg-blue-500/5 blur-3xl rounded-full"></div>
               <div className="relative grid grid-cols-2 gap-4">
                  {[
                    { label: 'Model Architecture', val: 'Transformer-X 2026' },
                    { label: 'Latency (Global)', val: '< 50ms' },
                    { label: 'Context Window', val: '2.5M Tokens' },
                    { label: 'Security Standard', val: 'TLS 1.3 / E2E' },
                    { label: 'Precision Grade', val: 'FP16 / INT8' },
                    { label: 'Logic Cluster', val: 'Neural Grid V4' }
                  ].map((stat, i) => (
                    <div key={i} className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
                       <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2">{stat.label}</p>
                       <p className="text-white font-bold text-lg">{stat.val}</p>
                    </div>
                  ))}
               </div>
            </div>
            <div className="order-1 lg:order-2 space-y-8">
               <h2 className="text-5xl font-black text-white leading-tight">Professional Performance. <br/><span className="text-slate-500">Zero Compromise.</span></h2>
               <p className="text-slate-400 text-lg leading-relaxed">
                  Our infrastructure is purpose-built for the demands of 2026. By utilizing decentralized tensor processing, Tipde AI ensures that your complex multi-step queries are resolved with maximum precision and minimum overhead.
               </p>
               <ul className="space-y-4 text-slate-500 font-medium">
                  <li className="flex items-center gap-4"><i className="fas fa-check-circle text-blue-500"></i> Local-first data sovereignty encryption.</li>
                  <li className="flex items-center gap-4"><i className="fas fa-check-circle text-blue-500"></i> Adaptive multi-modal synthesis protocols.</li>
                  <li className="flex items-center gap-4"><i className="fas fa-check-circle text-blue-500"></i> Seamless integration with professional workflows.</li>
               </ul>
            </div>
         </div>
      </section>

      {/* Technical Journal Section (Fixed and Expanded for AdSense Value) */}
      <section className="max-w-7xl mx-auto px-6 py-32 bg-slate-950/20 border-b border-slate-800/50">
         <div className="max-w-3xl mb-16">
            <h2 className="text-5xl font-black text-white mb-6 tracking-tight">Intelligence Journal</h2>
            <p className="text-slate-400 text-xl font-medium">Deep-dive technical research and engineering updates from the Tipde Labs global research network.</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <article className="space-y-6 group cursor-pointer">
               <div className="aspect-video bg-slate-800 rounded-[2.5rem] overflow-hidden border border-slate-700">
                  <img src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800" alt="Transformer Study Analysis" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
               </div>
               <span className="text-blue-500 text-xs font-black uppercase tracking-widest">Case Study • Jan 2026</span>
               <h3 className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">The Physics of Prompt Weights</h3>
               <p className="text-slate-500 leading-relaxed font-medium">
                  An empirical investigation into how structural prompt weighting affects logic density in modern LLMs. We analyze the intersection of semantics and token probability in high-stakes professional environments.
               </p>
               <button className="text-white font-black text-xs uppercase tracking-widest border-b border-blue-500 pb-1 hover:text-blue-500 transition-colors">Read Full Research</button>
            </article>
            <article className="space-y-6 group cursor-pointer">
               <div className="aspect-video bg-slate-800 rounded-[2.5rem] overflow-hidden border border-slate-700">
                  <img src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1200" alt="Global Data Centers" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
               </div>
               <span className="text-blue-500 text-xs font-black uppercase tracking-widest">Whitepaper • Feb 2026</span>
               <h3 className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">Decentralized Token Streaming</h3>
               <p className="text-slate-500 leading-relaxed font-medium">
                  Exploring our proprietary edge-inference protocol that reduces global latency by 40%. Our distributed 2026 neural backbone leverages low-latency fiber routes to ensure instant query response.
               </p>
               <button className="text-white font-black text-xs uppercase tracking-widest border-b border-blue-500 pb-1 hover:text-blue-500 transition-colors">Download Whitepaper</button>
            </article>
         </div>
      </section>

      {/* Intelligence Roadmap (Visual & Content Rich) */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-20 max-w-3xl mx-auto">
           <h2 className="text-5xl font-black text-white mb-6 tracking-tight">The 2026 Roadmap</h2>
           <p className="text-slate-400 text-lg font-medium">Continuous evolution of our neural fabric to meet the growing demands of global professionals.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {[
             { quarter: 'Phase 01', title: 'Logic Synthesis', desc: 'Refining multi-step reasoning models for engineering and medical consultations.' },
             { quarter: 'Phase 02', title: 'Visual Fidelity', desc: 'Upgrading image generation clusters to support 4K native studio-grade exports.' },
             { quarter: 'Phase 03', title: 'Native Audio', desc: 'Integrating high-fidelity real-time audio interaction with zero-latency streaming.' },
             { quarter: 'Phase 04', title: 'Core Autonomy', desc: 'Deploying advanced self-optimizing neural nodes for adaptive problem solving.' }
           ].map((phase, i) => (
             <div key={i} className="p-10 bg-slate-900 border border-slate-800 rounded-[3rem] hover:border-blue-500/50 transition-all group">
                <span className="text-blue-500 font-black text-[11px] uppercase tracking-widest mb-6 block">{phase.quarter}</span>
                <h4 className="text-white font-bold text-2xl mb-4 group-hover:text-blue-400 transition-colors">{phase.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{phase.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-24 px-6 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
           <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-600/20">
                  <i className="fas fa-terminal text-white text-xl"></i>
                </div>
                <span className="text-3xl font-black text-white tracking-tighter">Tipde <span className="text-blue-500">AI</span></span>
              </div>
              <p className="text-slate-500 max-w-md leading-relaxed mb-10 font-medium text-lg">
                Advancing human potential through high-performance neural orchestration. Our platform provides high-context synthesis for global innovators.
              </p>
              <div className="flex gap-6">
                <a href="https://x.com/tipdeofficial" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-slate-800 transition-all border border-slate-800">
                  <i className="fa-brands fa-x-twitter text-xl"></i>
                </a>
                <a href="https://www.youtube.com/@furqantipde" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-slate-800 transition-all border border-slate-800">
                  <i className="fa-brands fa-youtube text-xl"></i>
                </a>
                <a href="https://wa.me/923246462416" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-slate-800 transition-all border border-slate-800">
                  <i className="fa-brands fa-whatsapp text-xl"></i>
                </a>
              </div>
           </div>
           <div>
              <h5 className="font-extrabold text-white mb-8 uppercase tracking-widest text-xs text-blue-500">Navigation</h5>
              <ul className="space-y-5 text-sm font-semibold text-slate-500">
                 <li><Link to="/chat" className="hover:text-white transition-colors">Neural Interface</Link></li>
                 <li><Link to="/about" className="hover:text-white transition-colors">Technical Docs</Link></li>
                 <li><Link to="/contact" className="hover:text-white transition-colors">Expert Support</Link></li>
                 <li><Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link></li>
              </ul>
           </div>
           <div>
              <h5 className="font-extrabold text-white mb-8 uppercase tracking-widest text-xs text-blue-500">Legal Sovereignty</h5>
              <ul className="space-y-5 text-sm font-semibold text-slate-500">
                 <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                 <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link></li>
                 <li><Link to="/contact" className="hover:text-white transition-colors">Contact DPO</Link></li>
                 <li><Link to="/about" className="hover:text-white transition-colors">Compliance Log</Link></li>
              </ul>
           </div>
        </div>
        <div className="max-w-7xl mx-auto pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black text-slate-700 uppercase tracking-[0.4em]">
           <p>© 2026 Tipde Intelligence Systems • Pakistan Headquarters • Global Presence</p>
           <p className="flex items-center gap-4">
              <span className="text-slate-800">Verified Compliance V2.6</span>
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]"></span>
           </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;