import React, {useState, createContext} from "react";
import Web3 from "web3";
import EventNftContract from '../contracts/TicketNFT.json';
import axios from 'axios';

import { ExternalProvider } from "@ethersproject/providers";
import { initializeConnect } from "react-redux/es/components/connect";
declare global {
  interface Window {
    ethereum?: ExternalProvider;
  }

}

export type IWeb3Context =  {
    accounts: any;
    currentBalance: any;
    currentOwner: any;
}

export const Web3Context = createContext({} as any); // Create the Context API for Web3

export const Web3Provider = ({children}: any) => { // Context for Web3
    let DEFAULT_ACCOUNT_BALANCE = 0;

    const [currentAccountAddress, setCurrentAccountAddress] = useState<string | undefined>("");
    const [newTokenOwnerAddress, setNewTokenOwnerAddress] = useState<string | undefined>("");
    const [currentBalance, setCurrentBalance] = useState<number | undefined>(DEFAULT_ACCOUNT_BALANCE);
    const [accountChanged, setAccountChanged] = useState<boolean>(false);
    const [accountChosen, setAccountChosen] = useState<boolean>(false);
    const [tokenMinted, setTokenMinted] = useState<boolean>(false);
    const [newTokenOwner, setNewTokenOwner] = useState<string | undefined>("");

    const web3Client = new Web3(window.ethereum as any); // Create new instance of a Web3 client

    const connectMetaMaskWallet = async () => { // Function which allows the user to connect to their meta mask wallet account

        try {

            if(window.ethereum) {

                const currentAccount = await window.ethereum.request!({method: "eth_requestAccounts"});
                setAccountChosen(accountChosen);

                const currentAccountBalance = await web3Client.eth.getBalance(currentAccount.toString());
                const convertedBalance = web3Client.utils.fromWei(currentAccountBalance);

                setCurrentAccountAddress(currentAccount[0]);
                setCurrentBalance(parseInt(convertedBalance));

                const nftContract = await initialiseNftContract();
                localStorage.setItem("account", currentAccount);

                return {currentAccount, convertedBalance, nftContract}
            }

            else {
                throw new Error(`Could not connect to meta mask wallet`)
            }

        } 
        
        catch(error) {

            if(error) {
                return console.error(error);
            }


        }
    }

    const initialiseNftContract = async (): Promise<any> => {
        const networks = EventNftContract.networks as any;
        const nftContractAbi = EventNftContract.abi;
        const nftContract = new web3Client.eth.Contract(nftContractAbi as any, networks["5777"].address as unknown as any);
        
        return nftContract
    }

    const fetchAccountBalance = (currentAccount: string) => {

        try {

            return currentAccount;
        } 
        
        catch(error) {

            if(error) {
                return console.error(error);
            }

        }


    }

    const mintNewToken = async (_tokenName: string, _tokenClass: string,  _tokenPrice: number, _tokenCapacity: number) => {

        try {

            const nftContract = await initialiseNftContract();
            let mintedToken;

            if(_tokenName.toString() !== "" && _tokenClass.toString() !== "" && _tokenPrice > 0 && _tokenCapacity > 0) {
                mintedToken = nftContract.methods.mintToken(_tokenName, _tokenClass, _tokenPrice, _tokenCapacity)
                setTokenMinted(!tokenMinted);
            }

            return mintedToken;
        } 
        
        catch(error) {

            if(error) {
                return console.error(error);
            }
            
        }
    }

    return <Web3Context.Provider value = {{connectMetaMaskWallet, initialiseNftContract, mintNewToken, fetchAccountBalance}} >
         {children}
    </Web3Context.Provider>
}