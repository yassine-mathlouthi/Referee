export interface GalleryFrame {
  id: string
  variant: number
  copyIndex: number
  src?: string
  srcSet?: string
  // Supply a truthful description of each real photograph in all languages.
  alt?: { en: string; fr: string; ar: string }
  position?: string
}

export const gallery: GalleryFrame[] = [
  { id: 'field', variant: 0, copyIndex: 0 },
  { id: 'signal', variant: 1, copyIndex: 1 },
  { id: 'centre', variant: 2, copyIndex: 2 },
]
