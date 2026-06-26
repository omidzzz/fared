'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

/* ─────────────────────────────────────────────────────────────
   /shop/tours — SoulPath tour/retreat landing (responsive rebuild,
   promoted from the former /shop/tour-v2 prototype).
   - Real responsive layout (not a fixed scaled canvas).
   - The page content is English and mirrors an LTR mockup, so the
     container is forced dir="ltr" (the site root is dir="rtl").
   - Desktop (≥1024px): CSS-grid areas — hero top-left, destinations
     bottom-left, form spans both rows on the right:
         "hero form"
         "dest form"
       • Form TOP aligns with hero H1 TOP  (both start row 1).
       • Form BOTTOM aligns with card-row BOTTOM (form spans to row 2's
         bottom; the destinations block sits in row 2). No hardcoded
         pixel height — the form stretches to the grid row span and
         distributes its content with space-between.
   - Mobile (<1024px): single column, explicit order →
       hero (1) → form (2) → destinations (3).
   Fonts: site standard — Playfair Display (--font-display) + Inter
   (--font-body). No new font dependency.
   ───────────────────────────────────────────────────────────── */

const GOLD = '#d9b25f'

const destinations = [
  { id: 'bali', name: 'BALI', subtitle: 'AWAKENING RETREAT', dates: 'May 10 – May 17, 2025', image: '/images/products/tours/bali.webp' },
  { id: 'peru', name: 'PERU', subtitle: 'SACRED VALLEY JOURNEY', dates: 'Jun 14 – Jun 21, 2025', image: '/images/products/tours/peru.webp' },
  { id: 'greece', name: 'GREECE', subtitle: 'AEGEAN SOUL ESCAPE', dates: 'Jul 19 – Jul 26, 2025', image: '/images/products/tours/greece.webp' },
  { id: 'thailand', name: 'THAILAND', subtitle: 'SPIRIT PATH RETREAT', dates: 'Aug 16 – Aug 23, 2025', image: '/images/products/tours/thailand.webp' },
]

/* ── Tour-card row copied verbatim from app/shop/tours/page.tsx ──
   Independent copy (per task) — identical size/style: card height 250,
   border-radius 16, lotus icon, gradient overlay, 4-col grid. Do not
   refactor into a shared file. ─────────────────────────────────── */
const tours = [
  { id: 'bali', country: 'BALI', name: 'AWAKENING RETREAT', dates: 'May 10 – May 17, 2025', image: '/images/products/tours/bali.webp' },
  { id: 'peru', country: 'PERU', name: 'SACRED VALLEY JOURNEY', dates: 'Jun 14 – Jun 21, 2025', image: '/images/products/tours/peru.webp' },
  { id: 'greece', country: 'GREECE', name: 'AEGEAN SOUL ESCAPE', dates: 'Jul 19 – Jul 26, 2025', image: '/images/products/tours/greece.webp' },
  { id: 'thailand', country: 'THAILAND', name: 'SPIRIT PATH RETREAT', dates: 'Aug 16 – Aug 23, 2025', image: '/images/products/tours/thailand.webp' },
]

function TourCard({ tour }: { tour: typeof tours[number] }) {
  return (
    <Link href={`/shop/tours/${tour.id}`} style={{ textDecoration: 'none' }}>
      <div className="group" style={{
        width: '100%', height: 250, borderRadius: 16, overflow: 'hidden', position: 'relative',
        border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.5)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '' }}>
        {/* Image fills entire card */}
        <Image src={tour.image} alt={tour.country} fill sizes="210px" unoptimized className="object-cover"
               onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}/>
        {/* Dark gradient overlay from bottom */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,15,30,0.95) 0%, rgba(5,15,30,0.55) 35%, transparent 70%)' }}/>
        {/* Lotus icon top center */}
        <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', color: 'rgba(212,175,100,0.85)', fontSize: '0.75rem' }}>🪷</div>
        {/* Content at bottom */}
        <div style={{ position: 'absolute', bottom: 16, left: 0, right: 0, textAlign: 'center', padding: '0 12px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', letterSpacing: '0.1em', marginBottom: 3 }}>{tour.country}</h3>
          <p style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.08em', marginBottom: 5 }}>{tour.name}</p>
          <p style={{ fontSize: '0.58rem', color: 'rgba(212,175,100,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}><span>🕐</span>{tour.dates}</p>
        </div>
      </div>
    </Link>
  )
}

/* ── Inline line-icons (no icon library) ───────────────────── */
const Icon = {
  compass: (s = 17) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <polygon points="15.5 8.5 10.5 10.5 8.5 15.5 13.5 13.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  person: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20c0-3.6 3.1-5.6 7-5.6s7 2 7 5.6" />
    </svg>
  ),
  envelope: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  ),
  shield: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6z" />
    </svg>
  ),
  calendar: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </svg>
  ),
  chevron: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 9l6 6 6-6" />
    </svg>
  ),
  arrow: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  crystal: (s = 38) => (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none" stroke={GOLD} strokeWidth="1.2" strokeLinejoin="round" aria-hidden>
      <path d="M24 5l9 11-9 27-9-27z" fill="rgba(217,178,95,0.12)" />
      <path d="M15 16h18M24 5v38M19.5 16L24 43M28.5 16L24 43" />
    </svg>
  ),
}

/* small feature icons (gold line) used in the form footer row */
const featureIcons: Record<string, (s?: number) => React.ReactElement> = {
  'Sacred Locations': (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 21c5-5 7-8.4 7-12a7 7 0 1 0-14 0c0 3.6 2 7 7 12z" />
      <circle cx="12" cy="9" r="2.4" />
    </svg>
  ),
  'Expert Guides': (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="7.5" r="3.2" />
      <path d="M5 20c0-3.4 3-5.4 7-5.4s7 2 7 5.4" />
    </svg>
  ),
  'Transformative Experiences': (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3l2.3 5.6L20 9.5l-4.3 3.7L17 19l-5-3-5 3 1.3-5.8L4 9.5l5.7-.9z" />
    </svg>
  ),
  'Soulful Community': (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 20s-7-4.2-7-9.2A4.3 4.3 0 0 1 12 8a4.3 4.3 0 0 1 7 2.8c0 5-7 9.2-7 9.2z" />
    </svg>
  ),
}
const features = ['Sacred Locations', 'Expert Guides', 'Transformative Experiences', 'Soulful Community']

/* ── shared input row style ───────────────────────────────── */
const fieldWrap: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 10,
  padding: 15,
  border: '1px solid rgba(255,255,255,0.18)',
  borderRadius: 11,
  background: 'rgba(255,255,255,0.06)',
}
const fieldInput: React.CSSProperties = {
  flex: 1, minWidth: 0, background: 'transparent', border: 'none', outline: 'none',
  color: '#fff', fontSize: 14, fontFamily: 'var(--font-body), Inter, sans-serif',
}

export default function ToursPage() {
  const [form, setForm] = useState({ name: '', email: '', retreat: '', date: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // No backend wiring — surface the captured values for now.
    console.log('Retreat registration:', form)
  }

  return (
    <main
      dir="ltr"
      style={{ position: 'relative', minHeight: '100vh', color: '#fff', fontFamily: 'var(--font-body), Inter, sans-serif' }}
    >
      {/* ── Layer 1 — fixed full-bleed background (zIndex 0) ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }} aria-hidden>
        <Image
          src="/images/hero-backgrounds/tours-hero.webp"
          alt=""
          fill
          sizes="100vw"
          priority
          unoptimized
          className="object-cover object-center"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        {/* readability veil over the photo */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,16,28,0.78), rgba(4,16,28,0.45) 55%, rgba(4,16,28,0.7))' }} />
      </div>

      {/* ── Layer 2 — scrollable content (zIndex 1) ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="tv2-grid">

          {/* ════════ HERO (grid-area: hero) ════════ */}
          <div className="tv2-hero">
            <h1 className="tv2-h1">
              Mystical Retreats<br />
              for the <span style={{ color: GOLD }}>Soul</span>
            </h1>
            <p className="tv2-sub">
              Journey to sacred places, awaken your inner light, and align with the wisdom of the universe.
            </p>
            <button type="button" className="tv2-cta">
              <span style={{ display: 'inline-flex', color: '#fff' }}>{Icon.compass()}</span>
              EXPLORE RETREATS
            </button>
          </div>

          {/* ════════ FEATURED DESTINATIONS (grid-area: dest) ════════ */}
          {/* Label + 4-card grid copied verbatim from app/shop/tours/page.tsx */}
          <div className="tv2-dest">
            {/* BOTTOM: Featured destinations label + tour cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* Section label */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '12px',
              }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(212,175,100,0.3)' }} />
                <span style={{ color: '#d4af64', fontSize: '0.6rem' }}>✦</span>
                <span style={{
                  fontSize: '0.68rem', letterSpacing: '0.3em',
                  color: 'rgba(255,255,255,0.65)',
                }}>
                  FEATURED DESTINATIONS
                </span>
                <span style={{ color: '#d4af64', fontSize: '0.6rem' }}>✦</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(212,175,100,0.3)' }} />
              </div>

              {/* Tour cards row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px',
              }}>
                {tours.map(tour => <TourCard key={tour.id} tour={tour} />)}
              </div>
            </div>
          </div>

          {/* ════════ REGISTRATION CARD (grid-area: form) ════════ */}
          <aside className="tv2-right">
            <form className="tv2-form" onSubmit={handleSubmit}>
              {/* top: crystal flanked by gold dividers */}
              <div>
                <div className="tv2-form-crystal">
                  <span className="tv2-divider" />
                  <span style={{ display: 'inline-flex' }}>{Icon.crystal()}</span>
                  <span className="tv2-divider" />
                </div>
                <h2 className="tv2-form-title">Join Our Next Journey</h2>
                <p className="tv2-form-subtext">Reserve your spot and begin your transformation.</p>
                <div className="tv2-ornament">❦</div>
              </div>

              {/* four real, controlled fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <label style={fieldWrap}>
                  <span style={{ display: 'inline-flex', color: 'rgba(255,255,255,0.65)' }}>{Icon.person()}</span>
                  <span className="tv2-sr">Full Name</span>
                  <input
                    type="text" name="name" autoComplete="name" placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    style={fieldInput}
                    className="tv2-input"
                  />
                </label>

                <label style={fieldWrap}>
                  <span style={{ display: 'inline-flex', color: 'rgba(255,255,255,0.65)' }}>{Icon.envelope()}</span>
                  <span className="tv2-sr">Email Address</span>
                  <input
                    type="email" name="email" autoComplete="email" placeholder="Email Address"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    style={fieldInput}
                    className="tv2-input"
                  />
                </label>

                <label style={fieldWrap}>
                  <span style={{ display: 'inline-flex', color: 'rgba(255,255,255,0.65)' }}>{Icon.shield()}</span>
                  <span className="tv2-sr">Select Retreat</span>
                  <select
                    name="retreat"
                    value={form.retreat}
                    onChange={(e) => setForm((p) => ({ ...p, retreat: e.target.value }))}
                    style={{ ...fieldInput, cursor: 'pointer', appearance: 'none', color: form.retreat ? '#fff' : 'rgba(255,255,255,0.65)' }}
                  >
                    <option value="" disabled>Select Retreat</option>
                    {destinations.map((d) => (
                      <option key={d.id} value={d.id} style={{ color: '#000' }}>
                        {d.name.charAt(0) + d.name.slice(1).toLowerCase()} — {d.subtitle.charAt(0) + d.subtitle.slice(1).toLowerCase()}
                      </option>
                    ))}
                  </select>
                  <span style={{ display: 'inline-flex', color: 'rgba(255,255,255,0.55)' }}>{Icon.chevron()}</span>
                </label>

                <label style={fieldWrap}>
                  <span style={{ display: 'inline-flex', color: 'rgba(255,255,255,0.65)' }}>{Icon.calendar()}</span>
                  <span className="tv2-sr">Arrival Date</span>
                  <input
                    type="date" name="date" placeholder="Arrival Date"
                    value={form.date}
                    onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                    style={{ ...fieldInput, colorScheme: 'dark', color: form.date ? '#fff' : 'rgba(255,255,255,0.65)' }}
                  />
                </label>
              </div>

              {/* submit — bottom-anchored group (space-between pins it to the
                  form's bottom edge, level with the tour-card row bottom) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <button type="submit" className="tv2-submit">
                  REGISTER NOW
                  <span style={{ display: 'inline-flex' }}>{Icon.arrow()}</span>
                </button>
              </div>
            </form>
          </aside>
        </div>
      </div>

      {/* ── Scoped styles + the responsive breakpoint ── */}
      <style jsx>{`
        .tv2-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 150px 16px 80px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }
        /* mobile stack order: hero → form → destinations */
        .tv2-hero { order: 1; }
        .tv2-right { order: 2; }
        .tv2-dest { order: 3; }

        /* HERO */
        .tv2-hero { display: flex; flex-direction: column; gap: 22px; }
        .tv2-h1 {
          font-family: var(--font-display), 'Playfair Display', Georgia, serif;
          font-weight: 600;
          font-size: clamp(2.4rem, 5vw, 62px);
          line-height: 1.06;
          color: #fff;
          margin: 0;
        }
        .tv2-sub {
          font-size: 18px;
          font-weight: 300;
          line-height: 1.6;
          color: rgba(255,255,255,0.9);
          max-width: 430px;
          margin: 0;
        }
        .tv2-cta {
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 18px 38px;
          border: none;
          border-radius: 40px;
          background: linear-gradient(120deg, #2f6fb0, #3f8fd0);
          box-shadow: 0 10px 30px rgba(40,110,180,0.45);
          color: #fff;
          font-family: var(--font-body), Inter, sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 2px;
          cursor: pointer;
          min-height: 44px;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .tv2-cta:hover { transform: translateY(-2px); box-shadow: 0 14px 38px rgba(40,110,180,0.55); }

        /* DESTINATIONS */
        .tv2-dest { display: flex; flex-direction: column; gap: 22px; }
        .tv2-dest-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          color: ${GOLD};
          font-weight: 600;
          font-size: 12.5px;
          letter-spacing: 4px;
        }
        .tv2-cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }
        .tv2-card {
          position: relative;
          height: 248px;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(217,178,95,0.3);
        }
        .tv2-card-veil {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(6,20,34,0.96) 22%, rgba(6,20,34,0.55) 50%, transparent 100%);
        }
        .tv2-card-body {
          position: absolute;
          bottom: 18px;
          left: 0;
          right: 0;
          text-align: center;
          padding: 0 12px;
        }
        .tv2-card-name {
          font-family: var(--font-display), 'Playfair Display', Georgia, serif;
          font-weight: 600;
          font-size: 21px;
          color: #fff;
          margin: 0 0 4px;
        }
        .tv2-card-sub {
          font-size: 11.5px;
          letter-spacing: 1.5px;
          color: rgba(255,255,255,0.8);
          margin: 0 0 7px;
        }
        .tv2-card-date {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          font-size: 12px;
          color: ${GOLD};
          margin: 0;
        }

        /* RIGHT — glass form */
        .tv2-right { display: flex; }
        .tv2-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 22px;
          padding: 34px;
          border-radius: 22px;
          border: 1px solid rgba(217,178,95,0.55);
          background: linear-gradient(160deg, rgba(12,40,52,0.72), rgba(8,28,44,0.82));
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }
        .tv2-form-crystal {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-bottom: 14px;
        }
        .tv2-divider {
          height: 1px;
          width: 70px;
          background: linear-gradient(90deg, transparent, ${GOLD});
        }
        .tv2-divider:last-child { background: linear-gradient(90deg, ${GOLD}, transparent); }
        .tv2-form-title {
          font-family: var(--font-display), 'Playfair Display', Georgia, serif;
          font-weight: 600;
          font-size: 28px;
          color: #fff;
          text-align: center;
          margin: 0 0 8px;
        }
        .tv2-form-subtext {
          font-size: 14px;
          font-weight: 300;
          color: rgba(255,255,255,0.78);
          text-align: center;
          margin: 0;
        }
        .tv2-ornament {
          text-align: center;
          color: ${GOLD};
          letter-spacing: 3px;
          margin-top: 12px;
          font-size: 16px;
        }
        .tv2-submit {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 15px;
          border: none;
          border-radius: 11px;
          background: linear-gradient(120deg, #e8cf85, #cfa14e);
          color: #3a2a08;
          font-family: var(--font-body), Inter, sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 2px;
          cursor: pointer;
          min-height: 44px;
          transition: filter 0.2s ease, transform 0.2s ease;
        }
        .tv2-submit:hover { filter: brightness(1.06); transform: translateY(-1px); }
        .tv2-caption {
          font-size: 12px;
          color: rgba(255,255,255,0.6);
          text-align: center;
          margin: 0;
        }
        .tv2-features {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          padding-top: 4px;
        }
        .tv2-feature {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 7px;
          text-align: center;
          font-size: 10.5px;
          line-height: 1.3;
          color: rgba(255,255,255,0.82);
        }

        /* visually-hidden labels for a11y */
        .tv2-sr {
          position: absolute;
          width: 1px; height: 1px;
          padding: 0; margin: -1px;
          overflow: hidden;
          clip: rect(0 0 0 0);
          white-space: nowrap;
          border: 0;
        }

        /* ════════ DESKTOP — two columns + bottom alignment ════════ */
        @media (min-width: 1024px) {
          .tv2-grid {
            grid-template-columns: minmax(0, 1fr) 330px;
            /* hero & destinations stack in the left column; the form spans
               both rows on the right. Row 1 height = hero, row 2 takes the
               remaining space so the destinations block (and the form's
               bottom) share the same baseline. */
            grid-template-rows: auto 1fr;
            grid-template-areas:
              'hero form'
              'dest form';
            align-items: stretch;
            column-gap: 48px;
            row-gap: 40px;
          }
          .tv2-hero { grid-area: hero; order: 0; }
          .tv2-dest {
            grid-area: dest;
            order: 0;
            /* anchor the card row to the BOTTOM of row 2 so its bottom edge
               meets the form's bottom edge */
            justify-content: flex-end;
          }
          .tv2-right {
            grid-area: form;
            order: 0;
            align-self: stretch;   /* fill both grid rows */
          }
          .tv2-form {
            height: 100%;
            /* distribute content top→bottom with NO hardcoded height:
               header pinned top (aligns with hero top), submit/features
               pinned bottom (aligns with card-row bottom). */
            justify-content: space-between;
          }
        }
      `}</style>

      {/* placeholder color cannot be set inline — scope it globally to this page */}
      <style jsx global>{`
        .tv2-input::placeholder { color: rgba(255,255,255,0.65); }
      `}</style>
    </main>
  )
}
