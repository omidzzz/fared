'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/lib/cart-context'

/* ── Types ── */

export interface Review {
  id: string
  author: string
  role: 'USER'
  rating: number
  date: string
  text: string
  adminReply?: {
    author: string
    role: 'ADMIN'
    date: string
    text: string
  }
}

export interface RelatedProduct {
  id: string
  name: string
  price: number
  image: string
}

export interface ProductDetailData {
  id: string
  name: string
  category: string
  categoryHref: string
  description: string
  price: number
  originalPrice?: number
  discountPercent?: number
  inStock: boolean
  images: string[]
  sizes?: { label: string; value: string }[]
  specs: { icon: string; label: string; value: string }[]
  overview: string
  benefits: string[]
  usage: string
  reviews: Review[]
  relatedProducts: RelatedProduct[]
}

/* ── Spec Strip ── */

function SpecStrip({ specs }: { specs: ProductDetailData['specs'] }) {
  if (!specs || specs.length === 0) return null
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${Math.min(specs.length, 6)}, 1fr)`,
      background: 'rgba(20, 10, 50, 0.5)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '16px',
      padding: '28px 0',
      marginBottom: '32px',
    }}>
      {specs.slice(0, 6).map((spec, i) => (
        <div key={i} style={{
          textAlign: 'center',
          borderRight: i < Math.min(specs.length, 6) - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
          padding: '0 12px',
        }}>
          <div style={{ fontSize: '1.4rem', color: 'rgba(212,175,100,0.7)', marginBottom: '10px' }}>
            {spec.icon}
          </div>
          <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#ffffff', marginBottom: '4px' }}>
            {spec.label}
          </p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
            {spec.value}
          </p>
        </div>
      ))}
    </div>
  )
}

/* ── About Panel ── */

function AboutPanel({ overview, benefits, usage }: { overview: string; benefits: string[]; usage: string }) {
  return (
    <div style={{
      background: 'rgba(20, 10, 50, 0.5)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '16px',
      padding: '32px',
      marginBottom: '32px',
    }}>
      <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.3rem', color: '#ffffff', marginBottom: '24px' }}>
        About This Product
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '32px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span style={{ color: '#d4af64' }}>💎</span>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff' }}>Overview</h3>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
            {overview}
          </p>
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span style={{ color: '#d4af64' }}>⭐</span>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff' }}>Benefits</h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {benefits.map((b, i) => (
              <li key={i} style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', marginBottom: '8px', paddingLeft: '14px', position: 'relative', lineHeight: 1.5 }}>
                <span style={{ position: 'absolute', left: 0, color: '#d4af64' }}>·</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span style={{ color: '#d4af64' }}>👑</span>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff' }}>Usage</h3>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
            {usage}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── Review Card ── */

function ReviewCard({ author, role, rating, date, text, isReply }: { author: string; role: string; rating?: number; date: string; text: string; isReply?: boolean }) {
  return (
    <div style={{
      background: isReply ? 'rgba(212,175,100,0.06)' : 'rgba(20,10,50,0.5)',
      backdropFilter: 'blur(12px)',
      border: isReply ? '1px solid rgba(212,175,100,0.2)' : '1px solid rgba(255,255,255,0.08)',
      borderRadius: '14px',
      padding: '18px 20px',
      marginLeft: isReply ? '24px' : '0',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: role === 'ADMIN' ? 'rgba(212,175,100,0.2)' : 'rgba(140,80,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.85rem', color: role === 'ADMIN' ? '#d4af64' : '#a78bfa',
          }}>
            {role === 'ADMIN' ? '✦' : author[0]}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{author}</span>
              <span style={{ fontSize: '0.6rem', padding: '2px 8px', borderRadius: '100px', background: role === 'ADMIN' ? 'rgba(212,175,100,0.2)' : 'rgba(140,80,255,0.2)', color: role === 'ADMIN' ? '#d4af64' : '#a78bfa', fontWeight: 600 }}>
                {role}
              </span>
            </div>
            {rating && (
              <div style={{ color: '#d4af64', fontSize: '0.7rem', marginTop: '2px' }}>
                {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
              </div>
            )}
          </div>
        </div>
        <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>{date}</span>
      </div>
      <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '8px' }}>{text}</p>
    </div>
  )
}

/* ── Reviews Section ── */

function ReviewsSection({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) return null
  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.3rem', color: '#ffffff' }}>
          Customer Reviews ({reviews.length})
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {reviews.map(review => (
          <div key={review.id} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <ReviewCard author={review.author} role="USER" rating={review.rating} date={review.date} text={review.text} />
            {review.adminReply && (
              <ReviewCard author={review.adminReply.author} role="ADMIN" date={review.adminReply.date} text={review.adminReply.text} isReply />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Related Products ── */

function RelatedProducts({ products }: { products: RelatedProduct[] }) {
  if (products.length === 0) return null
  return (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.3rem', color: '#ffffff', marginBottom: '20px' }}>
        You May Also Love
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {products.map(p => (
          <Link key={p.id} href={`/product/${p.id}`} style={{ textDecoration: 'none' }}>
            <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(20,10,50,0.4)' }}>
              <div style={{ position: 'relative', aspectRatio: '1/1' }}>
                <Image src={p.image} alt={p.name} fill style={{ objectFit: 'cover' }} unoptimized />
              </div>
              <div style={{ padding: '14px' }}>
                <p style={{ fontSize: '0.85rem', color: '#fff', marginBottom: '8px' }}>{p.name}</p>
                <span style={{ fontSize: '0.9rem', color: '#d4af64', fontWeight: 600 }}>${p.price.toFixed(2)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

/* ── Shipping Info ── */

function ShippingInfoBar() {
  const items = [
    { icon: '🚚', label: 'Shipping', text: 'Orders are processed within 24-48 hours and shipped with care.' },
    { icon: '📦', label: 'Delivery', text: 'Estimated delivery time is 3-7 business days within the U.S.' },
    { icon: '↻', label: 'Returns', text: 'We offer a 30-day return policy for unused items in original condition.' },
  ]
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px',
      background: 'rgba(20,10,50,0.5)', backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px',
      padding: '28px 32px',
    }}>
      {items.map(item => (
        <div key={item.label} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '1.4rem', color: 'rgba(212,175,100,0.7)' }}>{item.icon}</span>
          <div>
            <p style={{ fontSize: '0.88rem', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>{item.label}</p>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Main Component ── */

export default function ProductDetailView({ product }: { product: ProductDetailData }) {
  const { addItem } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[1]?.value || product.sizes?.[0]?.value || '')
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productType: 'stone',
      name: product.name,
      nameFA: product.name,
      price: product.price,
      currency: 'USD',
      quantity,
      image: product.images[0],
    })
  }

  return (
    <>
      {/* Fixed background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: 'linear-gradient(180deg, #150a30 0%, #0d0620 50%, #0a0418 100%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', padding: '90px 0 60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '24px' }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <Link href="/shop" style={{ color: 'inherit', textDecoration: 'none' }}>Shop</Link>
            <span>›</span>
            <Link href={product.categoryHref} style={{ color: 'inherit', textDecoration: 'none' }}>{product.category}</Link>
            <span>›</span>
            <span style={{ color: 'rgba(255,255,255,0.8)' }}>{product.name}</span>
          </div>

          {/* ── Product Hero: Gallery + Info ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: '48px', marginBottom: '48px' }}>
            {/* LEFT: Gallery */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {product.images.slice(0, 5).map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)} style={{
                    width: '64px', height: '64px', borderRadius: '10px', overflow: 'hidden',
                    border: selectedImage === i ? '2px solid #d4af64' : '1px solid rgba(255,255,255,0.15)',
                    padding: 0, cursor: 'pointer', background: 'rgba(255,255,255,0.04)', position: 'relative',
                  }}>
                    <Image src={img} alt="" fill style={{ objectFit: 'cover' }} unoptimized />
                  </button>
                ))}
              </div>
              <div style={{
                flex: 1, position: 'relative', borderRadius: '16px', overflow: 'hidden',
                border: '1px solid rgba(212,175,100,0.25)', aspectRatio: '1/1',
                background: 'rgba(255,255,255,0.02)',
              }}>
                <Image src={product.images[selectedImage] || product.images[0]} alt={product.name} fill style={{ objectFit: 'cover' }} unoptimized />
              </div>
            </div>

            {/* RIGHT: Product info */}
            <div>
              <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 3vw, 2.6rem)', color: '#ffffff', marginBottom: '12px' }}>
                {product.name}
              </h1>
              <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: '20px', maxWidth: '460px' }}>
                {product.description}
              </p>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.8rem', color: '#ffffff', fontWeight: 600 }}>
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'line-through' }}>
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.discountPercent && (
                  <span style={{ padding: '4px 12px', borderRadius: '100px', background: 'rgba(212,175,100,0.15)', border: '1px solid rgba(212,175,100,0.4)', color: '#d4af64', fontSize: '0.78rem', fontWeight: 600 }}>
                    {product.discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Stock */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: product.inStock ? '#4ade80' : '#f87171' }} />
                <span style={{ fontSize: '0.85rem', color: product.inStock ? '#4ade80' : '#f87171' }}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Size selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div style={{ marginBottom: '24px' }}>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: '10px' }}>Size</p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {product.sizes.map(size => (
                      <button key={size.value} onClick={() => setSelectedSize(size.value)} style={{
                        padding: '10px 20px', borderRadius: '100px',
                        border: selectedSize === size.value ? '1.5px solid #d4af64' : '1px solid rgba(255,255,255,0.2)',
                        background: selectedSize === size.value ? 'rgba(212,175,100,0.1)' : 'transparent',
                        color: selectedSize === size.value ? '#ffffff' : 'rgba(255,255,255,0.6)',
                        fontSize: '0.82rem', cursor: 'pointer',
                      }}>
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div style={{ marginBottom: '24px' }}>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: '10px' }}>Quantity</p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px', padding: '8px 18px' }}>
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1rem' }}>−</button>
                  <span style={{ color: '#fff', fontSize: '0.9rem', minWidth: '20px', textAlign: 'center' }}>{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1rem' }}>+</button>
                </div>
              </div>

              {/* Add to Cart */}
              <button onClick={handleAddToCart} style={{
                width: '100%', padding: '16px', borderRadius: '100px',
                background: 'linear-gradient(135deg, #c8a24a, #e8c96a 50%, #c8a24a)',
                border: 'none', color: '#1a0d00', fontSize: '0.95rem', fontWeight: 700,
                cursor: 'pointer', marginBottom: '12px',
                boxShadow: '0 4px 24px rgba(200,162,74,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              }}>
                🛍 Add To Cart
              </button>

              {/* Buy Now */}
              <button style={{
                width: '100%', padding: '16px', borderRadius: '100px',
                background: 'transparent', border: '1.5px solid rgba(212,175,100,0.5)',
                color: '#d4af64', fontSize: '0.95rem', fontWeight: 600,
                cursor: 'pointer', marginBottom: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              }}>
                ⚡ Buy Now
              </button>
            </div>
          </div>

          <SpecStrip specs={product.specs} />
          <AboutPanel overview={product.overview} benefits={product.benefits} usage={product.usage} />
          <ReviewsSection reviews={product.reviews} />
          <RelatedProducts products={product.relatedProducts} />
          <ShippingInfoBar />
        </div>
      </div>
    </>
  )
}
