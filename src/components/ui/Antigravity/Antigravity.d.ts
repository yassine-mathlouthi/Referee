import type { CSSProperties, ReactElement } from 'react'

export interface AntigravityProps {
  colors?: string[]
  color?: string
  colorMode?: 'conic' | 'radial' | 'random'
  colorSpeed?: number
  particleShape?: 'capsule' | 'sphere' | 'box' | 'tetrahedron'
  count?: number
  particleSize?: number
  particleVariance?: number
  magnetRadius?: number
  ringRadius?: number
  fieldStrength?: number
  waveAmplitude?: number
  waveCount?: number
  waveSpeed?: number
  rotationSpeed?: number
  pulseSpeed?: number
  depthFactor?: number
  ambient?: number
  lerpSpeed?: number
  autoAnimate?: boolean
  interactive?: boolean
  clickBurst?: boolean
  intro?: boolean
  lightMode?: boolean
  opacity?: number
  maxDevicePixelRatio?: number
  className?: string
  style?: CSSProperties
}
export default function Antigravity(props: AntigravityProps): ReactElement
