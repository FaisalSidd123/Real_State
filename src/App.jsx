import React from 'react'
import LenisProvider from './components/LenisProvider'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import FeaturedProperties from './components/FeaturedProperties'
import NeighborhoodMap from './components/NeighborhoodMap'
import ProcessTimeline from './components/ProcessTimeline'
import AgentSpotlight from './components/AgentSpotlight'
import Testimonials from './components/Testimonials'
import MarketInsights from './components/MarketInsights'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

function App() {
  return (
    <LenisProvider>
      <main className="w-full relative min-h-screen bg-brand-cream text-brand-charcoal overflow-hidden selection:bg-brand-accent selection:text-brand-cream">
        <Hero />
        <Manifesto />
        <FeaturedProperties />
        <NeighborhoodMap />
        <ProcessTimeline />
        <AgentSpotlight />
        <Testimonials />
        <MarketInsights />
        <ContactForm />
        <Footer />
      </main>
    </LenisProvider>
  )
}

export default App
