'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/cart-context'
import type { LocalCartItem } from '@/lib/cart-context'
import CTAButton from '@/components/ui/CTAButton'

/* ── Sidebar icons ── */
const NAV_ITEMS = [
  { icon: 'shop', label: 'Shop', href: '/shop' },
  { icon: 'collections', label: 'Collections', href: '/shop' },
  { icon: 'about', label: 'About', href: '/about' },
  { icon: 'account', label: 'Account', href: '/profile' },
  { icon: 'energy', label: 'Energy Guide', href: '/energy-guide' },
]

function SidebarIcon({ name }: { name: string }) {
  const c = 'rgba(212,175,100,0.8)'
  const s: Record<string, React.ReactNode> = {
    shop: <svg viewBox="0 0 28 28" fill="none" stroke={c} strokeWidth="1.2" width={28} height={28}><polygon points="14,3 20,12 14,25 8,12"/><path d="M8 12h12" opacity="0.5"/></svg>,
    collections: <svg viewBox="0 0 28 28" fill="none" stroke={c} strokeWidth="1.2" width={28} height={28}><path d="M24 14A10 10 0 1114 4a10 10 0 0110 10z" opacity="0.4"/><circle cx="14" cy="14" r="6"/></svg>,
    about: <svg viewBox="0 0 28 28" fill="none" stroke={c} strokeWidth="1.2" width={28} height={28}><path d="M14 3L24 8v12L14 25 4 20V8z"/><path d="M4 8l10 5"/><path d="M24 8l-10 5"/></svg>,
    account: <svg viewBox="0 0 28 28" fill="none" stroke={c} strokeWidth="1.2" width={28} height={28}><circle cx="14" cy="10" r="5"/><path d="M5 24c0-5 4-9 9-9s9 4 9 9"/></svg>,
    energy: <svg viewBox="0 0 28 28" fill="none" stroke={c} strokeWidth="1.2" width={28} height={28}><path d="M14 4c-3 4.5-3 10 0 14 3-4 3-9.5 0-14z"/><path d="M14 18c-4.5-2.5-9-2-13 1 4.5 2.5 9 2 13-1zM14 18c4.5-2.5 9-2 13 1-4.5 2.5-9 2-13-1z"/></svg>,
  }
  return <>{s[name]}</>
}

function CartItemRow({ item, onUpdateQuantity, onRemove }: { item: LocalCartItem; onUpdateQuantity: (id: string, qty: number) => void; onRemove: (id: string) => void }) {
  const [removing, setRemoving] = useState(false)
  const handleRemove = () => { setRemoving(true); setTimeout(() => onRemove(item.id), 250) }
  return (
    <div dir="ltr" style={{
      display: 'flex', alignItems: 'center', gap: 20, padding: '16px 20px', margin: '10px 0',
      background: 'rgba(255,255,255,0.07)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.12)',
      transition: 'opacity 0.25s ease, transform 0.25s ease',
      opacity: removing ? 0 : 1, transform: removing ? 'translateX(-20px)' : 'none',
    }}>
      <div style={{ position: 'relative', width: 90, height: 90, flexShrink: 0, borderRadius: 12, overflow: 'hidden', background: 'rgba(255,255,255,0.05)' }}>
        <Image src={item.image || '/images/products/stones/amethyst.webp'} alt={item.name} fill sizes="90px" style={{ objectFit: 'cover' }} unoptimized
               onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3' }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: 4, fontFamily: "'Playfair Display',Georgia,serif" }}>{item.nameFA || item.name}</h3>
        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}>{item.variant || item.productType}</p>
        <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#c084f5', fontFamily: "'Playfair Display',Georgia,serif" }}>${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.1)', borderRadius: 100, padding: '8px 16px', border: '1px solid rgba(255,255,255,0.15)' }}>
        <button onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.1rem', cursor: 'pointer', lineHeight: 1, width: 20, textAlign: 'center' }}>−</button>
        <span style={{ fontSize: '0.95rem', color: '#fff', fontWeight: 500, minWidth: 20, textAlign: 'center' }}>{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.1rem', cursor: 'pointer', lineHeight: 1, width: 20, textAlign: 'center' }}>+</button>
      </div>
      <button onClick={handleRemove} aria-label={`Remove ${item.name}`} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '1.1rem', cursor: 'pointer', padding: 4, transition: 'color 0.2s ease' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,100,100,0.8)')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>🗑</button>
    </div>
  )
}

export default function CartPage() {
  const { items, totalPrice, totalItems, updateQuantity, removeItem } = useCart()
  const router = useRouter()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setLoaded(true) }, [])

  return (
    <main style={{ fontFamily: "'Inter', sans-serif", color: '#fff' }}>
      {/* Fixed background */}
      <div className="hidden lg:block" style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <Image src="/images/hero-backgrounds/cart-hero.webp" alt="" fill sizes="100vw" unoptimized priority
               className="object-cover object-center"
               onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
      </div>

      {/* Content — flex row: floating sidebar + cart panel */}
      <div className="hidden lg:flex" style={{
        position: 'relative', zIndex: 1, minHeight: '100vh',
        display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        padding: '80px 40px', gap: 24,
      }}>

        {/* ── FLOATING SIDEBAR ── */}
        <div style={{
          flexShrink: 0, width: 90, background: 'rgba(20,8,50,0.5)', backdropFilter: 'blur(12px)',
          borderRadius: 24, border: '1px solid rgba(212,175,100,0.15)',
          padding: '24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 28, alignSelf: 'center',
        }}>
          <Link href="/" style={{ marginBottom: 16 }}>
            <div style={{ width: 60, height: 60, borderRadius: '50%', border: '1.5px solid rgba(212,175,100,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(212,175,100,0.08)' }}>
              <svg viewBox="0 0 32 32" fill="none" stroke="rgba(212,175,100,0.9)" strokeWidth="1.2" width={32} height={32}>
                <path d="M16 6c-3 4-3 9 0 13 3-4 3-9 0-13z"/><path d="M16 19c-4.5-2.5-9-2-13 1 4.5 2.5 9 2 13-1zM16 19c4.5-2.5 9-2 13 1-4.5 2.5-9 2-13-1z"/>
              </svg>
            </div>
          </Link>
          <div style={{ width: 40, height: 1, background: 'rgba(212,175,100,0.2)' }}/>
          {NAV_ITEMS.map(item => (
            <Link key={item.label} href={item.href} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, textDecoration: 'none',
              opacity: 0.7, transition: 'opacity 0.2s ease',
            }}>
              <SidebarIcon name={item.icon}/>
              <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.05em', textAlign: 'center' }}>{item.label}</span>
            </Link>
          ))}
        </div>

        {/* ── MAIN PANEL ── */}
        <div dir="ltr" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: 780 }}>
          <div style={{
            width: '100%', maxWidth: 780,
            background: 'rgba(255,240,255,0.12)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.2)', borderRadius: 28, overflow: 'hidden',
            maxHeight: '90vh', display: 'flex', flexDirection: 'column',
            opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(30px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}>
            {/* Header */}
            <div style={{ textAlign: 'center', padding: '32px 32px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
              <div style={{ marginBottom: 12 }}>
                <svg viewBox="0 0 40 40" fill="none" stroke="rgba(160,100,240,0.9)" strokeWidth="1.2" width={40} height={40}>
                  <path d="M20 4c-3.5 5-3.5 11 0 16 3.5-5 3.5-11 0-16z"/><path d="M20 20c-5.5-3-11-2-16 1 5.5 3 11 2 16-1zM20 20c5.5-3 11-2 16 1-5.5 3-11 2-16-1z"/>
                </svg>
              </div>
              <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: '2rem', fontWeight: 400, color: '#fff', letterSpacing: '0.02em' }}>Shopping Cart</h1>
              <div style={{ position: 'relative', width: 120, margin: '16px auto 0' }}>
                <div style={{ borderTop: '1px solid rgba(212,175,100,0.5)', width: '100%' }}/>
                <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: '#d4af64', fontSize: 8, lineHeight: 0 }}>◆</span>
              </div>
              {/* Cart + wishlist icons top-right */}
              <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: 12 }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18 }}>♡</span>
                <div style={{ position: 'relative' }}>
                  <span style={{ fontSize: 18 }}>🛒</span>
                  <span style={{ position: 'absolute', top: -8, right: -8, background: '#f5a623', color: '#fff', borderRadius: '50%', width: 18, height: 18, fontSize: '0.65rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{totalItems}</span>
                </div>
              </div>
            </div>

            {/* Scrollable items */}
            <div style={{ overflowY: 'auto', flex: 1, padding: '8px 32px 24px', minHeight: 200 }}>
              {items.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                  <div style={{ opacity: 0.3, fontSize: '4rem' }}>🔮</div>
                  <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: '1.3rem', color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>Your cart is empty</h3>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }}>Discover crystals that call to you</p>
                  <CTAButton href="/shop">EXPLORE COLLECTION ✦</CTAButton>
                </div>
              ) : (
                items.map((item, i) => (
                  <div key={item.id} style={{ animation: `fadeSlideUp 0.4s ease forwards`, animationDelay: `${i * 100}ms`, opacity: 0 }}>
                    <CartItemRow item={item} onUpdateQuantity={updateQuantity} onRemove={removeItem}/>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '20px 32px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, background: 'rgba(255,255,255,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <svg viewBox="0 0 36 36" fill="none" stroke="#c084f5" strokeWidth="1.2" width={36} height={36}>
                    <path d="M18 3l-8 16h16z" fill="rgba(192,132,245,0.2)"/><path d="M18 3l-12 16h24z" opacity="0.5"/>
                  </svg>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.05em' }}>Total</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#fff', fontFamily: "'Playfair Display',Georgia,serif" }}>${totalPrice.toFixed(2)}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                  <button onClick={() => router.push('/checkout')} disabled={items.length === 0} style={{
                    opacity: items.length === 0 ? 0.5 : 1, pointerEvents: items.length === 0 ? 'none' : 'auto',
                    background: 'linear-gradient(135deg, rgba(200,100,255,0.6), rgba(255,120,200,0.5))',
                    border: '1.5px solid rgba(220,140,255,0.7)', borderRadius: 100, padding: '14px 36px',
                    color: '#fff', fontSize: '1rem', fontWeight: 600, fontFamily: "'Playfair Display',Georgia,serif",
                    cursor: 'pointer', letterSpacing: '0.02em',
                    boxShadow: '0 0 30px rgba(200,100,255,0.4), 0 0 60px rgba(200,100,255,0.15)',
                    display: 'flex', alignItems: 'center', gap: 12, transition: 'all 0.3s ease', whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(200,100,255,0.6), 0 0 80px rgba(200,100,255,0.2)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 0 30px rgba(200,100,255,0.4), 0 0 60px rgba(200,100,255,0.15)' }}>
                    <span style={{ fontSize: '1.2rem' }}>✦</span> Proceed to Checkout
                  </button>
                  <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: 4 }}>🔒 Secure & Encrypted Checkout</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeSlideUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:none } }
      `}</style>
    </main>
  )
}
