import { useLayoutEffect, useState, type ReactNode } from 'react'
import { MotionConfig } from 'motion/react'
import { LanguageContext, type Language } from './context'
import { en } from './en'
import { fr } from './fr'
import { ar } from './ar'
import { readStorage, writeStorage } from '../lib/storage'

const dictionaries = { en, fr, ar }

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = readStorage('ym-language')
    return stored === 'ar' || stored === 'fr' ? stored : 'en'
  })
  useLayoutEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.title = dictionaries[language].seo.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', dictionaries[language].seo.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', dictionaries[language].seo.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', dictionaries[language].seo.description)
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', { en: 'en_US', fr: 'fr_FR', ar: 'ar_TN' }[language])
    writeStorage('ym-language', language)
  }, [language])
  return <LanguageContext.Provider value={{ language, setLanguage, t: dictionaries[language] }}><MotionConfig reducedMotion="user">{children}</MotionConfig></LanguageContext.Provider>
}
