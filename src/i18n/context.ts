import { createContext, useContext } from 'react'
import { en, type Copy } from './en'

export type Language = 'en' | 'fr' | 'ar'
export const LanguageContext = createContext<{
  language: Language
  setLanguage: (language: Language) => void
  t: Copy
}>({ language: 'en', setLanguage: () => {}, t: en })
export const useLanguage = () => useContext(LanguageContext)
