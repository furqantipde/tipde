
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-16 px-4 transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <h3 className="text-2xl font-black text-primary">Tipde.top</h3>
          <p className="text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
            The engineering firm behind <span className="font-bold text-slate-900 dark:text-white">Tipdora.fun</span>. 
            We provide professional-grade, browser-based tools for modern creators. 
            Committed to ethics, transparency, and the AdSense program.
          </p>
          <div className="flex space-x-6">
            <a href="https://x.com/tipdeofficial" target="_blank" className="text-slate-400 hover:text-primary transition-colors">Twitter</a>
            <a href="https://youtube.com/@furqantipde" target="_blank" className="text-slate-400 hover:text-red-500 transition-colors">YouTube</a>
          </div>
        </div>
        <div>
          <h4 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-6">Internal</h4>
          <ul className="space-y-3 text-sm font-medium text-slate-600 dark:text-slate-400">
            <li><a href="#home" className="hover:text-primary transition-colors">Tipde Home</a></li>
            <li><a href="#about" className="hover:text-primary transition-colors">Company Profile</a></li>
            <li><a href="#mission" className="hover:text-primary transition-colors">Our Mission</a></li>
            <li><a href="#tools" className="hover:text-primary transition-colors">Tipdora Service</a></li>
            <li><a href="#contact" className="hover:text-primary transition-colors">Contact Support</a></li>
            <li><a href="#admin" className="text-slate-300 dark:text-slate-800 hover:text-slate-400 text-[10px]">Admin Access</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-6">Transparency</h4>
          <ul className="space-y-3 text-sm font-medium text-slate-600 dark:text-slate-400">
            <li><a href="#legal" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#legal" className="hover:text-primary transition-colors">Cookie Management</a></li>
            <li><a href="#legal" className="hover:text-primary transition-colors">Terms of Service</a></li>
            <li><a href="#legal" className="hover:text-primary transition-colors">AdSense Disclosure</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          © {new Date().getFullYear()} Tipde Company. All Tipdora services are managed by Tipde.top
        </p>
      </div>
    </footer>
  );
};

export default Footer;
