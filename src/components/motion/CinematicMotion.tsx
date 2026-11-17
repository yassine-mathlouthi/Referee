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
        // A photographic curtain opens with the scroll, rather than a timed fade.
        gsap.fromTo('.about-image', { clipPath: 'inset(12% 18% 12% 18% round 80px)' }, {
          clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none',
          scrollTrigger: { trigger: '.about-image', start: 'top 92%', end: 'top 30%', scrub: .65 },
        })
        gsap.utils.toArray<HTMLElement>('.about-copy > p').forEach(element => {
          gsap.fromTo(element, { clipPath: 'inset(0% 0% 100% 0%)', y: 22 }, {
            clipPath: 'inset(0% 0% 0% 0%)', y: 0, ease: 'none',
            scrollTrigger: { trigger: element, start: 'top 96%', end: 'top 75%', scrub: .4 },
          })
        })
        gsap.utils.toArray<HTMLElement>('.gallery-item-wide').forEach(element => {
          gsap.fromTo(element, { clipPath: 'inset(10% 22% 10% 22% round 100px)' }, {
            clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none',
            scrollTrigger: { trigger: element, start: 'top 95%', end: 'top 25%', scrub: .8 },
          })
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
      media.add('(prefers-reduced-motion: no-preference) and (min-width: 1024px) and (min-height: 700px)', () => {
        const stack = document.querySelector<HTMLElement>('.principles')
        if (!stack) return
        const cards = gsap.utils.toArray<HTMLElement>('.principle', stack)
        // Activate sticky layout only after GSAP loads; reverting restores normal flow.
        stack.classList.add('principles-stacked')
        cards.forEach((card, index) => {
          gsap.set(card, { top: 110 + index * 18, zIndex: index + 1, transformOrigin: 'center top' })
          const next = cards[index + 1]
          if (!next) return
          gsap.to(card, {
            scale: .94, filter: 'brightness(0.65)', ease: 'none',
            scrollTrigger: { trigger: next, start: 'top 80%', end: `top ${128 + index * 18}px`, scrub: .5, invalidateOnRefresh: true },
          })
        })
        return () => stack.classList.remove('principles-stacked')
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
