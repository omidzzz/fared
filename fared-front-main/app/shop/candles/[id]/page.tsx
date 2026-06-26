'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import DynamicHeader from '@/components/layout/DynamicHeader'
import ProductDetailView from '@/components/ui/ProductDetailView'
import { MOCK_CANDLES } from '@/lib/mock-data'
import type { Candle } from '@/lib/mock-data'

export default function CandleDetailPage() {
  const { id } = useParams<{ id: string }>()
  const candle = MOCK_CANDLES.find((c: Candle) => c.slug === id || c.id === id)

  if (!candle) {
    return (
      <main style={{ minHeight: '100vh', background: '#0a0514', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', marginBottom: '16px' }}>Candle Not Found</h1>
          <Link href="/shop/candles" style={{ color: '#d4af64' }}>← Back to Candles</Link>
        </div>
      </main>
    )
  }

  const productData = {
    id: candle.id,
    name: candle.name,
    category: 'Candles',
    categoryHref: '/shop/candles',
    description: `${candle.name} — ${candle.scent}. ${candle.burnTime} burn time. Made with ${candle.waxType}.`,
    price: candle.price,
    originalPrice: Math.round(candle.price * 1.15),
    discountPercent: 13,
    inStock: true,
    images: [candle.image],
    sizes: [
      { label: 'Small (4oz)', value: 'small' },
      { label: 'Medium (8oz)', value: 'medium' },
      { label: 'Large (12oz)', value: 'large' },
    ],
    specs: [
      { icon: '🕯️', label: 'Burn Time', value: candle.burnTime },
      { icon: '🌿', label: 'Wax Type', value: candle.waxType },
      { icon: '🌸', label: 'Scent', value: candle.scent },
      { icon: '🌀', label: 'Chakra', value: candle.chakraAlignmentFA },
      { icon: '✨', label: 'Keywords', value: candle.crystalKeywords?.join(', ') || '—' },
      { icon: '⭐', label: 'Quality', value: 'Hand-Poured' },
    ],
    overview: `${candle.name} is a ${candle.scent} scented candle made with ${candle.waxType}. Hand-poured with intention, this candle carries the energy of ${candle.crystalKeywords?.join(', ') || 'positivity'}.`,
    benefits: candle.crystalKeywords || ['Calm', 'Balance', 'Focus'],
    usage: `Burn for ${candle.burnTime} total. Trim wick to 1/4 inch before each use. Allow wax to melt to the edges on first burn to prevent tunneling.`,
    reviews: [
      {
        id: 'r1',
        author: 'Emily R.',
        role: 'USER' as const,
        rating: 5,
        date: 'May 8, 2025',
        text: 'The scent fills the entire room beautifully. Burning this during meditation has become a sacred ritual.',
        adminReply: {
          author: 'Lumina Team',
          role: 'ADMIN' as const,
          date: 'May 9, 2025',
          text: 'We love hearing this Emily! Each candle is poured with intention and energy.',
        },
      },
      {
        id: 'r2',
        author: 'Michael P.',
        role: 'USER' as const,
        rating: 4,
        date: 'Apr 22, 2025',
        text: 'Lovely candle with a clean burn. The scent is subtle but present — perfect for my yoga space.',
      },
    ],
    relatedProducts: MOCK_CANDLES.filter(c => c.id !== candle.id).slice(0, 4).map(c => ({
      id: c.id,
      name: c.name,
      price: c.price,
      image: c.image,
    })),
  }

  return (
    <main style={{ minHeight: '100vh' }}>
      <DynamicHeader />
      <ProductDetailView product={productData} />
    </main>
  )
}
