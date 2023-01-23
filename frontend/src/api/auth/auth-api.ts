import axios from 'axios';

// Default config options
const defaultOptions = {
    
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

export const register = async (registerPayload: any): Promise<any> => {

    try {
      // Write code here to handle registering user
    } 
    
    catch(err: any) {

        if(err) {
            return console.error(err);
        }
        
    }

}

export const verifyEmailAddress = async (registerPayload: any): Promise<any> => {

    try {

    } 
    
    catch(err: any) {

    }


}

export const resendEmailVerification = async (_args?: any): Promise<any> => {
    try {

    } 
    
    catch(err: any) {

    }

}

export const login = async (loginPayload: Object): Promise<any> => {
    try {
    // Write code here to send HTTP request to the backend
    } 
    
    catch(err: any) {

    }

}

export const sendLoginMfa = async (_args?: any): Promise<any> => {
    try {

    }
    
    catch(err: any) {

    }
}


export const forgotPassword = async (registerPayload: Object): Promise<any> => {
    try {

    } 
    
    catch(err: any) {

    }

}