import { IntroSequence } from './components/motion/IntroSequence'
import { Hero } from './sections/Hero'
import { useLanguage } from './i18n/context'
import { Navbar } from './components/layout/Navbar'
import { About } from './sections/About'
import { Philosophy } from './sections/Philosophy'
import { Experience } from './sections/Experience'

export default function App() {
  const { t } = useLanguage()
  return <><a href="#main" className="skip-link">{t.skip}</a><IntroSequence /><Navbar /><main id="main"><Hero /><About /><Philosophy /><Experience /></main></>
}
