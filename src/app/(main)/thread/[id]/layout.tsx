import { prisma } from '@/lib/db'
import type { ReactNode } from 'react'

export async function generateMetadata({
  params: p,
}: {
  params: Promise<{ id: string }>
}) {
  const params = await p
  const thread = await prisma.thread.findFirst({
    where: { id: params.id },
    select: { title: true, brief: true },
  })

  if (!thread) {
    return {
      title: 'Thread not found | MyApp',
      description: 'This thread does not exist.',
    }
  }

  return {
    title: `${thread.title} | Phorum`,
    description: thread.brief || 'Discussion thread on MyApp Forum',
  }
}

const Layout = ({ children }: { children: ReactNode }) => {
  return children
}

export default Layout
