'use client'

import React from 'react'
import { Badge } from './ui/badge'
import { EyeIcon, MessageCircleIcon } from 'lucide-react'
import Link from 'next/link'

const ThreadCard = () => {
  return (
    <Link href={'/thread/1'}>
      <div className="border-2 rounded-md p-10">
        <div className="flex items-start gap-2 justify-between">
          <h1 className="flex-1 font-bold text-2xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. A,
            adipisci.
          </h1>

          <Badge>Programming</Badge>
        </div>

        <p className="mt-3">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat
          assumenda accusamus hic explicabo fugit impedit dignissimos atque
          molestias, odio, cum quibusdam delectus aliquam perferendis quos quas
          nemo totam, optio nam inventore! Quos vitae corrupti culpa dignissimos
          optio qui nulla sed nihil modi dolore, harum deserunt incidunt
          exercitationem porro iure id!
        </p>

        <div className="flex justify-between items-center mt-5">
          <div className="flex items-center gap-5">
            <div className="text-muted-foreground">
              by <span className="text-primary">Shahriyar</span>
            </div>

            <div className="flex items-center gap-2">
              <MessageCircleIcon size={18} className="text-muted-foreground" />
              <span>24 Replies</span>
            </div>

            <div className="flex items-center gap-2">
              <EyeIcon size={20} className="text-muted-foreground" />
              <span>2500 Views</span>
            </div>
          </div>

          <div>4 Hours ago</div>
        </div>
      </div>
    </Link>
  )
}

export default ThreadCard
