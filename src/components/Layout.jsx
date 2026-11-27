import Analytics from './Analytics.jsx'
import CookieConsent from './CookieConsent.jsx'
import Footer from './Footer.jsx'
import Header from './Header.jsx'
import MonetagAds from './MonetagAds.jsx'
import SEO from './SEO.jsx'

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SEO />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieConsent />
      <Analytics />
      <MonetagAds />
    </div>
  )
}
