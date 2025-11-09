import RequireAuth from '@/components/require-auth'
import type { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return <RequireAuth>{children}</RequireAuth>
}

export default Layout
