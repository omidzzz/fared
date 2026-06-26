'use client'

import { motion } from 'framer-motion'

export function HeroShimmer() {
  return (
    <motion.div
      className="absolute inset-0 z-10 pointer-events-none"
      animate={{ x: ['-100%', '200%'] }}
      transition={{ duration: 3.5, ease: 'linear', repeat: Infinity, repeatDelay: 1.5 }}
      style={{
        background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)',
      }}
    />
  )
}
