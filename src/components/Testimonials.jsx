import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const snippets = [
  {
    quote: "A rare agency that understands space as an emotional container.",
    author: "Liam O'Connor",
    role: "Industrialist"
  },
  {
    quote: "They did not sell us a house; they transferred a piece of design history.",
    author: "Marcella Rossi",
    role: "Art Curator"
  },
  {
    quote: "Bespoke acquisition at its most refined. Quiet, swift, and absolute.",
    author: "Sven Lindqvist",
    role: "Architectural Patron"
  },
  {
    quote: "Elysian aligns architecture with personal legacy in a way that feels organic.",
    author: "Hiroshi Tanaka",
    role: "Sculptor"
  },
  {
    quote: "Their historical conversion audits saved us millions and secured a masterpiece.",
    author: "Elizabeth Sterling",
    role: "Restoration Patron"
  }
];

export default function Testimonials() {
  const marqueeRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    // GSAP Infinite Scroll Loop
    tweenRef.current = gsap.to(el, {
      xPercent: -50,
      ease: 'none',
      duration: 32,
      repeat: -1
    });

    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0, duration: 0.5, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.8, ease: 'power2.out' });
    }
  };

  // Mocking 15 audio waves for the waveform spotlight
  const waveBars = Array.from({ length: 24 });

  return (
    <section 
      className="w-full min-h-screen bg-brand-cream-dark/10 py-24 px-8 md:px-16 flex flex-col justify-center gap-20 overflow-hidden border-b border-brand-charcoal/10"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-6 text-left">
        <div className="text-xs uppercase tracking-widest text-brand-accent font-mono">
          Reflections / 06
        </div>
        <h2 className="text-3xl md:text-5xl font-light font-serif">
          Verbal Artifacts
        </h2>
      </div>

      {/* Quote Snippets Marquee (GSAP scroll) */}
      <div 
        className="w-full relative overflow-hidden py-4 border-y border-brand-charcoal/15 cursor-pointer group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          ref={marqueeRef}
          className="flex whitespace-nowrap gap-12 w-max"
        >
          {/* First block */}
          <div className="flex gap-16 items-center">
            {snippets.map((snip, index) => (
              <div 
                key={`s1-${index}`} 
                className="flex flex-col gap-2 p-6 hairline-border border-brand-charcoal/15 bg-brand-cream w-80 md:w-96 shrink-0 relative"
              >
                <Quote className="absolute top-4 right-4 w-4 h-4 text-brand-accent/20" />
                <p className="text-sm font-light text-brand-charcoal/80 leading-relaxed italic pr-4 whitespace-normal">
                  "{snip.quote}"
                </p>
                <div className="flex gap-2 items-center text-[10px] font-mono tracking-wider text-brand-charcoal/40 uppercase mt-2 border-t border-brand-charcoal/10 pt-2">
                  <span className="text-brand-charcoal">{snip.author}</span>
                  <span>•</span>
                  <span>{snip.role}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Duplicated block for seamless wrap */}
          <div className="flex gap-16 items-center">
            {snippets.map((snip, index) => (
              <div 
                key={`s2-${index}`} 
                className="flex flex-col gap-2 p-6 hairline-border border-brand-charcoal/15 bg-brand-cream w-80 md:w-96 shrink-0 relative"
              >
                <Quote className="absolute top-4 right-4 w-4 h-4 text-brand-accent/20" />
                <p className="text-sm font-light text-brand-charcoal/80 leading-relaxed italic pr-4 whitespace-normal">
                  "{snip.quote}"
                </p>
                <div className="flex gap-2 items-center text-[10px] font-mono tracking-wider text-brand-charcoal/40 uppercase mt-2 border-t border-brand-charcoal/10 pt-2">
                  <span className="text-brand-charcoal">{snip.author}</span>
                  <span>•</span>
                  <span>{snip.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Spotlight Testimonial with Audio Waveform (Asymmetric layout) */}
      <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center pt-8">
        
        {/* Waveform graphic (cols 1-4) */}
        <div className="md:col-span-4 flex flex-col justify-center items-center border border-brand-charcoal/20 bg-brand-cream p-8 aspect-square relative select-none">
          <div className="text-[10px] font-mono tracking-widest text-brand-charcoal/40 uppercase absolute top-4">
            Voice Recording / 09:12
          </div>
          
          {/* Pulse Waves */}
          <div className="flex items-center gap-1.5 h-24 mt-2">
            {waveBars.map((_, i) => (
              <motion.div
                key={i}
                className="w-[3px] bg-brand-accent rounded-full origin-center"
                style={{
                  height: i % 2 === 0 ? '16px' : '40px',
                }}
                animate={{
                  scaleY: [0.6, 2.4, 0.4, 1.8, 0.6],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2 + (i % 5) * 0.25,
                  ease: 'easeInOut',
                  delay: i * 0.04
                }}
              />
            ))}
          </div>
          
          <div className="text-[9px] font-mono tracking-wider text-brand-charcoal/50 uppercase absolute bottom-4">
            PLAYBACK ACTIVE · Bespoke Commission
          </div>
        </div>

        {/* Large Testimonial Quote (cols 5-12) */}
        <div className="md:col-span-8 text-left flex flex-col gap-6 pl-0 md:pl-8">
          <h3 className="font-serif text-2xl md:text-4xl font-light text-brand-charcoal leading-snug">
            "They understand that our acquisitions are not just assets. They are physical spaces where our children will grow, and where architectural legacies are born."
          </h3>
          
          <div className="flex flex-col gap-1 border-t border-brand-charcoal/15 pt-4">
            <span className="font-serif text-lg text-brand-charcoal">Dr. Julian Sterling</span>
            <span className="text-xs font-mono text-brand-charcoal/40 uppercase tracking-widest">
              Chairman, Sterling Architectural Foundation
            </span>
          </div>
        </div>

      </div>

    </section>
  );
}
