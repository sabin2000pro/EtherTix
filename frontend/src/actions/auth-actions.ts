import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL } from "constants/auth-constants"

export const registerUser = () => async (dispatch: any) => {
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