import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../i18n/context'
import { SectionReveal } from '../components/motion/SectionReveal'

gsap.registerPlugin(ScrollTrigger)

export function Philosophy() {
  const { t } = useLanguage()
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
      const context = gsap.context(() => {
        gsap.fromTo('.principle-progress', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 65%', end: 'bottom 65%', scrub: .5 } })
        gsap.utils.toArray<HTMLElement>('.principle-name').forEach(element => {
          gsap.fromTo(element, { x: -18, opacity: .35 }, { x: 0, opacity: 1, scrollTrigger: { trigger: element, start: 'top 90%', end: 'top 50%', scrub: .5 } })
        })
      }, root)
      return () => context.revert()
    })
    return () => media.revert()
  }, [])
  return <section id="philosophy" className="section philosophy" ref={root} aria-labelledby="philosophy-title">
    <div className="container">
      <SectionReveal><p className="eyebrow section-label">{t.philosophy.label}</p><div className="philosophy-heading"><h2 id="philosophy-title" className="section-heading">{t.philosophy.title}<br/><span className="muted">{t.philosophy.accent}</span></h2><div className="principle-symbol" aria-hidden="true"><span/><span/></div></div></SectionReveal>
      <div className="principles">{t.philosophy.values.map((value, i) => <article className="principle" key={value.name}>
        <span className="eyebrow principle-number">0{i + 1}</span><h3 className="principle-name">{value.name}</h3><div className="principle-detail"><p>{value.line}</p><p className="body-copy">{value.detail}</p></div><ArrowUpRight className="principle-arrow" size={26} strokeWidth={1}/>
      </article>)}</div>
      <div className="principle-track" aria-hidden="true"><div className="principle-progress"/></div>
    </div>
  </section>
}
