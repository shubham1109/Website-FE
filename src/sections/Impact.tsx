import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 1.8, suffix: '%', label: 'of Global CO2 from Ammonia Production', decimals: 1 },
  { value: 98, suffix: '%', label: 'Reduction with Our Technology', decimals: 0 },
  { value: 200, suffix: 'M', label: 'Tons of Grey Ammonia Produced Yearly', decimals: 0 },
  { value: 0, suffix: '', label: 'Carbon in Green Ammonia', decimals: 0 },
];

const Impact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const statsEl = statsRef.current;
    const chartEl = chartRef.current;
    if (!section || !statsEl || !chartEl) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        section.querySelectorAll('.impact-header'),
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

      // Stats count-up animation
      stats.forEach((stat, i) => {
        const el = numberRefs.current[i];
        if (!el) return;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsEl,
            start: 'top 80%',
          },
          onUpdate: () => {
            if (stat.decimals > 0) {
              el.textContent = obj.val.toFixed(stat.decimals) + stat.suffix;
            } else {
              el.textContent = Math.round(obj.val) + stat.suffix;
            }
          },
        });
      });

      // Chart draw animation
      const chartBars = chartEl.querySelectorAll('.chart-bar');
      gsap.fromTo(
        chartBars,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: 'power3.out',
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: chartEl,
            start: 'top 80%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="w-full py-[120px] md:py-[120px]"
      style={{ background: '#0A0A0A' }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section header */}
        <div className="text-center">
          <span
            className="impact-header block text-xs font-medium tracking-[0.05em] uppercase opacity-0"
            style={{ color: '#4ADE80' }}
          >
            Impact
          </span>
          <h2
            className="impact-header mt-4 font-semibold tracking-tight opacity-0"
            style={{
              fontSize: 'clamp(36px, 3.5vw, 48px)',
              lineHeight: 1.2,
              color: '#F5F5F5',
            }}
          >
            Numbers That Matter
          </h2>
        </div>

        {/* Stats Row */}
        <div
          ref={statsRef}
          className="flex flex-wrap justify-center md:justify-between gap-8 md:gap-4 mt-16"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center flex-1 min-w-[200px]">
              <span
                ref={(el) => { numberRefs.current[i] = el; }}
                className="block font-mono text-[48px]"
                style={{ color: '#4ADE80' }}
              >
                0{stat.suffix}
              </span>
              <span
                className="block mt-2 text-sm"
                style={{ color: '#A3A3A3' }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Data Visualization */}
        <div
          ref={chartRef}
          className="mt-16 p-8 md:p-12 rounded-lg"
          style={{
            background: '#111111',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <h3
            className="text-lg font-medium mb-8"
            style={{ color: '#F5F5F5' }}
          >
            Ammonia Production: CO2 Emissions Comparison
          </h3>

          {/* Grey Ammonia Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm" style={{ color: '#A3A3A3' }}>
                Grey Ammonia (Haber-Bosch + SMR)
              </span>
              <span className="text-sm font-mono" style={{ color: '#A3A3A3' }}>
                ~1.9 t CO2 / t NH3
              </span>
            </div>
            <div
              className="w-full h-8 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              <div
                className="chart-bar h-full rounded-full"
                style={{
                  width: '100%',
                  background: 'linear-gradient(90deg, #525252, #737373)',
                }}
              />
            </div>
          </div>

          {/* Blue Ammonia Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm" style={{ color: '#A3A3A3' }}>
                Blue Ammonia (Haber-Bosch + CCS)
              </span>
              <span className="text-sm font-mono" style={{ color: '#A3A3A3' }}>
                ~0.4 t CO2 / t NH3
              </span>
            </div>
            <div
              className="w-full h-8 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              <div
                className="chart-bar h-full rounded-full"
                style={{
                  width: '25%',
                  background: 'linear-gradient(90deg, #2563EB, #3B82F6)',
                }}
              />
            </div>
          </div>

          {/* Green Ammonia Bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium" style={{ color: '#4ADE80' }}>
                Green Ammonia (Faraday Non-Thermal Plasma)
              </span>
              <span className="text-sm font-mono" style={{ color: '#4ADE80' }}>
                ~0.0 t CO2 / t NH3
              </span>
            </div>
            <div
              className="w-full h-8 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              <div
                className="chart-bar h-full rounded-full"
                style={{
                  width: '2%',
                  background: 'linear-gradient(90deg, #16A34A, #4ADE80)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
