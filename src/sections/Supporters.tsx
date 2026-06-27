import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Supporters = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        section.querySelectorAll('.supporters-header'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          },
        }
      );

      // Logos animation
      gsap.fromTo(
        section.querySelectorAll('.supporter-logo-card'),
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section.querySelector('.supporters-logos-grid'),
            start: 'top 85%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="supporters"
      ref={sectionRef}
      className="w-full py-[100px] md:py-[120px]"
      style={{
        background: '#111111',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-12">
          <span
            className="supporters-header block text-xs font-medium tracking-[0.05em] uppercase opacity-0"
            style={{ color: '#4ADE80' }}
          >
            Backed By
          </span>
          {/* <h2
            className="supporters-header mt-4 font-semibold tracking-tight opacity-0"
            style={{
              fontSize: 'clamp(32px, 3vw, 40px)',
              lineHeight: 1.2,
              color: '#F5F5F5',
            }}
          >
            Our Supporters & Partners
          </h2> */}
        </div>

        <div className="supporters-logos-grid flex flex-col md:flex-row items-center justify-center gap-8 max-w-[800px] mx-auto">
          {/* StartX Logo */}
          <div
            className="supporter-logo-card w-full md:w-1/2 h-[160px] rounded-xl flex items-center justify-center p-8 opacity-0 transition-all duration-300 hover:shadow-glow"
            style={{
              background: '#0A0A0A',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <img
              src="/images/startx-logo.jpg"
              alt="StartX"
              className="h-14 md:h-16 w-auto object-contain brightness-95 hover:brightness-100 transition-all duration-300 rounded"
            />
          </div>

          {/* IIT Tirupati Logo */}
          {/* <div
            className="supporter-logo-card w-full md:w-1/2 h-[160px] rounded-xl flex items-center justify-center p-8 opacity-0 transition-all duration-300 hover:shadow-glow"
            style={{
              background: '#0A0A0A',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <img
              src="/images/iit-logo.jpg"
              alt="IIT Tirupati"
              className="h-20 md:h-24 w-auto object-contain brightness-95 hover:brightness-100 transition-all duration-300 rounded"
            />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Supporters;
