import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-brand-charcoal text-brand-cream py-24 px-8 md:px-16 border-t border-brand-cream/10 relative overflow-hidden">
      
      {/* Decorative grain overlay inside footer for paper texture */}
      <div className="absolute inset-0 bg-brand-cream-dark/5 opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full flex flex-col gap-20 relative z-10">
        
        {/* Large Closing Title & CTA */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 text-left">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-7xl font-light font-serif leading-none tracking-tight text-brand-cream mb-4">
              Let's Find Your Next Chapter.
            </h2>
            <p className="text-brand-cream/60 text-sm md:text-base font-light max-w-md leading-relaxed">
              We scout and commission architectural properties globally. Share your coordinate briefs with us.
            </p>
          </div>

          <div className="shrink-0">
            <a 
              href="#contact"
              className="inline-flex items-center gap-4 bg-brand-accent hover:bg-brand-cream hover:text-brand-charcoal text-brand-cream text-xs md:text-sm font-mono tracking-widest uppercase px-8 py-5 transition-all duration-300"
            >
              Inquire Privately
              <ArrowUpRight className="w-4.5 h-4.5" />
            </a>
          </div>
        </div>

        {/* Minimal Sitemap (asymmetric grid) */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-12 md:gap-8 border-t border-brand-cream/10 pt-16 text-left">
          
          {/* Logo column */}
          <div className="col-span-2 md:col-span-4 flex flex-col justify-between">
            <div>
              <div className="text-2xl font-serif tracking-widest uppercase mb-4">ELYSIAN</div>
              <p className="text-[10px] font-mono text-brand-cream/40 uppercase tracking-wider leading-relaxed">
                ESTABLISHED 2014.<br />
                CURATED ARCHITECTURAL LEGACIES.<br />
                REYKJAVIK · ZURICH · MILAN · KYOTO
              </p>
            </div>
            <div className="text-[9px] font-mono text-brand-cream/35 mt-8 md:mt-0">
              © 2026 ELYSIAN INC. ALL RIGHTS CONFIDENTIAL.
            </div>
          </div>

          {/* Column 2: Portfolios */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-4 text-xs font-mono">
            <span className="text-[10px] text-brand-cream/35 uppercase tracking-widest block mb-2 font-semibold">Portfolios</span>
            <a href="#featured" className="text-brand-cream/60 hover:text-brand-accent transition-colors">The Cliffs</a>
            <a href="#featured" className="text-brand-cream/60 hover:text-brand-accent transition-colors">West Bay</a>
            <a href="#featured" className="text-brand-cream/60 hover:text-brand-accent transition-colors">The Old Quarter</a>
            <a href="#featured" className="text-brand-cream/60 hover:text-brand-accent transition-colors">Metropolis Core</a>
            <a href="#featured" className="text-brand-cream/60 hover:text-brand-accent transition-colors">The Woodlands</a>
          </div>

          {/* Column 3: Company */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-4 text-xs font-mono">
            <span className="text-[10px] text-brand-cream/35 uppercase tracking-widest block mb-2 font-semibold">Collective</span>
            <a href="#manifesto" className="text-brand-cream/60 hover:text-brand-accent transition-colors">Manifesto</a>
            <a href="#agents" className="text-brand-cream/60 hover:text-brand-accent transition-colors">Advisors</a>
            <a href="#method" className="text-brand-cream/60 hover:text-brand-accent transition-colors">Methodology</a>
            <a href="#" className="text-brand-cream/60 hover:text-brand-accent transition-colors">Publications</a>
            <a href="#" className="text-brand-cream/60 hover:text-brand-accent transition-colors">Press Registry</a>
          </div>

          {/* Column 4: Offices */}
          <div className="col-span-2 md:col-span-4 flex flex-col gap-4 text-xs font-mono text-left">
            <span className="text-[10px] text-brand-cream/35 uppercase tracking-widest block mb-2 font-semibold">HQ Coordinates</span>
            
            <div className="flex flex-col gap-1 text-brand-cream/60">
              <span className="text-brand-cream text-[11px]">Zurich, CH</span>
              <span>Bahnhofstrasse 45, 8001 Zurich</span>
              <span>zurich@elysian.com · +41 44 268 9011</span>
            </div>

            <div className="flex flex-col gap-1 text-brand-cream/60 mt-2">
              <span className="text-brand-cream text-[11px]">Kyoto, JP</span>
              <span>Gionmachi Minamigawa, Higashiyama, 605-0074</span>
              <span>kyoto@elysian.com · +81 75 525 0015</span>
            </div>
          </div>

        </div>

        {/* Bottom Legal / Tech Stack Details */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-t border-brand-cream/10 pt-8 text-[9px] font-mono text-brand-cream/30 uppercase gap-4">
          <div className="flex gap-4">
            <a href="#" className="hover:text-brand-cream transition-colors">Privacy Charter</a>
            <span>•</span>
            <a href="#" className="hover:text-brand-cream transition-colors">Terms of Commission</a>
            <span>•</span>
            <a href="#" className="hover:text-brand-cream transition-colors">Regulatory Filings</a>
          </div>
          <div>
            Built with React, GSAP, Framer Motion & Tailwind v4
          </div>
        </div>

      </div>
    </footer>
  );
}
