export interface TeamIdentity {
  id: string
  name: string
  initials: string
  city?: string
  matchNames: string[]
  logo: string
  source: string
}

// Exact aliases only: ASM alone is ambiguous (Mégrine / La Marsa).
// These are opponent identities, not partners or endorsements.
export const teams: TeamIdentity[] = [
  { id: 'est', name: 'Espérance Sportive de Tunis', initials: 'EST', matchNames: ['EST (Espérance)'], logo: '/team-logos/est.webp', source: 'https://en.wikipedia.org/wiki/File:Esp%C3%A9rance_Sportive_de_Tunis_logo.png' },
  { id: 'stade-tunisien', name: 'Stade Tunisien', initials: 'ST', matchNames: ['Stade Tunisien', 'ST (Stade Tunisien)'], logo: '/team-logos/stade-tunisien.webp', source: 'https://en.wikipedia.org/wiki/File:Enstadetunisien.png' },
  { id: 'omrane', name: 'Jeunesse Sportive d’El Omrane', initials: 'JSO', matchNames: ['JSO (Omrane)'], logo: '/team-logos/omrane.webp', source: 'https://en.wikipedia.org/wiki/File:JSO_Logo.png' },
  { id: 'megrine', name: 'Association Mégrine Sport', initials: 'AMS', matchNames: ['AMS (Mégrine)', 'Mégrine (ASM)'], logo: '/team-logos/megrine.webp', source: 'https://fr.wikipedia.org/wiki/Fichier:Association_M%C3%A9grine_Sport1.png' },
  { id: 'ariana', name: 'Association Sportive de l’Ariana', initials: 'ASA', matchNames: ['Ariana (ASA)'], logo: '/team-logos/ariana.webp', source: 'https://fr.wikipedia.org/wiki/Fichier:Association_sportive_de_l%27Ariana.png' },
  { id: 'hammam-lif', name: 'Club Sportif de Hammam Lif', initials: 'CSHL', matchNames: ['CSHL (Hammam Lif)'], logo: '/team-logos/hammam-lif.webp', source: 'https://football-logos.cc/tunisia/cs-hammam-lif/' },
  { id: 'soliman', name: 'Avenir Sportif de Soliman', initials: 'ASS', matchNames: ['Soliman'], logo: '/team-logos/soliman.webp', source: 'https://football-logos.cc/tunisia/as-soliman/' },
  { id: 'marsa', name: 'Avenir Sportif de La Marsa', initials: 'ASM', matchNames: ['Marsa'], logo: '/team-logos/marsa.webp', source: 'https://football-logos.cc/tunisia/avenir-de-la-marsa/' },
  { id: 'ben-arous', name: 'Sporting Club de Ben Arous', initials: 'SCBA', matchNames: ['SCBA (Ben Arous)'], logo: '/team-logos/ben-arous.webp', source: 'https://fr.wikipedia.org/wiki/Fichier:SCBA_logo.png' },
  { id: 'oued-ellil', name: 'Avenir Sportif d’Oued Ellil', initials: 'ASOE', matchNames: ['Oued Ellil'], logo: '/team-logos/oued-ellil.webp', source: 'https://fr.wikipedia.org/wiki/Fichier:AS-Oued-Ellil.png' },
  { id: 'sidi-thabet', name: 'Club Sportif Sidi Thabet', initials: 'CSST', matchNames: ['Sidi Thabet'], logo: '/team-logos/sidi-thabet.webp', source: 'https://www.transfermarkt.com/club-sportif-sidi-thabet/startseite/verein/113638' },
  { id: 'khadhra', name: 'El Khadhra Sport', initials: 'KS', matchNames: ['Khadhra Sport'], logo: '/team-logos/khadhra.webp', source: 'https://www.transfermarkt.com/el-khadhra-sport/startseite/verein/97654' },
  { id: 'kalaa-sport', name: 'Kalâa Sport', initials: 'KS', city: 'Kalâa Seghira', matchNames: ['Kalâa Sport (KS)'], logo: '/team-logos/kalaa-sport.webp', source: 'https://fr.wikipedia.org/wiki/Fichier:Kal%C3%A2a_Sport.png' },
  { id: 'carthage', name: 'Union Sportive de Carthage', initials: 'USC', city: 'Carthage', matchNames: ['Union Sportive de Carthage (USC)', 'Carthage', 'Union Carthage'], logo: '/team-logos/carthage.webp', source: 'https://footlink.tn/clubs/cmgyruu6' },
]

export function getTeamIdentity(matchName: string) {
  return teams.find(team => team.matchNames.includes(matchName))
}

export function getTeamInitials(matchName: string) {
  const known = getTeamIdentity(matchName)
  if (known) return known.initials
  const abbreviation = matchName.match(/\(([A-Z]{2,5})\)/)?.[1] || matchName.match(/^([A-Z]{2,5})\b/)?.[1]
  return abbreviation || matchName.split(/\s+/).map(word => word[0]).join('').slice(0, 3).toUpperCase()
}
