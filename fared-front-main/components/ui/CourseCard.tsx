'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import type { Course } from '@/lib/mock-data'

interface CourseCardProps {
  course: Course
}

const LEVEL_COLORS: Record<string, { bg: string; text: string }> = {
  beginner: { bg: 'rgba(39,174,96,0.20)', text: '#27ae60' },
  intermediate: { bg: 'rgba(241,196,15,0.20)', text: '#f1c40f' },
  advanced: { bg: 'rgba(192,57,43,0.20)', text: '#c0392b' },
}

const totalLessons = (course: Course): number =>
  course.curriculum.reduce((sum, ch) => sum + ch.lessons.length, 0)

export default function CourseCard({ course }: CourseCardProps) {
  const { addItem } = useCart()

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      productId: course.id,
      productType: 'course',
      name: course.titleFA,
      nameFA: course.titleFA,
      price: course.price,
      currency: 'USD',
      quantity: 1,
      image: course.image,
    })
  }

  const lc = LEVEL_COLORS[course.level] ?? LEVEL_COLORS.beginner

  return (
    <Link href={`/product/${course.id}`} className="block">
      <div
        className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
        style={{
          backdropFilter: 'blur(12px)',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.10)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(142,68,173,0.50)'
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(142,68,173,0.15)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {/* Image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={course.image}
            alt={course.titleFA}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />

          {/* Instructor badge — top-left */}
          <div
            className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-full text-[10px] font-body"
            style={{ background: 'rgba(0,0,0,0.50)', color: 'var(--gold-accent)' }}
          >
            {course.instructorFA}
          </div>

          {/* Level badge — top-right */}
          <div
            className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-full text-[10px] font-body"
            style={{ background: lc.bg, color: lc.text, border: `1px solid ${lc.text}40` }}
          >
            {course.levelFA}
          </div>

          {/* Bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1/2"
            style={{ background: 'linear-gradient(to top, rgba(7,7,20,0.85), transparent)' }}
          />
        </div>

        {/* Card body */}
        <div className="p-3 flex flex-col gap-2">
          <h3 className="font-display text-sm text-[--text-primary] leading-tight">{course.titleFA}</h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {course.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-[10px] font-body"
                style={{ background: 'rgba(142,68,173,0.15)', color: 'var(--chakra-third)' }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Duration + Lessons */}
          <p className="text-[10px] text-[--text-muted] font-body">
            ⏱ {course.durationFA} · 📚 {totalLessons(course)} درس
          </p>

          {/* Bottom row */}
          <div className="flex items-center justify-between mt-1">
            <span className="font-display text-sm text-[--gold-accent]">
              {course.isFree ? 'رایگان' : `$${course.price.toFixed(2)}`}
            </span>
            <button
              onClick={handleAdd}
              className="px-3 py-1.5 rounded-full text-xs font-body transition-all duration-200 min-h-[44px]"
              style={{ border: '1px solid rgba(142,68,173,0.50)', color: 'var(--chakra-third)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(142,68,173,0.20)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
            >
              Enroll →
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
