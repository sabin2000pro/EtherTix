import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL } from "constants/auth-constants"
import { Dispatch } from "redux";
import axios from 'axios';
import { AUTH_REGISTER_URI } from "api/auth/auth-uris/auth-uris";

export const registerUser = (username: string, email: string, password: string, passwordConfirm: string) => async (dispatch: Dispatch): Promise<void> => {
    
    try {

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