'use client'

import ShopHero from '@/components/aura/ShopHero'
import { FeaturesPanel, NotePanel } from '@/components/aura/ShopSidePanels'
import ProductCards from '@/components/aura/ProductCards'
import ShopBenefits from '@/components/aura/ShopBenefits'

export default function ClothesPage() {
  return (
    <>
      {/* ── DESKTOP ── */}
      <div
        className="hidden lg:block"
        dir="ltr"
        style={{
          position: 'relative',
          minHeight: '100vh',
          background: '#140926',
          color: 'var(--avad-cream)',
          fontFamily: 'var(--avad-sans)',
        }}
      >
        {/* Fixed full-screen background */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url("/images/hero-backgrounds/clothes-hero-bg.webp")',
            backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat',
          }}/>
          <div style={{
            position: 'absolute', inset: 0,
            background: `
              linear-gradient(180deg, rgba(11,5,24,0.45) 0%, transparent 30%, transparent 65%, rgba(11,5,24,0.85) 100%),
              linear-gradient(90deg, rgba(11,5,24,0.55) 0%, transparent 25%, transparent 75%, rgba(11,5,24,0.55) 100%)
            `,
          }}/>
        </div>

        {/* ── CONTENT ── */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

          {/* ── HERO SECTION — vertical flex column ── */}
          <section style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'space-between',
            paddingTop: 'clamp(90px, 12vh, 150px)',
            paddingLeft: 'clamp(40px, 5vw, 100px)',
            paddingRight: 'clamp(40px, 5vw, 100px)',
            paddingBottom: 'clamp(40px, 5vh, 80px)',
          }}>
            {/* Hero text block — top-left */}
            <ShopHero />

            {/* Product group — horizontal band: features | cards | note */}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(20px, 2vw, 40px)',
              width: '100%',
              marginTop: 80,
            }}>
              <FeaturesPanel />
              <ProductCards />
              <NotePanel />
            </div>
          </section>

          {/* Benefits strip — flows below hero */}
          <ShopBenefits />
        </div>
      </div>
    </>
  )
}
