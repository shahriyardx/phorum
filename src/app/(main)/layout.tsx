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
        <main className="h-svh overflow-y-auto">{children}</main>
      </Suspense>
    </ForumLayout>
  )
}
