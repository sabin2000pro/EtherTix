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

  // const initProvider = new ethers.providers.JsonRpcSigner("");

  const verifyConnectWallet = async () => {
     
  }

  const handleConnectWallet = async () => {
     
  }

  useEffect(() => {

  }, [])

  return (
    <>

  
    </>

  )
}

export default ConnectWallet