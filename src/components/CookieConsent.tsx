import { useEffect, useState } from 'react';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('faraday_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('faraday_cookie_consent', 'granted');
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem('faraday_cookie_consent', 'denied');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 flex justify-center w-full animate-in slide-in-from-bottom-8 duration-500">
      <div 
        className="w-full max-w-[800px] p-6 rounded-lg shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        style={{ 
          background: 'rgba(23, 23, 23, 0.95)', 
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(74,222,128,0.2)'
        }}
      >
        <div className="text-sm" style={{ color: '#A3A3A3' }}>
          <p>
            We use cookies to improve your experience on our site and analyze our traffic. 
            By clicking "Accept", you consent to our use of cookies as described in our{' '}
            <a href="/privacy-policy" className="text-[#4ADE80] hover:underline">Privacy Policy</a>.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={handleDecline}
            className="px-5 py-2 rounded-full text-sm font-medium transition-colors hover:bg-white/10"
            style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#F5F5F5' }}
          >
            Decline
          </button>
          <button 
            onClick={handleAccept}
            className="px-5 py-2 rounded-full text-sm font-medium transition-colors bg-[#4ADE80] text-[#0A0A0A] hover:bg-[#22c55e]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
