import { ArrowDown, ArrowUpRight, Crosshair } from 'lucide-react'
import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useLanguage } from '../i18n/context'
import { profile } from '../data/profile'
import { PitchArt } from '../components/ui/PitchArt'
import { GlowAction } from '../components/ui/GlowAction'
import { TextReveal } from '../components/motion/TextReveal'
import '../styles/hero.css'

export function Hero({ ready = true }: { ready?: boolean }) {
  const { t } = useLanguage()
  const reduced = useReducedMotion()
  const root = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end start'] })
  const mediaY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 28])
  const visible = ready || reduced
  const entrance = (delay: number) => ({
    initial: reduced ? false as const : { opacity: 0, y: 16 },
    animate: { opacity: visible ? 1 : 0, y: visible ? 0 : 16 },
    transition: { duration: .8, delay: reduced ? 0 : delay, ease: [.22, 1, .36, 1] as const },
  })

  return <section id="top" className="campaign-hero" ref={root} aria-labelledby="hero-title">
    <div className="campaign-atmosphere" aria-hidden="true" />
    <div className="container campaign-layout">
      <div className="campaign-copy">
        <motion.div className="campaign-edition eyebrow" {...entrance(.05)}>
          <span className="campaign-rule" aria-hidden="true" />{t.hero.label}
        </motion.div>
        <motion.div className="hero-headline-identity campaign-identity" {...entrance(.12)}>
          <strong>{t.name}</strong>
          <div><span>{t.profession}</span><span className="campaign-identity-divider" aria-hidden="true" /><span>{t.hero.based}</span></div>
        </motion.div>
        <h1 className="campaign-title" id="hero-title">
          <span className="campaign-title-prologue"><TextReveal text={`${t.hero.first} ${t.hero.second}`} delay={.2} ready={ready}/></span>{' '}
          <span className="campaign-title-main"><TextReveal text={t.hero.third} delay={.3} ready={ready}/></span>{' '}
          <span className="campaign-title-finale"><TextReveal text={t.hero.fourth} delay={.4} ready={ready}/></span>
        </h1>
        <motion.div className="campaign-description" {...entrance(.55)}>
          <p>{t.hero.body}</p>
          <div className="hero-actions campaign-actions">
            <GlowAction><a className="button button-primary campaign-book" href="#contact"><span>{t.hero.contact}</span><span className="campaign-button-icon"><ArrowUpRight aria-hidden="true"/></span></a></GlowAction>
            <a className="campaign-experience" href="#experience">{t.hero.explore}<ArrowUpRight size={17} aria-hidden="true"/></a>
          </div>
        </motion.div>
      </div>
      <motion.div className="campaign-visual" {...entrance(.18)}>
        <div className="campaign-media-label eyebrow"><Crosshair size={14} aria-hidden="true"/><span>{t.art}</span><span>YM / 01</span></div>
        <div className="campaign-media">
          <motion.div className="campaign-image-layer" style={{ y: mediaY }}>
            {profile.heroImage
              ? <img className="hero-photo" src={profile.heroImage} srcSet={profile.heroSrcSet} sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 999px) 70vw, 48vw" width={941} height={1372} fetchPriority="high" alt={t.hero.photoAlt}/>
              : <PitchArt/>}
          </motion.div>
          <div className="campaign-media-shade" aria-hidden="true"/>
          <div className="campaign-pitch-mark" aria-hidden="true"><span/></div>
          <div className="campaign-photo-caption"><span className="eyebrow">{t.profession}</span><span className="campaign-monogram" aria-hidden="true">YM<span>01</span></span></div>
        </div>
        <div className="campaign-media-footer eyebrow"><span>{t.country}</span><bdi>{t.hero.coordinates}</bdi></div>
      </motion.div>
    </div>
    <motion.div className="container campaign-footer" {...entrance(.65)}>
      <div className="campaign-availability"><span className="status-dot"/><span>{t.hero.available}</span></div>
      <span className="campaign-footer-line" aria-hidden="true"/>
      <a className="campaign-scroll" href="#about"><span>{t.hero.scroll}</span><span className="campaign-scroll-icon"><ArrowDown size={15} aria-hidden="true"/></span></a>
    </motion.div>
  </section>
}
