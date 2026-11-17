export interface Match {
  id: string
  date: string
  competition: string
  homeTeam?: string
  awayTeam?: string
  ageCategory?: string
  role: string
  location?: string
  description?: string
  image?: string
  featured?: boolean
}

// Add only confirmed appointments. No demonstration records are published.
export const matches: Match[] = []
