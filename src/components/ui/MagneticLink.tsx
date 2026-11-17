import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import type { ReactNode } from 'react'

export function MagneticLink({ href, children, external = false, className = '' }: { href: string; children: ReactNode; external?: boolean; className?: string }) {
  const reduced = useReducedMotion()
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 230, damping: 20 }), sy = useSpring(y, { stiffness: 230, damping: 20 })
  return <motion.a className={className} href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} style={{ x: sx, y: sy }} onPointerMove={event => {
    if (reduced || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - rect.left - rect.width / 2) * .08)
    y.set((event.clientY - rect.top - rect.height / 2) * .08)
  }} onPointerLeave={() => { x.set(0); y.set(0) }}>{children}</motion.a>
}
