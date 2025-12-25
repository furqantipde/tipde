
import React from 'react';
import { TOOLS } from '../../constants';
import AdSpace from '../AdSpace';

const Home: React.FC = () => {
  const featured = TOOLS.slice(0, 4);

  return (
    <div className="space-y-24 pb-20 animate-fade-in">
      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden px-4 pt-16 lg:pt-32">
        <div className="max-w-7xl mx-auto text-center space-y-10 relative z-10">
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-primary/10 text-primary text-[11px] font-black tracking-[0.25em] uppercase">
            🚀 Tipde Company | Engineering Excellence
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter">
            Digital Tools <br />
            by <span className="text-primary italic">Tipde.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            Tipde is the specialized firm powering the high-utility <span className="text-primary font-bold">Tipdora.fun</span> ecosystem. 
            Free, transparent, and built for modern creators.
          </p>
          <div className="flex flex-wrap justify-center gap-5 pt-4">
            <a href="#tools" className="px-12 py-5 bg-primary text-white font-black rounded-3xl hover:scale-105 transition-transform shadow-2xl shadow-primary/40 text-sm uppercase tracking-wider">
              Explore Tools
            </a>
            <a href="#mission" className="px-12 py-5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-black rounded-3xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all text-sm uppercase tracking-wider">
              The Mission
            </a>
          </div>
        </div>
        
        {/* Background Visuals */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-0 opacity-40 pointer-events-none">
          <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[140px]" />
          <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[160px]" />
        </div>
      </section>

      {/* AdSense Block 1 */}
      <AdSpace variant="horizontal" className="my-10" />

      {/* Corporate Strategy Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((tool) => (
            <a key={tool.id} href="#tools" className="group p-10 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 hover:shadow-[0_40px_80px_-20px_rgba(77,166,255,0.2)] hover:-translate-y-2 transition-all duration-500">
              <div className="w-16 h-16 text-4xl flex items-center justify-center bg-slate-50 dark:bg-[#020617] rounded-3xl mb-8 group-hover:bg-primary/10 transition-colors shadow-sm">
                {tool.icon}
              </div>
              <h3 className="text-xl font-black mb-4 dark:text-white group-hover:text-primary transition-colors">{tool.name}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                {tool.description}
              </p>
              <div className="mt-8 flex items-center text-primary text-[11px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                Launch Service &rarr;
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* AdSense Block 2 - Middle Section */}
      <AdSpace variant="horizontal" className="my-12" />

      {/* Trust Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-primary rounded-[4rem] p-16 md:p-24 text-white flex flex-col md:flex-row items-center justify-between gap-16 relative overflow-hidden shadow-2xl shadow-primary/30">
          <div className="space-y-8 relative z-10 text-center md:text-left max-w-xl">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none">Built for <br /> Creators by <br /> Engineers.</h2>
            <p className="text-blue-100 text-lg font-medium">Tipde handles the server-side architecture so Tipdora.fun can deliver a flawless frontend experience.</p>
          </div>
          <div className="grid grid-cols-2 gap-12 relative z-10">
            <div className="text-center">
              <p className="text-6xl font-black">25+</p>
              <p className="text-[11px] uppercase font-black tracking-[0.25em] text-blue-200 mt-2">Verified Tools</p>
            </div>
            <div className="text-center">
              <p className="text-6xl font-black">50k</p>
              <p className="text-[11px] uppercase font-black tracking-[0.25em] text-blue-200 mt-2">Daily Tasks</p>
            </div>
          </div>
          <div className="absolute right-0 top-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
        </div>
      </section>

      {/* AdSense Block 3 - Bottom Page */}
      <AdSpace variant="rectangle" className="my-16" />

      {/* Detailed Philosophy */}
      <section className="max-w-4xl mx-auto px-4 space-y-10 text-center">
         <h3 className="text-3xl font-black dark:text-white">The Tipde Transparency Mandate</h3>
         <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
            Tipde.top is more than a tool hub. We are a statement for a cleaner web. By utilizing non-intrusive AdSense integration and client-side processing, we bridge the gap between commercial sustainability and user privacy.
         </p>
         <div className="p-1 border border-slate-200 dark:border-slate-800 rounded-[2rem]">
            <div className="bg-slate-100 dark:bg-slate-900 rounded-[1.8rem] p-8">
               <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Company Core Values</p>
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-6">
                  <div><span className="text-2xl block mb-2">⚡</span><p className="font-bold text-sm">Speed</p></div>
                  <div><span className="text-2xl block mb-2">🔒</span><p className="font-bold text-sm">Privacy</p></div>
                  <div><span className="text-2xl block mb-2">💎</span><p className="font-bold text-sm">Clarity</p></div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;
