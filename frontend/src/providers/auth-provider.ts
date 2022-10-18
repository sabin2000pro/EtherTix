import { useContext, createContext } from "react";

export const defaultAuthState = {
    userData: null,
    token: null,
    isError: false,
    isLoading: false
}
 // Create the auth provider
const AuthProvider = createContext(defaultAuthState);

