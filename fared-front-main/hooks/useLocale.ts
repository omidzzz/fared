'use client'

import { useLocale as useNextIntlLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export function useLocale() {
  const locale = useNextIntlLocale()
  const router = useRouter()
  const t = useTranslations()
  const isRTL = locale === 'fa'

  const toggleLocale = useCallback(() => {
    const next = locale === 'en' ? 'fa' : 'en'
    router.push(`/${next}`)
  }, [locale, router])

  return { locale, isRTL, toggleLocale, t }
}
