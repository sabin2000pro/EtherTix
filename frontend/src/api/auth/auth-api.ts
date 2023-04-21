import cookies from "auth/cookies";
import { COOKIE_NAME_TOKEN, COOKIE_NAME_USER } from "auth/store";
import axios from "axios";

export interface IRegisterCredentials {
  forename: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  mfaToken: string;
}

const defaultOptions = {
  headers: {
    "Content-Type": "application/json",
  },
};

let axiosInstance = axios.create(defaultOptions);

axiosInstance.interceptors.request.use((configData: any | undefined) => {
  const authToken = localStorage.getItem("token");
  configData.headers.Authorization = authToken ? `Bearer ${authToken}` : ""; // Store the token in the header
  return configData;

});

export const registerUser = async (
  registerPayload: IRegisterCredentials
): Promise<any> => {
  try {
    const response = await axios.post(
      "http://localhost:5299/api/auth/register",
      registerPayload
    );

    const data = await response.data;

    return data;
  } catch (err: any) {
    if (err) {
      throw err;
    }
  }
};

export const verifyEmailAddress = async (verificationPayload: any): Promise<any> => {

  try {

    const response = await axios.post("http://localhost:5299/api/auth/verify-email", verificationPayload);
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

    const response = await axios.post("http://localhost:5299/api/auth/resend-email-verification", resendVerificationPayload);
    const data = await response.data;

    return data;
  } 
  
  catch (err: any) {

    if (err) {
      return console.error(err);
    }
  }

};


export const login = async (loginPayload: LoginCredentials): Promise<any> => {
  try {
    const response = await axios.post(
      "http://localhost:5299/api/auth/login",
      loginPayload
    );
    const data = await response.data;
    return data;
  } catch (err: any) {
    if (err) {
      throw err;
    }
  }
};

export const logout = async (): Promise<any> => {
  try {
    const response = await axios.post("http://localhost:5299/api/auth/logout");
    const data = await response.data;
    return data;
  } catch (err: any) {
    if (err) {
      return console.error(err);
    }


  }
};

export interface MfaEmailProps {
  email: string;
  password: string;
}

export const sendMfaEmail = async (mfaPayload: MfaEmailProps) => {
  try {

    const response = await axios.post(
      "http://localhost:5299/api/auth/send-login-mfa",
      mfaPayload
    );
    return response.data;
  } 
  
  catch (error) {
    if (error) {
      return console.error(error);
    }
  }
};

export interface ForgotPCredentials {
  email: string;
}

export const forgotPassword = async (
  forgotPasswordPayload: ForgotPCredentials
): Promise<any> => {
  try {
    const response = await axios.post(
      "http://localhost:5299/api/auth/forgot-password",
      forgotPasswordPayload
    );
    const data = await response.data;
    return data;
  } 
  
  catch (err: any) {
    if (err) {
      return console.error(err);
    }
  }
};

export interface IResetPassword {
  newPassword: string;
  confirmPassword: string;
  resetToken: string;
  userId: string;
}

export const resetPassword = async (
  resetPasswordPayload: IResetPassword
): Promise<any> => {
  try {
    const response = await axios.post(
      "http://localhost:5299/api/auth/reset-password",
      resetPasswordPayload
    );

    const data = await response.data;
    return data;
  } catch (err) {
    if (err) {
      return console.error(err);
    }
  }
};

// All these need an authorization header

export const getUser = async (): Promise<any> => {
  try {
    const response = await axios.get("http://localhost:5299/api/auth/me", {
      headers: {
        Authorization: `Bearer ${cookies.get(COOKIE_NAME_TOKEN)} ${
          cookies.get(COOKIE_NAME_USER)._id
        }`,
      },
    });

    const data = await response.data;
    return data;
  } catch (err: any) {
    if (err) {
      throw err;
    }
  }
};

export interface UpdateProfileCredentials {
  email?: string;
  username?: string;
  role?: string;
}

export const updateProfile = async (
  updateProfilePayload: UpdateProfileCredentials
): Promise<any> => {
  try {
    const response = await axios.put(
      "http://localhost:5299/api/auth/update-profile",
      updateProfilePayload,
      {
        headers: {
          Authorization: `Bearer ${cookies.get(COOKIE_NAME_TOKEN)} ${
            cookies.get(COOKIE_NAME_USER)._id
          }`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error) {
      throw error;
    }
  }
};

export interface UpdatePasswordCredentials {
  currentPassword: string;
  newPassword: string;
  passwordConfirm: string;
}

export const updatePassword = async (
  updatePasswordPayload: UpdatePasswordCredentials
): Promise<any> => {
  try {
    const response = await axios.put(
      "http://localhost:5299/api/auth/update-password",
      updatePasswordPayload,
      {
        headers: {
          Authorization: `Bearer ${cookies.get(COOKIE_NAME_TOKEN)} ${
            cookies.get(COOKIE_NAME_USER)._id
          }`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error) {
      throw error;
    }
  }
};

export const uploadProfilePic = async (pic: any) => {
  try {
    const response = await axios.put(
      "http://localhost:5299/api/auth/propic",
      pic,
      {
        headers: {
          Authorization: `Bearer ${cookies.get(COOKIE_NAME_TOKEN)} ${
            cookies.get(COOKIE_NAME_USER)._id
          }`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error) {
      throw error;
    }
  }
};
