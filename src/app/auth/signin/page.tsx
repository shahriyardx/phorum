'use client'

import { LoginForm } from '@/components/login-form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { authClient } from '@/lib/auth-client'
import { useState } from 'react'

const SignInSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
})

export type SignIn = z.infer<typeof SignInSchema>

export default function SignInPage() {
  const [loading, setLoading] = useState(false)
  const form = useForm<SignIn>({
    resolver: zodResolver(SignInSchema),
  })

  const handleSignIn = async (values: SignIn) => {
    setLoading(true)

    const { error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
      callbackURL: '/',
    })

    setLoading(false)

    if (error) {
      form.setError('email', {
        type: 'manual',
      })

      form.setError('password', {
        type: 'manual',
        message: error.message,
      })
    }
  }

  return (
    <div className="flex w-full items-center justify-center p-10">
      <div className="w-full max-w-sm">
        <LoginForm
          form={form}
          submitHandler={handleSignIn}
          isLoading={loading}
        />
      </div>
    </div>
  )
}
