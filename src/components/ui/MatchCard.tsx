import SpotlightCard from './SpotlightCard/SpotlightCard'
import { ChevronDown } from 'lucide-react'
import type { Match } from '../../data/matches'
import { useLanguage } from '../../i18n/context'
import { SectionReveal } from '../motion/SectionReveal'
import { TeamBadge } from './TeamBadge'
import { getTeamIdentity } from '../../data/teams'

export function MatchCard({ match }: { match: Match }) {
  const { t, language } = useLanguage()
  const number = new Intl.NumberFormat(language)
  const date = new Intl.DateTimeFormat(language, { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' })

  return <SectionReveal><SpotlightCard
    className="match-record"
    theme="dark"
    spotlightColor="#c7ff36"
    intensity={0.12}
    spotlightSize={240}
    softness={0.8}
    borderGlow={0.55}
    proximity={80}
    smoothing={0.3}
    ambient={false}
    flare
  >
    <div className="match-card-header">
      <time className="eyebrow" dateTime={match.date}>{date.format(new Date(`${match.date}T00:00:00Z`))}</time>
      <span className="eyebrow accent">{t.experience.types[match.matchType]}</span>
    </div>
    <div className="match-meta">
      <span className={`match-role match-role-${match.role}`}>{t.experience.roles[match.role]}</span>
      <span className="match-category">{t.experience.ages[match.ageCategory]}</span>
    </div>
    <h3 className={`match-fixture ${match.status === 'played' ? 'match-score' : ''}`}>
      {match.status === 'played' && <span className="sr-only">{t.experience.result}</span>}
      <span className="match-team">
        <TeamBadge team={match.homeTeam}/>
        <bdi title={match.homeTeam}>{getTeamIdentity(match.homeTeam)?.name ?? match.homeTeam}</bdi>
        {match.status === 'played' && <span className="team-score">{number.format(match.score[0])}</span>}
      </span>
      <span className="sr-only">{t.experience.versus}</span>
      <span className="match-team">
        <TeamBadge team={match.awayTeam}/>
        <bdi title={match.awayTeam}>{getTeamIdentity(match.awayTeam)?.name ?? match.awayTeam}</bdi>
        {match.status === 'played' && <span className="team-score">{number.format(match.score[1])}</span>}
      </span>
    </h3>
    {match.status === 'opponentAbsent' && <p className="match-absence-badge">{t.experience.absent}</p>}
    <details className="match-details">
      <summary>{t.experience.details}<ChevronDown size={13} aria-hidden="true"/></summary>
      <div className="match-detail-body">
        <dl className="match-detail-meta"><div><dt>{t.experience.venue}</dt><dd><bdi>{match.location}</bdi></dd></div></dl>
        {match.status === 'opponentAbsent' ? <p className="match-absence body-copy">{t.experience.absentNote}</p> : match.role === 'referee' && <dl className="match-decisions">
          <div><dt><span className="card-symbol card-yellow" aria-hidden="true"/>{t.experience.yellow}</dt><dd>{number.format(match.yellowCards)}</dd></div>
          <div><dt><span className="card-symbol card-red" aria-hidden="true"/>{t.experience.red}</dt><dd>{number.format(match.redCards)}</dd></div>
          {match.penalties !== undefined && <div><dt>{t.experience.penalties}</dt><dd>{number.format(match.penalties)}</dd></div>}
        </dl>}
      </div>
    </details>
  </SpotlightCard></SectionReveal>
}
