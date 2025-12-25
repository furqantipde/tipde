
import React from 'react';

interface AdSpaceProps {
  variant?: 'horizontal' | 'rectangle' | 'square';
  className?: string;
}

const AdSpace: React.FC<AdSpaceProps> = ({ variant = 'horizontal', className = '' }) => {
  const heightClass = variant === 'horizontal' ? 'h-32 md:h-40' : variant === 'rectangle' ? 'h-64' : 'h-80';
  
  return (
    <div className={`w-full max-w-5xl mx-auto px-4 ${className}`}>
      <div className={`bg-slate-100 dark:bg-slate-900/50 rounded-[2.5rem] ${heightClass} flex flex-col items-center justify-center border border-slate-200 dark:border-slate-800 relative overflow-hidden group transition-all hover:border-primary/30`}>
        <div className="absolute top-2 right-4 flex items-center space-x-1">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sponsored</span>
          <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-pulse"></div>
        </div>
        
        <div className="text-center space-y-3 px-6">
          <div className="inline-block px-4 py-1.5 bg-slate-200 dark:bg-slate-800 rounded-full">
            <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest">Advertisement Placeholder</p>
          </div>
          <p className="text-xs text-slate-400 italic font-medium max-w-md">
            Tipde uses targeted AdSense integration to provide professional tools at Tipdora.fun free of charge.
          </p>
        </div>
        
        {/* Animated shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-in-out" />
      </div>
    </div>
  );
};

export default AdSpace;
