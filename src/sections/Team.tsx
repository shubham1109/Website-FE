import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const founders = [
  {
    name: 'Debayan Saha',
    role: 'Co-Founder & CEO',
    image: '/images/debayan_img.jpeg',
    linkedin: 'https://www.linkedin.com/in/debayan-saha-4306a117/',
    //bio: 'PhD in Plasma Physics from Stanford. Former Principal Scientist at National Labs leading clean-tech research.',
  },
  {
    name: 'Dr. Shashi Ranjan',
    role: 'Co-Founder & CTO',
    image: '/images/shashi_img.jpeg',
    linkedin: 'https://www.linkedin.com/in/ranjan-shashi/',
    //bio: 'Chemical Engineer with 12+ years building modular reactors and scaling hardware systems from zero to production.',
  },
];

const advisors = [
  {
    name: 'Jeff Depew',
    role: 'Former CEO of Imara Corporation',
    image: '/images/jeff_img.jpeg',
    linkedin: 'https://www.linkedin.com/in/jeff-depew-0173/',
    affiliation: 'Revolutionizing battery technology',
  },
  {
    name: 'Steve Schramm',
    role: 'Early Leader at General Magic',
    image: '/images/steve_img.jpeg',
    linkedin: 'https://www.linkedin.com/in/steve-schramm-635b814/',
    affiliation: 'First pre-IPO unicorn in Silicon Valley',
  },
  {
    name: 'Fred Moesler',
    role: 'Former CTO - Global Thermostat & Renmatics',
    image: '/images/fred_img.jpeg',
    linkedin: 'https://www.linkedin.com/in/fred-moesler-2529752/',
    affiliation: 'One of the first Direct Air Capture companies',
  },
];

const Team = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        section.querySelectorAll('.team-header'),
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

      // Cards animation
      gsap.fromTo(
        section.querySelectorAll('.team-card'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section.querySelector('.team-grid'),
            start: 'top 80%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="w-full py-[120px] md:py-[120px]"
      style={{ background: '#0A0A0A' }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span
            className="team-header block text-xs font-medium tracking-[0.05em] uppercase opacity-0"
            style={{ color: '#4ADE80' }}
          >
            Who We Are
          </span>
          <h2
            className="team-header mt-4 font-semibold tracking-tight opacity-0"
            style={{
              fontSize: 'clamp(36px, 3.5vw, 48px)',
              lineHeight: 1.2,
              color: '#F5F5F5',
            }}
          >
            Leadership & Advisors
          </h2>
          <p
            className="team-header mt-4 mx-auto max-w-[640px] opacity-0"
            style={{ color: '#A3A3A3', fontSize: '16px', lineHeight: 1.6 }}
          >
            Our team brings together pioneering expertise in plasma physics, chemical engineering, and commercial deployment.
          </p>
        </div>

        {/* Founders */}
        <div className="mb-20">

          <div className="team-grid grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
            {founders.map((founder, i) => (
              <div
                key={i}
                className="team-card p-6 rounded-xl flex flex-col sm:flex-row gap-6 opacity-0 hover:shadow-glow transition-all duration-300"
                style={{
                  background: '#111111',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <div className="w-full sm:w-[150px] h-[150px] shrink-0 rounded-lg overflow-hidden relative">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-xl font-semibold text-[#F5F5F5]">{founder.name}</h4>
                      <a
                        href={founder.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#A3A3A3] hover:text-[#4ADE80] transition-colors duration-300"
                        aria-label={`${founder.name} LinkedIn`}
                      >
                        <Linkedin size={20} />
                      </a>
                    </div>
                    <p className="text-sm font-medium mt-1" style={{ color: '#4ADE80' }}>
                      {founder.role}
                    </p>
                    <p className="text-sm mt-3" style={{ color: '#A3A3A3', lineHeight: 1.5 }}>
                      { }
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advisors */}
        <div>
          <h3 className="team-header text-xl font-medium mb-8 opacity-0 text-center" style={{ color: '#F5F5F5' }}>
            Advisors
          </h3>
          <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advisors.map((advisor, i) => (
              <div
                key={i}
                className="team-card p-6 rounded-xl flex flex-col items-center text-center opacity-0 hover:shadow-glow transition-all duration-300"
                style={{
                  background: '#111111',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <div className="w-[100px] h-[100px] rounded-full overflow-hidden mb-4 border-2 border-white/10">
                  <img
                    src={advisor.image}
                    alt={advisor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg font-semibold text-[#F5F5F5]">{advisor.name}</h4>
                <p className="text-sm font-medium mt-1" style={{ color: '#4ADE80' }}>
                  {advisor.role}
                </p>
                <p className="text-xs mt-2" style={{ color: '#A3A3A3' }}>
                  {advisor.affiliation}
                </p>
                <a
                  href={advisor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A3A3A3] hover:text-[#4ADE80] transition-colors duration-300 mt-4"
                  aria-label={`${advisor.name} LinkedIn`}
                >
                  <Linkedin size={18} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
