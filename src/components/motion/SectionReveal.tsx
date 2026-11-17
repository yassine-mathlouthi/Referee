import { useEffect, useRef, type ReactNode } from 'react'

export function SectionReveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let disposed = false
    let cleanup: (() => void) | undefined
    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (disposed || !root.current) return
      gsap.registerPlugin(ScrollTrigger)
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const element = root.current!
        // Never hide content already visible or reached through an anchor.
        if (element.getBoundingClientRect().top < window.innerHeight * .95) return
        gsap.fromTo(element, { autoAlpha: 0, y: 48, rotateX: 3, transformPerspective: 1000 }, {
          autoAlpha: 1, y: 0, rotateX: 0, duration: 1.15, ease: 'power3.out', clearProps: 'all',
          scrollTrigger: { trigger: element, start: 'top 96%', once: true },
        })
      })
      cleanup = () => media.revert()
    }).catch(() => { /* Content remains readable if optional animation fails to load. */ })
    return () => { disposed = true; cleanup?.() }
  }, [])
  return <div ref={root} className={className}>{children}</div>
}
