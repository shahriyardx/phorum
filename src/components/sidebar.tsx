'use client'

import { cn } from '@/lib/utils'
import { trpc } from '@/trpc/client'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

const Sidebar = () => {
  const params = useSearchParams()
  const activeTopicId = params.get('topic')
  const pathname = usePathname()

  const { data: topics } = trpc.thread.topics.useQuery()

  return (
    <aside className="w-72 p-5 bg-zinc-900 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      <h1 className="text-lg font-bold">Topics</h1>
      <ul className="mt-2">
        <Link
          href={`/`}
          className={cn(
            'px-5 py-3 hover:bg-zinc-800 rounded-md flex gap-3',
            !activeTopicId && pathname === '/' && 'bg-zinc-800',
          )}
        >
          <span>🌎</span>
          <span>All</span>
        </Link>

        {topics?.map((topic) => (
          <Link
            href={`/?topic=${topic.id}`}
            key={topic.name}
            className={cn(
              'px-5 py-3 hover:bg-zinc-800 rounded-md flex gap-3',
              activeTopicId === topic.id && pathname === '/' && 'bg-zinc-800',
            )}
          >
            <span>{topic.emoji}</span>
            <span>{topic.name}</span>
          </Link>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
