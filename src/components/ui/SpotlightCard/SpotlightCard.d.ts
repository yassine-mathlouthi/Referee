import type { HTMLAttributes, ReactElement } from 'react'

export interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  spotlightColor?: string
  intensity?: number
  spotlightSize?: number
  softness?: number
  shape?: 'circle' | 'beam'
  borderGlow?: number
  proximity?: number
  smoothing?: number
  ambient?: boolean
  flare?: boolean
  grain?: number
  theme?: 'dark' | 'light'
}
export default function SpotlightCard(props: SpotlightCardProps): ReactElement
