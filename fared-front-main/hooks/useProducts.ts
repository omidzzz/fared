'use client'

import { useQuery } from '@tanstack/react-query'
import { getProducts, getProduct, getCategories } from '@/lib/api'

export function useProducts(params?: { category?: string; limit?: number; offset?: number }) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
  })
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
    enabled: Boolean(id),
  })
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
}
