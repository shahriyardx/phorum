import type { ComponentProps } from 'react'
import Sidebar from './sidebar'
import Header from './header'

const ForumLayout = ({ children }: ComponentProps<'div'>) => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8 container mx-auto">{children}</div>
      </div>
    </div>
  )
}

export default ForumLayout
