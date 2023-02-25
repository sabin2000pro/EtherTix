import React, { useContext, useEffect, useState, createContext} from "react";
import web3 from "ethers";
import EventNftContract from '../../contracts/EventMarket.json';

export type IWeb3Context =  {
    accounts: any;
    currentBalance: any;
    currentOwner: any;
}

export const Web3Context = createContext({} as any); // Create the Context API for Web3

export const Web3Provider = ({children}: any) => { // Context for Web3
    let DEFAULT_ACCOUNT_BALANCE = 0;
    const [account, setAccount] = useState<string | undefined>("");
    const [balance, setBalance] = useState<number | undefined>(DEFAULT_ACCOUNT_BALANCE);

    const [accountChanged, setAccountChanged] = useState<boolean>(false);
    const [accountChosen, setAccountChosen] = useState<boolean>(false);
    const [tokenMinted, setTokenMinted] = useState<boolean>(false);

    return <Web3Context.Provider value = { {} } >
         {children}
    </Web3Context.Provider>
}