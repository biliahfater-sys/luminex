import { useState, useRef, useEffect, useId } from 'react'
import { Link } from 'react-router'
import { CanvasReveal } from '../components/ui/canvas-reveal'
import { CONTACT } from '@/lib/contact'
import { useT } from '@/i18n'
import { Send, Mail, Send as Telegram, Github, Twitter, Linkedin, Dribbble, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import gsap from 'gsap'

const SOCIAL_LINKS = [
  { label: 'Telegram', href: CONTACT.telegram, icon: Telegram },
  { label: 'GitHub', href: CONTACT.github, icon: Github },
  { label: 'Twitter', href: CONTACT.twitter, icon: Twitter },
  { label: 'LinkedIn', href: CONTACT.linkedin, icon: Linkedin },
  { label: 'Dribbble', href: CONTACT.dribbble, icon: Dribbble },
]

interface FormState {
  name: string
  email: string
  budget: string
  message: string
}

export default function Contact() {
  const t = useT()
  const c = t.contact
  const [form, setForm] = useState<FormState>({ name: '', email: '', budget: '', message: '' })
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [consent, setConsent] = useState(false)
  const [consentError, setConsentError] = useState('')
  const heroRef = useRef<HTMLDivElement>(null)
  const formId = useId()
  const nameId = `${formId}-name`
  const emailId = `${formId}-email`
  const budgetId = `${formId}-budget`
  const messageId = `${formId}-message`
  const consentId = `${formId}-consent`
  const consentTextId = `${formId}-consent-text`

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-hero-line',
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.8, stagger: 0.1, ease: 'expo.out', delay: 0.2 }
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const validate = () => {
    const newErrors: Partial<FormState> = {}
    if (!form.name.trim()) newErrors.name = c.valNameReq
    if (!form.email.trim()) {
      newErrors.email = c.valEmailReq
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = c.valEmailInvalid
    }
    if (!form.message.trim()) {
      newErrors.message = c.valMessageReq
    } else if (form.message.trim().length < 10) {
      newErrors.message = c.valMessageShort
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (honeypot.trim()) {
      setSending(true)
      await new Promise((resolve) => setTimeout(resolve, 500))
      setSending(false)
      setSubmitted(true)
      return
    }

    const formValid = validate()
    setConsentError(consent ? '' : c.consentError)
    if (!formValid || !consent || sending) return

    // Demo mode: static site, no backend; nothing is sent anywhere.
    setSending(true)
    await new Promise((resolve) => setTimeout(resolve, 700))
    setSending(false)
    setSubmitted(true)
  }

  return (
    <div className="relative">
      {/* Hero with CanvasReveal */}
      <section
        ref={heroRef}
        className="relative flex flex-col justify-center items-center text-center overflow-hidden"
        style={{ minHeight: '60dvh', padding: '140px 24px 80px', zIndex: 10 }}
      >
        <CanvasReveal className="absolute inset-0 -z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070312]/50 via-transparent to-[#070312] -z-10" />
        <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#b8b3e0] mb-6">
          {c.label}
        </span>
        <h1 className="font-space font-bold uppercase text-[#FDFDFD] overflow-hidden" style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', lineHeight: 0.85 }}>
          <span className="contact-hero-line block">{c.heroLine1}</span>
          <span className="contact-hero-line block text-[#c084fc]">{c.heroLine2}</span>
        </h1>
        <p className="font-inter text-[16px] text-[#b8b3e0] max-w-[600px] mt-6 leading-relaxed">
          {c.heroSubtitle}
        </p>
      </section>

      {/* Contact Form + Info */}
      <section style={{ padding: '4rem 24px 10rem', zIndex: 10, position: 'relative' }}>
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12" style={{ maxWidth: 1400 }}>
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="frost-glass p-8 sm:p-10">
              {submitted ? (
                <div className="flex flex-col items-center text-center py-12" role="status" aria-live="polite">
                  <CheckCircle size={64} className="text-[#c084fc] mb-6" />
                  <h3 className="font-space text-2xl font-bold text-[#FDFDFD] uppercase mb-4">{c.successTitle}</h3>
                  <p className="text-[#b8b3e0] max-w-md">{c.successBody}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="rounded-lg border border-[#c084fc]/25 bg-[#c084fc]/5 px-4 py-3 text-[12px] leading-relaxed text-[#b8b3e0]">
                    {c.demoNotice}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor={nameId} className="block font-mono text-[11px] uppercase tracking-[0.06em] text-[#b8b3e0] mb-2">
                        {c.nameLabel}
                      </label>
                      <input
                        id={nameId}
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        autoComplete="name"
                        required
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? `${nameId}-error` : undefined}
                        className="w-full bg-[rgba(253,253,253,0.03)] border border-[rgba(184,179,224,0.15)] rounded-lg px-4 py-3 text-[#FDFDFD] placeholder:text-[#6C757D] focus:outline-none focus:border-[#c084fc] transition-colors"
                        placeholder={c.namePlaceholder}
                      />
                      {errors.name && <p id={`${nameId}-error`} role="alert" className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} aria-hidden /> {errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor={emailId} className="block font-mono text-[11px] uppercase tracking-[0.06em] text-[#b8b3e0] mb-2">
                        {c.emailLabel}
                      </label>
                      <input
                        id={emailId}
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        autoComplete="email"
                        required
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? `${emailId}-error` : undefined}
                        className="w-full bg-[rgba(253,253,253,0.03)] border border-[rgba(184,179,224,0.15)] rounded-lg px-4 py-3 text-[#FDFDFD] placeholder:text-[#6C757D] focus:outline-none focus:border-[#c084fc] transition-colors"
                        placeholder={c.emailPlaceholder}
                      />
                      {errors.email && <p id={`${emailId}-error`} role="alert" className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} aria-hidden /> {errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor={budgetId} className="block font-mono text-[11px] uppercase tracking-[0.06em] text-[#b8b3e0] mb-2">
                      {c.budgetLabel}
                    </label>
                    <select
                      id={budgetId}
                      name="budget"
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="w-full bg-[rgba(253,253,253,0.03)] border border-[rgba(184,179,224,0.15)] rounded-lg px-4 py-3 text-[#FDFDFD] focus:outline-none focus:border-[#c084fc] transition-colors"
                    >
                      <option value="" className="bg-[#070312]">{c.budgetSelect}</option>
                      <option value="5k-10k" className="bg-[#070312]">$5,000 — $10,000</option>
                      <option value="10k-25k" className="bg-[#070312]">$10,000 — $25,000</option>
                      <option value="25k-50k" className="bg-[#070312]">$25,000 — $50,000</option>
                      <option value="50k+" className="bg-[#070312]">$50,000+</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor={messageId} className="block font-mono text-[11px] uppercase tracking-[0.06em] text-[#b8b3e0] mb-2">
                      {c.projectDetailsLabel}
                    </label>
                    <textarea
                      id={messageId}
                      name="message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={6}
                      required
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? `${messageId}-error` : undefined}
                      className="w-full bg-[rgba(253,253,253,0.03)] border border-[rgba(184,179,224,0.15)] rounded-lg px-4 py-3 text-[#FDFDFD] placeholder:text-[#6C757D] focus:outline-none focus:border-[#c084fc] transition-colors resize-none"
                      placeholder={c.projectPlaceholder}
                    />
                    {errors.message && <p id={`${messageId}-error`} role="alert" className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} aria-hidden /> {errors.message}</p>}
                  </div>

                  {/* Honeypot — hidden from humans, bots fill it and get rejected */}
                  <input
                    type="text"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute opacity-0 pointer-events-none h-0 w-0"
                  />

                  {/* Consent to personal data processing — required by 152-FZ */}
                  <div>
                    <div className="flex items-start gap-3">
                      <input
                        id={consentId}
                        name="personal-data-consent"
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => {
                          setConsent(e.target.checked)
                          if (e.target.checked) setConsentError('')
                        }}
                        className="mt-1 h-4 w-4 shrink-0 accent-[#c084fc]"
                        aria-invalid={Boolean(consentError)}
                        aria-labelledby={consentTextId}
                        aria-describedby={consentError ? `${consentId}-error` : undefined}
                      />
                      <span id={consentTextId} className="text-[12px] leading-relaxed text-[#b8b3e0]">
                        {c.consentBefore}
                        <Link to="/privacy" target="_blank" rel="noreferrer" className="text-[#c084fc] hover:underline">
                          {c.consentLink}
                        </Link>
                        {c.consentMiddle}
                        <Link to="/consent" target="_blank" rel="noreferrer" className="text-[#c084fc] hover:underline">
                          {c.consentDocLink}
                        </Link>
                        {c.consentAfter}
                      </span>
                    </div>
                    {consentError && (
                      <p id={`${consentId}-error`} role="alert" className="text-red-400 text-xs mt-2 flex items-center gap-1">
                        <AlertCircle size={12} aria-hidden /> {consentError}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    {sending ? c.sending : c.send}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="frost-glass p-8">
              <h3 className="font-space text-[18px] font-bold text-[#FDFDFD] uppercase mb-6">{c.contactInfo}</h3>
              <div className="space-y-4">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-3 text-[#b8b3e0] hover:text-[#c084fc] transition-colors no-underline"
                >
                  <Mail size={18} />
                  <span className="font-inter">{CONTACT.email}</span>
                </a>
                <a
                  href={CONTACT.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-[#b8b3e0] hover:text-[#c084fc] transition-colors no-underline"
                >
                  <Telegram size={18} />
                  <span className="font-inter">Telegram</span>
                </a>
                <a
                  href={CONTACT.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-[#b8b3e0] hover:text-[#c084fc] transition-colors no-underline"
                >
                  <Github size={18} />
                  <span className="font-inter">GitHub</span>
                </a>
              </div>
            </div>

            <div className="frost-glass p-8">
              <h3 className="font-space text-[18px] font-bold text-[#FDFDFD] uppercase mb-6">{c.followUs}</h3>
              <div className="flex flex-wrap gap-3">
                {SOCIAL_LINKS.filter((link) => link.href && link.href !== '#').map((link) => {
                  const Icon = link.icon
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="w-11 h-11 rounded-full border border-[rgba(184,179,224,0.2)] flex items-center justify-center text-[#b8b3e0] hover:text-[#070312] hover:bg-[#c084fc] hover:border-[#c084fc] transition-all duration-300"
                      aria-label={link.label}
                    >
                      <Icon size={18} />
                    </a>
                  )
                })}
              </div>
            </div>

            <div className="frost-glass p-8">
              <h3 className="font-space text-[18px] font-bold text-[#FDFDFD] uppercase mb-2">{c.availability}</h3>
              <p className="text-[#b8b3e0] text-sm leading-relaxed mb-4">
                {c.availabilityText}
              </p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-amber-300">{c.openForWork}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
