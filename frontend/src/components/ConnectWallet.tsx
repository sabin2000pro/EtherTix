import React from 'react'

export interface ConnectWalletProps {
   checkWalletConnected: () => Promise<any>
   connectWallet: () => Promise<any>
   walletConnected: () => boolean;
}

export const ConnectWallet: React.FC<ConnectWalletProps> = ({checkWalletConnected, connectWallet, walletConnected}: ConnectWalletProps) => {

  return (

    <>

       <h2>Connect Wallet</h2>
    </>

  )
}

