import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const DashboardLayout: FC<Props> = ({ children }) => {
  return (
    <div className="h-screen w-screen relative">
      <aside className="absolute w-[12.5rem] top-0 left-0 h-full border-r border-black/10">
        Mood
      </aside>
      <div className="ml-[12.5rem]">
        <header className="h-[60px] border-b border-black/10">hello</header>
        <main>{children}</main>
      </div>
    </div>
  )
}
export default DashboardLayout
