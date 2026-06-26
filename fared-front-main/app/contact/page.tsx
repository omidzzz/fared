'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import Image from 'next/image'
import Link from 'next/link'
import DynamicHeader from '@/components/layout/DynamicHeader'
import Footer from '@/components/layout/Footer'
import { HeroShimmer } from '@/components/ui/HeroShimmer'

const SOCIAL_LINKS = [
  { id: 'instagram', labelFA: 'اینستاگرام', icon: '📸', href: 'https://instagram.com/auramystic', accentColor: 'var(--chakra-sacral)' },
  { id: 'telegram',  labelFA: 'تلگرام',     icon: '✈️', href: 'https://t.me/auramystic',         accentColor: 'var(--chakra-throat)' },
  { id: 'whatsapp',  labelFA: 'واتساپ',     icon: '💬', href: 'https://wa.me/989121234567',       accentColor: 'var(--chakra-heart)' },
  { id: 'email',     labelFA: 'ایمیل',      icon: '📧', href: 'mailto:info@auramystic.com',       accentColor: 'var(--chakra-crown)' },
]

const FAQ_ITEMS = [
  { id: 'faq-1', questionFA: 'زمان ارسال سفارش‌ها چقدر است؟',        answerFA: 'سفارش‌های داخل تهران ۲-۳ روز کاری و سایر شهرها ۳-۷ روز کاری تحویل داده می‌شوند.' },
  { id: 'faq-2', questionFA: 'آیا امکان مرجوع کردن کالا وجود دارد؟', answerFA: 'بله، تا ۷ روز پس از دریافت کالا در صورت عدم استفاده امکان مرجوعی وجود دارد.' },
  { id: 'faq-3', questionFA: 'کریستال‌ها اصل هستند؟',                answerFA: 'تمامی کریستال‌های اورا مستقیم از معادن طبیعی تهیه شده و دارای گواهی اصالت هستند.' },
  { id: 'faq-4', questionFA: 'چگونه منتور مناسب انتخاب کنم؟',        answerFA: 'از صفحه منتورشیپ می‌توانید پروفایل کامل هر منتور را مشاهده و بر اساس تخصص و نظرات کاربران انتخاب کنید.' },
]

const inputClass = 'w-full bg-white/[0.04] border border-white/[0.10] rounded-xl px-4 py-3 font-farsi text-sm text-[var(--text-primary)] min-h-11 outline-none focus:border-[var(--gold-accent)]/50 transition-colors'

export default function ContactPage() {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [subject, setSubject] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setError('')
    if (!name || !email || !message) {
      setError('لطفاً فیلدهای ضروری را پر کنید')
      return
    }
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, subject, message })
      })
      if (!res.ok) throw new Error('Failed')
      toast.success("Message sent! We'll be in touch ✦")
      setIsSubmitted(true)
      setName(''); setEmail(''); setSubject(''); setMessage('')
    } catch {
      toast.error('Failed to send. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setName('')
    setEmail('')
    setPhone('')
    setSubject('')
    setMessage('')
    setIsSubmitted(false)
    setError('')
  }

  return (
    <main className="page-gradient-crown min-h-screen">
      {/* Section 1 — Header */}
      <DynamicHeader />

      {/* Section 2 — Isolated Hero */}
      <section className="px-4 pt-[88px] pb-4">
        <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
          <Image
            src="/images/hero-backgrounds/home-page-hero.webp"
            alt=""
            fill
            className="object-cover object-top"
            priority
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <HeroShimmer />
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-6" dir="rtl">
            <h1 className="font-display text-3xl text-[var(--text-primary)]">
              تماس با ما
            </h1>
            <p className="font-farsi text-sm text-[var(--text-secondary)] mt-1">
              همیشه اینجاییم
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 — Quick-Nav: OMITTED */}

      {/* Section 4 — Content */}
      <section className="px-4 py-6 flex flex-col gap-5">
        {/* Block A — Social Links */}
        <div className="flex flex-col gap-3">
          <h2 className="font-display text-xl text-[var(--text-primary)] mb-1" dir="rtl">
            راه‌های ارتباطی
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {SOCIAL_LINKS.map((s) => (
              <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer">
                <div className="rounded-2xl bg-white/[0.03] border p-4 flex flex-col items-center gap-2 text-center active:scale-[0.97] transition-all duration-200"
                     style={{ borderColor: s.accentColor + '30' }}>
                  <span className="text-2xl">{s.icon}</span>
                  <span className="font-farsi text-sm" style={{ color: s.accentColor }}>
                    {s.labelFA}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Block B — Contact Form */}
        {!isSubmitted ? (
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5 flex flex-col gap-4" dir="rtl">
            <h2 className="font-farsi font-bold text-base text-[var(--text-primary)] mb-1">
              ارسال پیام
            </h2>

            {error && (
              <div className="rounded-xl p-3 font-farsi text-xs text-center"
                   style={{
                     background: 'rgba(192,57,43,0.15)',
                     border: '1px solid rgba(192,57,43,0.30)',
                     color: 'var(--text-primary)',
                   }}>
                {error}
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label className="font-farsi text-xs text-[var(--text-secondary)]">نام و نام خانوادگی</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} dir="rtl" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-farsi text-xs text-[var(--text-secondary)]">ایمیل</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} dir="rtl" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-farsi text-xs text-[var(--text-secondary)]">شماره تماس</label>
              <input type="tel" inputMode="numeric" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} dir="rtl" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-farsi text-xs text-[var(--text-secondary)]">موضوع</label>
              <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className={inputClass} dir="rtl" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-farsi text-xs text-[var(--text-secondary)]">پیام شما</label>
              <textarea
                className="w-full bg-white/[0.04] border border-white/[0.10] rounded-xl px-4 py-3 font-farsi text-sm text-[var(--text-primary)] outline-none resize-none focus:border-[var(--gold-accent)]/50 transition-colors"
                rows={4}
                dir="rtl"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full min-h-11 rounded-xl font-farsi text-sm font-bold transition-all duration-200 active:scale-[0.98]"
              style={{ background: 'var(--gold-accent)', color: 'var(--cosmic-dark)' }}
            >
              {isSubmitting ? 'در حال ارسال...' : 'ارسال پیام'}
            </button>
          </div>
        ) : (
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-8 flex flex-col items-center text-center gap-4" dir="rtl">
            <span className="text-4xl">✨</span>
            <h2 className="font-display text-xl text-[var(--text-primary)]">پیام شما ارسال شد</h2>
            <p className="font-farsi text-sm text-[var(--text-secondary)]">به زودی با شما تماس می‌گیریم</p>
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-xl font-farsi text-sm min-h-11 transition-all duration-300"
              style={{ border: '1px solid rgba(254,203,125,0.50)', color: 'var(--gold-accent)' }}
            >
              ارسال پیام جدید
            </button>
          </div>
        )}

        {/* Block C — FAQ */}
        <div className="flex flex-col gap-3">
          <h2 className="font-display text-xl text-[var(--text-primary)] mb-1" dir="rtl">
            سوالات متداول
          </h2>
          {FAQ_ITEMS.map((faq) => (
            <div key={faq.id} className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
              <button
                className="w-full p-4 flex items-center justify-between min-h-11 text-right"
                dir="rtl"
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
              >
                <span className="font-farsi text-sm text-[var(--text-primary)] flex-1">{faq.questionFA}</span>
                <span className="text-[var(--gold-accent)] transition-transform duration-200"
                      style={{ transform: openFaq === faq.id ? 'rotate(180deg)' : 'none' }}>
                  ↓
                </span>
              </button>
              {openFaq === faq.id && (
                <div className="px-4 pb-4 border-t border-white/[0.06]" dir="rtl">
                  <p className="font-farsi text-sm text-[var(--text-secondary)] leading-relaxed pt-3">
                    {faq.answerFA}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section 5 — Footer Badges */}
      <Footer />
    </main>
  )
}
