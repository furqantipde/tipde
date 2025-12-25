
import React, { useState } from 'react';
import { Feedback } from '../../types';
import AdSpace from '../AdSpace';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const validate = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (formData.name.trim().length < 2) {
      newErrors.name = 'Full name must be at least 2 characters.';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid professional email address.';
      isValid = false;
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = 'Inquiry message must be at least 10 characters long.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    setTimeout(() => {
      try {
        const existing: Feedback[] = JSON.parse(localStorage.getItem('tipde_feedback') || '[]');
        const newFeedback: Feedback = {
          ...formData,
          id: `f-${Date.now()}`,
          timestamp: new Date().toLocaleString()
        };
        localStorage.setItem('tipde_feedback', JSON.stringify([...existing, newFeedback]));
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } catch (err) {
        setStatus('error');
      }
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 animate-fade-in space-y-20">
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <h1 className="text-5xl font-black dark:text-white tracking-tighter leading-tight">Communication Gateway</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
          Professional support for Tipdora.fun and corporate inquiries for Tipde.top.
        </p>
      </div>

      <AdSpace variant="horizontal" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
        <div className="lg:col-span-2 space-y-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-black dark:text-white uppercase tracking-widest text-xs text-primary">Global Presence</h3>
            <div className="space-y-4">
               <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">📍</div>
                  <div>
                    <p className="font-black dark:text-white">Tipde Cloud HQ</p>
                    <p className="text-slate-500 text-sm mt-1">Managed from our central digital hub.</p>
                  </div>
               </div>
            </div>
          </div>

          <AdSpace variant="rectangle" className="!px-0" />

          <div className="p-8 bg-slate-100 dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
             <h4 className="font-black text-[10px] uppercase tracking-widest text-slate-400 mb-4">AdSense & Policy Note</h4>
             <p className="text-xs text-slate-500 leading-relaxed">
               By contacting us, you acknowledge our data processing policy. Tipde Company never shares user communications with third-party advertisers.
             </p>
          </div>
        </div>

        <div className="lg:col-span-3 bg-white dark:bg-slate-900 p-10 md:p-14 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl relative overflow-hidden transition-all duration-500">
          {status === 'success' ? (
            <div className="h-[450px] flex flex-col items-center justify-center text-center space-y-8 animate-bounce-in">
              <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-[2rem] flex items-center justify-center text-5xl">✓</div>
              <h2 className="text-3xl font-black dark:text-white tracking-tight">Transmission Successful</h2>
              <button onClick={() => setStatus('idle')} className="text-primary font-black uppercase tracking-widest text-xs hover:bg-primary/10 px-6 py-2 rounded-full transition-all">New Transmission</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-4">Full Name</label>
                  <input name="name" required type="text" value={formData.name} onChange={handleInputChange} className={`w-full px-8 py-5 rounded-3xl border ${errors.name ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'} bg-slate-50 dark:bg-[#020617] dark:text-white outline-none focus:ring-4 focus:ring-primary/10 transition-all`} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-4">Email Address</label>
                  <input name="email" required type="email" value={formData.email} onChange={handleInputChange} className={`w-full px-8 py-5 rounded-3xl border ${errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'} bg-slate-50 dark:bg-[#020617] dark:text-white outline-none focus:ring-4 focus:ring-primary/10 transition-all`} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-4">Inquiry Message</label>
                <textarea name="message" required rows={6} value={formData.message} onChange={handleInputChange} className={`w-full px-8 py-6 rounded-[2rem] border ${errors.message ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'} bg-slate-50 dark:bg-[#020617] dark:text-white outline-none focus:ring-4 focus:ring-primary/10 transition-all resize-none`} />
              </div>
              <button disabled={status === 'sending'} type="submit" className="group w-full py-6 bg-primary text-white font-black rounded-3xl hover:bg-blue-600 transition-all shadow-xl shadow-primary/30 uppercase tracking-widest text-xs flex items-center justify-center space-x-3">
                {status === 'sending' ? <span>Transmitting...</span> : <span>Dispatch Message &rarr;</span>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
