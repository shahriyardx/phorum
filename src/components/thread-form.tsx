'use client'

import React from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { topics } from './sidebar'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import type { UseFormReturn } from 'react-hook-form'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { FieldGroup } from './ui/field'
import { Textarea } from './ui/textarea'
import Link from 'next/link'
import { trpc } from '@/trpc/client'
import type { ThreadType } from '@/schema/thread'

const ThreadForm = ({
  form,
  handleSubmit,
}: {
  form: UseFormReturn<ThreadType>
  handleSubmit: (values: ThreadType) => void
}) => {
  const { data: categories } = trpc.category.allCategories.useQuery()

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="p-8 border rounded-md"
    >
      <FieldGroup>
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose Topic</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="grid grid-cols-3 gap-4"
                >
                  {categories?.map((option) => (
                    <div key={option.id}>
                      <RadioGroupItem
                        id={option.id}
                        value={option.id}
                        className="invisible absolute"
                      />

                      <label
                        key={option.id}
                        htmlFor={option.id}
                        className={cn(
                          'border rounded-xl p-4 cursor-pointer flex flex-col items-center justify-center gap-2 transition-all',
                          field.value === option.id
                            ? 'border-primary bg-primary/10'
                            : 'border-muted',
                        )}
                      >
                        <p className="text-muted-foreground text-2xl">
                          {option.emoji}
                        </p>
                        <p className="font-">{option.name}</p>
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Give your thread a compelling title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brief"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brief Desription</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief Desription about tour discussion..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Content</FormLabel>
              <FormControl>
                <Textarea
                  className="h-64"
                  placeholder="Write your initial post, Share your throughts, questions or ideas..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Markdown formatting is supported
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-5 p-5 border-primary bg-primary/10 rounded-md">
          <span className="text-2xl">🤖</span>
          <div>
            <p className="text-xl font-bold">
              Your post will be reviewed by AI moderation
            </p>
            <p className="text-muted-foreground">
              We use AI to detect spam and inappropriate content while
              preserving meaningful discussions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <Button variant="outline" type="button" asChild>
            <Link href={'/'}>Cancel</Link>
          </Button>

          <Button>Create Thread</Button>
        </div>
      </FieldGroup>
    </form>
  )
}

export default ThreadForm
