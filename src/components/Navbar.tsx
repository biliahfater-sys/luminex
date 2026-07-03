import { Home, Briefcase, User, Mail } from 'lucide-react'
import { NavBar } from '@/components/ui/tubelight-navbar'
import { useT } from '@/i18n'

export default function Navbar() {
  const t = useT()
  const navItems = [
    { name: t.nav.home, url: '/', icon: Home },
    { name: t.nav.work, url: '/work', icon: Briefcase },
    { name: t.nav.about, url: '/about', icon: User },
    { name: t.nav.contact, url: '/contact', icon: Mail },
  ]

  return <NavBar items={navItems} />
}
