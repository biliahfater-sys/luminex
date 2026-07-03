import { Link } from 'react-router'
import { Info } from 'lucide-react'
import { POLICY_UPDATED } from '@/lib/legal'
import { useLang } from '@/i18n'
import { legalDict } from '@/i18n/legalDict'

function ConsentSection({
  section,
  index,
}: {
  section: { title: string; paras?: string[]; list?: string[] }
  index: number
}) {
  return (
    <section className="grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-[72px_1fr]">
      <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-[#c084fc]">
        {String(index + 1).padStart(2, '0')}
      </div>
      <div>
        <h2 className="font-space text-[18px] sm:text-[21px] font-bold text-[#FDFDFD] uppercase mb-3">
          {section.title}
        </h2>
        <div className="space-y-3">
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

export default function Consent() {
  const { lang } = useLang()
  const L = legalDict[lang]
  const c = L.consent

  return (
    <div className="relative">
      <section
        className="relative flex flex-col justify-center items-center text-center overflow-hidden"
        style={{ minHeight: '40dvh', padding: '140px 24px 40px', zIndex: 10 }}
      >
        <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#b8b3e0] mb-6">
          {c.kicker}
        </span>
        <h1
          id="consent-title"
          className="font-space font-bold uppercase text-[#FDFDFD]"
          style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', lineHeight: 0.95 }}
        >
          {c.title1}<br />
          <span className="text-[#c084fc]">{c.title2}</span>
        </h1>
        <p className="font-inter text-[14px] text-[#6f6b94] mt-6">
          {L.updatedPrefix} {POLICY_UPDATED}
        </p>
      </section>

      <section style={{ padding: '2rem 24px 8rem', zIndex: 10, position: 'relative' }}>
        <article
          aria-labelledby="consent-title"
          className="mx-auto frost-glass p-8 sm:p-12 text-[15px] leading-relaxed text-[#b8b3e0]"
          style={{ maxWidth: 960 }}
        >
          <div className="mb-4 flex items-start gap-3 rounded-xl border border-[#c084fc]/30 bg-[#c084fc]/5 px-5 py-4">
            <Info size={18} className="mt-0.5 shrink-0 text-[#c084fc]" aria-hidden />
            <p className="text-[13px] leading-relaxed text-[#b8b3e0]">{L.demoNotice}</p>
          </div>

          <p className="mt-8 max-w-3xl">{c.intro}</p>

          <div className="mt-8 space-y-8">
            {c.sections.map((section, index) => (
              <ConsentSection key={section.title} section={section} index={index} />
            ))}
          </div>

          <p className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-[13px]">
            {c.confirmBefore}
            <Link to="/privacy" className="text-[#c084fc] hover:underline">{c.confirmLink}</Link>
            {c.confirmAfter}
          </p>

          <div className="mt-10 pt-8 border-t border-white/10">
            <Link to="/contact" className="text-[#c084fc] hover:underline text-sm">{c.toContact}</Link>
          </div>
        </article>
      </section>
    </div>
  )
}
