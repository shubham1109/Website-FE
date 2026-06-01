import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Container, Leaf, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    icon: Zap,
    title: 'Non-Thermal Plasma Synthesis',
    desc: 'We synthesize ammonia directly from air and water. Designed for the renewable era, our technology operates near room temperature and pressure, offering unmatched flexibility to seamlessly integrate with intermittent green energy.',
  },
  {
    icon: Container,
    title: 'Modular by Design',
    desc: 'Stackable reactor units deployable anywhere \u2014 from farm co-ops to offshore platforms. Scale from kilograms to tons.',
  },
  {
    icon: Leaf,
    title: 'Zero Carbon Intensity',
    desc: 'Powered by renewable electricity, our process emits no CO2. Lifecycle emissions near zero.',
  },
  {
    icon: TrendingUp,
    title: 'Cost Trajectory',
    desc: 'As renewable energy becomes more affordable, we are bridging the economic gap and producing directly at the point of consumption to eliminate supply chain friction.',
  },
];

const Technology = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cardsEl = cardsRef.current;
    if (!section || !cardsEl) return;

    const ctx = gsap.context(() => {
      // Section header animation
      gsap.fromTo(
        section.querySelectorAll('.tech-header'),
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

      // Cards stagger animation
      gsap.fromTo(
        cardsEl.querySelectorAll('.tech-card'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsEl,
            start: 'top 80%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="technology"
      ref={sectionRef}
      className="w-full py-[120px] md:py-[120px]"
      style={{ background: '#0A0A0A' }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section header */}
        <div className="text-center">
          <span
            className="tech-header block text-xs font-medium tracking-[0.05em] uppercase opacity-0"
            style={{ color: '#4ADE80' }}
          >
            Our Technology
          </span>
          <h2
            className="tech-header mt-4 font-semibold tracking-tight opacity-0"
            style={{
              fontSize: 'clamp(36px, 3.5vw, 48px)',
              lineHeight: 1.2,
              color: '#F5F5F5',
            }}
          >
            The Science of Sustainable Synthesis
          </h2>
          <p
            className="tech-header mt-4 mx-auto max-w-[640px] opacity-0"
            style={{ color: '#A3A3A3', fontSize: '16px', lineHeight: 1.6 }}
          >
            Our proprietary non-thermal plasma synthesis reactors combine nitrogen from the air
            with hydrogen from water &mdash; powered entirely by renewable electricity.
            No fossil fuels. No carbon emissions.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16"
        >
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="tech-card p-10 rounded-lg opacity-0 transition-all duration-300 hover:shadow-glow"
                style={{
                  background: '#111111',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <Icon size={40} color="#4ADE80" strokeWidth={1.5} />
                <h3
                  className="mt-6 font-semibold text-2xl tracking-tight"
                  style={{ color: '#F5F5F5' }}
                >
                  {card.title}
                </h3>
                <p
                  className="mt-3"
                  style={{ color: '#A3A3A3', fontSize: '16px', lineHeight: 1.6 }}
                >
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Technology;
