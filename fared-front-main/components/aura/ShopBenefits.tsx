'use client'

const benefits = [
  {
    title: 'Free Worldwide Shipping',
    sub: 'On orders over $120',
    svg: (
      <svg viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="1.3" width={38} height={38}>
        <circle cx="19" cy="19" r="13"/>
        <path d="M6 19h26M19 6c4 4 4 22 0 26M19 6c-4 4-4 22 0 26" opacity=".7"/>
      </svg>
    ),
  },
  {
    title: '30-Day Easy Returns',
    sub: '& Exchanges',
    svg: (
      <svg viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="1.3" width={38} height={38}>
        <path d="M11 14a10 10 0 1 1-2 6" strokeLinecap="round"/>
        <path d="M11 7v7h7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Secure Payments',
    sub: '& Checkout',
    svg: (
      <svg viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="1.3" width={38} height={38}>
        <path d="M19 5l11 4v8c0 7-5 12-11 14-6-2-11-7-11-14V9l11-4Z"/>
        <path d="m14 18 3.5 3.5L25 14" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

const Divider = () => (
  <svg viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="1.1" width={30} height={30} style={{ color: 'var(--avad-gold)', opacity: 0.6 }}>
    <path d="M15 4v22M4 15h22" opacity=".5"/>
    <path d="M15 9c-1.5 3-1.5 5 0 8 1.5-3 1.5-5 0-8Z" fill="currentColor" stroke="none" fillOpacity=".5"/>
  </svg>
)

export default function ShopBenefits() {
  return (
    <div className="relative z-[14]" style={{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'clamp(30px, 4vw, 60px)',
      padding: 'clamp(30px, 5vh, 60px) 40px',
      flexWrap: 'wrap',
    }}>
      {benefits.map((b, i) => (
        <span key={b.title} style={{ display: 'contents' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 15, direction: 'ltr', textAlign: 'left' }}>
            <div style={{ width: 38, height: 38, color: 'var(--avad-gold)', filter: 'drop-shadow(0 0 6px rgba(216,179,106,0.5))', flexShrink: 0 }}>
              {b.svg}
            </div>
            <div>
              <div style={{ fontFamily: 'var(--avad-sans)', fontWeight: 500, fontSize: 13, letterSpacing: '.12em', color: 'var(--avad-cream)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{b.title}</div>
              <div style={{ fontFamily: 'var(--avad-sans)', fontWeight: 300, fontSize: 11, letterSpacing: '.1em', color: 'var(--avad-gold)', textTransform: 'uppercase', marginTop: 3 }}>{b.sub}</div>
            </div>
          </div>
          {i < benefits.length - 1 && <Divider />}
        </span>
      ))}
    </div>
  )
}
