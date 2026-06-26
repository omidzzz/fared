'use client'

import CTAButton from '@/components/ui/CTAButton'

export default function ShopHero() {
  return (
    <div className="z-[14]" style={{
      direction: 'ltr', textAlign: 'left',
      width: 'clamp(280px, 24vw, 420px)',
    }}>
      {/* Ornamental divider — left-aligned */}
      <div className="flex items-center" style={{ gap: 10, marginBottom: 14, color: 'var(--avad-gold)', justifyContent: 'flex-start' }}>
        <span style={{ width: 36, height: 1, background: 'linear-gradient(90deg,transparent,var(--avad-gold))' }} />
        <svg viewBox="0 0 26 18" fill="none" stroke="currentColor" strokeWidth="1.1" width={20} height={14}>
          <path d="M13 2c-1.5 3-1.5 6 0 8 1.5-2 1.5-5 0-8ZM13 10c-3-1.5-6-1-8 1 2.5 1.5 5.5 1 8-1ZM13 10c3-1.5 6-1 8 1-2.5 1.5-5.5 1-8-1Z"/>
        </svg>
        <span style={{ width: 36, height: 1, background: 'linear-gradient(270deg,transparent,var(--avad-gold))' }} />
      </div>

      {/* H1 — reduced size, more whitespace */}
      <h1 style={{ fontFamily: 'var(--avad-serif)', fontWeight: 700, fontSize: 'clamp(44px, 4.2vw, 62px)', lineHeight: 1.04, letterSpacing: '0.005em', textAlign: 'left', color: 'var(--avad-cream)', textShadow: '0 4px 40px rgba(0,0,0,.6), 0 0 60px rgba(216,179,106,0.18)' }}>
        <span style={{ display: 'block', color: 'var(--avad-cream)' }}>Wear the Energy.</span>
        <span style={{ display: 'block', color: 'var(--avad-gold-bright)' }}>Be the Light.</span>
      </h1>

      {/* Subtitle */}
      <p style={{ marginTop: 24, color: 'var(--avad-text-dim)', fontWeight: 300, fontSize: 16, lineHeight: 1.5, maxWidth: 260, textAlign: 'left', textShadow: '0 2px 12px rgba(0,0,0,.6)' }}>
        Elevated garments for your spiritual path and everyday magic.
      </p>

      {/* CTA Button */}
      <div style={{ marginTop: 36 }}>
        <CTAButton href="/shop/clothes" size="large">EXPLORE COLLECTIONS</CTAButton>
      </div>
    </div>
  )
}
