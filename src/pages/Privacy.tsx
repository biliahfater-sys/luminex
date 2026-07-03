import { Link } from 'react-router'
import { Info } from 'lucide-react'
import { POLICY_UPDATED } from '@/lib/legal'
import { useLang } from '@/i18n'
import { legalDict, type LegalSection } from '@/i18n/legalDict'

function Section({ section, index }: { section: LegalSection; index: number }) {
  const title = section.title.replace(/^\d+\.\s*/, '')

  return (
    <section className="grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-[72px_1fr]">
      <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-[#c084fc]">
        {String(index + 1).padStart(2, '0')}
      </div>
      <div>
        <h2 className="font-space text-[20px] sm:text-[24px] font-bold text-[#FDFDFD] uppercase tracking-tight mb-4">
          {title}
        </h2>
        <div className="space-y-3 text-[15px] leading-relaxed text-[#b8b3e0]">
          {section.paras?.map((para, i) => <p key={i}>{para}</p>)}
          {section.list && (
            <ul className="list-disc pl-6 space-y-1">
              {section.list.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

export default function Privacy() {
  const { lang } = useLang()
  const L = legalDict[lang]
  const p = L.privacy

  return (
    <div className="relative">
      <section
        className="relative flex flex-col justify-center items-center text-center overflow-hidden"
        style={{ minHeight: '40dvh', padding: '140px 24px 40px', zIndex: 10 }}
      >
        <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#b8b3e0] mb-6">
          {p.kicker}
        </span>
        <h1
          id="privacy-title"
          className="font-space font-bold uppercase text-[#FDFDFD]"
          style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', lineHeight: 0.95 }}
        >
          {p.title1}<br />
          <span className="text-[#c084fc]">{p.title2}</span>
        </h1>
        <p className="font-inter text-[14px] text-[#6f6b94] mt-6">
          {L.updatedPrefix} {POLICY_UPDATED}
        </p>
      </section>

      <section style={{ padding: '2rem 24px 8rem', zIndex: 10, position: 'relative' }}>
        <article aria-labelledby="privacy-title" className="mx-auto frost-glass p-8 sm:p-12" style={{ maxWidth: 960 }}>
          <div className="mb-10 flex items-start gap-3 rounded-xl border border-[#c084fc]/30 bg-[#c084fc]/5 px-5 py-4">
            <Info size={18} className="mt-0.5 shrink-0 text-[#c084fc]" aria-hidden />
            <p className="text-[13px] leading-relaxed text-[#b8b3e0]">{L.demoNotice}</p>
          </div>

          <div className="space-y-8">
            {p.sections.map((section, index) => (
              <Section key={section.title} section={section} index={index} />
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-amber-300/20 bg-amber-300/5 px-5 py-4 text-[13px] leading-relaxed text-amber-100/80">
            {lang === 'ru'
              ? 'Важно: это не заменяет юридическую экспертизу перед боевым запуском. Для реального оператора нужно подставить реквизиты, проверить подрядчиков и подать уведомление РКН при необходимости.'
              : 'Important: this does not replace legal review before production launch. A real operator must add actual details, verify vendors, and submit an RKN notification where required.'}
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-4">
            <Link to="/consent" className="text-[#c084fc] hover:underline text-sm">{p.toConsent}</Link>
            <Link to="/contact" className="text-[#c084fc] hover:underline text-sm">{p.toContact}</Link>
          </div>
        </article>
      </section>
    </div>
  )
}
