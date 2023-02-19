import React, { useContext, createContext, useState } from "react";

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

export const AuthContext: React.FC<ChildrenProps> = ({children}) => {
    const [authState, setAuthState] = useState(defaultAuthState);
    const [user, setUser] = useState(null);

    return <AuthProvider.Provider value = {authState}>
        {children}
    </AuthProvider.Provider>
}

export const useAuth = () => { // Custom auth hook
    const useAuth = useContext(AuthProvider);
    return {authContext: useAuth}
}