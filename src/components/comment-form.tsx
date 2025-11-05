import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { SendIcon } from 'lucide-react'

const CommentSchema = z.object({
  content: z
    .string('please type your comment')
    .nonempty('please type your comment')
    .min(1, 'plese type your comment'),
})

const CommentForm = ({ threadId }: { threadId: string }) => {
  console.log(threadId)
  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)}>
        <div className="flex gap-5">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Textarea
                    className="h-36"
                    placeholder="write something cool here..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Comments are being moderated by AI
                </FormDescription>
              </FormItem>
            )}
          />
          <Button size={'icon'}>
            <SendIcon />
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CommentForm
