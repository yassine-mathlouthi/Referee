import { useState } from 'react'
import { getTeamIdentity, getTeamInitials } from '../../data/teams'

export function TeamBadge({ team }: { team: string }) {
  const identity = getTeamIdentity(team)
  const [failed, setFailed] = useState(false)
  const showLogo = identity && !failed
  // The adjacent team name is the accessible label; the badge is decorative.
  return <span className={`team-badge ${showLogo ? '' : 'team-badge-fallback'}`} aria-hidden="true">
    {showLogo ? <img src={identity.logo} alt="" width={36} height={40} loading="lazy" decoding="async" onError={() => setFailed(true)}/> : <span>{getTeamInitials(team)}</span>}
  </span>
}
