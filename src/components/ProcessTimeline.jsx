import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: 1,
    title: 'Curate',
    subtitle: 'Step 01 / Alignment',
    desc: 'We analyze your spatial patterns, light preferences, and lifestyle ritual. Rather than showing you lists, we filter the city for structures that reflect your design sensibilities.'
  },
  {
    id: 2,
    title: 'Collaborate',
    subtitle: 'Step 02 / Analysis',
    desc: 'We partner with architectural historians and material scientists to audit the structural integrity, historical context, and local materials of the selected properties.'
  },
  {
    id: 3,
    title: 'Acquire',
    subtitle: 'Step 03 / Discretion',
    desc: 'Our transaction methods bypass the standard friction of real estate deals. We secure off-market holdings directly with absolute privacy and bespoke financial structure.'
  },
  {
    id: 4,
    title: 'Tailor',
    subtitle: 'Step 04 / Realization',
    desc: 'We introduce selected interior designers and landscape architects to format the space to your rhythms, ensuring it matches your personal legacy.'
  }
];

export default function ProcessTimeline() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current;
      const container = containerRef.current;
      
      // Set line height dynamically in DOM to match section height exactly
      const containerHeight = container.clientHeight;
      path.setAttribute('d', `M 1 0 L 1 ${containerHeight}`);
      
      const bgLine = container.querySelector('.timeline-bg-line');
      if (bgLine) {
        bgLine.setAttribute('y2', containerHeight);
      }

      const pathLength = path.getTotalLength();
      
      // Setup dasharray
      path.style.strokeDasharray = pathLength;
      path.style.strokeDashoffset = pathLength;

      // 1. Animate SVG line drawing on scroll
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top 30%',
          end: 'bottom 70%',
          scrub: 0.5,
        }
      });

      // 2. Animate nodes (dots) turning active
      steps.forEach((step) => {
        const dotId = `#timeline-dot-${step.id}`;
        gsap.to(dotId, {
          backgroundColor: '#C85A32',
          borderColor: '#C85A32',
          scale: 1.3,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: `#timeline-step-${step.id}`,
            start: 'top 50%',
            end: 'top 45%',
            scrub: true,
          }
        });

        // Animate content card entry (alternating sides)
        const isOdd = step.id % 2 !== 0;
        gsap.fromTo(`#timeline-content-${step.id}`,
          { 
            opacity: 0, 
            x: isOdd ? -50 : 50 
          },
          { 
            opacity: 1, 
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: `#timeline-step-${step.id}`,
              start: 'top 75%',
              end: 'top 45%',
              scrub: 1,
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="timeline-container w-full min-h-screen bg-brand-cream-dark/10 py-24 md:py-36 px-8 md:px-16 relative border-b border-brand-charcoal/10"
    >
      <div className="max-w-5xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center mb-24 md:mb-32">
          <div className="text-xs uppercase tracking-widest text-brand-accent font-mono mb-2">
            The Method / 04
          </div>
          <h2 className="text-3xl md:text-5xl font-light font-serif">
            Bespoke Acquisition Path
          </h2>
          <p className="text-sm text-brand-charcoal/50 font-light mt-4 max-w-md mx-auto leading-relaxed">
            A linear progression defined by rigorous architectural assessment and quiet transactions.
          </p>
        </div>

        {/* Timeline body wrapper */}
        <div className="relative w-full">
          
          {/* Vertical SVG Line (Centered on Desktop, Left on Mobile) */}
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 h-full w-[2px] z-0">
            <svg className="w-full h-full overflow-hidden" fill="none">
              {/* Background gray line */}
              <line 
                className="timeline-bg-line"
                x1="1" 
                y1="0" 
                x2="1" 
                y2="100%" 
                stroke="rgba(18, 18, 18, 0.08)" 
                strokeWidth="1.5" 
              />
              {/* Drawing active line */}
              <path
                ref={pathRef}
                d="M 1 0 L 1 1000" // overridden in JS immediately
                stroke="#C85A32"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>

          {/* Timeline steps */}
          <div className="flex flex-col gap-24 md:gap-32 w-full relative z-10">
            {steps.map((step) => {
              const isOdd = step.id % 2 !== 0;
              return (
                <div 
                  key={step.id} 
                  id={`timeline-step-${step.id}`}
                  className="flex flex-col md:flex-row w-full items-start md:items-center relative"
                >
                  
                  {/* Left Side (Desktop: Content or Empty) */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 md:pr-16 text-left ${isOdd ? 'md:text-right' : 'md:opacity-0 md:pointer-events-none'}`}>
                    {isOdd && (
                      <div id={`timeline-content-${step.id}`} className="flex flex-col gap-2">
                        <span className="text-xs font-mono tracking-widest text-brand-charcoal/40 uppercase">{step.subtitle}</span>
                        <h3 className="text-2xl md:text-3xl font-serif font-light">{step.title}</h3>
                        <p className="text-sm text-brand-charcoal/60 font-light leading-relaxed max-w-md ml-auto">
                          {step.desc}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Centered Node Dot Indicator */}
                  <div 
                    id={`timeline-dot-${step.id}`}
                    className="absolute left-[11px] md:left-1/2 -translate-x-1/2 w-3.5 h-3.5 border-2 border-brand-charcoal/30 bg-brand-cream rounded-full transition-all duration-300 z-20"
                  />

                  {/* Right Side (Desktop: Content or Empty) */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-16 text-left ${!isOdd ? '' : 'md:opacity-0 md:pointer-events-none'}`}>
                    {!isOdd && (
                      <div id={`timeline-content-${step.id}`} className="flex flex-col gap-2">
                        <span className="text-xs font-mono tracking-widest text-brand-charcoal/40 uppercase">{step.subtitle}</span>
                        <h3 className="text-2xl md:text-3xl font-serif font-light">{step.title}</h3>
                        <p className="text-sm text-brand-charcoal/60 font-light leading-relaxed max-w-md">
                          {step.desc}
                        </p>
                      </div>
                    )}
                    
                    {/* Fallback for Mobile (shows odd step content on the right too, since left is hidden on mobile) */}
                    {isOdd && (
                      <div className="md:hidden flex flex-col gap-2 mt-2">
                        <span className="text-xs font-mono tracking-widest text-brand-charcoal/40 uppercase">{step.subtitle}</span>
                        <h3 className="text-2xl font-serif font-light">{step.title}</h3>
                        <p className="text-xs text-brand-charcoal/60 font-light leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
