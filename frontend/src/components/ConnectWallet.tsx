import React, {useEffect, useState} from 'react'

type ConnectWalletProps = {
   checkWalletConnected: () => Promise<any>
   connectWallet: () => Promise<any>
   walletConnected: () => boolean;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({checkWalletConnected, connectWallet, walletConnected}) => {

  return (

    <>
     <h2>Connect Wallet Button Component</h2>
    </>

  )
}

export default ConnectWallet