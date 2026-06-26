'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import CategoryBackground from '@/components/backgrounds/CategoryBackground'
import ChakraIcon from '@/components/ui/ChakraIcon'
import { CATEGORY_CONFIG } from '@/types/category'

const categories = Object.values(CATEGORY_CONFIG)

export default function ShopPage() {
  return (
    <CategoryBackground category="home">
      <div className="min-h-screen px-4 pb-20 pt-28">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-4xl sm:text-5xl text-[#F0EBE3] mb-3">
            همه مجموعه‌ها
          </h1>
          <p className="text-[#B8AEAD] max-w-lg mx-auto">
            مجموعه کامل ابزارهای مقدس، لباس‌ها و تجربیات ما را کشف کنید — هر کدام با انرژی چاکرای خاصی هماهنگ شده است.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.handle}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link href={`/shop/${cat.handle}`} className="group block">
                <div
                  className="relative rounded-2xl overflow-hidden transition-all duration-400 p-8 flex flex-col items-center text-center gap-4"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(12px)',
                    border: `1px solid rgba(255,255,255,0.08)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${cat.color}60`
                    e.currentTarget.style.boxShadow = `0 0 40px rgba(${cat.colorRgb},0.15)`
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                  }}
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `rgba(${cat.colorRgb},0.12)`,
                      boxShadow: `0 0 30px rgba(${cat.colorRgb},0.15)`,
                    }}
                  >
                    <ChakraIcon chakra={cat.chakra} size="lg" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl text-[#F0EBE3] group-hover:text-[#FECB7D] transition-colors duration-200">
                      {cat.label}
                    </h2>
                    <p className="text-sm text-[#B8AEAD]" dir="rtl">
                      {cat.labelFa}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </CategoryBackground>
  )
}
