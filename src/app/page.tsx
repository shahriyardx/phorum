'use client'

import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Button
        onClick={() =>
          authClient.signIn.email({
            email: 'contact@shahriyar.dev',
            password: 'password',
            rememberMe: true,
            callbackURL: '/idk',
          })
        }
      >
        Sign In
      </Button>
    </div>
  )
}

export default Home
