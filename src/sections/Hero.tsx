import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HeroCanvas from './HeroCanvas';
//import { Play } from 'lucide-react';

const Hero = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const children = el.querySelectorAll('.hero-animate');
    gsap.fromTo(
      children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3,
      }
    );
  }, []);

  // const handleExplore = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   const el = document.getElementById('film-showcase');
  //   if (el) el.scrollIntoView({ behavior: 'smooth' });
  // };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', background: '#0A0A0A' }}
    >
      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 100%, transparent 30%, #0A0A0A 80%)',
        }}
      />

      <HeroCanvas />

      <div
        ref={textRef}
        className="relative z-10 flex flex-col items-center justify-center h-full px-6"
      >
        <h1 className="hero-animate text-center max-w-[800px] opacity-0">
          <span
            className="block font-bold tracking-tight"
            style={{
              fontSize: 'clamp(48px, 5vw, 72px)',
              lineHeight: 1.1,
              color: '#F5F5F5',
            }}
          >
            Ammonia Production,
          </span>
          <span
            className="block font-bold tracking-tight"
            style={{
              fontSize: 'clamp(48px, 5vw, 72px)',
              lineHeight: 1.1,
              color: '#4ADE80',
            }}
          >
            Reimagined
          </span>
        </h1>

        <p
          className="hero-animate text-center max-w-[640px] mt-6 opacity-0"
          style={{ color: '#A3A3A3', fontSize: '18px', lineHeight: 1.6 }}
        >
          Powered by non-thermal plasma synthesis, our modular reactors deliver carbon-free ammonia exactly where you need it.
        </p>

        <div className="hero-animate flex items-center gap-4 mt-8 opacity-0">
          {/* <button
            onClick={handleExplore}
            className="bg-[#4ADE80] text-[#0A0A0A] font-medium px-8 py-3 rounded-full hover:scale-[1.02] hover:brightness-110 transition-all duration-300"
          >
            Watch the Film
          </button> */}
          {/* <a
            href="#film-showcase"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('film-showcase')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors duration-300"
          >
            <Play size={16} />
            <span className="text-sm font-medium hover:underline">Watch the Film</span>
          </a> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
