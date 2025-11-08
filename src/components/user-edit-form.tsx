'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from './ui/input'
import { FieldGroup } from './ui/field'
import { Button } from './ui/button'
import { SaveIcon, XIcon } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'

const UserSchema = z.object({
  name: z
    .string('please type your name')
    .nonempty('please type your name')
    .min(1, 'plese type your name'),
  image: z
    .url('please type a valid url')
    .nonempty('please type your image url')
    .min(1, 'plese type your image url'),
})

const UserEditForm = ({
  onSuccess,
  onCancel,
}: {
  onSuccess?: () => void
  onCancel: () => void
}) => {
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
  })

  const handleSubmit = async (values: z.infer<typeof UserSchema>) => {
    const { error } = await authClient.updateUser({
      name: values.name,
      image: values.image,
    })

    if (error) {
      return toast.error(error.message)
    }

    onSuccess?.()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div>
          <FieldGroup>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Image URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button>
                <SaveIcon /> Save
              </Button>
              <Button
                onClick={() => onCancel()}
                type="button"
                variant={'outline'}
              >
                <XIcon /> Cancel
              </Button>
            </div>
          </FieldGroup>
        </div>
      </form>
    </Form>
  )
}

export default UserEditForm
