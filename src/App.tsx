import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Routes, Route } from 'react-router';

import Navigation from './sections/Navigation';
import Footer from './sections/Footer';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RequestSample from './pages/RequestSample';
import CookieConsent from './components/CookieConsent';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.1,
    });
    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Store the ticker callback so we can remove the exact same reference on cleanup
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after fonts and images load
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
    };
  }, []);

  return (
    <div className="relative" style={{ background: '#0A0A0A', willChange: 'scroll-position' }}>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/request-sample" element={<RequestSample />} />
      </Routes>
      <Footer />
      <CookieConsent />
    </div>
  );
}

export default App;
