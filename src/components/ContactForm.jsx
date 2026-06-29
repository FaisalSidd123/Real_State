import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight, Check } from 'lucide-react';

const thumbnailSlides = [
  {
    url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
    caption: 'Material Textures: Board-formed Concrete'
  },
  {
    url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
    caption: 'Light Play: Sunrise over Travertine'
  },
  {
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    caption: 'Vertical Transition: Suspended Staircase'
  }
];

export default function ContactForm() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const rightContainerRef = useRef(null);

  // Form Fields Focus States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    territory: '',
    message: ''
  });

  const [focusStates, setFocusStates] = useState({
    name: false,
    email: false,
    territory: false,
    message: false
  });

  const handleFocus = (field) => setFocusStates(prev => ({ ...prev, [field]: true }));
  const handleBlur = (field) => setFocusStates(prev => ({ ...prev, [field]: false }));
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', territory: '', message: '' });
    }, 4000);
  };

  // GSAP Automatic Crossfade for Right Panel Images
  useEffect(() => {
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray('.contact-slide');
      const timeline = gsap.timeline({ repeat: -1 });

      slides.forEach((_, i) => {
        const slideClass = `.contact-slide-${i}`;
        
        timeline
          .set(slideClass, { opacity: 0, scale: 1.04 })
          .call(() => setActiveSlide(i))
          .to(slideClass, { opacity: 1, duration: 1.2, ease: 'power2.inOut' })
          .to(slideClass, { scale: 1.1, duration: 4, ease: 'none' }, '<')
          .to(slideClass, { opacity: 0, duration: 1.2, ease: 'power2.inOut' }, '>-1.2');
      });
    }, rightContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="contact" 
      className="w-full min-h-screen bg-brand-cream-dark/10 py-24 md:py-36 px-8 md:px-16 flex flex-col justify-center border-b border-brand-charcoal/10"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
        
        {/* Left Side: Minimal Contact Form (cols 1-6) */}
        <div className="lg:col-span-6 text-left flex flex-col justify-between py-2">
          
          <div className="flex flex-col gap-4">
            <div className="text-xs uppercase tracking-widest text-brand-accent font-mono mb-2">
              Inquire / 08
            </div>
            <h2 className="text-3xl md:text-5xl font-light font-serif mb-4">
              Begin Your Inquiry
            </h2>
            <p className="text-sm text-brand-charcoal/60 font-light max-w-md leading-relaxed mb-8">
              Initiate a confidential scouting brief. Our curators will review your architectural desires and contact you within 24 hours.
            </p>
          </div>

          {/* Contact form markup */}
          {isSubmitted ? (
            <div className="hairline-border border-brand-accent p-8 bg-brand-accent/5 flex flex-col gap-4 items-start my-auto">
              <div className="w-10 h-10 rounded-full bg-brand-accent text-brand-cream flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl font-light text-brand-charcoal">
                Inquiry Brief Logged
              </h3>
              <p className="text-xs text-brand-charcoal/60 leading-relaxed font-mono">
                Your coordinates have been registered. A private curator will call your credentials shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              
              {/* Field 1: Name */}
              <div className="relative border-b border-brand-charcoal/20 pb-2">
                <label 
                  htmlFor="name"
                  className={`absolute left-0 top-0 transition-all duration-300 pointer-events-none text-xs font-mono tracking-wider uppercase ${
                    focusStates.name || formData.name 
                      ? '-translate-y-6 text-brand-accent text-[10px]' 
                      : 'translate-y-0 text-brand-charcoal/40'
                  }`}
                >
                  Your Identity
                </label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  onFocus={() => handleFocus('name')}
                  onBlur={() => handleBlur('name')}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-none outline-none text-brand-charcoal text-sm font-light pt-2"
                />
                <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-brand-accent origin-center scale-x-0 transition-transform duration-500 ${
                  focusStates.name ? 'scale-x-100' : ''
                }`} />
              </div>

              {/* Field 2: Email */}
              <div className="relative border-b border-brand-charcoal/20 pb-2">
                <label 
                  htmlFor="email"
                  className={`absolute left-0 top-0 transition-all duration-300 pointer-events-none text-xs font-mono tracking-wider uppercase ${
                    focusStates.email || formData.email 
                      ? '-translate-y-6 text-brand-accent text-[10px]' 
                      : 'translate-y-0 text-brand-charcoal/40'
                  }`}
                >
                  Secure Coordinate (Email)
                </label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-none outline-none text-brand-charcoal text-sm font-light pt-2"
                />
                <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-brand-accent origin-center scale-x-0 transition-transform duration-500 ${
                  focusStates.email ? 'scale-x-100' : ''
                }`} />
              </div>

              {/* Field 3: Territory */}
              <div className="relative border-b border-brand-charcoal/20 pb-2">
                <label 
                  htmlFor="territory"
                  className={`absolute left-0 top-0 transition-all duration-300 pointer-events-none text-xs font-mono tracking-wider uppercase ${
                    focusStates.territory || formData.territory 
                      ? '-translate-y-6 text-brand-accent text-[10px]' 
                      : 'translate-y-0 text-brand-charcoal/40'
                  }`}
                >
                  Preferred Territory
                </label>
                <select 
                  id="territory"
                  name="territory"
                  value={formData.territory}
                  onFocus={() => handleFocus('territory')}
                  onBlur={() => handleBlur('territory')}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-none outline-none text-brand-charcoal text-sm font-light pt-2 cursor-pointer appearance-none"
                >
                  <option value="" className="text-brand-charcoal/50 bg-brand-cream"></option>
                  <option value="cliffs" className="bg-brand-cream">The Cliffs (Brutalist Hills)</option>
                  <option value="bay" className="bg-brand-cream">West Bay (Waterfront Glass)</option>
                  <option value="quarter" className="bg-brand-cream">The Old Quarter (Brick Lofts)</option>
                  <option value="core" className="bg-brand-cream">Metropolis Core (Sky Penthouses)</option>
                  <option value="woodlands" className="bg-brand-cream">The Woodlands (Pine Spas)</option>
                </select>
                <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-brand-accent origin-center scale-x-0 transition-transform duration-500 ${
                  focusStates.territory ? 'scale-x-100' : ''
                }`} />
              </div>

              {/* Field 4: Message */}
              <div className="relative border-b border-brand-charcoal/20 pb-2">
                <label 
                  htmlFor="message"
                  className={`absolute left-0 top-0 transition-all duration-300 pointer-events-none text-xs font-mono tracking-wider uppercase ${
                    focusStates.message || formData.message 
                      ? '-translate-y-6 text-brand-accent text-[10px]' 
                      : 'translate-y-0 text-brand-charcoal/40'
                  }`}
                >
                  Brief Requirements / Narrative
                </label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onFocus={() => handleFocus('message')}
                  onBlur={() => handleBlur('message')}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full bg-transparent border-none outline-none text-brand-charcoal text-sm font-light pt-2 resize-none"
                />
                <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-brand-accent origin-center scale-x-0 transition-transform duration-500 ${
                  focusStates.message ? 'scale-x-100' : ''
                }`} />
              </div>

              <button 
                type="submit" 
                className="w-full md:w-auto self-start mt-6 flex items-center justify-between gap-6 px-8 py-4 text-xs font-mono tracking-widest uppercase bg-brand-charcoal hover:bg-brand-accent text-brand-cream transition-all duration-300 cursor-pointer"
              >
                Submit Scouting Brief
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>
          )}

          <div className="mt-12 text-[10px] font-mono text-brand-charcoal/40 uppercase">
            ESTATE TRADE REGULATION COMPLIANT · Bespoke scouting terms apply.
          </div>

        </div>

        {/* Right Side: Rotating Property Detail Thumbnails (cols 7-12) */}
        <div 
          ref={rightContainerRef}
          className="lg:col-span-6 relative aspect-square lg:aspect-auto h-[400px] lg:h-auto overflow-hidden hairline-border border-brand-charcoal/20 flex flex-col justify-end p-8 bg-brand-cream-dark/20"
        >
          {thumbnailSlides.map((slide, i) => (
            <div
              key={i}
              className={`contact-slide contact-slide-${i} absolute inset-0 bg-cover bg-center pointer-events-none`}
              style={{ 
                backgroundImage: `linear-gradient(to bottom, rgba(18,18,18,0.1), rgba(18,18,18,0.75)), url(${slide.url})` 
              }}
            />
          ))}

          {/* Live Overlay text detailing the active detail slide */}
          <div className="relative z-10 text-left border-t border-brand-cream/15 pt-4 text-brand-cream">
            <span className="text-[10px] font-mono tracking-wider text-brand-cream/40 uppercase block mb-1">
              Architectural Detail Series
            </span>
            <div className="font-serif text-lg font-light leading-snug">
              {thumbnailSlides[activeSlide].caption}
            </div>
          </div>

          {/* Slide Indicator Dots (Bottom Right) */}
          <div className="absolute top-6 right-6 z-20 flex gap-2">
            {thumbnailSlides.map((_, i) => (
              <div 
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  activeSlide === i ? 'bg-brand-accent w-4' : 'bg-brand-cream/35'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
