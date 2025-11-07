'use client'

import type { Category, Thread, User } from '@/generated/zod'
import { Badge } from './ui/badge'
import { MessageCircleIcon } from 'lucide-react'
import Link from 'next/link'
import moment from 'moment'

const ThreadCard = ({
  thread,
}: {
  thread: Thread & {
    author: Pick<User, 'name'>
    Category: Category
    _count: { comments: number }
  }
}) => {
  return (
    <Link href={`/thread/${thread.id}`}>
      <div className="border-2 rounded-md p-10">
        <div className="flex items-start gap-2 justify-between">
          <h1 className="flex-1 font-bold text-2xl">{thread.title}</h1>

          <Badge>{thread.Category.name}</Badge>
        </div>

        <p className="mt-3">{thread.brief}</p>

        <div className="flex justify-between items-center mt-5">
          <div className="flex items-center gap-5">
            <div className="text-muted-foreground">
              by <span className="text-primary">{thread.author.name}</span>
            </div>

            <div className="flex items-center gap-2">
              <MessageCircleIcon size={18} className="text-muted-foreground" />
              <span>{thread._count.comments} Replies</span>
            </div>
          </div>

          <div>{moment(thread.createdAt).fromNow()}</div>
        </div>
      </div>
    </Link>
  )
}

export default ThreadCard
