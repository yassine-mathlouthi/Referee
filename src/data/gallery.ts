export interface GalleryFrame {
  id: string
  variant: number
  copyIndex: number
  src?: string
  srcSet?: string
  // Supply a truthful description of each real photograph in all languages.
  alt?: { en: string; fr: string; ar: string }
  position?: string
  width?: number
  height?: number
  layout?: 'wide'
}

function photo(id: string, copyIndex: number, width: number, height: number, position = 'center 35%', layout?: 'wide'): GalleryFrame {
  return {
    id, variant: 0, copyIndex, width, height, position, layout,
    src: `/images/${id}-${width}.webp`,
    srcSet: `/images/${id}-640.webp 640w, /images/${id}-${width}.webp ${width}w`,
  }
}

export const gallery: GalleryFrame[] = [
  photo('player-dialogue', 0, 1567, 1004),
  photo('assistant-in-motion', 1, 1024, 1536),
  photo('pre-match-briefing', 2, 1536, 1025, 'center 30%', 'wide'),
  photo('match-signal', 3, 941, 1272),
  photo('following-play', 4, 941, 1442),
  photo('player-check', 5, 1086, 1118, 'center 60%'),
  photo('touchline-conversation', 6, 780, 930),
  photo('on-field-signal', 7, 941, 1372),
  photo('matchday-portrait', 8, 1011, 1556),
]
