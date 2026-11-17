export function readStorage(key: string, session = false) {
  try { return (session ? sessionStorage : localStorage).getItem(key) } catch { return null }
}
export function writeStorage(key: string, value: string, session = false) {
  try { (session ? sessionStorage : localStorage).setItem(key, value) } catch { /* Storage is optional, including in private browsing. */ }
}
