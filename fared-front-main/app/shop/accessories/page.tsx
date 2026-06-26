'use client'

import Image from 'next/image'
import Link from 'next/link'
import DynamicHeader from '@/components/layout/DynamicHeader'
import { HeroShimmer } from '@/components/ui/HeroShimmer'
import Footer from '@/components/layout/Footer'
import MobileCategoryCard from '@/components/ui/MobileCategoryCard'
import { MOCK_ACCESSORIES } from '@/lib/mock-data'
import type { Accessory } from '@/lib/mock-data'
import CTAButton from '@/components/ui/CTAButton'
import AccessoryCard from '@/components/ui/AccessoryCard'

/* ---- Design tokens from Mystic Earth ---- */
const GOLD = '#c8b27e'
const CREAM = '#f3eee2'
const TEAL_GLOW = '#7fdccb'
const TEXT_DIM = '#bcc8c2'
const PANEL = 'rgba(9,28,28,0.46)'
const PANEL_STRONG = 'rgba(8,26,27,0.62)'
const BORDER = 'rgba(150,190,178,0.16)'
const DARK_BG = '#05100f'

const products = MOCK_ACCESSORIES.slice(0, 10)

export default function AccessoriesPage() {
  return (
    <main className="min-h-screen">
      {/* ── MOBILE ── */}
      <div className="lg:hidden flex flex-col page-gradient-solar">
        <DynamicHeader />
        <section className="px-4 pt-[88px] pb-4">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
            <Image src="/images/hero-backgrounds/accessories-hero.webp" alt="" fill sizes="100vw" className="object-cover" priority
                   onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <HeroShimmer />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-5">
              <h1 className="font-display text-3xl text-[var(--text-primary)] leading-tight mb-2">لوازم جانبی مقدس</h1>
              <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed mb-4 max-w-xs">
                ابزارهایی برای تمرین معنوی شما. سازهای دست‌چین شده برای تقویت انرژی و نیت شما.
              </p>
              <Link href="/shop/accessories/products">
                <button className="inline-flex items-center gap-2 font-body text-sm tracking-widest uppercase transition-all duration-300 hover:opacity-85"
                        style={{ padding: '11px 32px', borderRadius: 50, background: 'rgba(241,196,15,0.15)', border: '1px solid rgba(241,196,15,0.65)', color: 'var(--text-primary)', boxShadow: '0 0 20px rgba(241,196,15,0.15)' }}>
                  کشف مجموعه
                </button>
              </Link>
            </div>
          </div>
        </section>
        <section className="pt-6 pb-2">
          <h2 className="font-display text-xl text-[var(--text-primary)] px-4 mb-4">مجموعه ما</h2>
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 px-4 pb-6">
            {MOCK_ACCESSORIES.map(a => (
              <div key={a.id} className="w-[44vw] flex-shrink-0 snap-start">
                <MobileCategoryCard id={a.id} name={a.name} nameFA={a.nameFA ?? a.name}
                                    image={a.image} accentColor="var(--chakra-solar)" />
              </div>
            ))}
            <Link href="/shop/accessories" className="w-[40vw] flex-shrink-0 snap-start">
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

      {/* ── DESKTOP: Mystic Earth Design ── */}
      <div className="hidden lg:block" style={{ position: 'relative', minHeight: '100vh', background: DARK_BG, direction: 'ltr' }}>

        {/* Fixed full-screen background */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
          <Image src="/images/hero-backgrounds/hero-accessories.webp" alt="" fill sizes="100vw" unoptimized priority
                 className="object-cover object-center" style={{ objectPosition: 'center 8%' }}
                 onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
          <div style={{
            position: 'absolute', inset: 0, background:
              'radial-gradient(120% 80% at 30% 35%, rgba(4,16,15,0.55), rgba(4,16,15,0) 55%), ' +
              'linear-gradient(180deg, rgba(4,16,15,0.45) 0%, rgba(4,16,15,0) 22%, rgba(4,16,15,0) 46%, rgba(4,16,15,0.5) 62%, rgba(4,16,15,0.86) 100%)',
          }} />
        </div>

        {/* Scrollable content layer */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1600, margin: '0 auto', padding: '120px 60px 80px 60px', minHeight: '100vh' }}>

          {/* ── HERO ROW: title+CTA on left, sidebar on right ── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 32, marginBottom: 60 }}>
            {/* LEFT: hero text + CTA */}
            <section style={{ zIndex: 2, maxWidth: 480, textAlign: 'left' as const }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, color: GOLD, fontFamily: 'Jost, sans-serif', fontWeight: 500, fontSize: 14, letterSpacing: '.22em', textTransform: 'uppercase', marginBottom: 18 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.6"><path d="M12 3c-3 4-6 6-6 10a6 6 0 0 0 12 0c0-4-3-6-6-10z"/><path d="M12 8c-1.5 2-3 3-3 5"/></svg>
                Connect. Elevate. Transform.
              </div>
              <h1 style={{ fontFamily: '"Playfair Display", serif', fontWeight: 500, color: CREAM, fontSize: 48, lineHeight: 1.1, letterSpacing: '.01em', textShadow: '0 4px 30px rgba(0,0,0,.55)', margin: 0 }}>
                Bring Magic<br />Into Your Space
              </h1>
              <div style={{ marginTop: 34 }}>
                <CTAButton href="/shop/accessories">Shop the Collection</CTAButton>
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
                { icon: 'M9 9l3-5 3 5v8l-3 4-3-4z M9 9h6', tt: 'Ethically Sourced', st: 'Every piece chosen with love & intention' },
                { icon: 'M12 13c2.5-1 4-3 4-6 0 0-3 1-4 4-1-3-4-4-4-4 0 3 1.5 5 4 6z M4 13c2 0 4 1 5 3M20 13c-2 0-4 1-5 3M12 13v4', tt: 'High Vibration', st: 'Energy cleansing & spiritually aligned' },
                { icon: 'M21 12a9 9 0 11-18 0 9 9 0 0118 0z M3 12h18 M12 3c2.5 2.5 2.5 13 0 16 M12 3c-2.5 2.5-2.5 13 0 16', tt: 'Worldwide Shipping', st: 'Bringing light to your door' },
              ].map(item => (
                <div key={item.tt} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ flex: '0 0 auto', width: 42, height: 42, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'rgba(20,60,56,0.5)', border: '1px solid rgba(150,200,186,0.22)' }}>
                    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={TEAL_GLOW} strokeWidth="1.5"><path d={item.icon} /></svg>
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
              { icon: 'M14 16l4-9 4 9v18l-4 6-4-6z M14 16h8 M24 21l4-6 3 6v11l-3 4-4-5', tt: 'Crystal Energy', st: 'Natural stones for healing and protection' },
              { icon: 'M33 23a13 13 0 100-26 13 13 0 000 26z M20 10v26 M7 23h26 M11 14l18 18 M29 14L11 32 M33 23a5 5 0 100-10 5 5 0 000 10z', tt: 'Sacred Geometry', st: 'Symbols that align mind, body & spirit' },
              { icon: 'M20 30c4-1.5 6-4.5 6-9 0 0-4 1.5-6 6-2-4.5-6-6-6-6 0 4.5 2 7.5 6 9z M9 30c3 0 6 1.5 7.5 4.5M31 30c-3 0-6 1.5-7.5 4.5M20 30v6', tt: 'Ambient Glow', st: 'Lighting that elevates your sacred space' },
              { icon: 'M20 18c-1.5-2.5-5-2.5-6 0-1 2.5 1.5 4.5 6 8 4.5-3.5 7-5.5 6-8-1-2.5-4.5-2.5-6 0z M9 31c2-3 4-4 6-4M31 31c-2-3-4-4-6-4', tt: 'Handcrafted', st: 'Made with intention and positive energy' },
            ].map(f => (
              <div key={f.tt} style={{ display: 'flex', gap: 15, alignItems: 'center', paddingRight: 8 }}>
                <div style={{ flex: '0 0 auto', width: 40, height: 46, display: 'grid', placeItems: 'center' }}>
                  <svg width="38" height="42" viewBox="0 0 40 46" fill="none" stroke={GOLD} strokeWidth="1.4"><path d={f.icon} /></svg>
                </div>
                <div>
                  <div style={{ color: CREAM, fontFamily: 'Jost, sans-serif', fontWeight: 500, fontSize: 16, marginBottom: 4, whiteSpace: 'nowrap' }}>{f.tt}</div>
                  <div style={{ color: TEXT_DIM, fontWeight: 300, fontSize: 13, lineHeight: 1.3 }}>{f.st}</div>
                </div>
              </div>
            ))}
          </section>

          {/* ── SHOP HEADING ── */}
          <div style={{ position: 'relative', zIndex: 2, marginBottom: 20, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontWeight: 500, color: CREAM, fontSize: 38, whiteSpace: 'nowrap', textShadow: '0 2px 14px rgba(0,0,0,.6)', margin: 0 }}>
              Shop Our Spiritual Decor
            </h2>
            <Link href="/shop/accessories" style={{ display: 'flex', alignItems: 'center', gap: 9, color: GOLD, fontFamily: 'Jost, sans-serif', fontWeight: 600, fontSize: 13, letterSpacing: '.14em', textTransform: 'uppercase', textShadow: '0 2px 12px rgba(0,0,0,.7)', textDecoration: 'none' }}>
              View All Products
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.7"><path d="M4 12h15M13 6l6 6-6 6"/></svg>
            </Link>
          </div>

          {/* ── PRODUCT CARDS ── */}
          <section style={{
            position: 'relative', zIndex: 2,
            display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '48px 14px', paddingBottom: '24px',
          }}>
            {products.map((p: Accessory) => (
              <AccessoryCard key={p.id} accessory={p} />
            ))}
          </section>
        </div>
      </div>
    </main>
  )
}
