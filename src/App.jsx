import { useEffect, useLayoutEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import About from './pages/About.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './pages/BlogPost.jsx'
import Categories from './pages/Categories.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx'
import Legal from './pages/Legal.jsx'
import NotFound from './pages/NotFound.jsx'
import ToolPage from './pages/ToolPage.jsx'
import Tools from './pages/Tools.jsx'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

function ScrollToTop() {
  const { pathname, search } = useLocation()

  useIsomorphicLayoutEffect(() => {
    const root = document.documentElement
    const previousBehavior = root.style.scrollBehavior
    root.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    root.style.scrollBehavior = previousBehavior
  }, [pathname, search])

  return null
}

export default function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tools/:slug" element={<ToolPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:slug" element={<CategoryPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<Legal slug="privacy-policy" />} />
        <Route path="/terms" element={<Legal slug="terms" />} />
        <Route path="/cookie-policy" element={<Legal slug="cookie-policy" />} />
        <Route path="/disclaimer" element={<Legal slug="disclaimer" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
