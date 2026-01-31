import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import TipdeBot from './components/TipdeBot/TipdeBot'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import ContactUs from './pages/ContactUs'
import AboutUs from './pages/AboutUs'
import Disclaimer from './pages/Disclaimer'
import CookiePolicy from './pages/CookiePolicy'
import Navigation from './components/Navigation/Navigation'
import Footer from './components/Footer/Footer'


import Home from './pages/Home'

import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { AuthProvider } from './context/AuthContext'

import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={
              <ProtectedRoute>
                <TipdeBot />
              </ProtectedRoute>
            } />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/cookies" element={<CookiePolicy />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  )
}

export default App
