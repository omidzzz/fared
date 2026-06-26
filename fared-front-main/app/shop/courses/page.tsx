'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import DynamicHeader from '@/components/layout/DynamicHeader'
import MobileCategoryCard from '@/components/ui/MobileCategoryCard'
import { HeroShimmer } from '@/components/ui/HeroShimmer'
import Footer from '@/components/layout/Footer'
import { MOCK_COURSES } from '@/lib/mock-data'

const QUICK_NAV = ['همه', 'مبتدی', 'متوسط', 'پیشرفته']

export default function CoursesPage() {
  const [activeFilter, setActiveFilter] = useState<string>('همه')

  const LEVEL_MAP: Record<string, string> = {
    'مبتدی': 'beginner',
    'متوسط': 'intermediate',
    'پیشرفته': 'advanced',
  }

  const filteredCourses = activeFilter === 'همه'
    ? MOCK_COURSES
    : MOCK_COURSES.filter((c) => c.level === LEVEL_MAP[activeFilter])

  return (
    <main className="page-gradient-third min-h-screen">
      {/* Section 1 — Fixed Dynamic Header */}
      <DynamicHeader />

      {/* Section 2 — Isolated Hero */}
      <section className="px-4 pt-[88px] pb-4">
        <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
          {/* Background image */}
          <Image
            src="/images/hero-backgrounds/courses-hero.webp"
            alt=""
            fill
            className="object-cover"
            priority
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Shimmer — z-10 */}
          <HeroShimmer />

          {/* Text + CTA — z-20, absolute bottom-left */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-5">
            <h1 className="font-display text-3xl text-[var(--text-primary)] leading-tight mb-2">
              دوره‌های مقدس
            </h1>

            <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed mb-4 max-w-xs">
              دوره‌های تخصصی برای بیداری معنوی، شفا و رشد شما.
            </p>

            <Link href="/shop/courses/products">
              <button
                className="inline-flex items-center gap-2 font-body text-sm tracking-widest uppercase transition-all duration-300 hover:opacity-85"
                style={{
                  padding: '11px 32px',
                  borderRadius: 50,
                  background: 'rgba(142,68,173,0.20)',
                  border: '1px solid rgba(142,68,173,0.65)',
                  color: 'var(--text-primary)',
                  boxShadow: '0 0 20px rgba(142,68,173,0.15)',
                }}
              >
                شروع سفر
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 3 — Quick-Nav */}
      <div className="flex overflow-x-auto scrollbar-none snap-x snap-mandatory scrollbar-none gap-4 py-2 px-4">
        {QUICK_NAV.map((item) => (
          <button
            key={item}
            onClick={() => setActiveFilter(item)}
            className="flex-shrink-0 snap-start flex flex-col items-center gap-1.5 min-w-[64px] min-h-11"
          >
            <div
              className="w-14 h-14 rounded-full border-2 border-[var(--chakra-third)] bg-white/[0.04] flex items-center justify-center transition-all duration-200"
              style={
                activeFilter === item
                  ? { background: 'rgba(142,68,173,0.2)' }
                  : {}
              }
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="7" stroke="var(--chakra-third)" strokeWidth="1.2" />
                {activeFilter === item && (
                  <circle cx="10" cy="10" r="3" fill="var(--chakra-third)" />
                )}
              </svg>
            </div>
            <span className="text-xs text-[var(--text-secondary)] whitespace-nowrap">
              {item}
            </span>
          </button>
        ))}
      </div>

      {/* Section 4 — Product Stream */}
      <section className="pt-6 pb-2">
        <h2 className="font-display text-xl text-[var(--text-primary)] px-4 mb-4">
          همه دوره‌ها
        </h2>

        <div className="flex overflow-x-auto scrollbar-none snap-x snap-mandatory scrollbar-none gap-4 px-4 pb-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="w-[44vw] flex-shrink-0 snap-start">
              <MobileCategoryCard
                id={course.id}
                name={course.titleFA}
                nameFA={course.titleFA}
                image={course.image}
                accentColor="var(--chakra-third)"
                href={`/shop/courses/${course.slug}`}
              />
            </div>
          ))}

          {/* مشاهده همه token */}
          <Link
            href="/shop/courses"
            className="w-[40vw] flex-shrink-0 snap-start"
          >
            <div
              className="flex flex-col items-center justify-center gap-3 rounded-2xl h-full min-h-[280px] transition-all duration-300 hover:opacity-80"
              style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <span
                className="font-display"
                style={{ fontSize: '2rem', color: 'var(--gold-accent)' }}
              >
                →
              </span>
              <p className="font-body text-sm text-[var(--text-secondary)] tracking-wider uppercase">
                مشاهده همه
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Section 5 — Footer Badges */}
      <Footer />
    </main>
  )
}
