import { profile } from '../data/profile'

export type ContactKey = 'email' | 'whatsapp' | 'linkedin' | 'youtube' | 'cv'
export interface ContactLink { key: ContactKey; href: string; external: boolean }

export function getContactLinks(data = profile): ContactLink[] {
  const links: ContactLink[] = []
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) links.push({ key: 'email', href: `mailto:${data.email}`, external: false })
  if (/^[1-9]\d{6,14}$/.test(data.whatsapp)) links.push({ key: 'whatsapp', href: `https://wa.me/${data.whatsapp}`, external: true })
  for (const key of ['linkedin', 'youtube'] as const) {
    try {
      const url = new URL(data[key])
      if (url.protocol === 'https:') links.push({ key, href: url.href, external: true })
    } catch { /* Unconfigured destinations stay hidden. */ }
  }
  if (/^\/(?!\/).+\.pdf$/i.test(data.cv)) links.push({ key: 'cv', href: data.cv, external: false })
  return links
}
