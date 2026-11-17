import { useEffect, useRef } from 'react'

/** Decorative motion only: native scrolling and every interaction stay intact. */
export function CinematicMotion() {
  const progress = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let disposed = false
    let cleanup: (() => void) | undefined
    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (disposed) return
      gsap.registerPlugin(ScrollTrigger)
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(progress.current, { scaleX: 0 }, {
          scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .25 },
        })
        gsap.utils.toArray<HTMLElement>('.gallery-frame').forEach(frame => {
          const image = frame.querySelector('img')
          if (!image) return
          gsap.fromTo(image, { yPercent: -4, scale: 1.12 }, {
            yPercent: 4, scale: 1.12, ease: 'none',
            scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: .8 },
          })
        })
      })
      const listeners: (() => void)[] = []
      media.add('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)', () => {
        document.querySelectorAll<HTMLElement>('.gallery-frame').forEach(frame => {
          const x = gsap.quickTo(frame, 'rotationY', { duration: .65, ease: 'power3.out' })
          const y = gsap.quickTo(frame, 'rotationX', { duration: .65, ease: 'power3.out' })
          gsap.set(frame, { transformPerspective: 1100 })
          const move = (event: PointerEvent) => {
            const rect = frame.getBoundingClientRect()
            x(((event.clientX - rect.left) / rect.width - .5) * 5)
            y(-((event.clientY - rect.top) / rect.height - .5) * 5)
          }
          const leave = () => { x(0); y(0) }
          frame.addEventListener('pointermove', move)
          frame.addEventListener('pointerleave', leave)
          listeners.push(() => {
            frame.removeEventListener('pointermove', move)
            frame.removeEventListener('pointerleave', leave)
          })
        })
        return () => { listeners.splice(0).forEach(remove => remove()) }
      })
      cleanup = () => media.revert()
    }).catch(() => { /* Decorative effects must never block the portfolio. */ })
    return () => { disposed = true; cleanup?.() }
  }, [])
  return <div ref={progress} className="cinematic-progress" aria-hidden="true" />
}
