import RequireAuth from '@/components/require-auth'
import type { ReactNode } from 'react'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Edit Thread',
  description: 'Ultimate forum for all your thoughts',
}

const Layout = ({ children }: { children: ReactNode }) => {
  return <RequireAuth>{children}</RequireAuth>
}

export default Layout
