
import React from 'react';
import { REPEATED_LEGAL_CONTENT } from '../../constants';
import AdSpace from '../AdSpace';

const Legal: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in space-y-12">
      <AdSpace variant="horizontal" />

      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 md:p-12 shadow-sm space-y-12">
        <div className="border-b border-slate-100 dark:border-slate-700 pb-8 text-center">
          <h1 className="text-4xl font-extrabold dark:text-white mb-4">Legal & Privacy Center</h1>
          <p className="text-slate-600 dark:text-slate-400 italic">Effective Date: January 1, 2024</p>
        </div>

        <AdSpace variant="horizontal" className="!px-0" />

        <section className="prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-8" dangerouslySetInnerHTML={{ __html: REPEATED_LEGAL_CONTENT }} />
        </section>

        <AdSpace variant="rectangle" className="!px-0" />

        <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 mt-12 border border-slate-100 dark:border-slate-700">
          <h4 className="font-bold mb-2 dark:text-white">AdSense Disclaimer</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            This website uses Google AdSense, a service for including advertisements from Google Inc. Google uses cookies to provide these advertisements. We ensure our content is original, valuable, and compliant with all program policies to provide a safe and effective environment for both users and advertisers.
          </p>
        </div>
      </div>

      <AdSpace variant="horizontal" />
    </div>
  );
};

export default Legal;
