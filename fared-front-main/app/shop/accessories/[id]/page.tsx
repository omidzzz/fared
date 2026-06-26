'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import DynamicHeader from '@/components/layout/DynamicHeader'
import ProductDetailView from '@/components/ui/ProductDetailView'
import { MOCK_ACCESSORIES } from '@/lib/mock-data'
import type { Accessory } from '@/lib/mock-data'

export default function AccessoryDetailPage() {
  const { id } = useParams<{ id: string }>()
  const item = MOCK_ACCESSORIES.find((a: Accessory) => a.slug === id || a.id === id)

  if (!item) {
    return (
      <main style={{ minHeight: '100vh', background: '#0a0514', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', marginBottom: '16px' }}>Accessory Not Found</h1>
          <Link href="/shop/accessories" style={{ color: '#d4af64' }}>← Back to Accessories</Link>
        </div>
      </main>
    )
  }

  const productData = {
    id: item.id,
    name: item.name,
    category: 'Accessories',
    categoryHref: '/shop/accessories',
    description: `${item.name}. ${item.material}. ${item.descriptionFA}`,
    price: item.price,
    originalPrice: Math.round(item.price * 1.25),
    discountPercent: 20,
    inStock: true,
    images: [item.image],
    specs: [
      { icon: '💎', label: 'Material', value: item.material },
      { icon: '✨', label: 'Type', value: item.name },
      { icon: '⭐', label: 'Quality', value: 'Handcrafted' },
      { icon: '🌍', label: 'Origin', value: 'Ethically Sourced' },
      { icon: '📦', label: 'Package', value: 'Gift Box Included' },
      { icon: '🛡️', label: 'Warranty', value: '30 Days' },
    ],
    overview: `${item.name} crafted from ${item.material}. Each piece is thoughtfully created to enhance your spiritual practice and elevate your sacred space.`,
    benefits: ['Enhances spiritual practice', 'High-quality materials', 'Perfect for gifting', 'Ethically sourced'],
    usage: 'Use in your daily spiritual practice, meditation, or as a decorative piece in your sacred space.',
    reviews: [],
    relatedProducts: MOCK_ACCESSORIES.filter(a => a.id !== item.id).slice(0, 4).map(a => ({
      id: a.id,
      name: a.name,
      price: a.price,
      image: a.image,
    })),
  }

  return (
    <main style={{ minHeight: '100vh' }}>
      <DynamicHeader />
      <ProductDetailView product={productData} />
    </main>
  )
}
