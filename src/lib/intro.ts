import { readStorage } from './storage'

export function shouldPlayIntro() {
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    && !readStorage('ym-intro', true)
    && !location.hash
}
