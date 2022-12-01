import React, { useContext, useEffect, useState, createContext} from "react";

export const Web3Context = createContext({} as any); // Create the Context API for Web3

let BALANCE_DEFAULT = 0

export const Web3Provider = ({children}: any) => {
    const [account, setAccount] = useState<string | undefined>("");
    const [balance, setBalance] = useState<number | undefined>(BALANCE_DEFAULT);

    return <Web3Context.Provider value = {{}} >
         {children}
    </Web3Context.Provider>
}