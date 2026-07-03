import { Globe } from 'lucide-react'
import { useLang } from '@/i18n'

export default function LangToggle() {
  const { lang, setLang } = useLang()

  return (
    <div className="fixed top-4 right-4 z-[55] flex items-center gap-1 rounded-full border border-white/10 bg-[rgba(7,5,18,0.6)] p-1 backdrop-blur-lg">
      <Globe size={14} className="ml-1.5 text-slate-400" aria-hidden />
      {(['ru', 'en'] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          aria-label={code === 'ru' ? 'Переключить язык на русский' : 'Switch language to English'}
          className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-300 ${
            lang === code
              ? 'bg-fuchsia-400 text-[#070312]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  )
}
