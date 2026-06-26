'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import MobileCategoryCard from '@/components/ui/MobileCategoryCard'
import CTAButton from '@/components/ui/CTAButton'
import CrystalCard from '@/components/ui/CrystalCard'
import { MOCK_STONES } from '@/lib/mock-data'
import { useCart } from '@/hooks/useCart'

/* ── Design tokens ── */
const GOLD = '#f5d87a'
const CREAM = '#ffffff'
const TEXT_DIM = 'rgba(255,255,255,0.75)'

const FILTERS = ['ALL STONES', 'PROTECTION', 'LOVE', 'ABUNDANCE', 'HEALING', 'MANIFESTATION', 'CLARITY']
const FILTER_LABELS: Record<string, string> = {
  'ALL STONES': 'All',
  'PROTECTION': 'Protection',
  'LOVE': 'Love',
  'ABUNDANCE': 'Abundance',
  'HEALING': 'Healing',
  'MANIFESTATION': 'Manifestation',
  'CLARITY': 'Clarity',
}

/* ── Animations ── */
const fadeSlideUp: React.CSSProperties = { animation: 'fadeSlideUp 0.5s ease backwards' }

/* ── Mobile filter sheet ── */

function MobileFilterBar({ activeFilter, onOpen }: { activeFilter: string; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '12px 20px', borderRadius: '100px',
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(212,175,100,0.3)',
        color: '#fff', fontSize: '0.85rem',
        margin: '0 16px 16px',
        width: 'calc(100% - 32px)', minHeight: 44,
        justifyContent: 'center', cursor: 'pointer',
      }}
    >
      ⚙ Filters {activeFilter !== 'ALL STONES' && ` · ${FILTER_LABELS[activeFilter] || activeFilter}`}
    </button>
  )
}

function FilterBottomSheet({ isOpen, onClose, activeFilter, onSelect }: {
  isOpen: boolean; onClose: () => void; activeFilter: string; onSelect: (f: string) => void
}) {
  if (!isOpen) return null

  return (
    <>
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      />
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 201,
        background: 'rgba(15, 8, 40, 0.97)', backdropFilter: 'blur(20px)',
        borderRadius: '24px 24px 0 0', border: '1px solid rgba(212,175,100,0.2)',
        padding: '12px 20px 32px', maxHeight: '70vh', overflowY: 'auto',
        animation: 'slideUp 0.3s ease',
      }}>
        <div style={{ width: '40px', height: '4px', borderRadius: '100px', background: 'rgba(255,255,255,0.25)', margin: '0 auto 20px' }} />
        <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '16px', fontFamily: "'Playfair Display', serif" }}>
          Filter by Category
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => { onSelect(f); onClose() }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '16px 20px', borderRadius: '14px', minHeight: '52px',
                background: activeFilter === f ? 'rgba(212,175,100,0.15)' : 'rgba(255,255,255,0.04)',
                border: activeFilter === f ? '1px solid rgba(212,175,100,0.5)' : '1px solid rgba(255,255,255,0.08)',
                color: activeFilter === f ? '#fff' : 'rgba(255,255,255,0.7)',
                fontSize: '0.95rem', cursor: 'pointer',
              }}
            >
              {FILTER_LABELS[f] || f}
              {activeFilter === f && <span style={{ color: '#d4af64' }}>✓</span>}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

/* ── Page ── */

export default function StonesPage() {
  const [activeFilter, setActiveFilter] = useState('ALL STONES')
  const [loaded, setLoaded] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const { totalItems } = useCart()

  useEffect(() => { setLoaded(true) }, [])

  const filteredStones = activeFilter === 'ALL STONES'
    ? MOCK_STONES
    : MOCK_STONES.filter(s => {
        const prop = s.properties.map(p => p.toUpperCase())
        if (activeFilter === 'PROTECTION') return prop.some(p => p.includes('PROTECTION') || p.includes('SHIELD') || p.includes('GROUNDING'))
        if (activeFilter === 'LOVE') return prop.some(p => p.includes('LOVE') || p.includes('COMPASSION') || p.includes('HEART'))
        if (activeFilter === 'ABUNDANCE') return prop.some(p => p.includes('ABUNDANCE') || p.includes('JOY') || p.includes('CONFIDENCE'))
        if (activeFilter === 'HEALING') return prop.some(p => p.includes('HEALING') || p.includes('BALANCE') || p.includes('CLEANSING'))
        if (activeFilter === 'MANIFESTATION') return prop.some(p => p.includes('MANIFESTATION') || p.includes('MAGIC') || p.includes('TRANSFORMATION'))
        if (activeFilter === 'CLARITY') return prop.some(p => p.includes('CLARITY') || p.includes('AMPLIFY') || p.includes('INTUITION'))
        return true
      })

  return (
    <main className="min-h-screen stones-page">
      {/* ── MOBILE ── */}
      <div className="lg:hidden flex flex-col" style={{ background: '#1a0d3d' }}>
        {/* Hero */}
        <section className="stones-mobile-hero" style={{ textAlign: 'center', padding: '100px 20px 40px' }}>
          <div style={{ fontSize: '1.2rem', color: GOLD, marginBottom: '12px' }}>✦</div>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2rem, 8vw, 2.6rem)', fontWeight: 400,
            color: CREAM, letterSpacing: '0.06em', marginBottom: '16px',
          }}>
            Energy Crystals
          </h1>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '16px',
          }}>
            <div style={{ width: '80px', borderTop: '1px solid rgba(255,215,100,0.3)' }} />
            <span style={{ color: GOLD, fontSize: '8px', margin: '0 10px' }}>✦</span>
            <div style={{ width: '80px', borderTop: '1px solid rgba(255,215,100,0.3)' }} />
          </div>
          <p style={{ fontSize: '0.9rem', color: TEXT_DIM, maxWidth: '100%', lineHeight: 1.7 }}>
            Discover the magic of natural healing crystals. Each stone carries unique energy for your spiritual journey.
          </p>
        </section>

        {/* Filter */}
        <MobileFilterBar activeFilter={activeFilter} onOpen={() => setSheetOpen(true)} />
        <FilterBottomSheet isOpen={sheetOpen} onClose={() => setSheetOpen(false)} activeFilter={activeFilter} onSelect={setActiveFilter} />

        {/* Product grid — 2 columns on mobile */}
        <div className="stones-mobile-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px', padding: '0 16px 24px',
        }}>
          {filteredStones.map(stone => (
            <CrystalCard key={stone.id} stone={stone} />
          ))}
        </div>

        <Footer />
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden lg:block" style={{ position:'relative', minHeight:'100vh', background:'#1a0d3d' }}>

        {/* Fixed background */}
        <div style={{ position:'fixed', inset:0, zIndex:0 }}>
          <Image src="/images/hero-backgrounds/stones-hero.webp" alt="" fill sizes="100vw" unoptimized priority
                 className="object-cover object-center" style={{ filter: 'blur(3px)' }}
                 onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 40%, rgba(10,5,30,0.15) 0%, transparent 55%), linear-gradient(180deg, rgba(26,13,61,0.35) 0%, transparent 30%, transparent 65%, rgba(26,13,61,0.8) 100%)' }} />
          {/* Aurora arc */}
          <svg style={{ position:'absolute', left:0, top:'20%', width:'100%', height:'45%', opacity:0.3 }} viewBox="0 0 1920 400" preserveAspectRatio="none">
            <defs>
              <linearGradient id="aur" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#9b59b6" stopOpacity="0.8"/><stop offset="25%" stopColor="#1565c0" stopOpacity="0.7"/>
                <stop offset="50%" stopColor="#00bcd4" stopOpacity="0.6"/><stop offset="75%" stopColor="#66bb6a" stopOpacity="0.5"/>
                <stop offset="100%" stopColor="#f5d87a" stopOpacity="0.4"/>
              </linearGradient>
            </defs>
            <path d="M0 300 Q480 40 960 140 Q1440 240 1920 70 L1920 400 L0 400 Z" fill="url(#aur)"/>
          </svg>
          {/* Sparkle dots */}
          {[[150,120],[580,80],[920,180],[1400,90],[1700,150],[300,280],[750,310],[1100,250],[1550,290],[1800,200]].map(([x,y],i) => (
            <div key={i} style={{
              position:'absolute', left:x, top:y, width:4, height:4,
              borderRadius:'50%', background:CREAM,
              boxShadow:'0 0 6px rgba(255,255,255,0.5), 0 0 14px rgba(255,215,100,0.3)',
              opacity: 0.4 + (i%3)*0.15, animation: 'pulse 3s ease-in-out infinite', animationDelay: `${i*0.4}s`,
            }}/>
          ))}
        </div>

        {/* Scrollable content */}
        <div style={{ position:'relative', zIndex:1, overflowY:'auto', height:'100vh' }}>

          {/* ── HERO ── */}
          <section style={{ minHeight:'55vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'100px 40px 60px', position:'relative' }}>
            {/* Mystic circles */}
            <div style={{ position:'absolute', left:'4vw', top:'25%', width:130, height:130, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.25)', display:'flex', alignItems:'center', justifyContent:'center', opacity:0.7, animation:'spinSlow 60s linear infinite' }}>
              <svg viewBox="0 0 40 40" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" width={36} height={36}><path d="M20 5C12 18 12 25 20 38C28 25 28 18 20 5Z" opacity="0.5"/><circle cx="20" cy="18" r="6"/></svg>
            </div>
            <div style={{ position:'absolute', right:'4vw', top:'25%', width:130, height:130, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.25)', display:'flex', alignItems:'center', justifyContent:'center', opacity:0.7, animation:'spinSlow 60s linear infinite reverse' }}>
              <svg viewBox="0 0 40 40" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" width={36} height={36}><path d="M20 5L28 18L20 38L12 18Z"/><path d="M12 18h16" opacity="0.5"/><path d="M20 5v13" opacity="0.5"/></svg>
            </div>

            {/* Star icon */}
            <div className="hero-el" style={{ ...(loaded?{}:{opacity:0}), ...fadeSlideUp, animationDelay:'0ms' }}>
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.2" style={{ animation:'pulse 2s ease-in-out infinite' }}>
                <path d="M12 2l3 7h7l-5.5 4 2.1 7L12 15.6 5.4 20l2.1-7L2 9h7z"/>
              </svg>
            </div>

            {/* Eyebrow */}
            <p className="hero-el" style={{ ...(loaded?{}:{opacity:0}), ...fadeSlideUp, animationDelay:'100ms', fontFamily:'Inter, sans-serif', fontSize:'0.85rem', letterSpacing:'0.25em', textTransform:'uppercase', color:'rgba(255,255,255,0.7)', marginTop:12 }}>DISCOVER THE MAGIC OF</p>

            {/* Headline */}
            <h1 className="hero-el" style={{ ...(loaded?{}:{opacity:0}), ...fadeSlideUp, animationDelay:'200ms', fontFamily:"'Playfair Display',Georgia,serif", fontSize:'clamp(3rem, 7vw, 6rem)', fontWeight:400, color:CREAM, letterSpacing:'0.08em', marginTop:4, marginBottom:0 }}>ENERGY CRYSTALS</h1>

            {/* Divider */}
            <div className="hero-el" style={{ ...(loaded?{}:{opacity:0}), ...fadeSlideUp, animationDelay:'350ms', display:'flex', alignItems:'center', justifyContent:'center', width:'100%', margin:'16px 0', position:'relative' }}>
              <div style={{ width:120, borderTop:'1px solid rgba(255,215,100,0.4)', position:'relative' }}>
                <div style={{ position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)', color:GOLD }}>
                  <svg width={14} height={20} viewBox="0 0 14 20" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M7 2 12 10l-5 8-5-8 5-8Z"/><path d="M2 10h10" opacity="0.6"/></svg>
                </div>
              </div>
            </div>

            {/* Subtitle */}
            <p className="hero-el" style={{ ...(loaded?{}:{opacity:0}), ...fadeSlideUp, animationDelay:'450ms', fontSize:'1rem', color:TEXT_DIM, maxWidth:560, textAlign:'center', lineHeight:1.7, marginTop:12 }}>
              Awaken your spirit. Elevate your energy. Align with the natural vibrations of the Earth&apos;s most powerful crystals.
            </p>

            {/* CTA */}
            <div className="hero-el" style={{ ...(loaded?{}:{opacity:0}), ...fadeSlideUp, animationDelay:'600ms', marginTop:28 }}>
              <CTAButton href="/shop/stones" size="large">EXPLORE COLLECTION ✦</CTAButton>
            </div>
          </section>

          {/* ── HERO CARD ROW ── */}
          <div style={{ display:'flex', gap:48, justifyContent:'center', padding:'0 40px 84px', maxWidth:1360, margin:'0 auto', flexWrap:'nowrap', overflowX:'auto' }}>
            {MOCK_STONES.slice(0, 5).map((stone, i) => (
              <div key={stone.id} className="card-entrance" style={{ ...fadeSlideUp, animationDelay:`${i*80}ms`, width:`calc((100% - ${4*18}px) / 5)`, minWidth:200, maxWidth:260 }}>
                <CrystalCard stone={stone} />
              </div>
            ))}
          </div>

          {/* ── FILTER BAR ── */}
          <div style={{
            background:'rgba(15,5,40,0.6)', borderRadius:12, padding:'14px 24px', margin:'0 40px 32px',
            maxWidth:1360, marginLeft:'auto', marginRight:'auto', backdropFilter:'blur(8px)',
            display:'flex', alignItems:'center', gap:12, flexWrap:'wrap',
          }}>
            {FILTERS.map(f => (
              <button key={f} role="tab" aria-selected={activeFilter===f}
                onClick={() => setActiveFilter(f)}
                style={{
                  border:`1px solid ${activeFilter===f ? 'rgba(255,215,100,0.8)' : 'rgba(255,215,100,0.35)'}`,
                  borderRadius:100, padding:'6px 20px', fontSize:'0.72rem', letterSpacing:'0.12em',
                  color: activeFilter===f ? CREAM : 'rgba(255,255,255,0.7)',
                  background: activeFilter===f ? 'rgba(255,215,100,0.15)' : 'transparent',
                  cursor:'pointer', transition:'all 0.2s ease', whiteSpace:'nowrap',
                }}>
                {f}
              </button>
            ))}
          </div>

          {/* ── EXPANDED GRID ── */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'48px 24px', maxWidth:1360, margin:'32px auto 40px', padding:'0 40px 24px' }}>
            {MOCK_STONES.map((stone, i) => (
              <div key={stone.id + '-full'} className="card-entrance" style={{ ...fadeSlideUp, animationDelay:`${i*80}ms` }}>
                <div style={{ maxWidth: 260, margin: '0 auto' }}>
                  <CrystalCard stone={stone} />
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div style={{ display:'flex', justifyContent:'center', paddingBottom:80 }}>
            <CTAButton size="large">EXPLORE MORE CRYSTALS</CTAButton>
          </div>

          <Footer />
        </div>
      </div>

      {/* Floating cart button — mobile only */}
      <Link href="/cart" className="lg:hidden" style={{
        position: 'fixed', bottom: '20px', right: '20px', zIndex: 150,
        width: '56px', height: '56px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #c8a24a, #e8c96a 50%, #c8a24a)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(200,162,74,0.5)', textDecoration: 'none',
      }}>
        <span style={{ fontSize: '1.3rem' }}>🛍</span>
        {totalItems > 0 && (
          <span style={{
            position: 'absolute', top: '-4px', right: '-4px',
            width: '22px', height: '22px', borderRadius: '50%',
            background: '#f5a623', color: '#fff',
            fontSize: '0.7rem', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {totalItems > 9 ? '9+' : totalItems}
          </span>
        )}
      </Link>

      {/* Global keyframes + mobile responsive */}
      <style jsx global>{`
        @keyframes fadeSlideUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:none } }
        @keyframes pulse { 0%,100% { opacity:0.9; transform:scale(0.95) } 50% { opacity:1; transform:scale(1.05) } }
        @keyframes spinSlow { from { transform:rotate(0deg) } to { transform:rotate(360deg) } }
        @keyframes slideUp { from { transform:translateY(100%) } to { transform:translateY(0) } }
        .hero-el { animation-fill-mode: backwards; }

        /* Mobile: force 2 columns at ALL phone sizes */
        @media (max-width: 1024px) {
          .stones-mobile-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 40px 10px !important;
          }

          /* Ensure button stays usable on mobile (touch target) */
          .crystal-card-cart-btn {
            min-width: 28px !important;
            min-height: 28px !important;
          }

          /* Ensure price stays visible */
          .crystal-card-price {
            color: #d4af64 !important;
            position: relative !important;
            z-index: 5 !important;
            opacity: 1 !important;
          }
        }

        @media (max-width: 1199px) {
          .card-entrance { width: 100% !important; min-width: 100% !important; }
        }

        @media (max-width: 768px) {
          .stones-page button,
          .stones-page a,
          .stones-page input,
          .stones-page select {
            min-height: 44px;
            min-width: 44px;
          }
          .stones-page input,
          .stones-page select {
            font-size: 16px !important;
          }
        }
      `}</style>
    </main>
  )
}
