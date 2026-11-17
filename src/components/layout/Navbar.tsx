import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useLanguage, type Language } from '../../i18n/context'
import { GlowAction } from '../ui/GlowAction'
import GooeyNav from '../ui/GooeyNav/GooeyNav'
import { Monogram } from '../ui/Monogram'
import { useDialog } from '../ui/useDialog'

export function Navbar() {
  const { t, language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const { ref, onCancel } = useDialog(open, () => setOpen(false))
  const links = Object.entries(t.nav)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id) })
    }, { rootMargin: '-15% 0px -55% 0px' })
    document.querySelectorAll('section[id]').forEach(section => observer.observe(section))
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect() }
  }, [])
  const languages = <label className="language-select"><span className="sr-only">{t.language}</span><select aria-label={t.language} value={language} onChange={e => setLanguage(e.target.value as Language)}><option value="en">EN</option><option value="fr">FR</option><option value="ar">ع</option></select></label>
  return <>
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <a href="#top" className="brand" aria-label={t.name}><Monogram/><span>{t.art}</span></a>
      <GooeyNav
        className="desktop-nav"
        ariaLabel={t.menu}
        items={links.map(([id, label]) => ({ label, href: `#${id}` }))}
        activeIndex={Math.max(0, links.findIndex(([id]) => id === active))}
        onChange={index => setActive(links[index][0])}
        theme="dark"
        color="#c7ff36"
        activeTextColor="#080a0b"
        size="sm"
        particleCount={15}
        spread={40}
        animationTime={600}
        gooeyness={0.5}
        wobble={0.5}
      />
      <div className="nav-actions">{languages}<GlowAction><a className="nav-cta" href="#contact">{t.connect}<ArrowUpRight size={14}/></a></GlowAction><button className="menu-toggle" aria-label={t.menu} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}><Menu size={22}/></button></div>
    </header>
    <dialog id="mobile-menu" className="mobile-menu" ref={ref} onCancel={onCancel} aria-label={t.menu}>
      <div className="mobile-menu-top"><span className="eyebrow accent">{t.art}</span><button className="icon-button" autoFocus onClick={() => setOpen(false)} aria-label={t.close}><X/></button></div>
      <nav>{links.map(([id, text], i) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}><span className="eyebrow">0{i + 1}</span>{text}<ArrowUpRight/></a>)}</nav>
      <p className="eyebrow muted">{t.name} / {t.country}</p>
    </dialog>
  </>
}
