import { useState } from 'react'
import { ArrowUpRight, Flag } from 'lucide-react'
import { useLanguage } from '../i18n/context'
import { matches, summarizeMatches, type MatchRole } from '../data/matches'
import { SectionReveal } from '../components/motion/SectionReveal'

export function Experience() {
  const { t, language } = useLanguage()
  const [role, setRole] = useState<MatchRole | 'all'>('all')
  const [expanded, setExpanded] = useState(false)
  const appointments = [...matches].sort((a, b) => b.date.localeCompare(a.date))
  const filtered = appointments.filter(match => role === 'all' || match.role === role)
  const visible = expanded ? filtered : filtered.slice(0, 6)
  const totals = summarizeMatches(matches)
  const number = new Intl.NumberFormat(language)
  const date = new Intl.DateTimeFormat(language, { dateStyle: 'medium', timeZone: 'UTC' })
  return <section id="experience" className="section experience container" aria-labelledby="experience-title">
    <SectionReveal><p className="eyebrow section-label">{t.experience.label}</p><div className="section-intro"><h2 className="section-heading" id="experience-title">{t.experience.title}<br/><span className="muted">{t.experience.accent}</span></h2><p className="body-copy">{t.experience.intro}</p></div></SectionReveal>
    {appointments.length ? <>
      <SectionReveal>
        <p className="eyebrow match-season">{t.experience.recordLabel}</p>
        <dl className="match-stats">{(['played', 'referee', 'assistant'] as const).map(key => <div key={key}><dt>{t.experience[key]}</dt><dd>{number.format(totals[key])}</dd></div>)}</dl>
        <p className="match-source body-copy">{t.experience.source}</p>
      </SectionReveal>
      <div className="match-filters" role="group" aria-label={t.experience.filter}>{(['all', 'referee', 'assistant'] as const).map(value => <button type="button" key={value} aria-pressed={role === value} onClick={() => { setRole(value); setExpanded(false) }}>{value === 'all' ? t.experience.all : t.experience.roles[value]}</button>)}</div>
      <ol id="match-history" className="match-timeline" aria-label={t.experience.list}>{visible.map(match => <li key={match.id} data-match-id={match.id} data-role={match.role} data-status={match.status}>
        <SectionReveal className="match-record">
          <time className="eyebrow" dateTime={match.date}>{date.format(new Date(`${match.date}T00:00:00Z`))}</time>
          <div className="match-info"><p className="eyebrow accent">{t.experience.types[match.matchType]} <span className="match-category">{t.experience.ages[match.ageCategory]}</span></p><h3><bdi>{match.homeTeam}</bdi> <span className="match-versus">{t.experience.versus}</span> <bdi>{match.awayTeam}</bdi></h3>
            <p className="match-meta"><span className={`match-role match-role-${match.role}`}>{t.experience.roles[match.role]}</span><bdi className="muted">{match.location}</bdi></p>
            {match.status === 'opponentAbsent' ? <p className="match-absence body-copy">{t.experience.absentNote}</p> : match.role === 'referee' && <dl className="match-decisions">
              <div><dt><span className="card-symbol card-yellow" aria-hidden="true"/>{t.experience.yellow}</dt><dd>{number.format(match.yellowCards)}</dd></div>
              <div><dt><span className="card-symbol card-red" aria-hidden="true"/>{t.experience.red}</dt><dd>{number.format(match.redCards)}</dd></div>
              {match.penalties !== undefined && <div><dt>{t.experience.penalties}</dt><dd>{number.format(match.penalties)}</dd></div>}
            </dl>}
          </div>
          <div className={`match-result ${match.status === 'opponentAbsent' ? 'match-result-absent' : ''}`}>{match.status === 'played' ? <><p className="match-score" dir="ltr">{match.score[0]} <span>—</span> {match.score[1]}</p><span className="eyebrow">{t.experience.result}</span></> : <span className="eyebrow">{t.experience.absent}</span>}</div>
        </SectionReveal>
      </li>)}</ol>
      {filtered.length > 6 && <div className="match-more"><button type="button" className="button button-outline" aria-controls="match-history" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? t.experience.showLess : t.experience.showAll} <span className="eyebrow">({number.format(filtered.length)})</span></button></div>}
    </> : <SectionReveal className="experience-pending">
      <div className="record-symbol" aria-hidden="true"><Flag size={40} strokeWidth={1}/><div/></div>
      <div><p className="eyebrow accent">{t.experience.note}</p><h3>{t.experience.pending}</h3><p className="body-copy">{t.experience.body}</p></div>
      <a className="text-link" href="#contact">{t.experience.view}<ArrowUpRight size={18}/></a>
    </SectionReveal>}
  </section>
}
