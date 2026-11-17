import { IntroSequence } from './components/motion/IntroSequence'
import { Hero } from './sections/Hero'
import { useLanguage } from './i18n/context'
import { Navbar } from './components/layout/Navbar'
import { About } from './sections/About'
import { Philosophy } from './sections/Philosophy'
import { Experience } from './sections/Experience'
import { Gallery } from './sections/Gallery'
import { Availability } from './sections/Availability'
import { Contact } from './sections/Contact'
import { Footer } from './components/layout/Footer'
import { shouldPlayIntro } from './lib/intro'
import { writeStorage } from './lib/storage'

export default function App() {
  const { t } = useLanguage()
  const [introVisible, setIntroVisible] = useState(shouldPlayIntro)
  const finishIntro = useCallback(() => {
    writeStorage('ym-intro', 'seen', true)
    setIntroVisible(false)
  }, [])
  return <><a href="#main" className="skip-link">{t.skip}</a><IntroSequence visible={introVisible} onComplete={finishIntro}/><Navbar /><main id="main"><Hero ready={!introVisible}/><About /><Philosophy /><Experience /><Gallery /><Availability /><Contact /></main><Footer /></>
}
import { useCallback, useState } from 'react'
