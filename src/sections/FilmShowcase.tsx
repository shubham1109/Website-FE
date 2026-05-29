import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FilmShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const videoEl = videoRef.current;
    if (!section || !videoEl) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        section.querySelectorAll('.film-header'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );

      // Video container scale animation
      gsap.fromTo(
        videoEl,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: videoEl,
            start: 'top 80%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="film-showcase"
      ref={sectionRef}
      className="w-full py-[120px] md:py-[120px]"
      style={{ background: '#111111' }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section header */}
        <div className="text-center">
          <span
            className="film-header block text-xs font-medium tracking-[0.05em] uppercase opacity-0"
            style={{ color: '#4ADE80' }}
          >
            Inside the Lab
          </span>
          <h2
            className="film-header mt-4 font-semibold tracking-tight opacity-0"
            style={{
              fontSize: 'clamp(36px, 3.5vw, 48px)',
              lineHeight: 1.2,
              color: '#F5F5F5',
            }}
          >
            Engineering the Future of Fertilizer
          </h2>
        </div>

        {/* Video Player */}
        <div
          ref={videoRef}
          className="relative mx-auto mt-12 max-w-[900px] rounded-lg overflow-hidden opacity-0 group"
          style={{
            aspectRatio: '16/9',
            border: '1px solid rgba(74, 222, 128, 0.2)',
          }}
        >
          <video
            className="w-full h-full object-cover"
            src="/videos/vid-lab-film.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
          {/* Fallback image overlay */}
          <img
            src="/images/img-lab-engineer.jpg"
            alt="Laboratory"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ display: 'none' }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>

        {/* Additional imagery row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="rounded-lg overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
            <img
              src="/images/img-hero-reactor.jpg"
              alt="Faraday Reactor Unit"
              className="w-full h-full object-cover"
              style={{ aspectRatio: '3/4', maxHeight: '500px', objectPosition: 'center' }}
            />
          </div>
          <div className="rounded-lg overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
            <img
              src="/images/img-farm-aerial.jpg"
              alt="Sustainable Agriculture"
              className="w-full h-full object-cover"
              style={{ aspectRatio: '16/9', maxHeight: '500px', objectPosition: 'center' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilmShowcase;
