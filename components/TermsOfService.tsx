
import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-black mb-10 text-white tracking-tighter">Terms of Service</h1>
      <div className="space-y-8 text-slate-400 leading-relaxed text-lg">
        <p className="font-bold text-slate-200 uppercase tracking-widest text-xs">Standard Operational Framework • Edition 2026</p>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">1. Contractual Agreement</h2>
          <p>By accessing the Tipde AI platform ("Service"), you agree to be bound by these legally binding terms. This service is operated for professional, educational, and creative purposes. Use by individuals under the age of 13 is strictly prohibited.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">2. Acceptable Neural Use</h2>
          <p>
            You agree to use Tipde AI in a manner that is ethical and compliant with international law. Prohibited activities include, but are not limited to:
            <ul className="list-disc pl-8 mt-4 space-y-2 text-slate-500">
              <li>Generating adversarial code for cybersecurity exploitation.</li>
              <li>Creation of non-consensual deep-fake visual assets.</li>
              <li>Automated scraping or stress-testing of our neural infrastructure.</li>
              <li>Dissemination of AI-generated misinformation or hate speech.</li>
            </ul>
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">3. Intellectual Sovereignty</h2>
          <p>Tipde AI claims no ownership over the outputs generated through the service. You retain the rights to the creative content you synthesize, subject to the licensing terms of our upstream model providers. You are responsible for ensuring that your outputs do not infringe on third-party intellectual property.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">4. Warranty Disclaimer</h2>
          <p>Tipde AI is provided as a technological showcase. While we strive for absolute accuracy, neural outputs are probabilistic in nature. We provide no warranty regarding the fitness of information for high-stakes decision-making (medical, legal, or financial).</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">5. Termination of Access</h2>
          <p>We reserve the right to suspend or terminate access to the console for users who violate our ethical standards or acceptable use policies.</p>
        </section>

        <div className="pt-10 border-t border-slate-800">
          <p className="text-sm font-bold">© 2026 Tipde Intelligence Systems • All Legal Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
