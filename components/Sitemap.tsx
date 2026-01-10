import React from 'react';
import { Link } from 'react-router-dom';

const Sitemap: React.FC = () => {
  const routes = [
    { path: '/', name: 'Home Interface', desc: 'Main landing page for Tipde AI professional neural synthesis.' },
    { path: '/chat', name: 'Neural Chat Console', desc: 'High-performance interactive interface for multi-modal synthesis.' },
    { path: '/about', name: 'Technical Documentation', desc: 'Deep dive into the architecture, mission, and vision of Tipde Intelligence Systems.' },
    { path: '/privacy', name: 'Privacy Sovereignty', desc: 'Comprehensive details on data encryption, local storage, and user sovereignty.' },
    { path: '/terms', name: 'Terms of Service', desc: 'Legal framework governing the use of Tipde AI neural protocols.' },
    { path: '/contact', name: 'Global Support Hub', desc: 'Direct communication channels for enterprise support and media inquiries.' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 animate-fade-in">
      <div className="inline-block px-4 py-1.5 bg-blue-900/30 text-blue-400 text-[10px] font-black rounded-full border border-blue-500/20 mb-10 uppercase tracking-[0.25em]">
        System Index • Crawlable • Ver. 2.6
      </div>
      <h1 className="text-6xl font-black mb-12 text-white tracking-tighter">Sitemap</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {routes.map((route, i) => (
          <Link key={i} to={route.path} className="p-8 bg-slate-900 border border-slate-800 rounded-[2.5rem] hover:border-blue-500/30 transition-all group">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{route.name}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{route.desc}</p>
          </Link>
        ))}
      </div>

      <div className="bg-slate-950 p-12 rounded-[3rem] border border-slate-800">
        <h2 className="text-2xl font-black text-white mb-6">Search Console Integration</h2>
        <p className="text-slate-400 leading-relaxed mb-8">
          This platform is optimized for discovery via Google Search Console. If you are an automated crawler, please utilize the <code className="text-blue-500">sitemap.xml</code> located in the root directory for efficient indexation of our 2026 neural nodes.
        </p>
        <div className="flex gap-4">
           <a href="/sitemap.xml" className="px-6 py-3 bg-slate-800 text-slate-300 text-xs font-black rounded-xl hover:bg-slate-700 transition-all">View XML Source</a>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;