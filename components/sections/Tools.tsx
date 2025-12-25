
import React, { useState, useMemo } from 'react';
import { TOOLS } from '../../constants';
import { Tool } from '../../types';
import AdSpace from '../AdSpace';

const Tools: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Text' | 'SEO' | 'Dev' | 'Images' | 'Other'>('All');
  const [search, setSearch] = useState('');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const categories = ['All', 'Text', 'SEO', 'Dev', 'Images', 'Other'];

  const filtered = useMemo(() => {
    return TOOLS.filter(t => {
      const matchCat = filter === 'All' || t.category === filter;
      const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || 
                          t.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [filter, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-12 animate-fade-in relative">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-5xl font-black dark:text-white tracking-tighter">Tipdora Utility Hub</h1>
        <p className="text-slate-600 dark:text-slate-400 font-medium">Professional-grade web tools, optimized by Tipde engineering.</p>
      </div>

      <AdSpace variant="horizontal" className="pb-4" />

      {/* Navigation Controls */}
      <div className="sticky top-20 z-40 flex flex-col md:flex-row gap-6 items-center justify-between bg-white dark:bg-[#020617] p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-md bg-white/80 dark:bg-slate-900/80">
        <div className="flex flex-wrap justify-center md:justify-start gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-6 py-2 rounded-2xl text-[11px] font-black tracking-widest uppercase transition-all ${
                filter === cat 
                  ? 'bg-primary text-white shadow-lg shadow-primary/40' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="w-full md:w-80 relative">
          <input 
            type="text" 
            placeholder="Search 25+ tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#020617] dark:text-white outline-none focus:ring-2 focus:ring-primary transition-all text-sm font-medium"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40">🔍</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {filtered.map((tool, index) => (
          <React.Fragment key={tool.id}>
            <div 
              onClick={() => setSelectedTool(tool)}
              className="group p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] hover:border-primary/50 hover:shadow-2xl hover:-translate-y-1 transition-all flex flex-col cursor-pointer"
            >
              <div className="w-14 h-14 text-3xl flex items-center justify-center bg-slate-50 dark:bg-[#020617] rounded-2xl mb-6 group-hover:scale-110 transition-transform shadow-sm">
                {tool.icon}
              </div>
              <h3 className="text-lg font-black mb-2 dark:text-white group-hover:text-primary transition-colors">{tool.name}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed flex-grow">
                {tool.description}
              </p>
              <div className="mt-6 pt-4 border-t border-slate-50 dark:border-slate-800">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary opacity-60 group-hover:opacity-100 transition-opacity">
                   Open Utility &rarr;
                 </span>
              </div>
            </div>
            {/* Inject an ad after every 10 tools */}
            {(index + 1) % 10 === 0 && (
              <div className="col-span-full py-8">
                <AdSpace variant="horizontal" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <AdSpace variant="rectangle" className="pt-12" />

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-32 bg-slate-100 dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-5xl mb-6">🏜️</p>
          <p className="text-xl font-black dark:text-white">No tools match your criteria</p>
        </div>
      )}

      {/* Tool Modal Placeholder */}
      {selectedTool && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden border border-white/10 ring-1 ring-white/10">
            <div className="px-10 py-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
              <div className="flex items-center space-x-4">
                <span className="text-4xl">{selectedTool.icon}</span>
                <div>
                  <h2 className="text-2xl font-black dark:text-white">{selectedTool.name}</h2>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{selectedTool.category} Tool • Powered by Tipde</p>
                </div>
              </div>
              <button onClick={() => setSelectedTool(null)} className="p-3 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">✕</button>
            </div>
            <div className="p-10 space-y-8">
              <AdSpace variant="horizontal" className="!px-0" />
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">{selectedTool.description}</p>
              <div className="py-16 flex flex-col items-center justify-center space-y-6 bg-slate-50 dark:bg-[#020617] rounded-[2.5rem] border border-dashed border-slate-200 dark:border-slate-800">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl animate-pulse">⚙️</div>
                <button className="px-8 py-3 bg-primary text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/30">Start Task</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tools;
