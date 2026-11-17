import { IntroSequence } from './components/motion/IntroSequence'
import { Hero } from './sections/Hero'
import { useLanguage } from './i18n/context'

export default function App() {
  const { t } = useLanguage()
  return <><a href="#main" className="skip-link">{t.skip}</a><IntroSequence /><main id="main"><Hero /></main></>
}
