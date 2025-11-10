'use client'

import ThreadCard from '@/components/thread-card'
import { ThreadSkeleton } from '@/components/thread-skeleton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { trpc } from '@/trpc/client'
import { Loader2, PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

const Home = () => {
  const params = useSearchParams()
  const activeTopicId = params.get('topic')

  const [query, setQuery] = useState('')
  const {
    data: threads,
    isLoading,
    isFetched,
  } = trpc.thread.allThreads.useQuery({
    query,
    topic: activeTopicId,
  })

  return (
    <div className="pb-20">
      <div>
        <h1 className="text-4xl font-bold">
          Welcome to <span className="text-primary">PHorum</span>
        </h1>
        <p className="text-muted-foreground">
          A modern community forum powered by AI moderation and real-time
          discussions
        </p>
      </div>

      <div className="mt-5">
        <div className="flex items-center gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search thread"
            className="flex-1"
          />
          <Button asChild>
            <Link href="/thread/create">
              <PlusIcon /> New Thread
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          Discussions {isLoading && <Loader2 className="animate-spin" />}{' '}
        </h2>

        <div className="mt-3 grid grid-cols-1 gap-5">
          {isLoading &&
            !isFetched &&
            Array.from({ length: 5 }).map((_, i) => (
              <ThreadSkeleton key={i.toString()} />
            ))}

          {threads?.map((thread) => (
            <ThreadCard key={thread.id} thread={thread} />
          ))}
        </div>

        {isFetched && !threads?.length && (
          <div className="mt-3">❌ No threads found</div>
        )}
      </div>
    </div>
  )
}

export default Home
