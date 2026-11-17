import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useLanguage } from '../../i18n/context'
import { readStorage, writeStorage } from '../../lib/storage'
import { Monogram } from '../ui/Monogram'

export function IntroSequence() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches && !readStorage('ym-intro', true) && !location.hash)
  const dismiss = () => { writeStorage('ym-intro', 'seen', true); setVisible(false) }
  useEffect(() => {
    if (!visible) return
    const timer = window.setTimeout(() => { writeStorage('ym-intro', 'seen', true); setVisible(false) }, 2100)
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => { if (media.matches) setVisible(false) }
    media.addEventListener('change', onChange)
    return () => { clearTimeout(timer); media.removeEventListener('change', onChange) }
  }, [visible])
  return <AnimatePresence>{visible && <motion.div className="intro" aria-label={t.art} initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .3 }}>
    <button className="intro-skip eyebrow" onClick={dismiss}>{t.skipIntro} ↗</button>
    <motion.div className="intro-line" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: .65 }} />
    <motion.div className="intro-mark" initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .2, duration: .5 }}><Monogram /></motion.div>
    <div className="intro-words">{t.intro.map((word, i) => <motion.span key={word} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35 + i * .25 }}>{word}</motion.span>)}</div>
    <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>{t.name}</motion.p>
  </motion.div>}</AnimatePresence>
}
