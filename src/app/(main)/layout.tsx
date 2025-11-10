import ForumLayout from '@/components/forum-layout'
import { Suspense } from 'react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ForumLayout>
      <Suspense fallback={<>...</>}>
        <main>{children}</main>
      </Suspense>
    </ForumLayout>
  )
}
