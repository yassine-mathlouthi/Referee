import { ArrowDown, ArrowUpRight, MoveUpRight } from 'lucide-react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useLanguage } from '../i18n/context'
import { profile } from '../data/profile'
import { PitchArt } from '../components/ui/PitchArt'
import { TextReveal } from '../components/motion/TextReveal'

export function Hero() {
  const { t } = useLanguage()
  const reduced = useReducedMotion()
  const x = useMotionValue(0), y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 65, damping: 25 })
  const springY = useSpring(y, { stiffness: 65, damping: 25 })
  return <section id="top" className="hero" onPointerMove={event => {
    if (reduced || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - rect.left - rect.width / 2) * .016)
    y.set((event.clientY - rect.top - rect.height / 2) * .016)
  }} onPointerLeave={() => { x.set(0); y.set(0) }}>
    <motion.div className="hero-art" style={{ x: springX, y: springY }}>
      {profile.heroImage ? <img className="hero-photo" src={profile.heroImage} style={{ objectPosition: profile.heroPosition }} alt="" /> : <PitchArt />}
      {profile.heroCutout && <img className="hero-cutout" src={profile.heroCutout} alt="" />}
      <div className="hero-art-shade" />
      <span className="hero-art-index eyebrow">YM / 01</span>
      <div className="hero-art-caption"><MoveUpRight size={36} strokeWidth={1}/><p>{t.hero.pitch}</p></div>
      <span className="hero-coordinates eyebrow">{t.hero.coordinates}</span>
    </motion.div>
    <div className="container hero-content">
      <div className="hero-overline eyebrow"><span className="status-dot" />{t.hero.label}</div>
      <h1 className="hero-title">
        <TextReveal text={t.hero.first} delay={.12} />
        <TextReveal text={t.hero.second} delay={.22} />
        <span className="hero-title-outline"><TextReveal text={t.hero.third} delay={.32} /><TextReveal text={t.hero.fourth} delay={.42} /></span>
      </h1>
      <div className="hero-bottom-copy">
        <p className="body-copy">{t.hero.body}</p>
        <div className="hero-actions"><a className="button button-primary" href="#about">{t.hero.explore}<ArrowUpRight /></a><a className="hero-contact" href="#contact">{t.hero.contact}<ArrowUpRight size={16}/></a></div>
      </div>
    </div>
    <div className="hero-rail container">
      <div className="hero-identity"><strong>{t.name}</strong><span>{t.profession} <span className="rail-slash">/</span> {t.hero.based}</span></div>
      <a className="hero-scroll eyebrow" href="#about">{t.hero.scroll}<ArrowDown size={16}/></a>
      <span className="hero-availability eyebrow"><span className="status-dot"/>{t.hero.available}</span>
    </div>
  </section>
}
