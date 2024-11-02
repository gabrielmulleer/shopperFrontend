'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Login: React.FC = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Salva o username no localStorage
    localStorage.setItem('username', username)
    console.log('Username:', username)
    router.push('/dashboard')
  }

  return (
    <div className="w-full min-h-dvh flex items-center justify-center flex-col">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Login</Button>
      </form>
    </div>
  )
}

export default Login
