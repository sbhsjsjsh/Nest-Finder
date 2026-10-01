'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function QualifyForm() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load Tally embed script for dynamic height
    const script = document.createElement('script')
    script.src = 'https://tally.so/widgets/embed.js'
    script.async = true
    document.body.appendChild(script)

    // Perceived loading speed: iframe load event
    const handleLoad = () => setIsLoaded(true)
    const iframe = document.getElementById('tally-iframe')
    if (iframe) {
      iframe.addEventListener('load', handleLoad)
    }

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
      if (iframe) {
        iframe.removeEventListener('load', handleLoad)
      }
    }
  }, [])

  return (
    <div className="w-full relative min-h-[500px] overflow-hidden rounded-2xl">
      {/* Skeleton / Loader */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white z-10 flex flex-col gap-6"
          >
            <div className="w-3/4 h-8 bg-muted animate-pulse rounded-lg" />
            <div className="w-full h-12 bg-muted animate-pulse rounded-lg" />
            <div className="w-1/2 h-12 bg-muted animate-pulse rounded-lg" />
            <div className="w-full h-32 bg-muted animate-pulse rounded-lg" />
            <div className="w-full h-12 bg-primary/10 animate-pulse rounded-lg mt-auto" />
          </motion.div>
        )}
      </AnimatePresence>

      <iframe
        id="tally-iframe"
        data-tally-src="https://tally.so/embed/68a4ZB?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
        loading="eager" // Changed to eager for faster initiation
        width="100%"
        height="500"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="Mumbai Property Inquiry"
        className={`w-full transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      ></iframe>
    </div>
  )
}
