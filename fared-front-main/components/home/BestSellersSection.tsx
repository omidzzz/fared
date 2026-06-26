'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'

const PRODUCTS = [
  {
    id: 'stone-1', name: 'Amethyst', nameFA: 'آمتیست', descFA: 'آرامش و حفاظت معنوی', price: 48,
    priceFA: '۹۸۰٬۰۰۰ تومان', image: '/images/products/stones/amethyst.webp', fallbackColor: '#4B2680',
  },
  {
    id: 'stone-2', name: 'Rose Quartz', nameFA: 'کوارتز صورتی', descFA: 'عشق، شفقت و آرامش قلب', price: 42,
    priceFA: '۸۵۰٬۰۰۰ تومان', image: '/images/products/stones/rose-quartz.webp', fallbackColor: '#C97B9F',
  },
  {
    id: 'stone-5', name: 'Clear Quartz', nameFA: 'کوارتز شفاف', descFA: 'پاکسازی انرژی و تقویت تمرکز', price: 40,
    priceFA: '۷۵۰٬۰۰۰ تومان', image: '/images/products/stones/clear-quartz.webp', fallbackColor: '#A8C8D8',
  },
  {
    id: 'stone-4', name: 'Labradorite', nameFA: 'لابرادوریت', descFA: 'حفاظت از انرژی و شهود درونی', price: 52,
    priceFA: '۱٬۱۰۰٬۰۰۰ تومان', image: '/images/products/stones/labradorite.webp', fallbackColor: '#3A6B8A',
  },
]

export function BestSellersSection({ title, subtitle, products, viewAllHref, viewAllLabel = 'مشاهده همه' }: {
  title: string; subtitle: string; products: any[]; viewAllHref: string; viewAllLabel?: string;
}) {
  const { addItem } = useCart()
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px] px-4 lg:px-8 mx-auto"
      style={{ maxWidth: 1200 }}
    >
      {products.map((product: any, i: number) => (
        <Link key={i} href={viewAllHref} className="block group">
          <div
            className="relative transition-all duration-300"
            style={{
              borderRadius: 14,
              padding: '14px 14px 18px',
              background: 'linear-gradient(170deg, rgba(46,22,86,0.62), rgba(22,10,42,0.72))',
              border: '1.5px solid rgba(231,193,111,0.4)',
              boxShadow: '0 14px 38px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              direction: 'rtl' as const,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(231,193,111,0.75)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 18px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 30px rgba(120,60,190,0.35)'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(231,193,111,0.4)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 14px 38px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)'
            }}
          >
            {/* Corner accent brackets */}
            {[0, 1, 2, 3].map((ci) => {
              const pos = ci === 0 ? { top: -2, left: -2 } : ci === 1 ? { top: -2, right: -2 } : ci === 2 ? { bottom: -2, left: -2 } : { bottom: -2, right: -2 }
              return (
                <div key={ci} style={{
                  position: 'absolute', ...pos, width: 18, height: 18,
                  borderLeft: ci % 2 === 0 ? '1.5px solid var(--gold-accent)' : 'none',
                  borderRight: ci % 2 === 1 ? '1.5px solid var(--gold-accent)' : 'none',
                  borderTop: ci < 2 ? '1.5px solid var(--gold-accent)' : 'none',
                  borderBottom: ci >= 2 ? '1.5px solid var(--gold-accent)' : 'none',
                  opacity: 0.75,
                  borderRadius: 0,
                }} />
              )
            })}

            {/* Image area */}
            <div className="relative overflow-hidden" style={{ height: 152, borderRadius: 9 }}>
              <Image
                src={product.image || '/images/products/stones/amethyst.webp'}
                alt={product.nameFA || product.name || ''}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                unoptimized
                className="object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.opacity = '0'
                }}
              />
              {/* Fallback color — shown only if image fails */}
              <div className="absolute inset-0" style={{ background: product.fallbackColor || '#4B2680', opacity: 0.6, zIndex: 0 }} />
              {/* Bottom fade overlay */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: 'linear-gradient(to top, rgba(18,8,36,0.7) 0%, transparent 50%)',
              }} />
            </div>

            {/* Name */}
            <p style={{
              textAlign: 'center',
              fontFamily: 'var(--fa)',
              fontSize: 23,
              fontWeight: 700,
              color: 'var(--gold-accent)',
              marginTop: 15,
              textShadow: '0 0 14px rgba(231,193,111,0.35)',
            }}>
              {product.nameFA || product.name || ''}
            </p>

            {/* Description */}
            <p style={{
              textAlign: 'center',
              fontFamily: 'var(--fa)',
              fontSize: 13.5,
              fontWeight: 300,
              color: 'rgba(255,248,238,0.78)',
              lineHeight: 1.5,
              minHeight: 38,
              marginTop: 5,
            }}>
              {product.descFA || product.materialFA || product.descriptionFA || (Array.isArray(product.healingProperties) ? product.healingProperties[0] : '') || ''}
            </p>

            {/* Footer row — price + cart */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 13,
              direction: 'ltr',
            }}>
              <span style={{
                fontFamily: 'var(--fa)',
                fontSize: 16,
                fontWeight: 500,
                color: '#F5D79C',
              }}>
                {product.priceFA || `$${(product.price || 48).toFixed(2)}`}
              </span>
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); addItem({ productId: product.id || product.productId, productType: 'stone', name: product.name || product.nameFA || '', nameFA: product.nameFA || product.name || '', price: product.price || 48, currency: 'USD', quantity: 1, image: product.image || '/images/products/stones/amethyst.webp' }) }}
                style={{
                  width: 42, height: 42, borderRadius: 11,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'linear-gradient(160deg, rgba(96,46,160,0.7), rgba(43,18,90,0.8))',
                  border: '1px solid rgba(231,193,111,0.55)',
                  boxShadow: '0 0 14px rgba(120,60,190,0.3)',
                  cursor: 'pointer',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5D79C" strokeWidth="1.8">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
