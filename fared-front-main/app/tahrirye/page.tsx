'use client'

import { useId } from 'react'
import Link from 'next/link'

/* ─────────────────────────────────────────────────────────────
   Custom SVG card frames (box1 / box2) replace the rounded-rect
   border on the 2×2 category grid. Two shapes alternate by
   `illustrationSide` (left → box1, right → box2).

   • viewBox — native viewBox, used by the visible fill + stroke
     SVGs with preserveAspectRatio="none" so they stretch to each
     card's real aspect ratio (no gaps).
   • clip    — the SAME path normalised to 0..1 for a
     <clipPath clipPathUnits="objectBoundingBox">, so the clipped
     background layers (cardBg gradient + image) stretch
     non-uniformly to fill the card box exactly like the fill/stroke
     do — no corner bleed past the curve.
   ───────────────────────────────────────────────────────────── */
const FRAMES = {
  box1: {
    viewBox: '0 0 500.7 315.8',
    path: 'M438.6,304.6l-386.1,9.2c-22,.9-40.7-16.2-41.6-38.3L2,61c-.9-22,16.2-40.7,38.3-41.6L457.1,2c22-.9,40.7,16.2,41.6,38.3l-15,220.3c-4,25-23,43.1-45,44Z',
    clip: 'M0.875974 0.964535l-0.77112 0.029132c-0.043938 0.00285 -0.081286 -0.051298 -0.083084 -0.121279L0.003994 0.19316c-0.001797 -0.069664 0.032355 -0.128879 0.076493 -0.131729L0.912922 0.006333c0.043938 -0.00285 0.081286 0.051298 0.083084 0.121279l-0.029958 0.697593c-0.007989 0.079164 -0.045936 0.136479 -0.089874 0.139329Z',
  },
  box2: {
    viewBox: '0 0 520.5 354',
    path: 'M444.5,323.5l-394,28.5c-26.8,0-48.5-21.9-48.5-48.8V50.8C2,23.9,23.7,2,50.5,2h419.5c26.8,0,48.5,21.9,48.5,48.8l-27.8,231.2c-4,27-19.4,39.5-46.2,41.5Z',
    clip: 'M0.853987 0.913842l-0.756964 0.080508c-0.051489 0 -0.09318 -0.061864 -0.09318 -0.137853V0.143503C0.003842 0.067514 0.045533 0.00565 0.097022 0.00565h0.805956c0.051489 0 0.09318 0.061864 0.09318 0.137853l-0.05341 0.653107c-0.007685 0.076271 -0.037272 0.111582 -0.088761 0.117232Z',
  },
} as const

/* cardBg gradients as SVG stops (the exact two colors from each card's
   `linear-gradient(135deg, …)`). Used to paint the card fill INSIDE the
   frame SVG so the fill and the stroke share one path/coordinate system —
   that's what removes the faint inner duplicate outline (the old
   separately-clipped <div> rasterised on its own layer, landing a few px
   inside the stroke). 135° ≈ top-left → bottom-right (x1/y1 0→ x2/y2 1). */
const GRADIENTS = {
  'free-education': ['rgba(10,32,24,0.92)', 'rgba(26,77,46,0.88)'],
  'book-intro': ['rgba(26,18,0,0.92)', 'rgba(45,31,0,0.88)'],
  'articles': ['rgba(4,14,36,0.92)', 'rgba(13,30,61,0.88)'],
  'poetry': ['rgba(18,8,40,0.92)', 'rgba(42,16,80,0.88)'],
} as const

const categories = [
  {
    id: 'free-education', title: 'مطالب آموزشی رایگان',
    description: 'مجموعه‌ای از بهترین مطالب آموزشی در موضوعات مختلف برای رشد و آگاهی بیشتر',
    ctaText: 'مشاهده تمامی مطالب', ctaHref: '/tahririye/educational', icon: 'book-open',
    themeColor: '#1a4d2e', borderColor: '#29D38A', glowColor: 'rgba(41,211,138,0.3)',
    illustrationSide: 'left' as const,
    cardBg: 'linear-gradient(135deg, rgba(10,32,24,0.92) 0%, rgba(26,77,46,0.88) 100%)',
    image: '/images/tahririye/educational-card.webp',
  },
  {
    id: 'book-intro', title: 'معرفی کتاب',
    description: 'بهترین کتاب‌ها برای توسعه فردی، معنوی و فکری',
    ctaText: 'مشاهده کتاب‌ها', ctaHref: '/tahririye/books', icon: 'book',
    themeColor: '#3d2a00', borderColor: '#F0D28B', glowColor: 'rgba(240,210,139,0.3)',
    illustrationSide: 'right' as const,
    cardBg: 'linear-gradient(135deg, rgba(26,18,0,0.92) 0%, rgba(45,31,0,0.88) 100%)',
    image: '/images/tahririye/books-card.webp',
  },
  {
    id: 'articles', title: 'مقاله‌ها',
    description: 'مقالات پژوهشی و تحلیلی در موضوعات معنوی، فلسفی و علوم انسانی',
    ctaText: 'مطالعه مقاله‌ها', ctaHref: '/tahririye/articles', icon: 'document',
    themeColor: '#0d1e3d', borderColor: '#4D9DFF', glowColor: 'rgba(77,157,255,0.3)',
    illustrationSide: 'left' as const,
    cardBg: 'linear-gradient(135deg, rgba(4,14,36,0.92) 0%, rgba(13,30,61,0.88) 100%)',
    image: '/images/tahririye/articles-card.webp',
  },
  {
    id: 'poetry', title: 'اشعار',
    description: 'گزیده‌ای از اشعار ناب فارسی برای جان و دل',
    ctaText: 'مطالعه اشعار', ctaHref: '/tahririye/poetry', icon: 'feather',
    themeColor: '#2a1050', borderColor: '#B07DFF', glowColor: 'rgba(176,125,255,0.3)',
    illustrationSide: 'right' as const,
    cardBg: 'linear-gradient(135deg, rgba(18,8,40,0.92) 0%, rgba(42,16,80,0.88) 100%)',
    image: '/images/tahririye/poetry-card.webp',
    featuredVerse: 'بیا که قصر امل سخت سست بنیاد است\nبیار باده که بنیاد عمر بر باد است',
  },
]

const IconSvg = ({ type, color }: { type: string; color: string }) => {
  const s: Record<string, React.ReactNode> = {
    'book-open': <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.3" width={22} height={22}><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>,
    book: <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.3" width={22} height={22}><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
    document: <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.3" width={22} height={22}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
    feather: <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.3" width={22} height={22}><path d="M20.24 12.24a6 6 0 00-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/></svg>,
  }
  return <>{s[type]}</>
}

type Category = (typeof categories)[number]

function CategoryCard({ card, index }: { card: Category; index: number }) {
  // Unique ids per instance — 4 cards must not share SVG ids.
  const uid = useId()
  const clipId = `tahrirye-clip-${uid}`
  const gradId = `tahrirye-grad-${uid}`

  // Alternate the frame the way the mockup does:
  // illustrationSide 'left' → box1, 'right' → box2.
  const frame = card.illustrationSide === 'left' ? FRAMES.box1 : FRAMES.box2

  // featuredVerse exists only on some cards — narrow without `any`.
  const verse = (card as { featuredVerse?: string }).featuredVerse

  // The two cardBg stops (matches the original CSS linear-gradient(135deg,...)).
  const grad = GRADIENTS[card.id as keyof typeof GRADIENTS]

  return (
    <Link
      href={card.ctaHref}
      aria-label={card.title}
      className="tahrirye-card"
      style={{
        // The WHOLE card is the link target. shape comes from the SVG frame —
        // no border-radius / border / box-shadow (a rectangular box-shadow would
        // halo past the curve; the colored glow lives on the stroke SVG's
        // drop-shadow instead).
        // Horizontal padding raised to 52px (vertical kept at 32px) so the
        // title/verse/CTA clear the frame's slanted/curved sides at all heights.
        // The frame layers are position:absolute inset:0, so only the in-flow
        // content shifts inward — card box size / 2×2 grid are unaffected.
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative', minHeight: 320,
        padding: '32px 52px',
        textDecoration: 'none', color: 'inherit', cursor: 'pointer',
        transition: 'transform 0.3s ease',
        // Entrance is a pure CSS animation (see .tahrirye-card below) — cards
        // are opacity:1 by default so they can NEVER get stuck invisible on a
        // router-cache/back-navigation restore (which doesn't re-run mount
        // effects). The stagger is animation-delay, not JS state.
        animationDelay: `${index * 100}ms`,
        // drives the stroke glow; bumped on hover (see handlers below)
        ['--frame-glow' as string]: '12px',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
        ;(e.currentTarget as HTMLElement).style.setProperty('--frame-glow', '22px')
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
        ;(e.currentTarget as HTMLElement).style.setProperty('--frame-glow', '12px')
      }}
    >
      {/* ── ONE SVG draws the whole frame: dark base fill, the cardBg
           gradient + image (clipped to the frame path), and the stroke —
           all using the SAME `frame.path` in the SAME viewBox, stretched by
           the SAME preserveAspectRatio="none". Because the clipped fill and
           the stroke are one rasterised layer tracing one path, the fill
           edge sits exactly under the stroke → exactly ONE outline (no faint
           inner duplicate), and still no bleed past the curve.
           zIndex 0 (background); content is z1, stroke draws last so it sits
           on top of the fill within this same svg. ── */}
      <svg
        viewBox={frame.viewBox}
        preserveAspectRatio="none"
        aria-hidden
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0,
          // colored glow on the whole frame silhouette; intensifies on hover
          filter: `drop-shadow(0 0 var(--frame-glow) ${card.glowColor})`,
          transition: 'filter 0.3s ease',
        }}
      >
        <defs>
          {/* clip uses the SAME path + viewBox as the stroke → identical contour */}
          <clipPath id={clipId}>
            <path d={frame.path} />
          </clipPath>
          {/* cardBg gradient (135° ≈ top-left → bottom-right) */}
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={grad[0]} />
            <stop offset="1" stopColor={grad[1]} />
          </linearGradient>
        </defs>

        {/* dark base so the card reads even where the image is dark/missing */}
        <path d={frame.path} fill="rgba(7,7,20,0.55)" />

        {/* cardBg gradient + image, clipped to the frame path.
            The source artwork has a glowing rounded-rect border baked into the
            image itself — THAT is the real "second inner outline". Zoom the
            image to ~114% (offset -7%) so its baked-in border is pushed outside
            the frame clip and cropped away, leaving only the SVG stroke as the
            single outline. */}
        <g clipPath={`url(#${clipId})`}>
          <rect x="0" y="0" width="100%" height="100%" fill={`url(#${gradId})`} />
          <image
            href={card.image!}
            x="-7%" y="-7%" width="114%" height="114%"
            preserveAspectRatio="xMidYMid slice"
            opacity="0.55"
          />
        </g>

        {/* the single visible outline — the stroke, drawn last (on top) */}
        <path d={frame.path} fill="none" stroke={card.borderColor} strokeWidth="2" strokeMiterlimit="10" />
      </svg>

      {/* ── Content (header / body / CTA) — unchanged, z1 (above fill,
           below the non-interactive stroke) ── */}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
        <h2 style={{
          fontFamily: "'Vazirmatn', sans-serif", fontWeight: 700,
          fontSize: '1.5rem', color: '#fff', margin: 0, flex: 1, textAlign: 'right',
        }}>
          {card.title}
        </h2>
        <div style={{
          width: 44, height: 44, borderRadius: 10,
          border: `1px solid ${card.borderColor}`, flexShrink: 0,
          background: 'rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginRight: 16,
        }}>
          <IconSvg type={card.icon} color={card.borderColor}/>
        </div>
      </div>

      {/* Body */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {verse ? (
          <div style={{
            fontFamily: "'Vazirmatn', serif", fontStyle: 'italic',
            fontSize: '1.1rem', color: '#F0D28B', lineHeight: 2,
            textAlign: 'right', maxWidth: '55%', opacity: 0.9,
            whiteSpace: 'pre-line',
          }}>
            {verse}
          </div>
        ) : (
          <p style={{
            fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.8, textAlign: 'right', maxWidth: '55%',
          }}>
            {card.description}
          </p>
        )}
      </div>

      {/* CTA — decorative pill; the whole card is the link, so this is a
          styled <span> (not a nested <a>). It fills in on card hover via the
          group-hover rule below. */}
      <span className="tahrirye-cta" style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        fontSize: '0.85rem', color: card.borderColor,
        border: `1px solid ${card.borderColor}`,
        borderRadius: 100, padding: '8px 20px',
        background: 'transparent',
        transition: 'background 0.2s ease',
        direction: 'rtl', alignSelf: 'flex-start',
        // RTL: alignSelf flex-start pins the button to the RIGHT (trailing)
        // edge — the slanted frame side. Pull it inward so it clears the curve.
        marginRight: 24,
        position: 'relative', zIndex: 1,
        // tint used by the group-hover fill (per-card accent)
        ['--cta-fill' as string]: `${card.borderColor}1A`,
      }}>
        <span>‹</span>
        {card.ctaText}
      </span>
    </Link>
  )
}

export default function TahriryePage() {

  return (
    <main dir="rtl" style={{ minHeight: '100vh', fontFamily: "'Vazirmatn', sans-serif", color: '#fff' }}>

      {/* Fixed background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: `
          radial-gradient(ellipse at 80% 10%, rgba(180,130,20,0.35) 0%, transparent 45%),
          radial-gradient(ellipse at 20% 50%, rgba(10,40,20,0.4) 0%, transparent 50%),
          radial-gradient(ellipse at 60% 80%, rgba(20,10,50,0.5) 0%, transparent 60%),
          linear-gradient(180deg, #040B1F 0%, #060D18 50%, #040812 100%)
        `,
      }}>
        {/* Gold light rays — upper right */}
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '55%', height: '55%',
          background: `
            conic-gradient(
              from 200deg at 95% 5%,
              transparent 0deg,
              rgba(200,150,20,0.18) 8deg,
              transparent 16deg,
              rgba(200,150,20,0.12) 22deg,
              transparent 30deg,
              rgba(200,150,20,0.08) 36deg,
              transparent 44deg
            )
          `,
          pointerEvents: 'none',
        }}/>
      </div>

      {/* Scrollable content */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── HERO ── */}
        <section style={{ textAlign: 'center', padding: '100px 40px 40px', position: 'relative' }}>
          {/* Gold feather decorative */}
          <div style={{
            position: 'absolute', left: '6%', top: '10%', width: 100, opacity: 0.85,
            transform: 'rotate(30deg)',
            filter: 'drop-shadow(0 0 20px rgba(240,180,30,0.5))',
          }}>
            <svg viewBox="0 0 48 96" fill="none" stroke="#F0D28B" strokeWidth="1" opacity={0.8} width={48} height={96}>
              <path d="M24 2 C20 20 10 40 8 60 C6 75 2 88 2 92 L24 88 L46 92 C46 88 42 75 40 60 C38 40 28 20 24 2Z" fill="rgba(240,210,139,0.15)"/>
              <path d="M24 2 C22 20 14 38 12 58" opacity="0.6"/>
              <path d="M24 2 C26 20 34 38 36 58" opacity="0.6"/>
              <line x1="24" y1="30" x2="24" y2="80" opacity="0.4"/>
            </svg>
          </div>

          {/* Title — glow is always on (no JS gate) so it can't get stuck
              off on a back-navigation restore */}
          <h1 style={{
            fontFamily: "'Vazirmatn', serif", fontWeight: 700,
            fontSize: 'clamp(5rem, 12vw, 10rem)', fontStyle: 'italic',
            color: '#F0D28B', margin: 0,
            textShadow: '0 0 40px rgba(240,180,30,0.6), 0 0 80px rgba(240,160,10,0.3)',
          }}>
            تحریریه
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '1rem', color: 'rgba(240,210,139,0.75)',
            letterSpacing: '0.2em', marginTop: 8,
          }}>
            ◈ &nbsp; اندیشه، دانش و الهام &nbsp; ◈
          </p>
        </section>

        {/* ── 2×2 CARD GRID ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24,
          maxWidth: 1100, margin: '0 auto', padding: '0 40px 80px',
        }}>
          {categories.map((card, i) => (
            <CategoryCard key={card.id} card={card} index={i} />
          ))}
        </div>

        {/* ── QUOTE BAR ── */}
        <div style={{
          textAlign: 'center', fontSize: '0.95rem', fontStyle: 'italic',
          color: 'rgba(240,210,139,0.6)', direction: 'rtl',
          padding: '32px 40px 60px', letterSpacing: '0.05em',
        }}>
          ◈ &nbsp; &ldquo;علم چراغ راه است و دانش کلید آینده&rdquo; &nbsp; ◈
        </div>
      </div>

      {/* whole-card hover fills the decorative CTA pill (per-card accent);
          cards rise+fade in via CSS so they never get stuck invisible. */}
      <style>{`
        @keyframes tahririye-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .tahrirye-card {
          opacity: 1;
          /* opacity-only so the keyframe never fights the hover/lift transform
             (which lives on the inline transition + JS hover handlers) */
          animation: tahririye-fade-in 0.5s ease both;
        }
        .tahrirye-card:hover .tahrirye-cta { background: var(--cta-fill); }
        @media (prefers-reduced-motion: reduce) {
          .tahrirye-card { animation: none; }
        }
      `}</style>
    </main>
  )
}
