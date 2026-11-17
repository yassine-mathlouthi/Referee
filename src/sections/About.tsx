import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../i18n/context'
import { profile } from '../data/profile'
import { PitchArt } from '../components/ui/PitchArt'
import { SectionReveal } from '../components/motion/SectionReveal'

export function About() {
  const { t } = useLanguage()
  return <section id="about" className="section about container" aria-labelledby="about-title">
    <SectionReveal><p className="eyebrow section-label">{t.about.label}</p></SectionReveal>
    <div className="about-grid">
      <SectionReveal className="about-visual">
        <div className="about-image">{profile.aboutImage ? <img src={profile.aboutImage} srcSet={profile.aboutSrcSet} sizes="(max-width: 767px) calc(100vw - 40px), 40vw" width={946} height={1228} alt={t.about.photoAlt} loading="lazy" decoding="async" /> : <PitchArt variant={2}/>}<span className="about-image-number">01<span>/ YM</span></span><div className="about-image-corner"><ArrowUpRight size={28}/></div></div>
        <div className="about-caption"><span className="eyebrow">{t.about.frame}</span><span className="accent">↗</span></div>
      </SectionReveal>
      <SectionReveal className="about-copy">
        <h2 id="about-title" className="section-heading">{t.about.title}<br/><span className="muted">{t.about.accent}</span></h2>
        <p className="about-lead">{t.about.lead}</p>
        <p className="body-copy">{t.about.body}</p><p className="body-copy">{t.about.more}</p>
        <ul className="about-tags">{t.about.tags.map(tag => <li key={tag}><span className="status-dot"/>{tag}</li>)}</ul>
      </SectionReveal>
    </div>
  </section>
}
