'use client'

import ForumLayout from '@/components/forum-layout'
import ThreadCard from '@/components/thread-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlusIcon } from 'lucide-react'
const Home = () => {
  return (
    <ForumLayout>
      <div className="p-8 pb-20">
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
            <Input placeholder="Search thread" className="flex-1" />
            <Button>
              <PlusIcon /> New Thread
            </Button>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold">Discussions</h2>

          <div className="mt-3 grid grid-cols-1 gap-5">
            <ThreadCard />
            <ThreadCard />
            <ThreadCard />
            <ThreadCard />
            <ThreadCard />
            <ThreadCard />
            <ThreadCard />
            <ThreadCard />
            <ThreadCard />
          </div>
        </div>
      </div>
    </ForumLayout>
  )
}

export default Home
