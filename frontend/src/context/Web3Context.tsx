import React, { useContext, useEffect, useState, createContext} from "react";

export const Web3Context = createContext({} as any);

export const Web3Provider = ({children}: any) => {
    const [account, setAccount] = useState<string | undefined>("");
    const [balance, setBalance] = useState<number | undefined>(0);

    return <Web3Context.Provider value = {{}} >
         {children}
    </Web3Context.Provider>
}