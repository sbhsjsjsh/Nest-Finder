import React from 'react'
import { Navbar, Footer } from '@/components/LandingUI'
import QualifyForm from '@/components/QualifyForm'
import { motion } from 'motion/react'
import { ShieldCheck, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Combined Hero & Form Section for a shorter, high-impact landing */}
      <section id="qualify" className="pt-32 pb-16 md:pt-40 md:pb-24 bg-white relative overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-primary/15 rounded-full blur-3xl opacity-50" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-[10px] uppercase tracking-widest font-bold rounded-full">
               <ShieldCheck className="w-3 h-3" /> Mumbai&apos;s Trusted Matchmakers
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1] text-foreground">
              Find Your Dream Home In <span className="text-primary italic">Mumbai</span>.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Complete this short qualification and our experts will handpick a private selection of Mumbai residences that match your lifestyle.
            </p>
            
            <div className="hidden md:grid grid-cols-2 gap-6 pt-4">
              <div className="space-y-1">
                <div className="text-primary font-serif text-xl">01.</div>
                <div className="text-xs font-bold uppercase tracking-wider">Verified Lists</div>
              </div>
              <div className="space-y-1">
                <div className="text-primary font-serif text-xl">02.</div>
                <div className="text-xs font-bold uppercase tracking-wider">Expert Insights</div>
              </div>
            </div>
          </div>

          <div className="glow-border-container bg-white p-6 md:p-8 rounded-[2.5rem] border border-primary/20 shadow-[0_30px_60px_-15px_rgba(197,160,89,0.15)] group relative">
            <div className="glow-border-effect opacity-100!">
              <div className="glow-spinning-bg opacity-40" />
            </div>
            <div className="glow-overlay bg-white" />
            <div className="glow-content">
              <QualifyForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
