'use client'
import WalletConnect from '@/components/WalletConnect'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <WalletConnect />
    </div>
  )
}

export default Home
