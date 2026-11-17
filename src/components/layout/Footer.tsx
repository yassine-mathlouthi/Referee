import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../../i18n/context'
import { getContactLinks } from '../../lib/contact'
import { Monogram } from '../ui/Monogram'

export function Footer() {
  const { t } = useLanguage()
  const socials = getContactLinks().filter(link => link.key === 'linkedin' || link.key === 'youtube')
  return <footer className="footer">
    <div className="container">
      <div className="footer-top"><div className="footer-identity"><Monogram/><div><p>{t.name}</p><span>{t.profession} / {t.country}</span></div></div><div className="footer-socials">{socials.map(link => <a key={link.key} href={link.href} target="_blank" rel="noopener noreferrer">{t.contact[link.key]}<ArrowUpRight size={14}/></a>)}</div><a className="back-top eyebrow" href="#top">{t.footer.top}<span><ArrowUp size={18}/></span></a></div>
      <div className="footer-wordmark" aria-hidden="true">{t.art}<span>↗</span></div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} {t.name}. {t.footer.rights}</p><p>{t.footer.line}</p></div>
    </div>
  </footer>
}
