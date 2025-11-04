'use client'

import ForumLayout from '@/components/forum-layout'
import ThreadForm from '@/components/thread-form'
import { Form } from '@/components/ui/form'
import { prisma } from '@/lib/db'
import { ThreadSchema, type ThreadType } from '@/schema/thread'
import { trpc } from '@/trpc/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type z from 'zod'

const Page = () => {
  const { mutate } = trpc.thread.create.useMutation({
    onSuccess: () => {
      toast.success('Thread has been created')
    },
    onError: (e) => {
      toast.error(e.message)
    },
  })
  const form = useForm<ThreadType>({
    resolver: zodResolver(ThreadSchema),
  })

  const handleSubmit = (values: ThreadType) => {
    mutate(values)
  }

  return (
    <ForumLayout>
      <Link href="/" className="flex items-center gap-2 text-accent-foreground">
        <ArrowLeft /> Back to forum
      </Link>

      <h1 className="text-2xl font-bold mt-3">Start a new discussion</h1>
      <p className="text-muted-foreground">
        Create a new thread to engage with the community
      </p>

      <div className="mt-5">
        <Form {...form}>
          <ThreadForm form={form} handleSubmit={handleSubmit} />
        </Form>
      </div>
    </ForumLayout>
  )
}

export default Page
