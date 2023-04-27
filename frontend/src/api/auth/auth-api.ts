import { processAuthInterceptor } from './interceptor';
import cookies from "auth/cookies";
import { COOKIE_NAME_TOKEN, COOKIE_NAME_USER } from "auth/store";
import axios from "axios";
import { AUTH_FORGOT_PASSWORD_URI, AUTH_LOGGED_IN_USER_URI, AUTH_REGISTER_URI, AUTH_RESEND_EMAIL_VERIFICATION_URI, AUTH_RESET_PASSWORD_URI } from "./auth-uris/auth-uris";
import { UpdateProfileCredentials, MfaEmailProps, UpdatePasswordCredentials, IRegisterCredentials } from "./interfaces/auth-interfaces";
import { AUTH_VERIFY_LOGIN_MFA_URI, AUTH_VERIFY_EMAIL_URI, AUTH_LOGIN_URI, AUTH_LOGOUT_URI } from './auth-uris/auth-uris';
import { ForgotPCredentials, ILoginCredentials, IResetPassword } from './interfaces/auth-interfaces';

const authConfig = processAuthInterceptor();

export const registerUser = async (registerPayload: IRegisterCredentials): Promise<any> => {

  try {

    const response = await axios.post(AUTH_REGISTER_URI, registerPayload);

    const data = await response.data;
    return data;
  } 
  
  catch (err: any) {

    if (err) {
      throw err;
    }


  }
};

export const verifyEmailAddress = async (verificationPayload: any): Promise<any> => {

  try {

    const response = await axios.post(AUTH_VERIFY_EMAIL_URI, verificationPayload);
    const data = await response.data;
    return data;

  }
  
  catch (err: any) {

    if (err) {
      return console.error(err);
    }

  }
};

export const resendEmailVerification = async (resendVerificationPayload: any): Promise<any> => {

  try {

    const response = await axios.post(AUTH_RESEND_EMAIL_VERIFICATION_URI, resendVerificationPayload);
    const data = await response.data;

    return data;

  } 
  
  catch (err: any) {

    if (err) {
      return console.error(err);
    }
  }

};


export const login = async (loginPayload: ILoginCredentials): Promise<any> => {
  try {

    const response = await axios.post(AUTH_LOGIN_URI, loginPayload);

    const data = await response.data;
    return data;
  } 
  
  catch (err: any) {

    if (err) {
      throw err;
    }


  }
};

export const logout = async (): Promise<any> => { // Logs out the user from the frontend-side. It sends the request to the authentication logout API

  try {

    const response = await axios.post(AUTH_LOGOUT_URI);
    const data = await response.data;
    return data;

  } 
  
  catch (err: any) {

    if (err) {
      return console.error(err);
    }


  }
};


export const sendMfaEmail = async (mfaPayload: MfaEmailProps): Promise<any> => {

  try {

    const response = await axios.post(AUTH_VERIFY_LOGIN_MFA_URI, mfaPayload);
    return response.data;

  } 
  
  catch (error) {

    if (error) {
      return console.error(error);
    }

  }


};

export const forgotPassword = async (forgotPasswordPayload: ForgotPCredentials): Promise<any> => {

  try {

    const response = await axios.post(AUTH_FORGOT_PASSWORD_URI, forgotPasswordPayload);
    const data = await response.data;
    return data;

  } 
  
  catch (err: any) {

    if (err) {
      return console.error(err);
    }


  }
};


export const resetPassword = async (resetPasswordPayload: IResetPassword): Promise<any> => {

  try {

    const response = await axios.post(AUTH_RESET_PASSWORD_URI,resetPasswordPayload);
  
    const data = await response.data;
    return data;
  } 
  
  catch (err) {

    if (err) {
      return console.error(err);
    }

  }
};

// All these need an authorization header

export const getUser = async (): Promise<any> => {

  try {

    const response = await axios.get(AUTH_LOGGED_IN_USER_URI, {

      headers: {

        Authorization: `Bearer ${cookies.get(COOKIE_NAME_TOKEN)} ${cookies.get(COOKIE_NAME_USER)._id}`,
      },

    });

    const data = await response.data;
    return data;
  } 
  
  catch (err: any) {

    if (err) {
      throw err;
    }

  }
};

export const updateProfile = async (updateProfilePayload: UpdateProfileCredentials): Promise<any> => {

  try {

    const response = await axios.put("", updateProfilePayload, {

        headers: {
          Authorization: `Bearer ${cookies.get(COOKIE_NAME_TOKEN)} ${cookies.get(COOKIE_NAME_USER)._id}`,
        },

      }
    );


    return response.data;
  } 
  
  catch (error: any) {


    if (error) {
      throw error;
    }
  }
};


export const updatePassword = async (updatePasswordPayload: UpdatePasswordCredentials): Promise<any> => {

  try {

    const response = await axios.put("", updatePasswordPayload, {

        headers: {Authorization: `Bearer ${cookies.get(COOKIE_NAME_TOKEN)} ${cookies.get(COOKIE_NAME_USER)._id}`}}
    );

    return response.data;
  } 
  
  catch (error: any) {

    if (error) {
      throw error;
    }
  }
};

export const uploadProfilePic = async (pic: any) => {

  try {

    const response = await axios.put("http://localhost:5299/api/auth/propic", pic,
      {

        headers: {
          
          Authorization: `Bearer ${cookies.get(COOKIE_NAME_TOKEN)} ${
            cookies.get(COOKIE_NAME_USER)._id
          }`,
        },
      }
    );


    return response.data;
  } 
  
  catch (error: any) {
    if (error) {
      throw error;
    }
  }
};
