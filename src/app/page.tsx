'use client'
import type { NextPage } from 'next'
import React from 'react'
import WalletConnect from '@/components/WalletConnect'

const Home: NextPage = () => {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<WalletConnect />
		</div>
	)
}

export default Home
