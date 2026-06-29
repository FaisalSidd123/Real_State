import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Custom inline count-up animator using GSAP ScrollTrigger
function CountUp({ to, duration = 2.5, decimals = 0, suffix = "" }) {
  const [value, setValue] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const obj = { val: 0 };
    const scrollInstance = gsap.to(obj, {
      val: to,
      duration: duration,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: elementRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        setValue(obj.val);
      }
    });

    return () => {
      scrollInstance.kill();
    };
  }, [to, duration]);

  // Format with commas
  const formatted = value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <span ref={elementRef} className="font-serif text-brand-accent text-4xl md:text-7xl font-light mx-2 inline-block">
      {formatted}{suffix}
    </span>
  );
}

export default function MarketInsights() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle fade in for the whole block
      gsap.fromTo('.insight-paragraph',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.insight-paragraph',
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="w-full min-h-[70vh] bg-brand-cream py-24 md:py-36 px-8 md:px-16 flex flex-col justify-center border-b border-brand-charcoal/10 relative"
    >
      {/* Editorial Decorative Grid lines */}
      <div className="absolute top-0 left-16 w-[1px] h-full bg-brand-charcoal/5 hidden md:block" />
      <div className="absolute top-0 right-16 w-[1px] h-full bg-brand-charcoal/5 hidden md:block" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        
        <div className="text-left mb-16">
          <div className="text-xs uppercase tracking-widest text-brand-accent font-mono mb-2">
            Market Footprint / 07
          </div>
          <h2 className="text-xl md:text-2xl font-serif text-brand-charcoal/40 uppercase tracking-widest">
            A Legacy In Numbers
          </h2>
        </div>

        {/* Integrated Editorial Stats Sentence */}
        <div className="insight-paragraph text-left">
          <p className="text-3xl md:text-5xl font-serif font-light text-brand-charcoal leading-snug md:leading-relaxed">
            Over 
            <CountUp to={1240} /> 
            families discovered private sanctuaries in the past 18 months, representing 
            <CountUp to={4.8} decimals={1} suffix="B" /> 
            in custom architectural value across 
            <CountUp to={4} /> 
            global regions, while maintaining a 
            <CountUp to={98} suffix="%" /> 
            private client retention rating.
          </p>
        </div>

        {/* Footnote details */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-20 border-t border-brand-charcoal/15 pt-8 text-xs font-mono text-brand-charcoal/50 gap-4">
          <div>DATA COLLECTED Q1 2024 – Q2 2026. COMPRISES OFF-MARKET TRANSACTIONS.</div>
          <div className="hover:text-brand-accent transition-colors cursor-pointer uppercase tracking-widest border-b border-brand-charcoal/20 pb-0.5">
            Download Annual Register (PDF)
          </div>
        </div>

      </div>
    </section>
  );
}
