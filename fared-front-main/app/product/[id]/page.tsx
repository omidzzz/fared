'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import DynamicHeader from '@/components/layout/DynamicHeader'
import ProductDetailView from '@/components/ui/ProductDetailView'
import { getProductById } from '@/lib/mock-data'

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const product = getProductById(id)

  if (!product) {
    return (
      <main style={{ minHeight: '100vh', background: '#0a0514', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', marginBottom: '16px' }}>Product Not Found</h1>
          <Link href="/shop" style={{ color: '#d4af64' }}>← Back to Shop</Link>
        </div>
      </main>
    )
  }

  const p = product as any
  const category: string = p.category || 'shop'
  const catMap: Record<string, string> = { stones: '/shop/stones', candles: '/shop/candles', accessories: '/shop/accessories', clothes: '/shop/clothes' }
  const pName = p.name || p.title || p.titleFA || 'Product'
  const pPrice = p.price || p.sessionPrice || 0
  const pDescription = p.description || p.descriptionFA || p.longDescriptionFA || pName

  const productData = {
    id: p.id,
    name: pName,
    category: category || 'Shop',
    categoryHref: catMap[category] || '/shop',
    description: pDescription,
    price: pPrice,
    inStock: p.inStock ?? true,
    images: [p.image],
    specs: [
      { icon: '💎', label: 'Type', value: category || 'Product' },
      { icon: '✨', label: 'Name', value: pName },
      { icon: '⭐', label: 'Quality', value: 'Premium' },
    ],
    overview: pName,
    benefits: ['Premium quality', 'Carefully selected'],
    usage: 'Use as intended in your spiritual practice.',
    reviews: [],
    relatedProducts: [],
  }

  return (
    <main style={{ minHeight: '100vh' }}>
      <DynamicHeader />
      <ProductDetailView product={productData} />
    </main>
  )
}
