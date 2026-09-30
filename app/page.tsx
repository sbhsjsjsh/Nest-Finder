import React from 'react'
import { Navbar, Hero, Features, Footer } from '@/components/LandingUI'
import QualifyForm from '@/components/QualifyForm'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <Hero />
      
      <Features />

      <section id="qualify" className="py-24 bg-white relative overflow-hidden">
        {/* Section Background Highlight Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[120px] pointer-events-none opacity-50" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">
          <div className="space-y-6 md:sticky md:top-32">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-[10px] uppercase tracking-widest font-bold rounded-full">
               Personalized Matching
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
              Let&apos;s find the nest that <span className="text-primary italic">belongs</span> to you.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-md">
              Complete this qualification form and our Mumbai property experts will handpick a private selection of homes that align with your lifestyle.
            </p>
            
            <div className="hidden lg:block space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center text-primary font-serif">1</div>
                <div className="text-sm font-medium">Verified Property List</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center text-primary font-serif">2</div>
                <div className="text-sm font-medium">Expert Market Analysis</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center text-primary font-serif">3</div>
                <div className="text-sm font-medium">Private Viewings</div>
              </div>
            </div>
          </div>

          <div className="glow-border-container bg-white p-6 md:p-10 rounded-[2.5rem] border border-primary/20 shadow-[0_30px_60px_-15px_rgba(197,160,89,0.15)] group">
            {/* Soft Spinning Glow Border - More prominent gold hue */}
            <div className="glow-border-effect opacity-100! group-hover:opacity-100 transition-opacity duration-500">
              <div className="glow-spinning-bg opacity-60" />
            </div>
            <div className="glow-overlay bg-white" />
            <div className="glow-content">
              <QualifyForm />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-border">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-serif italic text-primary">&quot;Mumbai is not just a city, it&apos;s an emotion. Your home should reflect that.&quot;</h2>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">— The Mumbai Nest Finder Promise</div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
