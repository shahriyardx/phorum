'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { emoji } from 'zod'

const topics = [
  { id: '1', name: 'All', emoji: '🌎' },
  { id: '2', name: 'Programming', emoji: '👨‍💻' },
  { id: '3', name: 'Lifestyle', emoji: '💃' },
  { id: '4', name: 'Food', emoji: '🍔' },
  { id: '5', name: 'Crypto', emoji: '🔐' },
  { id: '6', name: 'Artificial Intelligence', emoji: '🧠' },
]

const Sidebar = () => {
  const params = useSearchParams()
  const activeTopicId = params.get('topic') || '1'

  return (
    <aside className="w-72 p-5 bg-zinc-900 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      <h1 className="text-lg font-bold">Topics</h1>
      <ul className="mt-2">
        {topics.map((topic) => (
          <Link
            href={`/?topic=${topic.id}`}
            key={topic.name}
            className={cn(
              'px-5 py-3 hover:bg-zinc-800 rounded-md flex gap-3',
              activeTopicId === topic.id && 'bg-zinc-800',
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
