import type { ComponentProps } from 'react'
import AuthHeader from './auth-header'

const AuthLayout = ({ children }: ComponentProps<'div'>) => {
  return (
    <div className="min-h-screen">
      <AuthHeader />

      <div className="flex-1 p-8 container mx-auto">{children}</div>
    </div>
  )
}

export default AuthLayout
