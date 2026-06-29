import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';

const slides = [
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80',
    title: 'The Concrete Pavilion',
    location: 'Valle de Bravo, Mexico',
    year: '2024'
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80',
    title: 'Glass House Residences',
    location: 'Kyoto, Japan',
    year: '2023'
  },
  {
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80',
    title: 'Amalfi Coast Villa',
    location: 'Positano, Italy',
    year: '2025'
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=80',
    title: 'The Brutalist Retreat',
    location: 'Zurich, Switzerland',
    year: '2024'
  },
  {
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80',
    title: 'Woodland Sanctuary',
    location: 'Portland, USA',
    year: '2022'
  }
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  // Magnetic Button Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { damping: 15, stiffness: 150 });
  const springY = useSpring(mouseY, { damping: 15, stiffness: 150 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;
    
    // Magnetic pull (35% of offset)
    mouseX.set(x * 0.35);
    mouseY.set(y * 0.35);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });

      slides.forEach((_, index) => {
        const slideClass = `.hero-slide-${index}`;
        
        tl.set(slideClass, { opacity: 0, scale: 1.05, x: 0 })
          .call(() => {
            setActiveIndex(index);
          })
          .to(slideClass, { 
            opacity: 1, 
            duration: 1.5, 
            ease: 'power2.inOut' 
          })
          .to(slideClass, { 
            scale: 1.12, 
            x: index % 2 === 0 ? -25 : 25, 
            duration: 6, 
            ease: 'none' 
          }, '<')
          .fromTo('.progress-fill', 
            { scaleY: 0 }, 
            { scaleY: 1, duration: 6, ease: 'none', transformOrigin: 'top center' }, 
            '<'
          )
          .to(slideClass, { 
            opacity: 0, 
            duration: 1.5, 
            ease: 'power2.inOut' 
          }, '>-1.5');
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Framer Motion word anim
  const headlineWords = "Spaces That Remember You".split(" ");
  const listContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.4
      }
    }
  };

  const wordItem = {
    hidden: { y: '100%', opacity: 0 },
    show: { 
      y: '0%', 
      opacity: 1, 
      transition: { 
        duration: 0.9, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col justify-between bg-brand-charcoal text-brand-cream"
    >
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`hero-slide-${i} absolute inset-0 bg-cover bg-center pointer-events-none opacity-0`}
            style={{ 
              backgroundImage: `linear-gradient(to bottom, rgba(18, 18, 18, 0.5), rgba(18, 18, 18, 0.7)), url(${slide.url})` 
            }}
          />
        ))}
      </div>

      {/* Navigation Header */}
      <header className="relative z-10 w-full px-8 md:px-16 py-6 flex justify-between items-center border-b border-brand-cream/10 backdrop-blur-[2px]">
        <div className="text-xl md:text-2xl font-serif tracking-widest uppercase">
          Elysian
        </div>
        <div className="hidden md:flex gap-10 text-sm tracking-widest uppercase">
          <a href="#featured" className="hover:text-brand-accent transition-colors duration-300">Portfolios</a>
          <a href="#manifesto" className="hover:text-brand-accent transition-colors duration-300">Manifesto</a>
          <a href="#map" className="hover:text-brand-accent transition-colors duration-300">Neighborhoods</a>
          <a href="#contact" className="hover:text-brand-accent transition-colors duration-300">Inquire</a>
        </div>
        <div className="text-xs uppercase tracking-widest hairline-border border-brand-cream/20 px-4 py-2 hover:bg-brand-cream hover:text-brand-charcoal transition-all duration-300 cursor-pointer">
          Inquire
        </div>
      </header>

      {/* Main Text Content */}
      <div className="relative z-10 w-full px-8 md:px-16 flex flex-col md:flex-row md:items-end justify-between mb-auto mt-24 md:mt-32 gap-8">
        <div className="max-w-3xl">
          <motion.h1 
            variants={listContainer}
            initial="hidden"
            animate="show"
            className="text-5xl md:text-8xl font-serif font-light leading-none tracking-tight mb-6"
          >
            {headlineWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-3 md:mr-5 py-2">
                <motion.span variants={wordItem} className="inline-block">
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-brand-cream/70 text-base md:text-lg max-w-md font-light leading-relaxed mb-8"
          >
            We curate architectural expressions that translate space into memory. Uncompromising design for individuals who live intentionally.
          </motion.p>

          {/* Magnetic CTA */}
          <div className="inline-block">
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ x: springX, y: springY }}
              className="relative p-4 cursor-pointer group"
            >
              <div className="absolute inset-0 border border-brand-cream/20 group-hover:border-brand-accent transition-colors duration-300" />
              <button className="flex items-center gap-3 px-6 py-3 text-xs md:text-sm uppercase tracking-widest bg-brand-accent text-brand-cream font-medium pointer-events-none transition-all duration-300">
                Explore Legacies
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Sidebar Info Overlay for active slide */}
        <div className="flex flex-col text-right font-light text-sm text-brand-cream/80 md:w-80 gap-1 border-t border-brand-cream/10 pt-4 md:border-t-0 md:pt-0">
          <div className="font-serif text-lg text-brand-cream">{slides[activeIndex].title}</div>
          <div>{slides[activeIndex].location}</div>
          <div className="text-xs text-brand-cream/50 mt-1">Archived {slides[activeIndex].year}</div>
        </div>
      </div>

      {/* Vertical Progress Line (Right Edge) */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4">
        <span className="text-[10px] tracking-widest uppercase text-brand-cream/40 font-mono">0{activeIndex + 1}</span>
        <div className="w-[1px] h-32 bg-brand-cream/15 relative">
          <div className="progress-fill absolute top-0 left-0 w-full h-full bg-brand-accent scale-y-0" />
        </div>
        <span className="text-[10px] tracking-widest uppercase text-brand-cream/40 font-mono">05</span>
      </div>

      {/* Infinite Scrolling Ticker (Bottom) */}
      <div className="relative z-10 w-full py-4 border-t border-brand-cream/10 bg-brand-charcoal/40 backdrop-blur-sm overflow-hidden select-none">
        <div className="flex whitespace-nowrap animate-marquee">
          <div className="flex gap-16 text-xs uppercase tracking-widest text-brand-cream/50 pr-16 font-light">
            <span>240+ Properties Closed</span>
            <span className="text-brand-accent">•</span>
            <span>12 Years of Curation</span>
            <span className="text-brand-accent">•</span>
            <span>4 Selected Cities</span>
            <span className="text-brand-accent">•</span>
            <span>$1.2B under management</span>
            <span className="text-brand-accent">•</span>
            <span>Architectural Legacies</span>
            <span className="text-brand-accent">•</span>
          </div>
          <div className="flex gap-16 text-xs uppercase tracking-widest text-brand-cream/50 pr-16 font-light">
            <span>240+ Properties Closed</span>
            <span className="text-brand-accent">•</span>
            <span>12 Years of Curation</span>
            <span className="text-brand-accent">•</span>
            <span>4 Selected Cities</span>
            <span className="text-brand-accent">•</span>
            <span>$1.2B under management</span>
            <span className="text-brand-accent">•</span>
            <span>Architectural Legacies</span>
            <span className="text-brand-accent">•</span>
          </div>
        </div>
      </div>
    </section>
  );
}
