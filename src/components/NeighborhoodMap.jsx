import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';

const districts = [
  {
    id: 'cliffs',
    name: 'The Cliffs',
    listings: 14,
    avgPrice: '$5.2M',
    vibe: 'Brutalist concrete cantilevers, dramatic overlooks, pinewood privacy.',
    color: '#D45D34',
    // SVG path coordinates (abstract polygon)
    path: 'M 50 50 L 220 30 L 250 150 L 150 200 L 40 160 Z'
  },
  {
    id: 'bay',
    name: 'West Bay',
    listings: 18,
    avgPrice: '$4.8M',
    vibe: 'Infinity pools, yacht slips, private sandy docks, sea-breeze glass pavilions.',
    color: '#D45D34',
    path: 'M 220 30 L 450 60 L 460 220 L 300 240 L 250 150 Z'
  },
  {
    id: 'quarter',
    name: 'The Old Quarter',
    listings: 22,
    avgPrice: '$2.4M',
    vibe: 'Exposed structural brick, historical preservation lofts, vaulted masonry arches.',
    color: '#D45D34',
    path: 'M 150 200 L 300 240 L 280 350 L 130 320 Z'
  },
  {
    id: 'core',
    name: 'Metropolis Core',
    listings: 31,
    avgPrice: '$3.9M',
    vibe: 'Triplex sky terraces, double-height ceilings, 360° skyline cityscapes.',
    color: '#D45D34',
    path: 'M 300 240 L 460 220 L 440 370 L 280 350 Z'
  },
  {
    id: 'woodlands',
    name: 'The Woodlands',
    listings: 9,
    avgPrice: '$3.1M',
    vibe: 'Acoustic cedar ceilings, natural thermal spas, moss landscaping, private streams.',
    color: '#D45D34',
    path: 'M 40 160 L 150 200 L 130 320 L 30 340 Z'
  }
];

export default function NeighborhoodMap() {
  const [hovered, setHovered] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mapRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    
    // Offset card slightly so it floats near cursor
    setMousePos({
      x: e.clientX - rect.left + 20,
      y: e.clientY - rect.top + 20
    });
  };

  const hoveredData = districts.find(d => d.id === hovered);

  return (
    <section 
      id="map" 
      className="w-full min-h-screen bg-brand-cream py-24 px-8 md:px-16 flex flex-col justify-center border-b border-brand-charcoal/10"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-12">
        
        {/* Title row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-brand-charcoal/15 pb-8">
          <div className="max-w-xl text-left">
            <div className="text-xs uppercase tracking-widest text-brand-accent font-mono mb-2">
              Zone Explorer / 03
            </div>
            <h2 className="text-3xl md:text-5xl font-light font-serif mb-4">
              Architectural Territories
            </h2>
            <p className="text-sm text-brand-charcoal/60 font-light leading-relaxed">
              Hover over the stylized blueprint below to explore municipal zones, average pricing guidelines, and distinct living philosophies of the region.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 text-xs font-mono tracking-wider">
            {districts.map(d => (
              <button 
                key={d.id}
                onMouseEnter={() => setHovered(d.id)}
                onMouseLeave={() => setHovered(null)}
                className={`px-4 py-2 border transition-all duration-300 ${
                  hovered === d.id 
                    ? 'border-brand-accent bg-brand-accent/5 text-brand-accent' 
                    : 'border-brand-charcoal/10 hover:border-brand-charcoal/40 text-brand-charcoal/70'
                }`}
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>

        {/* Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Legend and Info Box (cols 1-4) */}
          <div className="lg:col-span-4 text-left flex flex-col gap-8 h-full justify-between py-6">
            <div className="flex flex-col gap-6">
              <h3 className="text-lg md:text-xl font-serif text-brand-charcoal/80 uppercase tracking-wide">
                Territory Index
              </h3>
              
              <div className="flex flex-col gap-4">
                {districts.map((d, i) => (
                  <div 
                    key={d.id}
                    onMouseEnter={() => setHovered(d.id)}
                    onMouseLeave={() => setHovered(null)}
                    className={`p-4 border-l-2 transition-all duration-300 cursor-pointer ${
                      hovered === d.id 
                        ? 'border-brand-accent bg-brand-cream-dark/50 pl-6' 
                        : 'border-brand-charcoal/10 hover:border-brand-charcoal/30 pl-4'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-serif text-lg font-light text-brand-charcoal">{d.name}</span>
                      <span className="text-xs font-mono text-brand-charcoal/40">0{i+1}</span>
                    </div>
                    <div className="flex gap-4 text-xs text-brand-charcoal/50 font-mono">
                      <span>{d.listings} listings</span>
                      <span>•</span>
                      <span>Avg. {d.avgPrice}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hairline-border border-brand-charcoal/20 p-6 bg-brand-cream-dark/20 text-xs text-brand-charcoal/50 leading-relaxed font-mono flex flex-col gap-2">
              <div className="flex items-center gap-2 text-brand-charcoal">
                <MapPin className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
                <span>MUNICIPAL BLUEPRINT DATA</span>
              </div>
              <p>Coords: Lat 45.3421° N, Long 9.1859° E · Curated boundaries updated June 2026. Custom illustrated overlay.</p>
            </div>
          </div>

          {/* SVG Map (cols 5-12) */}
          <div 
            ref={mapRef}
            onMouseMove={handleMouseMove}
            className="lg:col-span-8 relative hairline-border border-brand-charcoal/20 bg-brand-cream-dark/10 p-4 md:p-8 overflow-hidden aspect-[4/3] flex items-center justify-center cursor-crosshair select-none"
          >
            {/* Blueprint Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(18,18,18,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(18,18,18,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(18,18,18,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(18,18,18,0.05)_1px,transparent_1px)] bg-[size:150px_150px]" />
            
            {/* Latitude / Longitude Markings */}
            <span className="absolute top-2 left-4 text-[9px] font-mono text-brand-charcoal/30">N 45° 20' 32"</span>
            <span className="absolute bottom-2 right-4 text-[9px] font-mono text-brand-charcoal/30">E 9° 11' 09"</span>

            <svg
              viewBox="0 0 500 400"
              className="w-full h-full relative z-10"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
            >
              {/* Illustrated decorative topographical contours (purely aesthetic lines) */}
              <path d="M 20 380 Q 120 320 220 360 T 420 320" stroke="rgba(18,18,18,0.05)" strokeDasharray="3 3" />
              <path d="M 10 390 Q 110 340 210 375 T 440 330" stroke="rgba(18,18,18,0.05)" strokeDasharray="3 3" />
              
              {/* Coastline visual separator */}
              <path d="M 218 20 C 230 100, 270 180, 480 230" stroke="rgba(18,18,18,0.15)" strokeWidth="1.5" strokeDasharray="5 5" />

              {/* Districts map paths */}
              {districts.map((d) => (
                <path
                  key={d.id}
                  d={d.path}
                  onMouseEnter={() => setHovered(d.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="transition-all duration-500 ease-out cursor-pointer"
                  style={{
                    fill: hovered === d.id ? 'rgba(200, 90, 50, 0.08)' : 'rgba(18, 18, 18, 0.02)',
                    stroke: hovered === d.id ? '#C85A32' : 'rgba(18, 18, 18, 0.25)',
                    strokeWidth: hovered === d.id ? 1.5 : 0.75,
                  }}
                />
              ))}

              {/* District Center Markers */}
              <circle cx="120" cy="110" r="2.5" fill="#121212" opacity="0.4" />
              <circle cx="350" cy="120" r="2.5" fill="#121212" opacity="0.4" />
              <circle cx="210" cy="270" r="2.5" fill="#121212" opacity="0.4" />
              <circle cx="370" cy="290" r="2.5" fill="#121212" opacity="0.4" />
              <circle cx="90" cy="240" r="2.5" fill="#121212" opacity="0.4" />
            </svg>

            {/* Cursor Tracking Pop-card (AnimatePresence) */}
            <AnimatePresence>
              {hovered && hoveredData && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  style={{ 
                    position: 'absolute',
                    left: mousePos.x,
                    top: mousePos.y,
                  }}
                  className="z-30 w-72 bg-brand-charcoal text-brand-cream p-5 shadow-2xl pointer-events-none flex flex-col gap-3 border border-brand-cream/10"
                >
                  <div className="flex justify-between items-start border-b border-brand-cream/10 pb-2">
                    <div>
                      <h4 className="font-serif text-lg font-light text-brand-cream">{hoveredData.name}</h4>
                      <span className="text-[10px] text-brand-cream/40 font-mono tracking-widest uppercase">Municipal Zone</span>
                    </div>
                    <span className="text-sm font-mono text-brand-accent">{hoveredData.avgPrice}</span>
                  </div>

                  <p className="text-xs text-brand-cream/70 font-light leading-relaxed">
                    {hoveredData.vibe}
                  </p>

                  <div className="flex justify-between items-center mt-2 text-[10px] font-mono tracking-wider text-brand-cream/40 uppercase">
                    <span>{hoveredData.listings} Active Listings</span>
                    <span className="flex items-center gap-1 text-brand-accent">
                      Explore Zone <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
