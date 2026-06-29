import React, { useEffect, useRef, useState } from 'react';
import gsap from 'react-dom'; // Wait! import gsap from 'gsap' is correct.
import { ArrowUpRight } from 'lucide-react';
import gsapCore from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsapCore.registerPlugin(ScrollTrigger);

const properties = [
  {
    id: '01',
    title: 'The Monolith',
    location: 'Reykjavik, Iceland',
    price: '$3,400,000',
    beds: '3',
    baths: '3.5',
    area: '3,800 sq ft',
    desc: 'A concrete block rising from volcanic sands, framing massive glaciers through raw geometric apertures.',
    url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '02',
    title: 'The Timber Pavilion',
    location: 'Kyoto, Japan',
    price: '$4,100,000',
    beds: '4',
    baths: '4',
    area: '4,200 sq ft',
    desc: 'Interlocking raw cedar beams suspended over black reflecting pools and moss gardens.',
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '03',
    title: 'Canyon Ridge House',
    location: 'Sedona, Arizona',
    price: '$2,850,000',
    beds: '3',
    baths: '3',
    area: '3,500 sq ft',
    desc: 'Terracotta pigmented concrete embedded directly into crimson rock shelves, blending into the red horizon.',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '04',
    title: 'Aethel Cliffside',
    location: 'Amalfi Coast, Italy',
    price: '$6,200,000',
    beds: '5',
    baths: '6',
    area: '5,900 sq ft',
    desc: 'Stark white local stone cantilevered 150 meters above the Mediterranean crests, open to sea breezes.',
    url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
  }
];

export default function FeaturedProperties() {
  const [activeCard, setActiveCard] = useState(0);
  const triggerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const pinEl = triggerRef.current;
    const scrollEl = scrollRef.current;

    const ctx = gsapCore.context(() => {
      const scrollWidth = scrollEl.scrollWidth;
      const viewportWidth = window.innerWidth;
      const pinDistance = scrollWidth - viewportWidth;

      if (pinDistance <= 0) return;

      // Pinned horizontal translate animation
      const horizontalAnimation = gsapCore.fromTo(scrollEl,
        { x: 0 },
        {
          x: -pinDistance,
          ease: 'none',
          scrollTrigger: {
            trigger: pinEl,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${pinDistance}`,
            onUpdate: (self) => {
              const progress = self.progress;
              const index = Math.min(
                Math.floor(progress * properties.length), 
                properties.length - 1
              );
              setActiveCard(index);
            },
            invalidateOnRefresh: true,
          }
        }
      );

      // Card image parallax relative to horizontal scroll
      const images = gsapCore.utils.toArray('.card-image');
      images.forEach((img) => {
        gsapCore.fromTo(img,
          { xPercent: -12 },
          {
            xPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: img,
              containerAnimation: horizontalAnimation,
              start: 'left right',
              end: 'right left',
              scrub: true,
            }
          }
        );
      });

    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef} id="featured" className="w-full bg-brand-cream-dark/20 overflow-hidden">
      <div className="w-full h-screen flex flex-col justify-between relative py-12">
        
        {/* Section Header */}
        <div className="px-8 md:px-16 flex justify-between items-end z-10 w-full">
          <div>
            <div className="text-xs uppercase tracking-widest text-brand-accent font-mono mb-2">
              Curated Portfolios / 02
            </div>
            <h2 className="text-3xl md:text-5xl font-light font-serif">
              Featured Legacies
            </h2>
          </div>
          
          {/* Active Counter Display */}
          <div className="font-mono text-lg md:text-2xl tracking-widest text-brand-charcoal/40">
            <span className="text-brand-charcoal font-semibold">0{activeCard + 1}</span> / 0{properties.length}
          </div>
        </div>

        {/* Horizontal Container (scrolled via GSAP) */}
        <div 
          ref={scrollRef} 
          className="flex flex-nowrap items-center px-8 md:px-16 gap-12 md:gap-16 w-max my-auto relative"
        >
          {properties.map((prop, i) => (
            <div 
              key={prop.id}
              className="property-card w-[80vw] md:w-[650px] shrink-0 hairline-border border-brand-charcoal/20 bg-brand-cream flex flex-col justify-between aspect-[3/4] md:aspect-[4/5] p-6 relative group cursor-pointer"
            >
              {/* Image Frame (Parallax) */}
              <div className="w-full h-[60%] overflow-hidden relative border-b border-brand-charcoal/10">
                <img 
                  src={prop.url} 
                  alt={prop.title}
                  className="card-image absolute inset-0 w-[124%] h-full object-cover left-[-12%]"
                />
              </div>

              {/* Text Info */}
              <div className="flex flex-col flex-grow justify-between pt-6">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl md:text-3xl font-serif font-light">{prop.title}</h3>
                    <div className="text-lg md:text-xl font-light text-brand-accent">{prop.price}</div>
                  </div>
                  
                  <div className="text-xs tracking-wider text-brand-charcoal/40 uppercase mb-4">
                    {prop.location}
                  </div>

                  <p className="text-sm text-brand-charcoal/70 font-light leading-relaxed mb-6 line-clamp-2 md:line-clamp-none">
                    {prop.desc}
                  </p>
                </div>

                {/* Spec details row */}
                <div className="flex justify-between items-center border-t border-brand-charcoal/10 pt-4 text-xs font-mono tracking-wider text-brand-charcoal/50">
                  <div className="flex gap-4">
                    <span>{prop.beds} Beds</span>
                    <span>•</span>
                    <span>{prop.baths} Baths</span>
                    <span>•</span>
                    <span>{prop.area}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-brand-charcoal group-hover:text-brand-accent transition-colors duration-300 font-sans text-[11px] uppercase tracking-widest">
                    View Studio
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Ending Spacer/CTA Card */}
          <div className="w-[50vw] md:w-[400px] shrink-0 h-[60vh] flex flex-col justify-center items-start p-8 relative">
            <div className="text-xs uppercase tracking-widest text-brand-accent font-mono mb-4">
              Tailored Search
            </div>
            <h3 className="text-3xl md:text-4xl font-serif font-light leading-tight mb-6">
              Seeking something completely unique?
            </h3>
            <p className="text-brand-charcoal/60 text-sm font-light leading-relaxed mb-8">
              We scout off-market structures and architectural estates across Europe and North America on a private commission basis.
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest border-b border-brand-charcoal pb-1 hover:text-brand-accent hover:border-brand-accent transition-colors duration-300"
            >
              Request Private Scouting
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="px-8 md:px-16 flex justify-between items-center text-[10px] tracking-widest text-brand-charcoal/40 uppercase z-10 w-full">
          <div>Drag or scroll vertically to translate gallery</div>
          <div>ESTATES OF EMOTION</div>
        </div>

      </div>
    </div>
  );
}
