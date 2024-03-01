import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const links = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/journal',
    label: 'Journal',
  },
]

const DashboardLayout: FC<Props> = ({ children }) => {
  return (
    <div className="h-screen w-screen relative">
      <aside className="absolute w-[12.5rem] top-0 left-0 h-full border-r border-black/10 dark:border-white/40">
        <div>Mood</div>
        <nav>
          <ul>
            {links.map((link) => (
              <li key={link.href} className="px-2 py-6 text-xl">
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className="ml-[12.5rem] h-full">
        <header className="h-[60px] border-b border-black/10 dark:border-white/40">
          <div className="h-full w-full px-6 flex items-center justify-end">
            <UserButton />
          </div>
        </header>
        <main className=" h-[calc(100vh-180px)]">{children}</main>
      </div>
    </div>
  )
}
export default DashboardLayout
