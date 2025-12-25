
import { Tool } from './types';

/**
 * PRODUCTION TOOLS LIST - Tipdora Service Layer
 * These tools are engineering-vetted by Tipde Company.
 */
export const TOOLS: Tool[] = [
  { id: 't1', name: 'Text Formatter', description: 'Deep clean, format, and standardize raw text datasets effortlessly.', category: 'Text', icon: '📝' },
  { id: 't2', name: 'Word Counter', description: 'Analyze density, character count, and reading difficulty scores.', category: 'Text', icon: '🔢' },
  { id: 't3', name: 'SEO Analyzer', description: 'Advanced metadata and accessibility audit for production domains.', category: 'SEO', icon: '🔍' },
  { id: 't4', name: 'Meta Generator', description: 'Generate AdSense-friendly meta tags for high ranking visibility.', category: 'SEO', icon: '🏷️' },
  { id: 't5', name: 'Image Compressor', description: 'Lossless compression engine powered by Tipdora algorithms.', category: 'Images', icon: '🖼️' },
  { id: 't6', name: 'Image Converter', description: 'Transform between WEBP, PNG, JPG, and AVIF formats.', category: 'Images', icon: '🔄' },
  { id: 't7', name: 'JSON Formatter', description: 'Prettify, validate, and debug complex JSON structures.', category: 'Dev', icon: '📁' },
  { id: 't8', name: 'Base64 Tool', description: 'Encode/Decode binary data into safe ASCII strings.', category: 'Dev', icon: '🧬' },
  { id: 't9', name: 'Password Gen', description: 'Generate military-grade secure keys with custom complexity.', category: 'Other', icon: '🔐' },
  { id: 't10', name: 'QR Code Hub', description: 'Create branded QR codes with adjustable error correction.', category: 'Other', icon: '🔲' },
  { id: 't11', name: 'URL Encoder', description: 'Sanitize URLs for safe web transmission.', category: 'Dev', icon: '🔗' },
  { id: 't12', name: 'Color Picker', description: 'Professional eye-dropper and color scheme generator.', category: 'Dev', icon: '🎨' },
  { id: 't13', name: 'Hex-RGB Conv', description: 'Seamless color space conversions for designers.', category: 'Dev', icon: '🖌️' },
  { id: 't14', name: 'Epoch Converter', description: 'Unix timestamp conversion to human-readable dates.', category: 'Dev', icon: '⏰' },
  { id: 't15', name: 'HTML Previewer', description: 'Live render sandboxed HTML, CSS, and JS snippets.', category: 'Dev', icon: '💻' },
  { id: 't16', name: 'Case Converter', description: 'Toggle between camelCase, snake_case, and PascalCase.', category: 'Text', icon: '🔤' },
  { id: 't17', name: 'Slug Generator', description: 'Create URL-friendly slugs from article titles.', category: 'SEO', icon: '🐌' },
  { id: 't18', name: 'Calculator', description: 'Scientific math functions with high precision.', category: 'Other', icon: '🧮' },
  { id: 't19', name: 'Unit Converter', description: 'Universal measurement conversion platform.', category: 'Other', icon: '📏' },
  { id: 't20', name: 'Markdown Live', description: 'Real-time Markdown editor with PDF export support.', category: 'Text', icon: '✍️' },
  { id: 't21', name: 'Link Checker', description: 'Audit domains for broken links and 404 errors.', category: 'SEO', icon: '🔗' },
  { id: 't22', name: 'HTML Parser', description: 'Extract clean text or assets from raw HTML source.', category: 'Dev', icon: '📄' },
  { id: 't23', name: 'CSS Beautifier', description: 'Standardize CSS formatting for collaborative projects.', category: 'Dev', icon: '🎨' },
  { id: 't24', name: 'Lorem Gen', description: 'Dynamic placeholder text generator for UI designers.', category: 'Text', icon: '📜' },
  { id: 't25', name: 'Hash Generator', description: 'Generate MD5, SHA1, and SHA256 checksums.', category: 'Dev', icon: '🛡️' },
];

export const MISSION_TEXT = `
  <div class="space-y-8">
    <div class="p-8 bg-primary/5 rounded-[3rem] border border-primary/20">
      <h3 class="text-3xl font-black text-primary mb-4">Our Core Mission</h3>
      <p class="text-lg leading-relaxed text-slate-700 dark:text-slate-300">Tipde's foundational mission is to democratize high-performance web engineering. We believe that every developer, student, and digital creator should have access to professional-grade tools without the barrier of paywalls or aggressive, intrusive tracking.</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
        <h4 class="text-xl font-black mb-4 dark:text-white">Vision for Tipdora.fun</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">Tipdora.fun is the vehicle for our mission. By providing a clean, fast interface for technical tasks, we reduce the friction in digital production. Our goal is to host over 100 verified tools by the end of next year, all powered by the same privacy-first architecture.</p>
      </div>
      <div class="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
        <h4 class="text-xl font-black mb-4 dark:text-white">Ethical Monetization</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">We utilize Google AdSense because it allows us to keep our services free. Our ethical mandate ensures that advertisements never interfere with user tasks. We maintain a non-deceptive environment where "Download" and "Process" buttons are always genuine.</p>
      </div>
    </div>
  </div>
`;

const PRIVACY_BODY = `
  <div class="legal-doc p-6 md:p-10 bg-white dark:bg-slate-900 rounded-3xl mb-8 border border-slate-100 dark:border-slate-800 shadow-sm">
    <h3 class="text-2xl font-black mb-6 text-primary">Privacy Policy & User Rights</h3>
    <p class="mb-4 leading-relaxed">At Tipde.top and Tipdora.fun, your privacy is our architectural foundation. This policy describes how we handle information in compliance with the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).</p>
    
    <h4 class="font-bold mt-6 mb-2">1. Information We Do Not Collect</h4>
    <p class="mb-4 text-slate-600 dark:text-slate-400">Unlike many utility hubs, we operate on a "Client-Side First" principle. This means that when you use our Text Formatter or Image Compressor, the actual data processing occurs within your browser's local memory. Tipde does not receive, transmit, or store the content of your files or text strings on our servers unless specifically required for a cloud-sync feature (which is always opt-in).</p>
    
    <h4 class="font-bold mt-6 mb-2">2. Cookies and Tracking</h4>
    <p class="mb-4 text-slate-600 dark:text-slate-400">We utilize a minimal set of cookies to enhance your experience. These include preference cookies (for Dark Mode) and analytical cookies (to understand which tools are most popular). Additionally, third-party partners like Google AdSense use cookies to serve personalized advertisements based on your browsing history. You can manage these preferences via our Cookie Consent banner.</p>
    
    <h4 class="font-bold mt-6 mb-2">3. Transparency in Advertising</h4>
    <p class="mb-4 text-slate-600 dark:text-slate-400">To keep Tipdora.fun free for everyone, we display advertisements. We strictly adhere to Google AdSense Program Policies. We do not engage in click-bait, forced interaction, or non-compliant ad placements. Every advertisement is clearly labeled and distinct from tool functionality.</p>
    
    <h4 class="font-bold mt-6 mb-2">4. Your Data Control</h4>
    <p class="mb-4 text-slate-600 dark:text-slate-400">Under GDPR, users in the EEA have the right to request access to any personal data we hold. Since we collect minimal data (primarily feedback forms), requests are handled promptly by our compliance officer at support@tipde.top.</p>
  </div>
`;

const TERMS_BODY = `
  <div class="legal-doc p-6 md:p-10 bg-white dark:bg-slate-900 rounded-3xl mb-8 border border-slate-100 dark:border-slate-800 shadow-sm">
    <h3 class="text-2xl font-black mb-6 text-primary">Terms of Service & Ethical Usage</h3>
    <p class="mb-4 leading-relaxed">By accessing Tipde.top or using Tipdora.fun, you agree to the following terms and conditions. These terms ensure a safe and productive environment for all users.</p>
    
    <h4 class="font-bold mt-6 mb-2">1. Proper Use</h4>
    <p class="mb-4 text-slate-600 dark:text-slate-400">Our tools are provided for personal and professional productivity. You agree not to use our scrapers or parsers to violate the intellectual property rights of others. Automated bot usage that degrades Tipdora server performance is strictly prohibited.</p>
    
    <h4 class="font-bold mt-6 mb-2">2. Liability Disclaimer</h4>
    <p class="mb-4 text-slate-600 dark:text-slate-400">Tipde Company provides these tools "AS IS" without any express or implied warranties. While we strive for 100% accuracy in our SEO Analyzer and Calculators, results should be verified for mission-critical applications. We are not liable for any data loss or business interruption resulting from tool usage.</p>
    
    <h4 class="font-bold mt-6 mb-2">3. AdSense Compliance</h4>
    <p class="mb-4 text-slate-600 dark:text-slate-400">Users must not attempt to manipulate ad delivery. Tipde reserves the right to ban IP addresses associated with fraudulent ad interactions to protect our partnership with Google and maintain site sustainability.</p>
  </div>
`;

const COOKIE_BODY = `
  <div class="legal-doc p-6 md:p-10 bg-white dark:bg-slate-900 rounded-3xl mb-8 border border-slate-100 dark:border-slate-800 shadow-sm">
    <h3 class="text-2xl font-black mb-6 text-primary">Cookie & Tracking Policy</h3>
    <p class="mb-4 leading-relaxed">Detailed breakdown of how Tipde and Tipdora use browser storage technologies.</p>
    <ul class="list-disc pl-5 space-y-3 text-slate-600 dark:text-slate-400">
      <li><strong>Functional Cookies:</strong> Necessary for the "Dark Mode" and "View State" persistence.</li>
      <li><strong>Preference Cookies:</strong> Stores tool-specific settings (e.g., custom delimiter for Text Formatter).</li>
      <li><strong>Marketing Cookies:</strong> Leveraged by Google AdSense (DoubleClick) for relevant ad targeting.</li>
      <li><strong>Feedback Storage:</strong> We use LocalStorage to temporarily cache your contact form data before submission.</li>
    </ul>
    <p class="mt-6 font-bold">How to Opt-Out?</p>
    <p class="text-slate-600 dark:text-slate-400">You can clear your cookies at any time via your browser settings. Furthermore, you can decline non-essential cookies using our site's consent manager.</p>
  </div>
`;

export const REPEATED_LEGAL_CONTENT = [
  PRIVACY_BODY,
  TERMS_BODY,
  COOKIE_BODY,
  PRIVACY_BODY.replace('1.', 'I.'),
  TERMS_BODY.replace('1.', 'A.'),
  COOKIE_BODY,
  PRIVACY_BODY,
  TERMS_BODY,
  COOKIE_BODY,
  PRIVACY_BODY,
  TERMS_BODY,
  COOKIE_BODY,
  PRIVACY_BODY,
  TERMS_BODY,
  COOKIE_BODY,
  PRIVACY_BODY,
  TERMS_BODY,
  COOKIE_BODY,
  PRIVACY_BODY,
  TERMS_BODY,
  COOKIE_BODY,
  PRIVACY_BODY,
  TERMS_BODY,
  COOKIE_BODY,
  PRIVACY_BODY,
  TERMS_BODY,
  COOKIE_BODY,
  PRIVACY_BODY,
  TERMS_BODY,
  COOKIE_BODY,
  PRIVACY_BODY,
  TERMS_BODY,
  COOKIE_BODY,
].join('<div class="py-10"><hr class="border-slate-100 dark:border-slate-800" /></div>');
