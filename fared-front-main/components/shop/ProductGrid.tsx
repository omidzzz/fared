'use client'

import { motion } from 'framer-motion'
import SoulCard from '@/components/cards/SoulCard'
import CrystalCard from '@/components/cards/CrystalCard'
import type { CategoryHandle } from '@/types/product'

interface ProductItem {
  id: string
  name: string
  price: number
  image: string
  colors?: string[]
  category: CategoryHandle
  location?: string
  duration?: string
}

interface ProductGridProps {
  products: ProductItem[]
  category: CategoryHandle
  onAddToCart?: (id: string) => void
}

export default function ProductGrid({
  products,
  category,
  onAddToCart,
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, i) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: i * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {category === 'clothes' ? (
            <SoulCard
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              colors={product.colors ?? []}
              onAddToCart={() => onAddToCart?.(product.id)}
            />
          ) : (
            <CrystalCard
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              category={product.category}
              onAddToCart={() => onAddToCart?.(product.id)}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}
