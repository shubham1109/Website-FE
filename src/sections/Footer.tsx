import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer
      className="w-full py-12"
      style={{
        background: '#0A0A0A',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/images/logo.png" alt="Faraday Earth" className="w-auto object-contain" style={{ height: 'calc(2rem * 1.3)' }} />
        </div>

        {/* Copyright */}
        <p className="text-xs" style={{ color: '#A3A3A3' }}>
          2026 Faraday Earth Inc. All rights reserved.
        </p>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/privacy-policy"
            className="text-xs hover:text-[#4ADE80] transition-colors duration-300"
            style={{ color: '#A3A3A3' }}
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
