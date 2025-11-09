import ForumLayout from '@/components/forum-layout'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ForumLayout>
      <main className="h-svh overflow-y-auto">{children}</main>
    </ForumLayout>
  )
}
