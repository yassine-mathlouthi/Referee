import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react'
import { useLanguage } from '../i18n/context'
import { gallery, type GalleryFrame } from '../data/gallery'
import { PitchArt } from '../components/ui/PitchArt'
import { SectionReveal } from '../components/motion/SectionReveal'
import { useDialog } from '../components/ui/useDialog'

function Frame({ frame, full = false }: { frame: GalleryFrame; full?: boolean }) {
  const { t, language } = useLanguage()
  return frame.src
    ? <img src={frame.src} srcSet={frame.srcSet} sizes={full ? '95vw' : '(max-width: 767px) 100vw, 60vw'} alt={frame.alt?.[language] || t.gallery.descriptions[frame.copyIndex]} loading={full ? 'eager' : 'lazy'} decoding="async" style={{ objectPosition: frame.position || 'center' }}/>
    : <PitchArt variant={frame.variant}/>
}

export function Gallery() {
  const { t, language } = useLanguage()
  const [selected, setSelected] = useState<number | null>(null)
  const { ref, onCancel } = useDialog(selected !== null, () => setSelected(null))
  const touchX = useRef<number | null>(null)
  const current = gallery[selected ?? 0]
  const step = (delta: number) => setSelected(value => ((value ?? 0) + delta + gallery.length) % gallery.length)
  return <section id="gallery" className="section gallery-section" aria-labelledby="gallery-title">
    <div className="container">
      <SectionReveal><p className="eyebrow section-label">{t.gallery.label}</p><div className="section-intro"><h2 id="gallery-title" className="section-heading">{t.gallery.title}<br/><span className="muted">{t.gallery.accent}</span></h2><p className="body-copy">{t.gallery.intro}</p></div></SectionReveal>
      <div className="gallery-grid">{gallery.map((frame, i) => <SectionReveal className={`gallery-item gallery-item-${i}`} key={frame.id}>
        <button className="gallery-frame" onClick={() => setSelected(i)} aria-label={`${t.gallery.open}: ${t.gallery.titles[frame.copyIndex]}`}>
          <Frame frame={frame}/><span className="gallery-frame-number eyebrow">0{i + 1} / YM</span><span className="gallery-frame-arrow"><ArrowUpRight size={23}/></span>
        </button>
        <div className="gallery-caption"><h3>{t.gallery.titles[frame.copyIndex]}</h3>{!frame.src && <p className="eyebrow">{t.gallery.concept}</p>}</div>
      </SectionReveal>)}</div>
    </div>
    <dialog className="lightbox" ref={ref} onCancel={onCancel} aria-labelledby="lightbox-title" onClick={event => { if (event.target === event.currentTarget) setSelected(null) }} onKeyDown={event => {
      if (event.key === 'ArrowRight') { event.preventDefault(); step(language === 'ar' ? -1 : 1) }
      if (event.key === 'ArrowLeft') { event.preventDefault(); step(language === 'ar' ? 1 : -1) }
    }}>
      {current && <div className="lightbox-inner">
        <div className="lightbox-top"><p className="eyebrow" aria-live="polite">{(selected ?? 0) + 1} {t.gallery.counter} {gallery.length}</p><button className="icon-button" autoFocus aria-label={t.close} onClick={() => setSelected(null)}><X/></button></div>
        <div className="lightbox-image" key={current.id} onPointerDown={event => { if (event.pointerType === 'touch') touchX.current = event.clientX }} onPointerUp={event => {
          if (touchX.current !== null && Math.abs(event.clientX - touchX.current) > 50) step(event.clientX < touchX.current ? 1 : -1)
          touchX.current = null
        }}><Frame frame={current} full/></div>
        <div className="lightbox-bottom"><div aria-live="polite"><h3 id="lightbox-title">{t.gallery.titles[current.copyIndex]}</h3><p className="body-copy">{current.src ? current.alt?.[language] : t.gallery.descriptions[current.copyIndex]}</p></div><div className="lightbox-controls"><button className="icon-button" aria-label={t.gallery.previous} onClick={() => step(-1)}><ArrowLeft/></button><button className="icon-button" aria-label={t.gallery.next} onClick={() => step(1)}><ArrowRight/></button></div></div>
      </div>}
    </dialog>
  </section>
}
