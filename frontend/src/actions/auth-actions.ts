import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL } from "constants/auth-constants"
import { Dispatch } from "redux";
import axios from 'axios';
import { AUTH_REGISTER_URI } from "api/auth/auth-uris/auth-uris";
import { validateLoginData, validateRegisterData } from "./validations/auth-validations";

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

export const verifyEmailAddress = (userId: string, OTP: string) => async (dispatch: Dispatch): Promise<void> => {
    try {
        
    } 
    
    catch(error) {

    }


}

export const login = (email: string, password: string) => async (dispatch: any): Promise<void> => {

   try {
      validateLoginData(email, password);
     dispatch({type: LOGIN_USER_REQUEST})

     const {data} = await axios.post(`https://ethertix.co.uk/api/v1/auth/login`, {email, password});
     console.log(`Login data : `, data);

     dispatch({type: LOGIN_USER_SUCCESS, payload: data.user});
   } 
   
   catch(error: any) {
      if(error) {

      }
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