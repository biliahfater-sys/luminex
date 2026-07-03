import Navbar from './Navbar'
import Footer from './Footer'
import GalaxyBackground from './GalaxyBackground'
import IntroLoader from './IntroLoader'
import CookieConsent from './CookieConsent'
import LangToggle from './LangToggle'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[3000] focus:rounded-full focus:bg-[#f8fafc] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#070312]"
      >
        Skip to content
      </a>
      <IntroLoader />
      <GalaxyBackground />
      <LangToggle />
      <Navbar />
      <main id="main-content" className="relative z-10">
        {children}
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
      <CookieConsent />
    </div>
  )
}
