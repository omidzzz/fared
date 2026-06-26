import type { Product, Cart } from '@/types/product'
import type { Category } from '@/types/category'
import type { Order } from '@/types/order'
import type { EditorialPost, ForumPost } from '@/types/content'

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? ''

async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('fared_token') : null
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }))
    throw new Error(error.message ?? 'API request failed')
  }
  return res.json() as Promise<T>
}

export function getProducts(params?: {
  category?: string
  limit?: number
  offset?: number
}): Promise<{ products: Product[]; count: number }> {
  const query = new URLSearchParams()
  if (params?.category) query.set('category_handle', params.category)
  if (params?.limit) query.set('limit', String(params.limit))
  if (params?.offset) query.set('offset', String(params.offset))
  const qs = query.toString() ? `?${query.toString()}` : ''
  return apiFetch(`/store/products${qs}`)
}

export function getProduct(id: string): Promise<Product> {
  return apiFetch<{ product: Product }>(`/store/products/${id}`).then((r) => r.product)
}

export function getCategories(): Promise<Category[]> {
  return apiFetch<{ product_categories: Category[] }>('/store/product-categories').then(
    (r) => r.product_categories,
  )
}

export function createCart(): Promise<Cart> {
  return apiFetch<{ cart: Cart }>('/store/carts', { method: 'POST', body: '{}' }).then(
    (r) => r.cart,
  )
}

export function getCart(id: string): Promise<Cart> {
  return apiFetch<{ cart: Cart }>(`/store/carts/${id}`).then((r) => r.cart)
}

export function addToCart(cartId: string, variantId: string, quantity: number): Promise<Cart> {
  return apiFetch<{ cart: Cart }>(`/store/carts/${cartId}/line-items`, {
    method: 'POST',
    body: JSON.stringify({ variant_id: variantId, quantity }),
  }).then((r) => r.cart)
}

export function removeFromCart(cartId: string, lineItemId: string): Promise<Cart> {
  return apiFetch<{ cart: Cart }>(`/store/carts/${cartId}/line-items/${lineItemId}`, {
    method: 'DELETE',
  }).then((r) => r.cart)
}

export function updateCartItem(
  cartId: string,
  lineItemId: string,
  quantity: number,
): Promise<Cart> {
  return apiFetch<{ cart: Cart }>(`/store/carts/${cartId}/line-items/${lineItemId}`, {
    method: 'POST',
    body: JSON.stringify({ quantity }),
  }).then((r) => r.cart)
}

export function loginCustomer(
  email: string,
  password: string,
): Promise<{ token: string }> {
  return apiFetch('/store/auth', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export function registerCustomer(data: {
  email: string
  password: string
  first_name: string
  last_name: string
}): Promise<{ customer: unknown }> {
  return apiFetch('/store/customers', { method: 'POST', body: JSON.stringify(data) })
}

export function getCustomer(): Promise<unknown> {
  return apiFetch('/store/customers/me')
}

export function getOrders(): Promise<Order[]> {
  return apiFetch<{ orders: Order[] }>('/store/orders').then((r) => r.orders)
}

export function getEditorialPosts(category?: string): Promise<EditorialPost[]> {
  const qs = category ? `?category=${category}` : ''
  return apiFetch<{ posts: EditorialPost[] }>(`/store/editorial${qs}`).then((r) => r.posts)
}

export function getEditorialPost(slug: string): Promise<EditorialPost> {
  return apiFetch<{ post: EditorialPost }>(`/store/editorial/${slug}`).then((r) => r.post)
}

export function getForumPosts(): Promise<ForumPost[]> {
  return apiFetch<{ posts: ForumPost[] }>('/store/forum').then((r) => r.posts)
}

export function getForumPost(id: string): Promise<ForumPost> {
  return apiFetch<{ post: ForumPost }>(`/store/forum/${id}`).then((r) => r.post)
}
