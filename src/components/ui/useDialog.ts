import { useEffect, useRef } from 'react'

// Native modal dialogs provide focus containment, Escape, and background inertness.
export function useDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current
    if (!dialog || !open) return
    const previous = document.activeElement as HTMLElement | null
    dialog.showModal()
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = overflow
      previous?.focus({ preventScroll: true })
    }
  }, [open])
  return { ref, onCancel: (event: React.SyntheticEvent) => { event.preventDefault(); onClose() } }
}
