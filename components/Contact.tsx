
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 animate-fade-in">
      <div className="inline-block px-4 py-1.5 bg-blue-900/30 text-blue-400 text-[10px] font-black rounded-full border border-blue-500/20 mb-10 uppercase tracking-[0.25em]">
        Global Support • Verified Identity
      </div>
      <h1 className="text-6xl font-black mb-12 text-white tracking-tighter">Get in Touch</h1>
      
      <div className="grid md:grid-cols-2 gap-16">
        <div className="space-y-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Contact Information</h2>
            <p className="text-slate-400 leading-relaxed">
              Our specialized neural support teams and media relations staff are available for consultation. We prioritize inquiries from our global community and professional partners.
            </p>
          </section>

          <div className="space-y-6">
            <div className="flex items-center gap-5 p-6 bg-slate-900/50 rounded-3xl border border-slate-800">
              <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500">
                <i className="fas fa-envelope"></i>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Support & Media</p>
                <p className="text-white font-medium">fchattha206@gmail.com</p>
              </div>
            </div>

            <a href="https://wa.me/923246462416" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 p-6 bg-emerald-600/5 hover:bg-emerald-600/10 transition-all rounded-3xl border border-emerald-500/20 group">
              <div className="w-12 h-12 bg-emerald-600/10 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                <i className="fab fa-whatsapp"></i>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">WhatsApp Chat</p>
                <p className="text-white font-medium">+92 324 6462416</p>
              </div>
            </a>

            <div className="flex items-center gap-5 p-6 bg-slate-900/50 rounded-3xl border border-slate-800">
              <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500">
                <i className="fas fa-location-dot"></i>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pakistan HQ</p>
                <p className="text-white font-medium">Hafizabad, Punjab, Pakistan</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/80 p-10 rounded-[3rem] border border-slate-800 shadow-2xl">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 text-3xl">
                <i className="fas fa-check"></i>
              </div>
              <h3 className="text-2xl font-bold text-white">Message Synthesized</h3>
              <p className="text-slate-400">Thank you for reaching out. We will contact you at fchattha206@gmail.com shortly.</p>
              <button onClick={() => setSubmitted(false)} className="text-blue-500 font-bold hover:underline">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Full Name</label>
                <input required type="text" className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 text-white" placeholder="Enter your name" />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Email Address</label>
                <input required type="email" className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 text-white" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Your Message</label>
                <textarea required rows={4} className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 text-white resize-none" placeholder="Describe your inquiry..."></textarea>
              </div>
              <button type="submit" className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black transition-all active:scale-95 shadow-xl shadow-blue-600/20">
                Transmit Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
