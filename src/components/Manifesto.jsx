import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const sectionRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text Reveal Animation line by line
      const lines = gsap.utils.toArray('.reveal-line');
      lines.forEach((line) => {
        gsap.fromTo(line, 
          { y: '100%', opacity: 0.1 },
          {
            y: '0%',
            opacity: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 85%',
              end: 'top 65%',
              scrub: 1,
            }
          }
        );
      });

      // 2. SVG Floorplan Self-Drawing Animation
      const paths = svgRef.current.querySelectorAll('path');
      paths.forEach((path) => {
        const length = path.getTotalLength();
        // Set initial state
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: svgRef.current,
            start: 'top 75%',
            end: 'bottom 40%',
            scrub: 1.5,
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="manifesto"
      ref={sectionRef}
      className="manifesto-section w-full min-h-screen bg-brand-cream py-24 md:py-36 px-8 md:px-16 flex flex-col justify-center border-b border-brand-charcoal/10"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
        
        {/* Left Side: Manifesto text (cols 1-8) */}
        <div className="lg:col-span-8 flex flex-col gap-6 text-left">
          <div className="text-xs uppercase tracking-widest text-brand-accent font-mono mb-2">
            Our Manifesto / 01
          </div>
          
          <div className="flex flex-col gap-4">
            <h2 className="line-wrapper overflow-hidden text-3xl md:text-5xl font-light font-serif leading-tight">
              <span className="reveal-line inline-block origin-left">
                We believe a home is not a coordinate
              </span>
            </h2>
            <h2 className="line-wrapper overflow-hidden text-3xl md:text-5xl font-light font-serif leading-tight">
              <span className="reveal-line inline-block origin-left">
                on a map, nor a generic asset to trade.
              </span>
            </h2>
            <h2 className="line-wrapper overflow-hidden text-3xl md:text-5xl font-light font-serif leading-tight">
              <span className="reveal-line inline-block origin-left">
                It is an extension of the self, a silent
              </span>
            </h2>
            <h2 className="line-wrapper overflow-hidden text-3xl md:text-5xl font-light font-serif leading-tight">
              <span className="reveal-line inline-block origin-left">
                witness to life, and a <span className="text-brand-accent">legacy of design</span>.
              </span>
            </h2>
            <h2 className="line-wrapper overflow-hidden text-3xl md:text-5xl font-light font-serif leading-tight">
              <span className="reveal-line inline-block origin-left">
                We align with those who seek architecture
              </span>
            </h2>
            <h2 className="line-wrapper overflow-hidden text-3xl md:text-5xl font-light font-serif leading-tight">
              <span className="reveal-line inline-block origin-left">
                that speaks in shapes and shadows,
              </span>
            </h2>
            <h2 className="line-wrapper overflow-hidden text-3xl md:text-5xl font-light font-serif leading-tight">
              <span className="reveal-line inline-block origin-left">
                crafting a <span className="text-brand-accent">quiet sanctuary</span> in a loud world.
              </span>
            </h2>
          </div>

          <p className="text-brand-charcoal/60 text-sm md:text-base font-light max-w-lg mt-8 leading-relaxed">
            Our agency is built for the few who value craftsmanship over convenience. We represent buildings that carry intention, history, and raw emotional resonance.
          </p>
        </div>

        {/* Right Side: Floorplan Drawing (cols 9-12) */}
        <div className="lg:col-span-4 flex justify-center lg:justify-end items-center">
          <div className="w-full max-w-[320px] lg:max-w-full aspect-square hairline-border border-brand-charcoal/20 p-8 flex items-center justify-center bg-brand-cream-dark/30">
            <svg
              ref={svgRef}
              viewBox="0 0 200 200"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-full h-full text-brand-charcoal/80"
            >
              {/* Outer Walls */}
              <path d="M 20 20 L 180 20 L 180 180 L 20 180 Z" />
              
              {/* Interior partitions */}
              <path d="M 20 80 L 110 80" />
              <path d="M 110 20 L 110 110" />
              <path d="M 70 80 L 70 180" />
              <path d="M 110 120 L 180 120" />
              
              {/* Doors (represented by arcs) */}
              <path d="M 110 80 A 30 30 0 0 1 110 110" strokeDasharray="2 2" />
              <path d="M 70 120 A 30 30 0 0 1 40 120" strokeDasharray="2 2" />
              <path d="M 140 120 A 30 30 0 0 1 140 150" strokeDasharray="2 2" />
              
              {/* Furniture / Architectural elements sketch */}
              {/* Minimalist pool grid representation */}
              <path d="M 125 35 L 165 35 L 165 65 L 125 65 Z" />
              <path d="M 125 42.5 L 165 42.5" strokeWidth="0.3" opacity="0.5" />
              <path d="M 125 50 L 165 50" strokeWidth="0.3" opacity="0.5" />
              <path d="M 125 57.5 L 165 57.5" strokeWidth="0.3" opacity="0.5" />
              
              {/* Stairs symbol */}
              <path d="M 30 30 L 60 30 M 30 38 L 60 38 M 30 46 L 60 46 M 30 54 L 60 54 M 30 62 L 60 62" />
              <path d="M 45 25 L 45 70" arrow-end="true" strokeWidth="0.5" />
              
              {/* Modern column grid */}
              <circle cx="90" cy="140" r="2.5" fill="currentColor" />
              <circle cx="130" cy="140" r="2.5" fill="currentColor" />
              <circle cx="90" cy="160" r="2.5" fill="currentColor" />
              <circle cx="130" cy="160" r="2.5" fill="currentColor" />
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
