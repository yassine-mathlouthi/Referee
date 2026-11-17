import { motion, useReducedMotion } from 'motion/react'

export function TextReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const reduced = useReducedMotion()
  return <span className="text-clip"><motion.span className="text-reveal" initial={reduced ? false : { y: '105%' }} animate={{ y: 0 }} transition={{ duration: .9, delay, ease: [.22, 1, .36, 1] }}>{text}</motion.span></span>
}
