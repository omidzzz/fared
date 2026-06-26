'use client'

const PANEL_PATH = "M273.785 67.2924V65.7286C273.785 50.6882 256.492 38.4976 235.156 38.4976H234.443V33.3594C234.443 4.64918 194.969 28.6377 173.452 18.6269C161.023 12.8426 152.497 0 152.497 0C152.497 0 143.977 12.8426 131.542 18.6269C110.025 28.6377 70.5566 4.64314 70.5566 33.3594V38.4976H69.8436C48.508 38.4976 31.2148 50.6882 31.2148 65.7286V67.2924C13.6436 69.2426 0 83.486 0 100.779V475.221C0 492.514 13.6436 506.757 31.2148 508.708V510.271C31.2148 525.312 48.508 537.502 69.8436 537.502H70.5566V542.641C70.5566 571.351 110.031 547.356 131.542 557.373C143.971 563.157 152.497 576 152.497 576C152.497 576 161.017 563.157 173.452 557.373C194.969 547.362 234.443 571.357 234.443 542.641V537.502H235.156C256.492 537.502 273.785 525.312 273.785 510.271V508.708C291.356 506.757 305 492.514 305 475.221V100.779C305 83.486 291.356 69.2426 273.785 67.2924Z"

const glassBg = 'linear-gradient(180deg, rgba(28,12,54,0.72), rgba(18,8,38,0.6))'

const features = [
  {
    title: 'High Vibrational',
    sub: 'Fabrics',
    svg: (
      <svg viewBox="0 0 42 42" fill="none" stroke="currentColor" strokeWidth="1.2" width={42} height={42}>
        <path d="M21 8c-2.5 5-2.5 10 0 15 2.5-5 2.5-10 0-15Z" fill="currentColor" fillOpacity=".2"/>
        <path d="M21 23c-6-4-12-3-18 1 6 4 12 3 18-1ZM21 23c6-4 12-3 18 1-6 4-12 3-18-1Z"/>
        <path d="M21 23c-3.5 4-3.5 8 0 12M21 23c3.5 4 3.5 8 0 12" opacity=".7"/>
      </svg>
    ),
  },
  {
    title: 'Ethically Sourced',
    sub: 'Materials',
    svg: (
      <svg viewBox="0 0 42 42" fill="none" stroke="currentColor" strokeWidth="1.2" width={42} height={42}>
        <path d="M21 7 35 15v14L21 37 7 29V15L21 7Z"/>
        <path d="M21 7v15m0 0L7 15m14 7 14-8m-14 8v15" opacity=".55"/>
        <circle cx="21" cy="22" r="2.2" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    title: 'Infused with',
    sub: 'Positive Energy',
    svg: (
      <svg viewBox="0 0 42 42" fill="none" stroke="currentColor" strokeWidth="1.2" width={42} height={42}>
        <circle cx="21" cy="21" r="7"/>
        <g strokeLinecap="round">
          <path d="M21 5v4M21 33v4M5 21h4M33 21h4M9.6 9.6l2.8 2.8M29.6 29.6l2.8 2.8M32.4 9.6l-2.8 2.8M12.4 29.6l-2.8 2.8"/>
        </g>
      </svg>
    ),
  },
]

function PanelFrame({ id, width, height, children }: { id: string, width: string, height?: string, children: React.ReactNode }) {
  const maskSvg = `%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 305 576' preserveAspectRatio='none'%3E%3Cpath d='${encodeURIComponent(PANEL_PATH)}' fill='black'/%3E%3C/svg%3E`
  return (
    <div className="relative pointer-events-none" style={{
      flexShrink: 0,
      width,
      height: height ?? 'auto',
      filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4))',
    }}>
      {/* Masked fill */}
      <div style={{
        position: 'absolute', inset: 0,
        WebkitMaskImage: `url("data:image/svg+xml,${maskSvg}")`,
        maskImage: `url("data:image/svg+xml,${maskSvg}")`,
        WebkitMaskSize: '100% 100%',
        maskSize: '100% 100%',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        background: glassBg,
        backdropFilter: 'blur(3px)',
        WebkitBackdropFilter: 'blur(3px)',
      }} />

      {/* Content layer */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>

      {/* Gold border SVG overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
        <svg viewBox="0 0 305 576" preserveAspectRatio="none" width="100%" height="100%">
          <defs>
            <linearGradient id={`pnl-grd-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f3dca0" stopOpacity="0.7"/>
              <stop offset="0.5" stopColor="#d8b36a" stopOpacity="0.6"/>
              <stop offset="1" stopColor="#b88f44" stopOpacity="0.7"/>
            </linearGradient>
            <filter id={`pnl-glw-${id}`} x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="1.2" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <path d={PANEL_PATH} fill="none" stroke={`url(#pnl-grd-${id})`} strokeWidth="1.2" filter={`url(#pnl-glw-${id})`}/>
        </svg>
      </div>
    </div>
  )
}

export function FeaturesPanel() {
  return (
    <PanelFrame id="features" width="clamp(150px, 12vw, 195px)">
      <div style={{
        padding: '34px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 22,
      }}>
        {features.map((f) => (
          <div key={f.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ width: 32, height: 32, color: 'var(--avad-gold)', filter: 'drop-shadow(0 0 4px rgba(216,179,106,0.4))', flexShrink: 0 }}>
              {f.svg}
            </div>
            <div>
              <div style={{ fontFamily: 'var(--avad-serif)', fontWeight: 600, fontSize: 17, color: 'var(--avad-cream)', lineHeight: 1.05 }}>{f.title}</div>
              <div style={{ fontFamily: 'var(--avad-sans)', fontWeight: 300, fontSize: 11, letterSpacing: '0.04em', color: 'var(--avad-gold)', marginTop: 3 }}>{f.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </PanelFrame>
  )
}

export function NotePanel() {
  return (
    <PanelFrame id="note" width="clamp(140px, 11vw, 185px)">
      <div style={{
        padding: '28px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        textAlign: 'center',
      }}>
        <svg viewBox="0 0 40 14" fill="none" stroke="currentColor" strokeWidth="1.1" width={32} height={12} style={{ color: 'var(--avad-gold)', opacity: 0.8 }}>
          <path d="M20 2c-1.2 2.5-1.2 5 0 7M20 9c-3-1.2-5-.8-7 1M20 9c3-1.2 5-.8 7 1"/>
          <path d="M2 9c3 .8 5 .8 7 0M38 9c-3 .8-5 .8-7 0" opacity=".6"/>
        </svg>
        <p style={{ fontFamily: 'var(--avad-serif)', fontWeight: 400, fontStyle: 'italic', fontSize: 18, lineHeight: 1.3, color: 'var(--avad-cream)', textShadow: '0 2px 10px rgba(0,0,0,.4)' }}>
          Each piece is mindfully created to elevate your energy and support your journey.
        </p>
        <svg viewBox="0 0 40 14" fill="none" stroke="currentColor" strokeWidth="1.1" width={32} height={12} style={{ color: 'var(--avad-gold)', opacity: 0.8 }}>
          <path d="M20 2c-1.2 2.5-1.2 5 0 7M20 9c-3-1.2-5-.8-7 1M20 9c3-1.2 5-.8 7 1"/>
          <path d="M2 9c3 .8 5 .8 7 0M38 9c-3 .8-5 .8-7 0" opacity=".6"/>
        </svg>
      </div>
    </PanelFrame>
  )
}
