import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useLanguage } from '../i18n/context'
import { SectionReveal } from '../components/motion/SectionReveal'

export function Availability() {
  const { t } = useLanguage()
  const reduced = useReducedMotion()
  return <section id="availability" className="availability" aria-labelledby="availability-title">
    <div className="container availability-grid">
      <SectionReveal className="availability-copy"><p className="eyebrow section-label">{t.availability.label}</p><h2 id="availability-title" className="section-heading">{t.availability.title}<br/>{t.availability.accent}</h2><p className="availability-body">{t.availability.body}</p><a className="button button-dark" href="#contact">{t.availability.cta}<ArrowUpRight/></a><p className="availability-note">{t.availability.note}</p></SectionReveal>
      <div className="world-composition">
        <svg className="world-grid" viewBox="0 0 500 500" fill="none" aria-hidden="true">
          <g stroke="#080a0b" strokeOpacity=".22" strokeWidth=".8">
            <circle cx="250" cy="250" r="205"/><ellipse cx="250" cy="250" rx="135" ry="205"/><ellipse cx="250" cy="250" rx="55" ry="205"/>
            <ellipse cx="250" cy="250" rx="205" ry="75"/><ellipse cx="250" cy="250" rx="205" ry="145"/><path d="M45 250h410M250 45v410"/>
            <circle cx="250" cy="250" r="228" strokeDasharray="2 9"/>
          </g>
          <g stroke="#080a0b" strokeWidth="1" strokeDasharray="4 5">
            <motion.path d="M267 183Q350 85 402 120" initial={reduced ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, delay: .2 }}/>
            <motion.path d="M267 183Q170 55 104 154" initial={reduced ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, delay: .4 }}/>
            <motion.path d="M267 183Q410 260 346 371" initial={reduced ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, delay: .6 }}/>
          </g>
          <circle cx="267" cy="183" r="18" stroke="#080a0b" strokeOpacity=".3"/><circle cx="267" cy="183" r="6" fill="#080a0b"/>
          <g fill="#080a0b"><circle cx="402" cy="120" r="3"/><circle cx="104" cy="154" r="3"/><circle cx="346" cy="371" r="3"/></g>
        </svg>
        <p className="world-label eyebrow"><span/>{t.availability.origin}</p>
        <ul className="availability-audiences">{t.availability.audiences.map(audience => <li key={audience}>{audience}</li>)}</ul>
      </div>
    </div>
  </section>
}
