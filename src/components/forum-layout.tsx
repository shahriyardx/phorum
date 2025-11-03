import type { ComponentProps } from 'react'
import Sidebar from './sidebar'

const ForumLayout = ({ children }: ComponentProps<'div'>) => {
  return (
    <div className="h-full grid grid-cols-[300px_auto]">
      <Sidebar />
      <div>{children}</div>
    </div>
  )
}

export default ForumLayout
