'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import DynamicHeader from '@/components/layout/DynamicHeader'
import Footer from '@/components/layout/Footer'
import { HeroShimmer } from '@/components/ui/HeroShimmer'
import { MOCK_BLOG_POSTS } from '@/lib/mock-data'
import type { BlogPost } from '@/lib/mock-data'

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = MOCK_BLOG_POSTS.find((p: BlogPost) => p.slug === slug)
  const relatedPosts = MOCK_BLOG_POSTS.filter(
    (p: BlogPost) => post?.related.includes(p.slug)
  )

  if (!post) {
    return (
      <main className="page-gradient-crown min-h-screen flex items-center justify-center px-4">
        <div className="text-center" dir="rtl">
          <h1 className="font-display text-2xl text-[var(--text-primary)] mb-4">
            مطلب یافت نشد
          </h1>
          <Link href="/blog">
            <button className="px-6 py-3 rounded-xl font-farsi text-sm min-h-11 transition-all duration-300"
                    style={{ border: '1px solid rgba(254,203,125,0.50)', color: 'var(--gold-accent)' }}>
              ← بازگشت به بلاگ
            </button>
          </Link>
        </div>
      </main>
    )
  }

  const paragraphs = post.contentFA.split('\n\n').filter(Boolean)

  return (
    <main className="page-gradient-crown min-h-screen">
      {/* Section 1 — Header */}
      <DynamicHeader />

      {/* Section 2 — Hero */}
      <section className="px-4 pt-[88px] pb-4">
        <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
          <Image
            src={post.thumbnail}
            alt={post.titleFA}
            fill
            className="object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <HeroShimmer />
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-6" dir="rtl">
            <span className="font-farsi text-[10px] px-3 py-1 rounded-full mb-2 w-fit"
                  style={{
                    background: 'rgba(0,0,0,0.40)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: post.accentColor,
                  }}>
              {post.categoryFA}
            </span>
            <h1 className="font-display text-2xl text-[var(--text-primary)] leading-snug">
              {post.titleFA}
            </h1>
            <p className="font-farsi text-xs text-[var(--text-secondary)] mt-2">
              {post.authorFA} · {post.date} · {post.readTimeFA}
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 — Quick-Nav: OMITTED */}

      {/* Section 4 — Article body */}
      <section className="px-4 py-6 flex flex-col gap-4">
        {/* Author card */}
        <div className="flex items-center gap-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4" dir="rtl">
          <div className="w-12 h-12 rounded-full overflow-hidden relative flex-shrink-0">
            <Image
              src={post.authorAvatar}
              alt={post.authorFA}
              fill
              className="object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          </div>
          <div>
            <p className="font-farsi font-bold text-sm text-[var(--text-primary)]">{post.authorFA}</p>
            <p className="font-farsi text-xs text-[var(--text-muted)]">نویسنده</p>
          </div>
        </div>

        {/* Content */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5" dir="rtl">
          {paragraphs.map((para: string, i: number) => (
            <p key={i} className="font-farsi text-sm text-[var(--text-secondary)] leading-[2.0] mb-4 last:mb-0">
              {para}
            </p>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2" dir="rtl">
          {post.tags.map((tag: string) => (
            <span key={tag} className="font-farsi text-xs px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[var(--text-secondary)]">
              # {tag}
            </span>
          ))}
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="font-display text-lg text-[var(--text-primary)] mb-1" dir="rtl">
              مطالب مرتبط
            </h2>
            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-3 pb-2">
              {relatedPosts.map((p: BlogPost) => (
                <Link key={p.id} href={`/blog/${p.slug}`}>
                  <div className="w-[60vw] flex-shrink-0 snap-start rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.08]">
                    <div className="relative h-[100px] w-full">
                      <Image
                        src={p.thumbnail}
                        alt={p.titleFA}
                        fill
                        className="object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                    </div>
                    <div className="p-3" dir="rtl">
                      <p className="font-farsi text-xs font-bold text-[var(--text-primary)] line-clamp-2">
                        {p.titleFA}
                      </p>
                      <p className="font-farsi text-[10px] text-[var(--text-muted)] mt-1">
                        {p.readTimeFA}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <Link href="/blog">
          <div className="flex items-center justify-center gap-2 font-farsi text-sm text-[var(--text-muted)] py-2">
            ← بازگشت به بلاگ
          </div>
        </Link>
      </section>

      {/* Section 5 — Footer Badges */}
      <Footer />
    </main>
  )
}
