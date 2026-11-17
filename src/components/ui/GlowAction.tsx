import type { ReactNode } from 'react'
import BorderGlow from './BorderGlow/BorderGlow'

/** Decoration around a real link, never an extra interactive element. */
export function GlowAction({ children }: { children: ReactNode }) {
  return <BorderGlow
    className="button-glow"
    glowColor="77 100 70"
    colors={['#c7ff36', '#dcff87', '#8cce26']}
    backgroundColor="#c7ff36"
    borderRadius={8}
    glowRadius={16}
    glowIntensity={0.8}
    coneSpread={25}
    fillOpacity={0.12}
    animated={false}
  >{children}</BorderGlow>
}
