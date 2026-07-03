import { useContext } from 'react'
import { LanguageContext } from './context'
import type { Dict } from './dict'
import type { LanguageContextValue } from './types'

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}

/** Shortcut: returns the translation dictionary for the current language. */
export function useT(): Dict {
  return useLang().t
}
