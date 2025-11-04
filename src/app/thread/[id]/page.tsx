import ForumLayout from '@/components/forum-layout'
import { prisma } from '@/lib/db'
import React from 'react'

const Page = async () => {
  const users = await prisma.user.findMany()
  console.log(users)
  return <ForumLayout></ForumLayout>
}

export default Page
