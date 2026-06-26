'use client'

import Image from 'next/image'
import Link from 'next/link'
import CTAButton from '@/components/ui/CTAButton'
import { useCart } from '@/lib/cart-context'

const CARD_PATH = "M273.785 67.2924V65.7286C273.785 50.6882 256.492 38.4976 235.156 38.4976H234.443V33.3594C234.443 4.64918 194.969 28.6377 173.452 18.6269C161.023 12.8426 152.497 0 152.497 0C152.497 0 143.977 12.8426 131.542 18.6269C110.025 28.6377 70.5566 4.64314 70.5566 33.3594V38.4976H69.8436C48.508 38.4976 31.2148 50.6882 31.2148 65.7286V67.2924C13.6436 69.2426 0 83.486 0 100.779V475.221C0 492.514 13.6436 506.757 31.2148 508.708V510.271C31.2148 525.312 48.508 537.502 69.8436 537.502H70.5566V542.641C70.5566 571.351 110.031 547.356 131.542 557.373C143.971 563.157 152.497 576 152.497 576C152.497 576 161.017 563.157 173.452 557.373C194.969 547.362 234.443 571.357 234.443 542.641V537.502H235.156C256.492 537.502 273.785 525.312 273.785 510.271V508.708C291.356 506.757 305 492.514 305 475.221V100.779C305 83.486 291.356 69.2426 273.785 67.2924Z"

const PRODUCTS = [
  { id: 'luna', name: 'Luna Meditation Robe', price: '$88.00', image: '/images/products/clothes/luna-meditation-robe.webp', aura: 'radial-gradient(60% 55% at 50% 45%, rgba(168,110,224,0.4), rgba(124,72,176,0.08) 55%, transparent 68%)', panelTop: '#efe6f3', panelBot: '#e7d8ec', swatches: ['#7e57c2', '#3f51b5', '#c8a8e0', '#e6a8c8'] },
  { id: 'sol', name: 'Sol Yoga Top', price: '$64.00', image: '/images/products/clothes/luna-meditation-robe.webp', aura: 'radial-gradient(60% 55% at 50% 45%, rgba(243,214,150,0.45), rgba(216,150,70,0.1) 55%, transparent 68%)', panelTop: '#f6efde', panelBot: '#f0e6cf', swatches: ['#f4ecd6', '#a9b486', '#7f8f4e', '#cdb084'] },
  { id: 'gaia', name: 'Gaia Flow Pants', price: '$72.00', image: '/images/products/clothes/luna-meditation-robe.webp', aura: 'radial-gradient(60% 55% at 50% 45%, rgba(230,168,96,0.42), rgba(180,110,50,0.12) 55%, transparent 68%)', panelTop: '#f4e8d6', panelBot: '#ecdcc4', swatches: ['#c47a44', '#8a7a3c', '#7a5230', '#d8a85a'] },
  { id: 'nova', name: 'Nova Energy Shirt', price: '$68.00', image: '/images/products/clothes/luna-meditation-robe.webp', aura: 'radial-gradient(60% 55% at 50% 45%, rgba(96,128,212,0.4), rgba(50,72,160,0.12) 55%, transparent 68%)', panelTop: '#e6e9f2', panelBot: '#d8deec', swatches: ['#2f3f86', '#5a78c4', '#6a7390', '#3a3f6e'] },
]

type Product = typeof PRODUCTS[number]

function Card({ p, onAddToCart }: { p: Product; onAddToCart: () => void }) {
  const maskSvg = `%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 305 576' preserveAspectRatio='none'%3E%3Cpath d='${encodeURIComponent(CARD_PATH)}' fill='black'/%3E%3C/svg%3E`
  return (
    <div className="relative cursor-default group" style={{
      width: 'clamp(190px, 13vw, 240px)',
      height: 'clamp(340px, 25vw, 430px)',
      borderRadius: 24,
      flex: '0 0 auto',
      transition: 'transform 0.3s ease, filter 0.3s ease',
      filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.45))',
    }}
         onMouseEnter={e => {
           (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
           ;(e.currentTarget as HTMLElement).style.filter = 'drop-shadow(0 16px 48px rgba(0,0,0,0.55)) drop-shadow(0 0 20px rgba(216,179,106,0.1))'
         }}
         onMouseLeave={e => {
           (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
           ;(e.currentTarget as HTMLElement).style.filter = 'drop-shadow(0 8px 32px rgba(0,0,0,0.45))'
         }}>

      {/* Masked body — contains ALL visible content, clipped to arch shape */}
      <div className="absolute inset-0" style={{
        WebkitMaskImage: `url("data:image/svg+xml,${maskSvg}")`,
        maskImage: `url("data:image/svg+xml,${maskSvg}")`,
        WebkitMaskSize: '100% 100%',
        maskSize: '100% 100%',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
      }}>
        {/* Image area — top 46% */}
        <div className="absolute left-0 right-0 top-0 overflow-hidden" style={{ height: '46%' }}>
          <Image
            src={p.image}
            alt={p.name}
            fill
            sizes="(max-width: 1400px) 13vw, 240px"
            unoptimized
            className="object-cover object-top"
            onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3' }}
          />
          <div className="absolute inset-0 pointer-events-none" style={{
            background: p.aura,
            mixBlendMode: 'screen',
            opacity: 0.75,
          }}/>
          <div className="absolute inset-x-0 bottom-0 pointer-events-none" style={{
            height: '30%',
            background: 'linear-gradient(to top, rgba(26,13,48,0.9) 0%, transparent 100%)',
          }}/>
        </div>

        {/* Divider — at the 46% image/info boundary */}
        <div style={{
          position: 'absolute',
          left: 0, right: 0,
          top: 'calc(46% - 12px)',
          zIndex: 3,
          lineHeight: 0,
          pointerEvents: 'none',
        }}>
          <img src="/images/divider-card.svg" alt="" aria-hidden="true"
               style={{ width: '100%', display: 'block', height: 24 }} />
        </div>

        {/* Deep purple info panel — bottom 54% */}
        <div className="absolute left-0 right-0 bottom-0 flex flex-col items-center" style={{
          height: '54%',
          background: 'linear-gradient(180deg, rgba(160,100,90,0.10) 0%, rgba(120,60,55,0.85) 40%, rgba(75,30,35,1) 100%)',
          padding: '22px 16px clamp(40px, 7%, 60px) 16px',
          justifyContent: 'flex-start',
          textAlign: 'center',
        }}>
          <h3 style={{
            fontFamily: 'var(--avad-serif)', fontWeight: 600, fontSize: 12,
            lineHeight: 1.15, letterSpacing: '0.02em', color: '#ffffff',
            textTransform: 'uppercase', minHeight: 28,
            display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
          }}>{p.name}</h3>
          <div style={{ fontFamily: 'var(--avad-serif)', fontWeight: 600, fontSize: 16, color: '#d4af64', marginTop: 2 }}>{p.price}</div>
          <div className="flex" style={{ gap: 7, marginTop: 8 }}>
            {p.swatches.map((c, i) => (
              <span key={i} style={{ width: 15, height: 15, borderRadius: '50%', display: 'block', background: c, boxShadow: '0 0 0 1.2px rgba(184,143,68,0.5), inset 0 0 3px rgba(0,0,0,0.1)' }}/>
            ))}
          </div>
          <div style={{ marginTop: 10 }} onClick={(e) => e.stopPropagation()}>
            <CTAButton size="small" onClick={() => { onAddToCart() }}>ADD TO CART</CTAButton>
          </div>
        </div>
      </div>

      {/* Seam ornament — at 46% boundary */}
      <div className="absolute" style={{
        left: '50%', top: '46%', transform: 'translate(-50%, -50%)',
        width: 22, height: 22,
        color: 'var(--avad-gold-bright)',
        filter: 'drop-shadow(0 0 3px rgba(243,220,160,0.4))',
        zIndex: 4,
      }}>
        <svg viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.2" width="100%" height="100%">
          <path d="M13 3c-1.6 4-1.6 7 0 10 1.6-3 1.6-6 0-10Z" fill="currentColor" stroke="none" fillOpacity=".5"/>
          <path d="M13 13c-4-1.6-7-1-10 1.5 3 1.6 6 1 10-1.5ZM13 13c4-1.6 7-1 10 1.5-3 1.6-6 1-10-1.5Z"/>
        </svg>
      </div>

      {/* Gold border SVG overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
        <svg viewBox="0 0 305 576" preserveAspectRatio="none" width="100%" height="100%">
          <defs>
            <linearGradient id={`grd-${p.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f3dca0" stopOpacity="0.7"/>
              <stop offset="0.5" stopColor="#d8b36a" stopOpacity="0.6"/>
              <stop offset="1" stopColor="#b88f44" stopOpacity="0.7"/>
            </linearGradient>
            <filter id={`glw-${p.id}`} x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="1.2" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <path d={CARD_PATH} fill="none" stroke={`url(#grd-${p.id})`} strokeWidth="1.2" filter={`url(#glw-${p.id})`}/>
        </svg>
      </div>
    </div>
  )
}

export default function ProductCards() {
  const { addItem } = useCart()

  const handleAddToCart = (p: Product) => {
    addItem({
      productId: p.id, productType: 'clothes',
      name: p.name, nameFA: p.name,
      price: parseFloat(p.price.replace('$', '')),
      currency: 'USD', quantity: 1, image: p.image,
    })
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'clamp(14px, 1.4vw, 24px)',
      flex: 1,
    }}>
      {PRODUCTS.map(p => (
        <Link key={p.id} href={`/shop/clothes/${p.id}`} style={{ textDecoration: 'none' }}>
          <Card p={p} onAddToCart={() => handleAddToCart(p)} />
        </Link>
      ))}
    </div>
  )
}
