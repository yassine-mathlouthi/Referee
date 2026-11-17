import { ArrowDown, ArrowUpRight, Crosshair, Pause, Play } from 'lucide-react'
import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { useLanguage } from '../i18n/context'
import { HeroPhotoCarousel } from '../components/motion/HeroPhotoCarousel'
import { GlowAction } from '../components/ui/GlowAction'
import { HeroParticles } from '../components/motion/HeroParticles'
import { TextReveal } from '../components/motion/TextReveal'
import '../styles/hero.css'

export function Hero({ ready = true }: { ready?: boolean }) {
  const { t } = useLanguage()
  const reduced = useReducedMotion()
  const [particlesPaused, setParticlesPaused] = useState(false)
  const visible = ready || reduced
  const entrance = (delay: number) => ({
    initial: reduced ? false as const : { opacity: 0, y: 16 },
    animate: { opacity: visible ? 1 : 0, y: visible ? 0 : 16 },
    transition: { duration: .8, delay: reduced ? 0 : delay, ease: [.22, 1, .36, 1] as const },
  })

  return <section id="top" className="campaign-hero" aria-labelledby="hero-title">
    <div className="campaign-atmosphere" aria-hidden="true" />
    {ready && reduced === false && !particlesPaused && <HeroParticles/>}
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
        <div className="campaign-media-label eyebrow"><Crosshair size={14} aria-hidden="true"/><span>{t.art}</span><span>YM / 01—04</span></div>
        <HeroPhotoCarousel ready={ready}/>
        <div className="campaign-media-footer eyebrow"><span>{t.country}</span><bdi>{t.hero.coordinates}</bdi></div>
      </motion.div>
    </div>
    <motion.div className="container campaign-footer" {...entrance(.65)}>
      <div className="campaign-availability"><span className="status-dot"/><span>{t.hero.available}</span></div>
      <span className="campaign-footer-line" aria-hidden="true"/>
      {ready && reduced === false && <button
        type="button"
        className="campaign-particle-toggle"
        onClick={() => setParticlesPaused(value => !value)}
        aria-label={particlesPaused ? t.hero.resumeBackground : t.hero.pauseBackground}
        title={particlesPaused ? t.hero.resumeBackground : t.hero.pauseBackground}
      >{particlesPaused ? <Play size={14} aria-hidden="true"/> : <Pause size={14} aria-hidden="true"/>}</button>}
      <a className="campaign-scroll" href="#about"><span>{t.hero.scroll}</span><span className="campaign-scroll-icon"><ArrowDown size={15} aria-hidden="true"/></span></a>
    </motion.div>
  </section>
}
