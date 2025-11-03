'use client'

import { SignupForm } from '@/components/signup-form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

const SignUpScema = z
  .object({
    name: z.string().min(3),
    email: z.email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type SignUp = z.infer<typeof SignUpScema>

export default function Page() {
  const router = useRouter()
  const form = useForm<SignUp>({
    resolver: zodResolver(SignUpScema),
  })

  const handleSignUp = async (values: SignUp) => {
    const { error } = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
    })

    if (error) {
      return form.setError('email', {
        type: 'manual',
        message: error.message,
      })
    }

    router.push('/')
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm form={form} submitHandler={handleSignUp} />
      </div>
    </div>
  )
}
