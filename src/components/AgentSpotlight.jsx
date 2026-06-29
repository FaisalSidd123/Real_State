import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, RotateCcw } from 'lucide-react';

const agents = [
  {
    id: 'elena',
    name: 'Elena Rostova',
    role: 'Partner / Modernist Estates',
    specialty: 'Concrete cantilevers & minimalist glass villas',
    bio: 'With over 14 years representing avant-garde residential structures, Elena is our primary specialist in modernist architectural theory. She holds a Masters in Architecture from ETH Zurich.',
    email: 'elena@elysian.com',
    phone: '+41 44 268 9011',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'julian',
    name: 'Julian Vance',
    role: 'Director of Historical Curation',
    specialty: 'Adaptive reuse & industrial conversions',
    bio: 'Julian specializing in adaptive reuse properties. He works with historical municipal trusts to secure, restore, and list structural milestones converted for modern residential use.',
    email: 'julian@elysian.com',
    phone: '+1 415 892 3421',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'amara',
    name: 'Amara Sterling',
    role: 'Director / Global Scouting',
    specialty: 'Coastal pavilions & off-market commissions',
    bio: 'Specializing in private off-market coastal acquisitions across the Mediterranean. Amara coordinates confidential trades for high-net-worth design patrons. She resides between Milan and Amalfi.',
    email: 'amara@elysian.com',
    phone: '+39 02 8892 4115',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80'
  }
];

export default function AgentSpotlight() {
  const [hovered, setHovered] = useState(false);
  const [flippedCard, setFlippedCard] = useState(null);

  const handleCardClick = (id) => {
    setFlippedCard(flippedCard === id ? null : id);
  };

  return (
    <section 
      id="agents" 
      className="w-full min-h-screen bg-brand-cream py-24 px-8 md:px-16 flex flex-col justify-center border-b border-brand-charcoal/10"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
        
        {/* Left Side: Editorial Bio details (cols 1-5) */}
        <div className="lg:col-span-5 text-left flex flex-col gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-brand-accent font-mono mb-2">
              Advisors / 05
            </div>
            <h2 className="text-3xl md:text-5xl font-light font-serif">
              Architectural Curators
            </h2>
          </div>
          
          <p className="text-sm text-brand-charcoal/60 font-light leading-relaxed max-w-md">
            We are not real estate agents; we are design consultants. Our curators hold backgrounds in architecture, structural engineering, and design history, advising you on space as an emotional asset.
          </p>

          <div className="flex flex-col gap-2 border-t border-brand-charcoal/15 pt-6 text-xs font-mono text-brand-charcoal/50">
            <div>• Hover over the deck to fan the curators.</div>
            <div>• Click on a card for a 3D reveal of bios and specialties.</div>
            <div>• Click again to flip back.</div>
          </div>
        </div>

        {/* Right Side: The Overlapping Fanning Deck (cols 6-12) */}
        <div className="lg:col-span-7 flex justify-center items-center py-12 relative min-h-[500px]">
          
          <div 
            className="relative w-full max-w-[400px] h-[480px] flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
              setHovered(false);
              setFlippedCard(null); // Reset flips on leave
            }}
          >
            {agents.map((agent, i) => {
              // Fanning offsets based on hover status
              let xOffset = 0;
              let yOffset = 0;
              let rotation = 0;
              
              if (hovered && flippedCard === null) {
                if (i === 0) {
                  xOffset = -150;
                  yOffset = 20;
                  rotation = -8;
                } else if (i === 2) {
                  xOffset = 150;
                  yOffset = 20;
                  rotation = 8;
                } else {
                  yOffset = -15;
                }
              }

              // Adjust mobile offsets to avoid breaking layout boundary
              const isFlipped = flippedCard === agent.id;

              return (
                <motion.div
                  key={agent.id}
                  className="absolute w-72 h-[420px] cursor-pointer"
                  style={{ 
                    perspective: 1200, 
                    zIndex: isFlipped ? 50 : (i === 1 ? 20 : 10),
                  }}
                  animate={{
                    x: isFlipped ? 0 : xOffset,
                    y: isFlipped ? -20 : yOffset,
                    rotate: isFlipped ? 0 : rotation,
                    scale: isFlipped ? 1.05 : 1,
                  }}
                  transition={{ 
                    type: 'spring', 
                    damping: 20, 
                    stiffness: 120 
                  }}
                >
                  {/* Outer Flip Container */}
                  <motion.div
                    onClick={() => handleCardClick(agent.id)}
                    className="relative w-full h-full w-full h-full select-none"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  >
                    {/* Front Face of Card */}
                    <div 
                      className="absolute inset-0 w-full h-full bg-brand-cream border border-brand-charcoal/20 p-4 flex flex-col justify-between"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      {/* Image Frame */}
                      <div className="w-full h-3/4 overflow-hidden border-b border-brand-charcoal/10 relative">
                        <img 
                          src={agent.img} 
                          alt={agent.name}
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 pointer-events-none"
                        />
                      </div>
                      {/* Text info */}
                      <div className="flex justify-between items-end pt-3">
                        <div className="text-left">
                          <h3 className="font-serif text-lg font-light leading-tight">{agent.name}</h3>
                          <span className="text-[10px] uppercase font-mono tracking-widest text-brand-charcoal/40">{agent.role}</span>
                        </div>
                        <span className="text-[10px] font-mono text-brand-charcoal/30">0{i+1}</span>
                      </div>
                    </div>

                    {/* Back Face of Card (3D Flip) */}
                    <div 
                      className="absolute inset-0 w-full h-full bg-brand-charcoal text-brand-cream p-6 flex flex-col justify-between border border-brand-cream/10"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                    >
                      <div className="text-left">
                        <div className="flex justify-between items-start border-b border-brand-cream/15 pb-3 mb-4">
                          <div>
                            <h3 className="font-serif text-xl font-light text-brand-cream">{agent.name}</h3>
                            <span className="text-[9px] uppercase font-mono tracking-wider text-brand-accent">{agent.role}</span>
                          </div>
                          <button className="text-brand-cream/40 hover:text-brand-cream transition-colors cursor-pointer">
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        
                        <div className="mb-4">
                          <span className="text-[9px] font-mono uppercase tracking-widest text-brand-cream/40 block mb-1">Specialty Focus</span>
                          <p className="text-xs text-brand-cream/90 font-light">{agent.specialty}</p>
                        </div>
                        
                        <div>
                          <span className="text-[9px] font-mono uppercase tracking-widest text-brand-cream/40 block mb-1">Background Bio</span>
                          <p className="text-xs text-brand-cream/70 font-light leading-relaxed">
                            {agent.bio}
                          </p>
                        </div>
                      </div>

                      {/* Contact items */}
                      <div className="flex flex-col gap-2 pt-4 border-t border-brand-cream/15 text-[11px] font-mono text-brand-cream/50 text-left">
                        <div className="flex items-center gap-2 hover:text-brand-accent transition-colors">
                          <Mail className="w-3.5 h-3.5" />
                          <span>{agent.email}</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-brand-accent transition-colors">
                          <Phone className="w-3.5 h-3.5" />
                          <span>{agent.phone}</span>
                        </div>
                      </div>
                    </div>

                  </motion.div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
