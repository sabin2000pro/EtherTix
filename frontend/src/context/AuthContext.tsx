import React, { useContext, createContext, useState, useEffect } from "react";

type ChildrenProps = {
    children: any
}

export const defaultAuthState = {
    userData: null,
    token: null,
    isError: false,
    isLoading: false
}
 // Create the auth provider
const AuthProvider = createContext(defaultAuthState);

export const AuthReducer = (type: any, action: any) => {
    
    switch(action.type) {

        default:
            return defaultAuthState
    }
}

export const AuthContext: React.FC<ChildrenProps> = ({children}) => {

    const [authState, setAuthState] = useState(defaultAuthState);

    // useEffect(() => {
        
    // }, [])

    return <AuthProvider.Provider value = {authState}>
        {children}
    </AuthProvider.Provider>
}

export const useAuth = () => {
    const useAuth = useContext(AuthProvider);
    return {authContext: useAuth}
}