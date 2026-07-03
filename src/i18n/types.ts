import type { Dict } from './dict'

export type Lang = 'en' | 'ru'

export interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  toggle: () => void
  t: Dict
}
