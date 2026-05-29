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
        <div className="flex flex-col leading-none">
          <span className="text-[#F5F5F5] font-bold text-sm tracking-tight">FARADAY</span>
          <span className="text-[#4ADE80] font-bold text-sm tracking-tight">EARTH</span>
        </div>

        {/* Copyright */}
        <p className="text-xs" style={{ color: '#A3A3A3' }}>
          2026 Faraday Earth Inc. All rights reserved.
        </p>

        {/* Links */}
        <div className="flex items-center gap-6">
          <a
            href="https://faraday.earth/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs hover:text-[#4ADE80] transition-colors duration-300"
            style={{ color: '#A3A3A3' }}
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-xs hover:text-[#4ADE80] transition-colors duration-300"
            style={{ color: '#A3A3A3' }}
          >
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
