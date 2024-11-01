'use client'

import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

export default function Navbar() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('username')
    router.push('/')
  }

  return (
    <header>
      <nav>
        <Button onClick={() => router.push('/')}>Home</Button>
        <Button onClick={() => router.push('/login')}>Login</Button>
        <Button onClick={() => router.push('/dashboard')}>Dashboard</Button>
        <Button onClick={handleLogout}>Logout</Button>
      </nav>
    </header>
  )
}
