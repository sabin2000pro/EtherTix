import React, {useEffect, useState} from 'react'
import { Contract, ethers } from 'ethers'

type ConnectWalletProps = {
   checkWalletConnected: () => Promise<any>
   connectWallet: () => Promise<any>
   walletConnected: () => boolean;
}

// @description: Connet Metamask Wallet
const ConnectWallet: React.FC<ConnectWalletProps> = ({checkWalletConnected, connectWallet, walletConnected}) => {
  
  const [account, setAccount] = useState<string>("");
  const [accountLoaded, setAccountLoaded] = useState<boolean>(walletConnected);
  const [accountBalance, setAccountBalance] = useState<string>("");

  useEffect(() => {

  }, [])

  return (
    <>

  
    </>

  )
}

export default ConnectWallet