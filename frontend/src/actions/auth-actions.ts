import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL } from "constants/auth-constants"
import { Dispatch } from "redux";

export const registerUser = () => async (dispatch: Dispatch): Promise<void> => {

    try {
       dispatch({type: REGISTER_USER_REQUEST});

       
    } 
    
    catch(error: any) {
   
    }
    
}

export const login = () => async (dispatch: any) => {
   try {
  
   } 
   
   catch(error: any) {
  
   }


}

export const forgotPassword = () => async (dispatch: any) => {
    
    try {
   
    } 
    
    catch(error: any) {
   
    }
    
}

export const resetPassword = () => async (dispatch: Dispatch): Promise<any> => {
    
}