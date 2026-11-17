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
    writeStorage('ym-language', language)
  }, [language])
  return <LanguageContext.Provider value={{ language, setLanguage, t: dictionaries[language] }}><MotionConfig reducedMotion="user">{children}</MotionConfig></LanguageContext.Provider>
}
