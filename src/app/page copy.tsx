'use client'
import WalletConnect from '@/components/WalletConnect'
import { ConnectionContext } from '@/hooks/useConnection'
import { clusterApiUrl, Connection, type ConnectionConfig } from '@solana/web3.js'
import type { FC, ReactNode } from 'react'
import { useMemo } from 'react'

export interface ConnectionProviderProps {
  children: ReactNode
  endpoint: string
  config?: ConnectionConfig
}

export enum WalletAdapterNetwork {
  Mainnet = 'mainnet-beta',
  Testnet = 'testnet',
  Devnet = 'devnet',
}

export default function Home() {
  const ConnectionProvider: FC<ConnectionProviderProps> = ({
    children,
    endpoint,
    config = { commitment: 'confirmed' },
  }) => {
    const connection = useMemo(() => new Connection(endpoint, config), [endpoint, config])

    return <ConnectionContext.Provider value={{ connection }}>{children}</ConnectionContext.Provider>
  }

  const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const network = WalletAdapterNetwork.Devnet
    // You can also provide a custom RPC endpoint
    const endpoint = useMemo(() => clusterApiUrl(network), [network])

    return (
      <ConnectionProvider endpoint={endpoint}>
        {children}
      </ConnectionProvider>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <WalletContextProvider>
        <WalletConnect />
      </WalletContextProvider>
    </div>
  )
}
