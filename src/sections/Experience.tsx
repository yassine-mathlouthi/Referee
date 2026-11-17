import { useState } from 'react'
import { ArrowUpRight, Flag } from 'lucide-react'
import { useLanguage } from '../i18n/context'
import { matches, summarizeMatches, type MatchRole } from '../data/matches'
import { SectionReveal } from '../components/motion/SectionReveal'
import { MatchCard } from '../components/ui/MatchCard'
import { teams } from '../data/teams'

export function Experience() {
  const { t, language } = useLanguage()
  const [role, setRole] = useState<MatchRole | 'all'>('all')
  const [expanded, setExpanded] = useState(false)
  const appointments = [...matches].sort((a, b) => b.date.localeCompare(a.date))
  const filtered = appointments.filter(match => role === 'all' || match.role === role)
  const visible = expanded ? filtered : filtered.slice(0, 6)
  const totals = summarizeMatches(matches)
  const number = new Intl.NumberFormat(language)
  return <section id="experience" className="section experience container" aria-labelledby="experience-title">
    <SectionReveal><p className="eyebrow section-label">{t.experience.label}</p><div className="section-intro"><h2 className="section-heading" id="experience-title">{t.experience.title}<br/><span className="muted">{t.experience.accent}</span></h2><p className="body-copy">{t.experience.intro}</p></div></SectionReveal>
    {appointments.length ? <>
      <SectionReveal>
        <p className="eyebrow match-season">{t.experience.recordLabel}</p>
        <dl className="match-stats">{(['played', 'referee', 'assistant'] as const).map(key => <div key={key}><dt>{t.experience[key]}</dt><dd>{number.format(totals[key])}</dd></div>)}</dl>
      </SectionReveal>
      <div className="match-filters" role="group" aria-label={t.experience.filter}>{(['all', 'referee', 'assistant'] as const).map(value => <button type="button" key={value} aria-pressed={role === value} onClick={() => { setRole(value); setExpanded(false) }}>{value === 'all' ? t.experience.all : t.experience.roles[value]}</button>)}</div>
      <ol id="match-history" className="match-grid" aria-label={t.experience.list}>{visible.map(match => <li key={match.id} data-match-id={match.id} data-role={match.role} data-status={match.status}>
        <MatchCard match={match}/>
      </li>)}</ol>
      {filtered.length > 6 && <div className="match-more"><button type="button" className="button button-outline" aria-controls="match-history" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? t.experience.showLess : t.experience.showAll} <span className="eyebrow">({number.format(filtered.length)})</span></button></div>}
      <details className="team-sources"><summary>{t.experience.badgeSources}</summary><p className="body-copy">{t.experience.badgeNote}</p><ul>{teams.map(team => <li key={team.id}><a href={team.source} target="_blank" rel="noopener noreferrer"><bdi>{team.name}{team.city ? ` · ${team.city}` : ''}</bdi><ArrowUpRight size={13}/></a></li>)}</ul></details>
    </> : <SectionReveal className="experience-pending">
      <div className="record-symbol" aria-hidden="true"><Flag size={40} strokeWidth={1}/><div/></div>
      <div><p className="eyebrow accent">{t.experience.note}</p><h3>{t.experience.pending}</h3><p className="body-copy">{t.experience.body}</p></div>
      <a className="text-link" href="#contact">{t.experience.view}<ArrowUpRight size={18}/></a>
    </SectionReveal>}
  </section>
}
