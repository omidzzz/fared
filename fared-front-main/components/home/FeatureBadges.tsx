'use client'

const FEATURES = [
  {
    titleFA: 'کریستال‌های طبیعی',
    subtitleFA: 'منتخب از دل زمین',
    svg: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M19 6 L29 6 L34 18 L24 42 L14 18 Z" />
        <path d="M19 6 L24 18 L29 6 M14 18 L34 18 M24 18 L24 42" />
      </svg>
    ),
  },
  {
    titleFA: 'انرژی مثبت',
    subtitleFA: 'تعادل، آرامش، شفابخشی',
    svg: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M24 12c-3 5-3 11 0 18 3-7 3-13 0-18z" />
        <path d="M24 30c-5-4-12-4-18 0 5 6 13 7 18 2M24 30c5-4 12-4 18 0-5 6-13 7-18 2" />
      </svg>
    ),
  },
  {
    titleFA: 'پاکسازی و شارژ',
    subtitleFA: 'با روش‌های سنتی و انرژی',
    svg: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M32 24a11 11 0 1 1-9-10.8A9 9 0 0 0 32 24z" />
      </svg>
    ),
  },
  {
    titleFA: 'ارسال با نیت و عشق',
    subtitleFA: 'هر بسته با نیت خیر ارسال می‌شود',
    svg: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.3">
        <circle cx="24" cy="24" r="13" />
        <circle cx="24" cy="24" r="6" />
        <path d="M24 11v6M24 31v6M11 24h6M31 24h6M15 15l4 4M29 29l4 4M33 15l-4 4M19 29l-4 4" />
      </svg>
    ),
  },
]

export default function FeatureBadges() {
  return (
    <section className="px-3 sm:px-4 lg:px-8">
      <div
        className="relative mx-auto rounded-[14px] lg:rounded-[18px] p-4 sm:p-5 lg:p-6"
        style={{
          maxWidth: 1200,
          marginTop: -72,
          background: 'linear-gradient(160deg, rgba(59,28,110,0.5), rgba(26,12,48,0.62))',
          border: '1.5px solid rgba(231,193,111,0.42)',
          boxShadow: '0 18px 50px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.08), 0 0 40px rgba(120,60,190,.2)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        {/* Corner accent brackets */}
        {['-3px', '-3px', '-3px', '-3px'].map((_, i) => {
          const pos = i === 0 ? { top: -3, left: -3 } : i === 1 ? { top: -3, right: -3 } : i === 2 ? { bottom: -3, left: -3 } : { bottom: -3, right: -3 }
          return (
            <div key={i} className="hidden lg:block" style={{
              position: 'absolute', ...pos, width: 30, height: 30,
              borderLeft: i % 2 === 0 ? '1.5px solid var(--gold-accent)' : 'none',
              borderRight: i % 2 === 1 ? '1.5px solid var(--gold-accent)' : 'none',
              borderTop: i < 2 ? '1.5px solid var(--gold-accent)' : 'none',
              borderBottom: i >= 2 ? '1.5px solid var(--gold-accent)' : 'none',
              opacity: 0.7,
              borderTopLeftRadius: i === 0 ? 4 : 0,
              borderTopRightRadius: i === 1 ? 4 : 0,
              borderBottomLeftRadius: i === 2 ? 4 : 0,
              borderBottomRightRadius: i === 3 ? 4 : 0,
            }} />
          )
        })}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-5 sm:gap-y-6 lg:gap-0">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className={`feature-grid-cell flex flex-col items-center text-center px-2 sm:px-3 py-3 lg:py-1`}
              dir="rtl"
            >
              {/* Icon */}
              <div style={{
                color: 'var(--gold-accent)',
                filter: 'drop-shadow(0 0 10px rgba(231,193,111,0.6))',
                marginBottom: 8,
              }}>
                {f.svg}
              </div>
              {/* Title */}
              <p style={{
                fontFamily: 'var(--fa)',
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--gold-accent)',
                marginBottom: 6,
              }}>
                {f.titleFA}
              </p>
              {/* Subtitle */}
              <p style={{
                fontFamily: 'var(--fa)',
                fontSize: 11.5,
                fontWeight: 300,
                color: 'rgba(255,248,238,0.78)',
                lineHeight: 1.5,
              }}>
                {f.subtitleFA}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}