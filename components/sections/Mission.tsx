
import React from 'react';
import { MISSION_TEXT, REPEATED_LEGAL_CONTENT } from '../../constants';
import AdSpace from '../AdSpace';

const Mission: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 animate-fade-in space-y-20">
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-[0.2em] uppercase">
          Vission & Values
        </div>
        <h1 className="text-6xl font-black dark:text-white tracking-tighter">The Tipde Mission</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 font-medium">
          Advancing digital freedom through transparent engineering.
        </p>
      </div>

      <div dangerouslySetInnerHTML={{ __html: MISSION_TEXT }} />

      <AdSpace variant="rectangle" />

      <div className="space-y-10">
        <div className="text-center">
          <h2 className="text-3xl font-black dark:text-white">Why It Matters</h2>
          <p className="text-slate-500 mt-2">Our commitment to AdSense compliance and user safety.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="p-8 bg-slate-50 dark:bg-[#020617] rounded-[2rem] border border-slate-200 dark:border-slate-800">
             <h4 className="font-black text-primary mb-4 text-xs uppercase tracking-widest">Accessibility</h4>
             <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Tipde ensures that every line of code in Tipdora tools is optimized for screen readers.</p>
           </div>
           <div className="p-8 bg-slate-50 dark:bg-[#020617] rounded-[2rem] border border-slate-200 dark:border-slate-800">
             <h4 className="font-black text-primary mb-4 text-xs uppercase tracking-widest">Sustainability</h4>
             <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Our revenue model is built for longevity. AdSense allows us to pay for global servers.</p>
           </div>
           <div className="p-8 bg-slate-50 dark:bg-[#020617] rounded-[2rem] border border-slate-200 dark:border-slate-800">
             <h4 className="font-black text-primary mb-4 text-xs uppercase tracking-widest">Trust</h4>
             <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">We are open about our data handling. If a tool doesn't need the server, it never touches the server.</p>
           </div>
        </div>
      </div>

      <AdSpace variant="horizontal" className="pt-8" />

      {/* Repeating content for SEO/AdSense volume */}
      <div className="pt-20 border-t border-slate-200 dark:border-slate-800">
         <h3 className="text-2xl font-black dark:text-white mb-10 text-center">Extended Compliance Documentation</h3>
         <div className="opacity-60 grayscale hover:grayscale-0 transition-all">
            <div dangerouslySetInnerHTML={{ __html: REPEATED_LEGAL_CONTENT }} />
         </div>
      </div>

      <AdSpace variant="rectangle" className="pb-20" />
    </div>
  );
};

export default Mission;
