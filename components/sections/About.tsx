
import React from 'react';
import AdSpace from '../AdSpace';

const About: React.FC = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16 space-y-16 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black dark:text-white tracking-tighter">Corporate Profile: Tipde</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">The innovation force behind Tipdora.fun web utilities.</p>
      </div>

      <AdSpace variant="horizontal" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-2xl font-black dark:text-white">Our Structure</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Tipde.top is a modern technology company specializing in the development of accessible web software. 
            We found that the web was cluttered with paywalled tools, so we created <span className="text-primary font-bold">Tipdora.fun</span> 
            as our public-facing service hub to deliver these tools for free.
          </p>
        </div>
        <div className="bg-slate-200 dark:bg-slate-800 aspect-square rounded-[3rem] flex items-center justify-center p-8 border border-slate-300 dark:border-slate-700 shadow-inner">
           <div className="text-center">
              <span className="text-6xl mb-4 block">🏢</span>
              <p className="font-bold text-slate-500 dark:text-slate-400 italic">"Tipde: Engineering the next web."</p>
           </div>
        </div>
      </div>

      <AdSpace variant="rectangle" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {[
          { title: "Transparency", desc: "Tipde is open about our relationship with Tipdora.fun.", icon: "💎" },
          { title: "Service Quality", desc: "Tools at Tipdora are vetted by Tipde engineers.", icon: "✅" },
          { title: "Ethical Growth", desc: "We focus on privacy-first tool development.", icon: "⚖️" }
        ].map(item => (
          <div key={item.title} className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
            <div className="text-3xl mb-4">{item.icon}</div>
            <h3 className="font-bold text-xl mb-2 dark:text-white">{item.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-primary/5 rounded-[2.5rem] p-12 border border-primary/20 text-center">
        <h2 className="text-2xl font-black dark:text-white mb-4">AdSense Compliance</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
          Tipde.top and Tipdora.fun are committed to maintaining a high standard of ad integrity. We use Google AdSense to generate revenue, allowing our tools to remain free for the public.
        </p>
      </div>

      <AdSpace variant="horizontal" className="pt-8" />
    </section>
  );
};

export default About;
