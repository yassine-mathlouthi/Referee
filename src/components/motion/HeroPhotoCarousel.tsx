import { lazy, Suspense } from 'react'
import { useReducedMotion } from 'motion/react'
import { useLanguage } from '../../i18n/context'
import { gallery } from '../../data/gallery'

const FlexCarousel = lazy(() => import('../ui/FlexCarousel/FlexCarousel'))
const photoIds = ['assistant-in-motion', 'match-signal', 'player-dialogue', 'pre-match-briefing']

export function HeroPhotoCarousel({ ready }: { ready: boolean }) {
  const { t, language } = useLanguage()
  const reduced = useReducedMotion()
  const items = photoIds.map(id => {
    const frame = gallery.find(photo => photo.id === id)!
    return {
      src: `/images/${id}-640.webp`,
      alt: t.gallery.descriptions[frame.copyIndex],
      title: t.gallery.titles[frame.copyIndex],
      subtitle: t.profession,
    }
  })
  const fallback = <div className="hero-photo-strip" tabIndex={0} role="region" aria-label={t.hero.carouselLabel}>
    {items.map((item, index) => <figure key={item.src}>
      <img src={item.src} alt={item.alt} width={640} height={900} loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'auto'}/>
      <figcaption>{item.title}</figcaption>
    </figure>)}
  </div>
  return <>
    <div className="campaign-carousel">
      {ready && reduced === false ? <Suspense fallback={fallback}>
        <FlexCarousel
          key={language}
          items={items}
          ariaLabel={t.hero.carouselLabel}
          preset="liquid"
          intro="rise"
          cardHeight={0.58}
          gap={12}
          radius={14}
          fit="natural"
          bend={0.22}
          dispersion={0.15}
          squeeze={0.12}
          focusOnClick
          captions
          captureWheel={false}
          autoplay={false}
        />
      </Suspense> : fallback}
    </div>
    <p className="campaign-carousel-hint eyebrow">{t.hero.carouselHint}</p>
  </>
}
