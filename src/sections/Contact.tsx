import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../i18n/context'
import { getContactLinks } from '../lib/contact'
import { SectionReveal } from '../components/motion/SectionReveal'
import { GlowAction } from '../components/ui/GlowAction'
import { MagneticLink } from '../components/ui/MagneticLink'
import { profile } from '../data/profile'
import { ContactIcon } from '../components/ui/ContactIcon'

export function Contact() {
  const { t } = useLanguage()
  const links = getContactLinks()
  const direct = links.filter(link => !['instagram', 'linkedin', 'youtube', 'tiktok', 'github', 'portfolio'].includes(link.key))
  const profiles = links.filter(link => !direct.includes(link))
  const email = links.find(link => link.key === 'email')
  return <section id="contact" className="section contact container" aria-labelledby="contact-title">
    <SectionReveal><p className="eyebrow section-label">{t.contact.label}</p><div className="contact-heading"><h2 id="contact-title" className="section-heading">{t.contact.title}<br/><span className="accent">{t.contact.accent}</span></h2><div className="contact-arrow" aria-hidden="true"><ArrowUpRight strokeWidth={.7}/></div></div></SectionReveal>
    <SectionReveal className="contact-bottom">
      <div className="contact-intro"><p className="body-copy">{t.contact.body}</p>{email && <a className="contact-address" href={email.href}><ContactIcon kind="email"/><bdi>{profile.email}</bdi><ArrowUpRight size={14} aria-hidden="true"/></a>}</div>
      {links.length > 0 ? <div className="contact-destinations"><div className="contact-links">{direct.map(link => {
        const content = <><span className="link-label"><ContactIcon kind={link.key}/>{t.contact[link.key]}</span><ArrowUpRight aria-hidden="true"/></>
        return link.key === 'email' || link.key === 'whatsapp'
          ? <GlowAction key={link.key}><a href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noopener noreferrer' : undefined} className="button button-primary">{content}</a></GlowAction>
          : <MagneticLink key={link.key} href={link.href} external={link.external} className="button button-outline">{content}</MagneticLink>
      })}</div><nav className="contact-socials" aria-label={t.contact.profiles}>{profiles.map(link => <MagneticLink key={link.key} href={link.href} external={link.external} className="text-link"><span className="link-label"><ContactIcon kind={link.key}/>{t.contact[link.key]}</span><ArrowUpRight size={15} aria-hidden="true"/></MagneticLink>)}</nav></div> : <p className="contact-pending body-copy">{t.contact.pending}</p>}
    </SectionReveal>
  </section>
}
