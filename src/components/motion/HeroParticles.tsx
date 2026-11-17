import { lazy, Suspense, useSyncExternalStore } from 'react'

const Antigravity = lazy(() => import('../ui/Antigravity/Antigravity'))
const compactQuery = '(max-width: 767px), (pointer: coarse)'
const subscribe = (notify: () => void) => {
  const query = window.matchMedia(compactQuery)
  query.addEventListener('change', notify)
  return () => query.removeEventListener('change', notify)
}
const getSnapshot = () => window.matchMedia(compactQuery).matches

export function HeroParticles() {
  const compact = useSyncExternalStore(subscribe, getSnapshot, () => true)
  return <div className="campaign-particles" aria-hidden="true"><Suspense fallback={null}>
    <Antigravity
      colors={['#c7ff36', '#dcff87', '#6b9939']}
      count={compact ? 450 : 1100}
      magnetRadius={9}
      ringRadius={6}
      particleSize={compact ? 0.5 : 0.65}
      waveAmplitude={0.6}
      waveSpeed={0.25}
      colorSpeed={0.025}
      ambient={0.18}
      opacity={0.45}
      maxDevicePixelRatio={compact ? 1 : 1.5}
      interactive={!compact}
      clickBurst={false}
      autoAnimate
      intro
    />
  </Suspense></div>
}
