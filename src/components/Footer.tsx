import { Link } from 'react-router'
import { Mail, Send, Github, Twitter, Linkedin, Dribbble, ArrowUpRight } from 'lucide-react'
import { CONTACT } from '@/lib/contact'
import { useT } from '@/i18n'

const SOCIAL_LINKS = [
  { label: 'Telegram', href: CONTACT.telegram, icon: Send },
  { label: 'GitHub', href: CONTACT.github, icon: Github },
  { label: 'Twitter', href: CONTACT.twitter, icon: Twitter },
  { label: 'LinkedIn', href: CONTACT.linkedin, icon: Linkedin },
  { label: 'Dribbble', href: CONTACT.dribbble, icon: Dribbble },
]

export default function Footer() {
  const t = useT()
  const navLinks = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.work, path: '/work' },
    { label: t.nav.about, path: '/about' },
    { label: t.nav.contact, path: '/contact' },
  ]

  return (
    <footer className="w-full border-t border-white/5 bg-[#070312]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-white font-semibold text-lg mb-4">
              <span className="w-2 h-2 rounded-full bg-fuchsia-400 shadow-[0_0_12px_rgba(192,132,252,0.8)]" />
              LUMINEX
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              {t.footer.tagline}
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.filter(l => l.href && l.href !== '#').map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-fuchsia-400 hover:border-fuchsia-400/40 transition-colors"
                    aria-label={link.label}
                  >
                    <Icon size={16} />
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <span className="section-label text-slate-500 block mb-4">{t.footer.navigation}</span>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-slate-400 hover:text-white transition-colors text-sm no-underline flex items-center gap-1 group"
                >
                  {link.label}
                  <ArrowUpRight size={12} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <span className="section-label text-slate-500 block mb-4">{t.footer.services}</span>
            <div className="flex flex-col gap-3 text-slate-400 text-sm">
              {t.footer.serviceItems.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>

          <div>
            <span className="section-label text-slate-500 block mb-4">{t.footer.getInTouch}</span>
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-white hover:text-fuchsia-400 transition-colors text-sm no-underline flex items-center gap-2 mb-4"
            >
              <Mail size={16} />
              {CONTACT.email}
            </a>
            <Link to="/contact" className="btn-primary w-full text-center py-2.5 text-sm">
              {t.footer.startProject}
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-slate-600 text-xs">
            © {new Date().getFullYear()} {t.footer.copyright}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link to="/privacy" className="text-slate-500 hover:text-fuchsia-400 transition-colors text-xs no-underline">
              {t.footer.privacy}
            </Link>
            <Link to="/consent" className="text-slate-500 hover:text-fuchsia-400 transition-colors text-xs no-underline">
              {t.footer.consent}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
