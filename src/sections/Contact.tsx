import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../i18n/context'
import { getContactLinks } from '../lib/contact'
import { SectionReveal } from '../components/motion/SectionReveal'
import { MagneticLink } from '../components/ui/MagneticLink'

export function Contact() {
  const { t } = useLanguage()
  const links = getContactLinks()
  return <section id="contact" className="section contact container" aria-labelledby="contact-title">
    <SectionReveal><p className="eyebrow section-label">{t.contact.label}</p><div className="contact-heading"><h2 id="contact-title" className="section-heading">{t.contact.title}<br/><span className="accent">{t.contact.accent}</span></h2><div className="contact-arrow" aria-hidden="true"><ArrowUpRight strokeWidth={.7}/></div></div></SectionReveal>
    <SectionReveal className="contact-bottom"><p className="body-copy">{t.contact.body}</p>{links.length > 0 ? <div className="contact-links">{links.map(link => <MagneticLink key={link.key} href={link.href} external={link.external} className={`button ${link.key === 'email' || link.key === 'whatsapp' ? 'button-primary' : 'button-outline'}`}>{t.contact[link.key]}<ArrowUpRight/></MagneticLink>)}</div> : <p className="contact-pending body-copy">{t.contact.pending}</p>}</SectionReveal>
  </section>
}
