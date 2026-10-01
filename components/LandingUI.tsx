'use client'

import React from 'react'
import Link from 'next/link'

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4">
      <div className="max-w-7xl mx-auto h-16 md:h-20 bg-background/90 backdrop-blur-md rounded-2xl md:rounded-[2rem] border border-primary/20 shadow-xl shadow-primary/5 flex items-center justify-between px-6 relative overflow-hidden group">
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

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-border py-8">
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
