import React, {useState, createContext} from "react";
import Web3 from "web3";
import EventNftContract from '../../contracts/EventMarket.json';
import axios from 'axios';

import { ExternalProvider } from "@ethersproject/providers";
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

    const [currentAccount, setCurrentAccount] = useState<string | undefined>("");
    const [currentBalance, setCurrentBalance] = useState<number | undefined>(DEFAULT_ACCOUNT_BALANCE);
    const [accountChanged, setAccountChanged] = useState<boolean>(false);
    const [accountChosen, setAccountChosen] = useState<boolean>(false);
    const [tokenMinted, setTokenMinted] = useState<boolean>(false);
    const [newTokenOwner, setNewTokenOwner] = useState<string | undefined>("");

    const web3Client = new Web3(window.ethereum as any);

    const processLoggedInUser = async () => {
        return localStorage.getItem("user") !== null;
    }

    const connectMetaMaskWallet = async () => { // Function which allows the user to connect to their meta mask wallet account

        try {
            if(window.ethereum) {

                const currentAccount = await window.ethereum.request!({method: "eth_requestAccounts"});
                const currentAccountBalance = await web3Client.eth.getBalance(currentAccount.toString());
                const convertedBalance = web3Client.utils.fromWei(currentAccountBalance);

                setCurrentAccount(currentAccount[0]);
                setCurrentBalance(parseInt(convertedBalance));

                const nftContract = await constructNftContract();
                console.log(nftContract);

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

    const constructNftContract = async (): Promise<any> => {
        const networks = EventNftContract.networks
        const theNetworkID = Object.keys(networks);

        console.log(`Networks : `, networks);
        console.log(`The network ID : `, theNetworkID);
    
        // const nftContractAbi = EventNftContract.abi;
        // // const nftContract = new web3Client.eth.Contract(nftContractAbi as any, networks[theNetworkID] as unknown as any)
        // return nftContract;
    }

    const mintNewToken = async (_tokenName: string, _tokenPrice: number) => {

        try {
            // const mintedNft = await EventNftContract.methods.mintToken(_tokenName, _tokenPrice).send({from: currentAccount as unknown as WindowLocalStorage})

        } 
        
        catch(error) {
            if(error) {
                return console.error(error);
            }
        }


    }

    return <Web3Context.Provider value = {{connectMetaMaskWallet, mintNewToken}} >
         {children}
    </Web3Context.Provider>
}