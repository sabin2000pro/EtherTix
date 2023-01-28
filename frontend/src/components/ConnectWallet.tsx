import React, {useEffect, useState} from 'react'
import { Contract, ethers } from 'ethers'

type ConnectWalletProps = {
   checkWalletConnected: () => Promise<any>
   connectWallet: () => Promise<any>
   walletConnected: () => boolean;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({checkWalletConnected, connectWallet, walletConnected}) => {

  return (
    <>

  
    </>

  )
}

export default ConnectWallet