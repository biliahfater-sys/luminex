import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { Cookie } from 'lucide-react'
import { useT } from '@/i18n'

const STORAGE_KEY = 'luminex_cookie_consent_v1'

export default function CookieConsent() {
  const t = useT()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let alreadyDecided = false
    try {
      alreadyDecided = Boolean(localStorage.getItem(STORAGE_KEY))
    } catch {
      alreadyDecided = false
    }
    if (alreadyDecided) return
    // небольшая задержка, чтобы баннер не конкурировал с интро-загрузчиком
    const t = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(t)
  }, [])

  const decide = (value: 'accepted' | 'rejected') => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ value, date: new Date().toISOString() }),
      )
    } catch {
      /* localStorage недоступен — просто скрываем */
    }
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="region"
          aria-live="polite"
          aria-labelledby="cookie-consent-title"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-3 bottom-24 z-[60] max-h-[calc(100dvh-7.5rem)] overflow-y-auto sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-h-none sm:max-w-md sm:overflow-visible"
        >
          <div className="frost-glass p-5 sm:p-6">
            <div className="flex items-start gap-3 mb-3">
              <Cookie size={20} className="mt-0.5 shrink-0 text-[#c084fc]" aria-hidden />
              <h3 id="cookie-consent-title" className="font-space text-[14px] font-bold leading-tight text-[#FDFDFD] sm:text-[15px]">
                {t.cookie.title}
              </h3>
            </div>
            <p className="text-[12px] sm:text-[13px] leading-relaxed text-[#b8b3e0] mb-4 sm:mb-5">
              {t.cookie.body}
              <Link to="/privacy" className="text-[#c084fc] hover:underline">
                {t.cookie.bodyLink}
              </Link>
              .
            </p>
            <div className="flex gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => decide('accepted')}
                className="btn-primary flex-1 px-3 py-2.5 text-[12px] sm:text-[13px]"
              >
                {t.cookie.accept}
              </button>
              <button
                type="button"
                onClick={() => decide('rejected')}
                className="flex-1 rounded-lg border border-white/15 px-3 py-2.5 text-[12px] text-[#b8b3e0] transition-colors hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-300 sm:text-[13px]"
              >
                {t.cookie.reject}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
