import { IntroSequence } from './components/motion/IntroSequence'
import { Hero } from './sections/Hero'
import { useLanguage } from './i18n/context'
import { Navbar } from './components/layout/Navbar'

export default function App() {
  const { t } = useLanguage()
  return <><a href="#main" className="skip-link">{t.skip}</a><IntroSequence /><Navbar /><main id="main"><Hero /></main></>
}
