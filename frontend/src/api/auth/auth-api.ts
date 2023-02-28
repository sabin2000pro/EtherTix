import axios from 'axios';

const defaultOptions = { // Default config options for authentication
    
    headers: {
      'Content-Type': 'application/json',
    },

  };

let axiosInstance = axios.create(defaultOptions)

axiosInstance.interceptors.request.use((configData: any | undefined) => {
    
    const authToken = localStorage.getItem("token");
    configData.headers.Authorization = authToken ? `Bearer ${authToken}` : "" // Store the token in the header
    return configData;
})

export const registerUser = async (registerPayload: any): Promise<any> => {

    try {

        const response = await axios.post("http://localhost:5299/api/auth/register", registerPayload);
        const data = await response.data;
    
        return data;
    } 
    
    catch(err: any) {
       
        if(err) {
            return console.error(err);
        }
        
    }

}

export const verifyEmailAddress = async (verificationPayload: any): Promise<any> => {

    try {

        const response = await axios.post("http://localhost:5299/api/auth/verify-email", verificationPayload);
        const data = await response.data;
        return data;

    } 
    
    catch(err: any) {

        if(err) {
            return console.error(err);
        }


    }
}

export const resendEmailVerification = async (resendVerificationPayload: any): Promise<any> => {

    try {

        const response = await axios.post("http://localhost:5299/api/auth/resend-email-verification", resendVerificationPayload);
        const data = await response.data;
        return data;

    } 
    
    catch(err: any) {

        if(err) {
            return console.error(err);
        }

    }

}

export const login = async (loginPayload: any): Promise<any> => {

    try {

        const response = await axios.post("http://localhost:5299/api/auth/login", loginPayload);
        const data = await response.data;
        return data;
    } 
    
    catch(err: any) {

        if(err) {
            return console.error(err);
        }

    }

}

export const sendLoginMfa = async (mfaPayload: any): Promise<any> => {
    try {

        const response = await axios.post("http://localhost:5299/api/auth/verify-login-mfa", mfaPayload);
        const data = await response.data;
        return data;

    }
    
    catch(err: any) {

        if(err) {
            return console.error(err);
        }

    }
}


export const forgotPassword = async (forgotPasswordPayload: { email: string }): Promise<any> => {
    try {
        
        const response = await axios.post("http://localhost:5299/api/auth/forgot-password", forgotPasswordPayload);
        const data = await response.data;
        return data;
    
    } 
    
    catch(err: any) {

        if(err) {
            return console.error(err);
        }

    }
}

export const resetPassword = async (resetPasswordPayload: Object): Promise<any> => {
    try {
        
      const response = await axios.post("http://localhost:5299/api/auth/reset-password", resetPasswordPayload);
      const data = await response.data;
      return data;
    } 
    
    catch (err) {

      if (err) {
         return console.error(err);
      }


    }
  };