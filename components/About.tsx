import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="inline-block px-4 py-1.5 bg-blue-900/30 text-blue-400 text-[10px] font-black rounded-full border border-blue-500/20 mb-10 uppercase tracking-[0.25em]">
        Platform Architecture • v2.6.0 PRO • Global Edition
      </div>
      <h1 className="text-6xl font-black mb-12 text-white tracking-tighter">The Vision Behind Tipde AI</h1>
      
      <div className="space-y-16 text-slate-300 leading-relaxed text-lg font-medium">
        <section className="relative p-10 bg-slate-900/50 rounded-[3rem] border border-slate-800 shadow-2xl">
          <div className="absolute top-0 right-10 -translate-y-1/2 p-4 bg-blue-600 rounded-2xl shadow-xl">
             <i className="fas fa-quote-right text-white text-xl"></i>
          </div>
          <p className="text-2xl font-semibold text-slate-200 leading-snug">
            Tipde AI is engineered as the premier intelligence layer for the 2026 digital economy. Our objective is to augment human potential through high-performance neural synthesis, creating a bridge between raw data and creative execution.
          </p>
        </section>
        
        <section className="space-y-8">
          <h2 className="text-4xl font-black text-white tracking-tight">Our Core Mission</h2>
          <p>
            In 2026, information is abundant, but clarity is rare. Tipde AI was founded on the principle that AI should be a precision tool for clarity, not just a generator of generic text. Our mission is to provide global professionals with an interface that respects their intelligence and enhances their productivity through advanced logical reasoning and high-fidelity visual generation.
          </p>
          <p>
            We prioritize "Contextual Sovereignty"—ensuring that every interaction with our models is grounded in high-authority data clusters. This commitment to accuracy and reliability makes Tipde AI a trusted resource for researchers, engineers, and creatives worldwide who require more than just simple automation.
          </p>
        </section>

        <section className="space-y-8">
          <h2 className="text-4xl font-black text-white tracking-tight">Technological Excellence</h2>
          <p>
            The underlying architecture of Tipde AI leverages the latest transformer advancements. By integrating Gemini 3's reasoning capabilities with specialized 2026 quantization methods, we deliver professional-grade logical outputs with minimal latency. Our multi-modal interface is designed to seamlessly transition between text analysis and visual asset creation, providing a unified workspace for complex project development.
          </p>
          <p>
            Our backend utilizes a distributed grid of tensor processing units, ensuring that user queries are not just answered, but analyzed for structural integrity. This allows Tipde AI to handle "Zero-Shot" logic tasks that typically require extensive fine-tuning on other platforms.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10">
            <div className="p-8 bg-slate-900 rounded-[2rem] border border-slate-800">
               <h4 className="text-white font-bold mb-4 flex items-center gap-3">
                 <i className="fas fa-layer-group text-blue-500"></i> Multi-Modal Core
               </h4>
               <p className="text-sm text-slate-400 font-medium">Processing text, image, and logic simultaneously for holistic problem solving in professional environments.</p>
            </div>
            <div className="p-8 bg-slate-900 rounded-[2rem] border border-slate-800">
               <h4 className="text-white font-bold mb-4 flex items-center gap-3">
                 <i className="fas fa-user-shield text-emerald-500"></i> Data Sovereignty
               </h4>
               <p className="text-sm text-slate-400 font-medium">Local-first privacy protocol. Your conversations never leave your encrypted local storage without your explicit command.</p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-4xl font-black text-white tracking-tight">Governance & Ethical Alignment</h2>
          <p>
            We adhere to the 2026 AI Ethics Framework, ensuring that our models produce content that is safe, verifiable, and free from programmatic bias. Every synthesis is a result of meticulous alignment protocols designed to benefit humanity while pushing the boundaries of what is possible with machine intelligence.
          </p>
          <p>
            Tipde AI is more than a platform; it is a repository of neural research. We are dedicated to providing original, peer-reviewed technical content that explores the intersection of machine intelligence and human creativity. By maintaining a high standard of original technical text, we contribute to the broader scientific community's understanding of large language model behavior.
          </p>
        </section>

        <div className="bg-blue-600 p-16 rounded-[4rem] text-center shadow-2xl shadow-blue-600/20">
          <h2 className="text-4xl font-black text-white mb-6">Partner with Tipde AI</h2>
          <p className="text-white/80 text-xl mb-12 font-medium">
            Join the elite circle of innovators shaping the future of decentralized intelligence. Our engineering teams are ready to support your most ambitious projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="mailto:fchattha206@gmail.com" className="bg-white text-blue-600 px-12 py-5 rounded-2xl font-black transition-all hover:bg-slate-100 shadow-xl">Contact Support</a>
            <a href="https://x.com/tipdeofficial" target="_blank" className="bg-blue-700 text-white px-12 py-5 rounded-2xl font-black transition-all hover:bg-blue-800 border border-white/10 shadow-xl">
               <i className="fa-brands fa-x-twitter mr-2"></i> Feed Updates
            </a>
          </div>
        </div>
        
        <p className="text-center text-slate-600 text-xs font-black uppercase tracking-[0.4em] pt-10">
          Tipde Intelligence Systems • Pakistan Headquarters • Global Engineering Presence
        </p>
      </div>
    </div>
  );
};

export default About;