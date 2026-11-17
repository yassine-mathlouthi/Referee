import { ArrowUpRight, Flag } from 'lucide-react'
import { useLanguage } from '../i18n/context'
import { matches } from '../data/matches'
import { SectionReveal } from '../components/motion/SectionReveal'

export function Experience() {
  const { t, language } = useLanguage()
  const appointments = [...matches].sort((a, b) => b.date.localeCompare(a.date))
  return <section id="experience" className="section experience container" aria-labelledby="experience-title">
    <SectionReveal><p className="eyebrow section-label">{t.experience.label}</p><div className="section-intro"><h2 className="section-heading" id="experience-title">{t.experience.title}<br/><span className="muted">{t.experience.accent}</span></h2><p className="body-copy">{t.experience.intro}</p></div></SectionReveal>
    {appointments.length ? <ol className="match-timeline">{appointments.map(match => <li key={match.id}>
      <SectionReveal className={`match-record ${match.featured ? 'match-featured' : ''}`}>
        <time className="eyebrow" dateTime={match.date}>{new Intl.DateTimeFormat(language, { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(match.date))}</time>
        <div><p className="eyebrow accent">{match.competition}</p>{match.homeTeam && match.awayTeam && <h3>{match.homeTeam} <span className="muted">{t.experience.versus}</span> {match.awayTeam}</h3>}<p className="body-copy">{[match.role, match.ageCategory, match.location].filter(Boolean).join(' / ')}</p>{match.description && <p className="body-copy">{match.description}</p>}</div>
        {match.image && <img src={match.image} alt={`${match.competition} — ${match.role}`} loading="lazy" />}
      </SectionReveal>
    </li>)}</ol> : <SectionReveal className="experience-pending">
      <div className="record-symbol" aria-hidden="true"><Flag size={40} strokeWidth={1}/><div/></div>
      <div><p className="eyebrow accent">{t.experience.note}</p><h3>{t.experience.pending}</h3><p className="body-copy">{t.experience.body}</p></div>
      <a className="text-link" href="#contact">{t.experience.view}<ArrowUpRight size={18}/></a>
    </SectionReveal>}
  </section>
}
