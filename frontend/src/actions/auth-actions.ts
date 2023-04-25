import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL } from "constants/auth-constants"
import { Dispatch } from "redux";
import axios from 'axios';
import { AUTH_REGISTER_URI } from "api/auth/auth-uris/auth-uris";

const validateRegisterData = (username: string, email: string, password: string, passwordConfirm: string) => {
    if (!username) {
        throw new Error('Username is required');
    }

    if (!email) {
        throw new Error('Email is required');
    }

    if (!password) {
        throw new Error('Password is required');
    }

    if (password !== passwordConfirm) {
        throw new Error('Password and confirm password do not match');
    }

    if (username.length < 3) {
        throw new Error('Username must be at least 3 characters long');
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        throw new Error('Invalid email format');
    }

    if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
    }

}

export const registerUser = (username: string, email: string, password: string, passwordConfirm: string) => async (dispatch: Dispatch): Promise<void> => {

    try {

        validateRegisterData(username, email, password, passwordConfirm)

       dispatch({type: REGISTER_USER_REQUEST});

       const {data} = await axios.post(AUTH_REGISTER_URI);
       console.log(`Data : `, data);

       dispatch({type: REGISTER_USER_SUCCESS})
       
    } 
    
    catch(error: any) {
   
    }
    
}

export const login = () => async (dispatch: any) => {

   try {
     dispatch({type: LOGIN_USER_REQUEST})
   } 
   
   catch(error: any) {
  
   }

}

export const forgotPassword = (email: string) => async (dispatch: any) => {
    
    try {
   
    } 
    
    catch(error: any) {
   
    }
    
}

export const resetPassword = () => async (dispatch: Dispatch): Promise<any> => {

}