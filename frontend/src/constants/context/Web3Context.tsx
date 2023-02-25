import React, { useContext, useEffect, useState, createContext} from "react";
import web3 from "ethers";
import EventNftContract from '../../contracts/EventMarket.json';

export const Web3Context = createContext({} as any); // Create the Context API for Web3



export const Web3Provider = ({children}: any) => { // Context for Web3
    let DEFAULT_ACCOUNT_BALANCE = 0;
    const [account, setAccount] = useState<string | undefined>("");
    const [balance, setBalance] = useState<number | undefined>(DEFAULT_ACCOUNT_BALANCE);

    return <Web3Context.Provider value = {{}} >
         {children}
    </Web3Context.Provider>
}