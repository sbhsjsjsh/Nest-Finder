'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, ShieldCheck, Home } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4">
      <div className="max-w-7xl mx-auto h-16 md:h-20 bg-background/90 backdrop-blur-md rounded-2xl md:rounded-[2rem] border border-primary/20 shadow-xl shadow-primary/5 flex items-center justify-between px-6 relative overflow-hidden group">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        <Link href="/" className="text-xl md:text-2xl font-serif tracking-tight text-foreground relative z-10">
          Mumbai Nest <span className="text-primary italic">Finder</span>
        </Link>

        <div className="flex items-center gap-4 relative z-10">
          <a
            href="#qualify"
            className="stunning-button glow-border-container bg-primary px-6 py-2.5 md:px-8 md:py-3.5 rounded-full transition-all"
          >
            <div className="glow-border-effect opacity-100!"><div className="glow-spinning-bg opacity-40" /></div>
            <div className="glow-overlay bg-primary" />
            <div className="glow-content shimmer-text font-bold text-xs md:text-sm uppercase tracking-widest">
              Start Search
            </div>
          </a>
        </div>
      </div>
    </header>
  )
}

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Background Graphic Fallback (since images failed) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-muted via-background to-muted opacity-50" />
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-glow" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-primary/30 rounded-full blur-3xl animate-glow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-[10px] uppercase tracking-widest font-bold rounded-full">
            <ShieldCheck className="w-3 h-3" /> Mumbai&apos;s Trusted Property Matchmakers
          </div>
          <h1 className="text-5xl lg:text-7xl font-serif leading-[1.1] text-foreground">
            Find Your Dream Home In <span className="text-primary italic">Mumbai</span>.
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            From the historic charm of South Mumbai to the vibrant energy of the Western Suburbs. We curate premium homes that match your lifestyle.
          </p>
          <div className="flex items-center gap-6 pt-4">
            <a
              href="#qualify"
              className="stunning-button glow-border-container bg-primary px-8 py-5 rounded-2xl transition-all"
            >
              <div className="glow-border-effect opacity-100!"><div className="glow-spinning-bg opacity-40" /></div>
              <div className="glow-overlay bg-primary" />
              <div className="glow-content flex items-center gap-3">
                <span className="shimmer-text font-bold uppercase tracking-widest">Start Search</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </a>
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40" />
                  </div>
                ))}
              </span>
              <span className="font-medium text-foreground ml-2">1,200+ Buyers</span> helped
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-black/10 hidden lg:block"
        >
          <div className="absolute inset-0 bg-muted flex flex-col items-center justify-center p-12 text-center border border-border">
             {/* Fallback for failed image generation */}
             <Home className="w-24 h-24 text-primary/20 mb-6" />
             <div className="font-serif text-3xl mb-4">Aamchi Mumbai</div>
             <p className="text-sm text-muted-foreground">A curated selection of the finest residences awaits you.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export const Features = () => {
  const items = [
    { title: 'Curated Portfolios', desc: 'Handpicked properties that meet our strict quality standards.' },
    { title: 'Local Expertise', desc: 'Deep insights into Mumbai real estate across every pincode.' },
    { title: 'Private Consultation', desc: 'Dedicated experts for high-value residential acquisitions.' }
  ]
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {items.map((item, i) => (
          <div key={i} className="space-y-4">
            <div className="text-primary font-serif text-2xl">0{i+1}.</div>
            <h3 className="text-xl font-medium">{item.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-border pb-8 mb-8">
          <div>
            <div className="text-xl font-serif mb-2">Mumbai Nest Finder</div>
            <p className="text-sm text-muted-foreground">Expert real estate matching across the Maximum City.</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between text-[10px] uppercase tracking-widest text-muted-foreground font-bold gap-4">
          <div>© 2026 Mumbai Nest Finder. All Rights Reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
