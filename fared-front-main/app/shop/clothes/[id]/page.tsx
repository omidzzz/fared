'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import DynamicHeader from '@/components/layout/DynamicHeader'
import ProductDetailView from '@/components/ui/ProductDetailView'
import { CLOTHES_PRODUCTS } from '@/lib/mock-data'
import type { Product } from '@/lib/mock-data'

export default function ClothesDetailPage() {
  const { id } = useParams<{ id: string }>()
  const cloth = CLOTHES_PRODUCTS.find((p: Product) => p.slug === id || p.id === id)

  if (!cloth) {
    return (
      <main style={{ minHeight: '100vh', background: '#0a0514', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', marginBottom: '16px' }}>Product Not Found</h1>
          <Link href="/shop/clothes" style={{ color: '#d4af64' }}>← Back to Clothes</Link>
        </div>
      </main>
    )
  }

  const productData = {
    id: cloth.id,
    name: cloth.name,
    category: 'Clothing',
    categoryHref: '/shop/clothes',
    description: cloth.descriptionFA || `${cloth.name} — crafted with care for your spiritual journey.`,
    price: cloth.price,
    originalPrice: Math.round(cloth.price * 1.3),
    discountPercent: 23,
    inStock: true,
    images: [cloth.image],
    sizes: cloth.sizes?.map(s => ({ label: s, value: s.toLowerCase() })) || [
      { label: 'S', value: 's' },
      { label: 'M', value: 'm' },
      { label: 'L', value: 'l' },
    ],
    specs: [
      { icon: '👗', label: 'Type', value: 'Clothing' },
      { icon: '🧵', label: 'Material', value: cloth.material || 'Premium Fabric' },
      { icon: '📏', label: 'Sizes', value: cloth.sizes?.join(', ') || 'S, M, L' },
      { icon: '🎨', label: 'Colors', value: cloth.colors?.map(c => c.name).join(', ') || 'Various' },
      { icon: '✨', label: 'Collection', value: 'Spiritual' },
      { icon: '⭐', label: 'Quality', value: 'Premium' },
    ],
    overview: `${cloth.name}. Designed for comfort and spiritual alignment. ${cloth.descriptionFA || 'Each piece is crafted with intention for your sacred journey.'}`,
    benefits: ['Comfortable fit', 'Spiritual design', 'Premium materials', 'Versatile styling'],
    usage: 'Perfect for meditation, yoga, spiritual ceremonies, or everyday wear.',
    reviews: [],
    relatedProducts: CLOTHES_PRODUCTS.filter(p => p.id !== cloth.id).slice(0, 4).map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.image,
    })),
  }

  return (
    <main style={{ minHeight: '100vh' }}>
      <DynamicHeader />
      <ProductDetailView product={productData} />
    </main>
  )
}
