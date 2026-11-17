export type MatchRole = 'referee' | 'assistant'
export type MatchType = 'regional' | 'friendly' | 'leagueA' | 'leagueB'
export type AgeCategory = 'school' | 'minime' | 'minimeA' | 'minimeB' | 'cadetA' | 'cadetB' | 'junior' | 'juniorU19'

interface Appointment {
  id: string
  date: string
  matchType: MatchType
  homeTeam: string
  awayTeam: string
  ageCategory: AgeCategory
  role: MatchRole
  location: string
  yellowCards: number
  redCards: number
  penalties?: number
}

export type Match = Appointment & (
  | { status: 'played'; score: readonly [number, number] }
  | { status: 'opponentAbsent'; score?: never }
)

// Supplied by Yassine from his 2026 match log. Dates use ISO format.
// Match type labels are not inferred competition titles. Payment information
// is deliberately not stored in this public, client-delivered dataset.
// No photographs are assigned to appointments without a confirmed association.
export const matches: Match[] = [
  { id: '2026-04-19-borj-school', date: '2026-04-19', location: 'Borj el Amri', ageCategory: 'school', homeTeam: 'Borj el Amri', awayTeam: 'Oued Ellil', score: [0, 0], role: 'assistant', matchType: 'regional', status: 'played', yellowCards: 0, redCards: 0 },
  { id: '2026-05-01-carthage-minime', date: '2026-05-01', location: 'Carthage', ageCategory: 'minime', homeTeam: 'Union Sportive de Carthage (USC)', awayTeam: 'Wardia', score: [2, 1], role: 'assistant', matchType: 'regional', status: 'played', yellowCards: 0, redCards: 0 },
  { id: '2026-05-03-sidi-thabet-junior', date: '2026-05-03', location: 'Sidi Thabet', ageCategory: 'junior', homeTeam: 'Sidi Thabet', awayTeam: 'Dawar Hicher', score: [1, 0], role: 'assistant', matchType: 'regional', status: 'played', yellowCards: 0, redCards: 0 },
  { id: '2026-05-03-sidi-thabet-minime', date: '2026-05-03', location: 'Sidi Thabet', ageCategory: 'minime', homeTeam: 'Sidi Thabet', awayTeam: 'Dawar Hicher', score: [3, 0], role: 'referee', matchType: 'regional', status: 'played', yellowCards: 2, redCards: 0 },
  { id: '2026-05-17-khadhra-minime', date: '2026-05-17', location: 'Cité El Khadhra', ageCategory: 'minime', homeTeam: 'Khadhra Sport', awayTeam: 'Union Sportive de Carthage (USC)', role: 'assistant', matchType: 'regional', status: 'opponentAbsent', yellowCards: 0, redCards: 0 },
  { id: '2026-07-01-bardo-minime', date: '2026-07-01', location: 'Bardo', ageCategory: 'minime', homeTeam: 'Stade Tunisien', awayTeam: 'Fouchana Sport', score: [8, 0], role: 'assistant', matchType: 'friendly', status: 'played', yellowCards: 0, redCards: 0 },
  { id: '2026-08-22-parc-b-cadet-a', date: '2026-08-22', location: 'Parc B', ageCategory: 'cadetA', homeTeam: 'EST (Espérance)', awayTeam: 'JSO (Omrane)', score: [7, 0], role: 'assistant', matchType: 'friendly', status: 'played', yellowCards: 0, redCards: 0 },
  { id: '2026-09-27-ariana-minime-b', date: '2026-09-27', location: 'Ariana', ageCategory: 'minimeB', homeTeam: 'Ariana (ASA)', awayTeam: 'Mégrine (ASM)', score: [3, 1], role: 'assistant', matchType: 'leagueB', status: 'played', yellowCards: 0, redCards: 0 },
  { id: '2026-10-03-soliman-cadet-b', date: '2026-10-03', location: 'Soliman', ageCategory: 'cadetB', homeTeam: 'Soliman', awayTeam: 'Kalâa Sport (KS)', score: [0, 1], role: 'referee', matchType: 'leagueB', status: 'played', yellowCards: 4, redCards: 0 },
  { id: '2026-10-27-megrine-minime-b', date: '2026-10-27', location: 'Mégrine', ageCategory: 'minimeB', homeTeam: 'AMS (Mégrine)', awayTeam: 'Kalâa Sport (KS)', score: [5, 1], role: 'assistant', matchType: 'leagueB', status: 'played', yellowCards: 0, redCards: 0 },
  { id: '2026-10-27-megrine-minime-a', date: '2026-10-27', location: 'Mégrine', ageCategory: 'minimeA', homeTeam: 'AMS (Mégrine)', awayTeam: 'Kalâa Sport (KS)', score: [6, 0], role: 'referee', matchType: 'leagueB', status: 'played', yellowCards: 1, redCards: 0 },
  { id: '2026-10-31-omrane-minime-b', date: '2026-10-31', location: 'Omrane', ageCategory: 'minimeB', homeTeam: 'JSO (Omrane)', awayTeam: 'Marsa', score: [3, 2], role: 'assistant', matchType: 'leagueA', status: 'played', yellowCards: 0, redCards: 0 },
  { id: '2026-10-31-parc-b-minime-a', date: '2026-10-31', location: 'Parc B', ageCategory: 'minimeA', homeTeam: 'EST (Espérance)', awayTeam: 'ST (Stade Tunisien)', score: [1, 1], role: 'referee', matchType: 'leagueA', status: 'played', yellowCards: 1, redCards: 1 },
  { id: '2026-11-08-megrine-junior', date: '2026-11-08', location: 'Mégrine', ageCategory: 'juniorU19', homeTeam: 'AMS (Mégrine)', awayTeam: 'SCBA (Ben Arous)', score: [1, 1], role: 'referee', matchType: 'leagueB', status: 'played', yellowCards: 6, redCards: 0, penalties: 1 },
  { id: '2026-11-15-omrane-junior', date: '2026-11-15', location: 'Omrane', ageCategory: 'juniorU19', homeTeam: 'JSO (Omrane)', awayTeam: 'CSHL (Hammam Lif)', score: [1, 0], role: 'assistant', matchType: 'leagueA', status: 'played', yellowCards: 0, redCards: 0 },
  { id: '2026-11-15-omrane-cadet-a', date: '2026-11-15', location: 'Omrane', ageCategory: 'cadetA', homeTeam: 'JSO (Omrane)', awayTeam: 'CSHL (Hammam Lif)', score: [2, 2], role: 'assistant', matchType: 'leagueA', status: 'played', yellowCards: 0, redCards: 0 },
]

export function summarizeMatches(records: readonly Match[]) {
  const played = records.filter(match => match.status === 'played')
  return {
    played: played.length,
    referee: played.filter(match => match.role === 'referee').length,
    assistant: played.filter(match => match.role === 'assistant').length,
  }
}
