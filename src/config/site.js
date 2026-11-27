export const site = {
  name: 'Tipde',
  tagline: 'Developer tools. Made simple.',
  description:
    'Tools Hub by Tipde: 15 free browser-based developer tools to format, convert, compress, validate and generate code and files. Private, fast and no sign-up required.',
  url: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL) || (typeof process !== 'undefined' ? process.env?.VITE_SITE_URL : undefined) || 'https://tipde.online',
  gaMeasurementId: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GA_MEASUREMENT_ID) || (typeof process !== 'undefined' ? process.env?.VITE_GA_MEASUREMENT_ID : undefined) || '',
  gscVerification: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GSC_VERIFICATION) || (typeof process !== 'undefined' ? process.env?.VITE_GSC_VERIFICATION : undefined) || '',
  monetagId: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_MONETAG_ID) || (typeof process !== 'undefined' ? process.env?.VITE_MONETAG_ID : undefined) || 'c779a9462a921abf9636fcd4e1e40fad',
  monetagZone: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_MONETAG_ZONE) || (typeof process !== 'undefined' ? process.env?.VITE_MONETAG_ZONE : undefined) || '316799',
  monetagScriptSrc: 'https://quge5.com/88/tag.min.js',
  adsEnabled: ((typeof import.meta !== 'undefined' && import.meta.env?.VITE_ENABLE_ADS) || (typeof process !== 'undefined' ? process.env?.VITE_ENABLE_ADS : undefined)) === 'true',
  email: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CONTACT_EMAIL) || (typeof process !== 'undefined' ? process.env?.VITE_CONTACT_EMAIL : undefined) || 'hello@tipde.online',
}

export const navigation = [
  { label: 'Home', to: '/' },
  { label: 'All Tools', to: '/tools/' },
  { label: 'Categories', to: '/categories/' },
  { label: 'Blog', to: '/blog/' },
  { label: 'About', to: '/about/' },
  { label: 'Contact', to: '/contact/' },
]

export const footerLinks = [
  {
    title: 'Explore',
    links: [
      { label: 'All Tools', to: '/tools/' },
      { label: 'Categories', to: '/categories/' },
      { label: 'Blog', to: '/blog/' },
      { label: 'Recently Added', to: '/tools/?sort=newest' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Tipde', to: '/about/' },
      { label: 'Contact', to: '/contact/' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/privacy-policy/' },
      { label: 'Terms', to: '/terms/' },
      { label: 'Cookie Policy', to: '/cookie-policy/' },
      { label: 'Disclaimer', to: '/disclaimer/' },
    ],
  },
]
