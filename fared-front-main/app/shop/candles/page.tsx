'use client'

import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import MobileCategoryCard from '@/components/ui/MobileCategoryCard'
import { MOCK_CANDLES } from '@/lib/mock-data'
import type { Candle } from '@/lib/mock-data'
import CTAButton from '@/components/ui/CTAButton'
import CandleCard from '@/components/ui/CandleCard'

const GOLD_ACCENT   = '#c8a951'
const CREAM         = '#f5f0e8'
const LAVENDER_GLOW = '#b8a4e8'
const TEXT_DIM      = '#a090c0'
const PANEL         = 'rgba(26,10,46,0.55)'
const PANEL_STRONG  = 'rgba(20,8,40,0.72)'
const BORDER        = 'rgba(184,164,232,0.18)'
const DARK_BG       = '#0d0520'

export default function CandlesPage() {
  return (
    <main className="min-h-screen">
      {/* ── MOBILE ── */}
      <div className="lg:hidden flex flex-col" style={{ background: DARK_BG }}>
        <section className="px-4 pt-[88px] pb-4">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
            <Image src="/images/hero-backgrounds/candles-hero.webp" alt="" fill sizes="100vw" className="object-cover" priority
                   onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-5">
              <h1 className="font-display text-3xl text-[var(--text-primary)] leading-tight mb-2">شمع‌های جادویی</h1>
              <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed mb-4 max-w-xs">
                شمع‌های دست‌ساز با نیت مثبت. هر شمع با عشق و انرژی ساخته شده است.
              </p>
              <Link href="/shop/candles">
                <button className="inline-flex items-center gap-2 font-body text-sm tracking-widest uppercase transition-all duration-300 hover:opacity-85"
                        style={{ padding: '11px 32px', borderRadius: 50, background: 'rgba(142,68,173,0.2)', border: '1px solid rgba(142,68,173,0.65)', color: 'var(--text-primary)', boxShadow: '0 0 20px rgba(142,68,173,0.15)' }}>
                  کشف مجموعه
                </button>
              </Link>
            </div>
          </div>
        </section>
        <section className="pt-6 pb-2">
          <h2 className="font-display text-xl text-[var(--text-primary)] px-4 mb-4">مجموعه ما</h2>
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 px-4 pb-6">
            {MOCK_CANDLES.map(c => (
              <div key={c.id} className="w-[44vw] flex-shrink-0 snap-start">
                <MobileCategoryCard id={c.id} name={c.name} nameFA={c.nameFA} image={c.image} accentColor="var(--chakra-crown)" />
              </div>
            ))}
            <Link href="/shop/candles" className="w-[40vw] flex-shrink-0 snap-start">
              <div className="flex flex-col items-center justify-center gap-3 rounded-2xl h-full min-h-[280px] transition-all duration-300 hover:opacity-80"
                   style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span className="font-display" style={{ fontSize: '2rem', color: 'var(--gold-accent)' }}>→</span>
                <p className="font-body text-sm text-[var(--text-secondary)] tracking-wider uppercase">مشاهده همه</p>
              </div>
            </Link>
          </div>
        </section>
        <Footer />
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden lg:block" style={{ position: 'relative', minHeight: '100vh', background: DARK_BG, direction: 'ltr' }}>

        {/* Fixed full-screen background */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
          <Image src="/images/hero-backgrounds/candles-hero.webp" alt="" fill sizes="100vw" unoptimized priority
                 className="object-cover object-center"
                 onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
          <div style={{
            position: 'absolute', inset: 0, background:
              'radial-gradient(120% 80% at 50% 40%, rgba(13,5,32,0.45), rgba(13,5,32,0) 55%), ' +
              'linear-gradient(180deg, rgba(13,5,32,0.5) 0%, rgba(13,5,32,0) 20%, rgba(13,5,32,0) 50%, rgba(13,5,32,0.55) 68%, rgba(13,5,32,0.92) 100%)',
          }} />
        </div>

        {/* Scrollable content layer */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '120px 60px 80px 60px', minHeight: '100vh' }}>

          {/* ── HERO ROW ── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 32, marginBottom: 60 }}>
            {/* LEFT */}
            <section style={{ zIndex: 2, maxWidth: 520, textAlign: 'left' as const }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, color: GOLD_ACCENT, fontFamily: 'Jost, sans-serif', fontWeight: 500, fontSize: 14, letterSpacing: '.22em', textTransform: 'uppercase', marginBottom: 18 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GOLD_ACCENT} strokeWidth="1.6"><path d="M12 3c-3 4-5 7-5 10a5 5 0 0 0 10 0c0-3-2-6-5-10z"/></svg>
                Handcrafted. Infused. Intentional.
              </div>
              <h1 style={{ fontFamily: '"Playfair Display", serif', fontWeight: 500, color: CREAM, fontSize: 54, lineHeight: 1.1, textShadow: '0 4px 30px rgba(0,0,0,.6)', margin: 0 }}>
                Magical Candles
              </h1>
              <p style={{ color: TEXT_DIM, fontSize: 16, lineHeight: 1.6, marginTop: 16, maxWidth: 400 }}>
                Handcrafted with intention. Infused with natural fragrances and positive energy.
              </p>
              <div style={{ marginTop: 34 }}>
                <CTAButton href="/shop/candles">Explore Collection</CTAButton>
              </div>
            </section>

            {/* RIGHT: glass sidebar */}
            <aside style={{
              zIndex: 2, width: 220, flexShrink: 0,
              background: PANEL_STRONG, border: `1px solid ${BORDER}`, borderRadius: 20,
              padding: '20px 16px', backdropFilter: 'blur(9px)', WebkitBackdropFilter: 'blur(9px)',
              boxShadow: '0 20px 50px rgba(0,0,0,.4)', display: 'flex', flexDirection: 'column', gap: 22,
            }}>
              {[
                { iconPath: 'M9 3c-3 5-5 8-5 11a8 8 0 0 0 16 0c0-3-2-6-5-11z M9 10c0 3 1.5 5 3 6', tt: 'Natural Ingredients', st: 'Clean, plant-based wax' },
                { iconPath: 'M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z', tt: 'Energy Infused', st: 'Intentions in every candle' },
                { iconPath: 'M21 12a9 9 0 11-18 0 9 9 0 0118 0z M3 12h18 M12 3c2.5 3 2.5 13 0 16', tt: 'Worldwide Shipping', st: 'Bringing light to your door' },
              ].map(item => (
                <div key={item.tt} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ flex: '0 0 auto', width: 42, height: 42, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'rgba(50,20,80,0.5)', border: '1px solid rgba(180,140,220,0.22)' }}>
                    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={LAVENDER_GLOW} strokeWidth="1.5"><path d={item.iconPath} /></svg>
                  </div>
                  <div>
                    <div style={{ color: CREAM, fontFamily: 'Jost, sans-serif', fontWeight: 600, fontSize: 12.5, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 5 }}>{item.tt}</div>
                    <div style={{ color: TEXT_DIM, fontWeight: 300, fontSize: 13.5, lineHeight: 1.35 }}>{item.st}</div>
                  </div>
                </div>
              ))}
            </aside>
          </div>

          {/* ── FEATURE BAR ── */}
          <section style={{
            position: 'relative', zIndex: 2, marginBottom: 40, height: 94,
            background: PANEL, border: `1px solid ${BORDER}`, borderRadius: 18,
            backdropFilter: 'blur(7px)', WebkitBackdropFilter: 'blur(7px)',
            display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', alignItems: 'center', padding: '0 26px',
          }}>
            {[
              { icon: 'M20 4c-4 6-7 10-7 15a7 7 0 0 0 14 0c0-5-3-9-7-15z', tt: 'Natural Ingredients', st: 'Clean, plant-based wax' },
              { icon: 'M20 8l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z', tt: 'Hand Poured', st: 'Made with care' },
              { icon: 'M20 8c-4 6-6 10-6 14a6 6 0 0 0 12 0c0-4-2-8-6-14z M14 20c0 4 2 6 6 8', tt: 'Energy Infused', st: 'Intentions in every candle' },
              { icon: 'M12 4c-2 3-3 6-3 9a4 4 0 0 0 8 0c0-3-1-6-3-9M8 34c2-2 4-2 4-2M28 34c-2-2-4-2-4-2', tt: 'Cruelty Free', st: 'Never tested on animals' },
            ].map(f => (
              <div key={f.tt} style={{ display: 'flex', gap: 15, alignItems: 'center', paddingRight: 8 }}>
                <div style={{ flex: '0 0 auto', width: 40, height: 46, display: 'grid', placeItems: 'center' }}>
                  <svg width="38" height="42" viewBox="0 0 40 46" fill="none" stroke={GOLD_ACCENT} strokeWidth="1.4"><path d={f.icon} /></svg>
                </div>
                <div>
                  <div style={{ color: CREAM, fontFamily: 'Jost, sans-serif', fontWeight: 500, fontSize: 16, marginBottom: 4, whiteSpace: 'nowrap' }}>{f.tt}</div>
                  <div style={{ color: TEXT_DIM, fontWeight: 300, fontSize: 13, lineHeight: 1.3 }}>{f.st}</div>
                </div>
              </div>
            ))}
          </section>

          {/* ── SHOP HEADING ── */}
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20, position: 'relative', zIndex: 2 }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontWeight: 500, color: CREAM, fontSize: 38, textShadow: '0 2px 14px rgba(0,0,0,.6)', margin: 0 }}>
              Shop Our Magical Candles
            </h2>
            <Link href="/shop/candles" style={{ display: 'flex', alignItems: 'center', gap: 9, color: GOLD_ACCENT, fontFamily: 'Jost, sans-serif', fontWeight: 600, fontSize: 13, letterSpacing: '.14em', textTransform: 'uppercase', textShadow: '0 2px 12px rgba(0,0,0,.7)', textDecoration: 'none' }}>
              View All Products
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GOLD_ACCENT} strokeWidth="1.7"><path d="M4 12h15M13 6l6 6-6 6"/></svg>
            </Link>
          </div>

          {/* ── PRODUCT CARDS ── */}
          <section style={{
            position: 'relative', zIndex: 2,
            display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '48px 14px', paddingBottom: '24px',
          }}>
            {MOCK_CANDLES.map((candle: Candle) => (
              <CandleCard key={candle.id} candle={candle} />
            ))}
          </section>
        </div>
      </div>
    </main>
  )
}
