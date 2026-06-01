import { useEffect, useState } from 'react';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300 ${scrolled
        ? 'bg-[#171717]/80 backdrop-blur-xl'
        : 'bg-transparent'
        }`}
    >
      <div className="w-full max-w-[1280px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center">
          <img src="/images/logo.png" alt="Faraday Earth" className="h-10 w-auto object-contain" />
        </a>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            // { label: 'Technology', target: 'technology' },
            { label: '', target: 'film-showcase' },
            // { label: 'Impact', target: 'impact' },
            //{ label: 'About', target: 'contact' },
          ].map((item) => (
            <a
              key={item.target}
              href={`#${item.target}`}
              onClick={(e) => handleNavClick(e, item.target)}
              className="text-[#A3A3A3] text-sm font-medium hover:text-[#4ADE80] transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, 'contact')}
          className="border border-[#4ADE80] text-[#4ADE80] text-sm font-medium px-6 py-2 rounded-full hover:bg-[#4ADE80] hover:text-[#0A0A0A] transition-all duration-300"
        >
          Contact Us
        </a>
      </div>
    </nav>
  );
};

export default Navigation;
