import cookies from "auth/cookies";
import { COOKIE_NAME_TOKEN, COOKIE_NAME_USER } from "auth/store";
import axios from "axios";

const defaultOptions = {
  // Default config options for authentication

  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true
};

let axiosInstance = axios.create(defaultOptions);

axiosInstance.interceptors.request.use((configData: any | undefined) => {
  const authToken = localStorage.getItem("token");
  configData.headers.Authorization = authToken ? `Bearer ${authToken}` : ""; // Store the token in the header
  return configData;
});

export interface registerCredentials {
  forename: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const registerUser = async (
  registerPayload: registerCredentials
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

export const verifyEmailAddress = async (
  verificationPayload: any
): Promise<any> => {
  try {
    const response = await axios.post(
      "http://localhost:5299/api/auth/verify-email",
      verificationPayload
    );
    const data = await response.data;
    return data;
  } catch (err: any) {
    if (err) {
      return console.error(err);
    }
  }
};

export const resendEmailVerification = async (
  resendVerificationPayload: any
): Promise<any> => {
  try {
    const response = await axios.post(
      "http://localhost:5299/api/auth/resend-email-verification",
      resendVerificationPayload
    );
    const data = await response.data;
    return data;
  } catch (err: any) {
    if (err) {
      return console.error(err);
    }
  }
};

export interface LoginCredentials {
  email: string;
  password: string;
}

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

export const sendLoginMfa = async (mfaPayload: any): Promise<any> => {
  try {
    const response = await axios.post(
      "http://localhost:5299/api/auth/verify-login-mfa",
      mfaPayload
    );
    const data = await response.data;
    return data;
  } catch (err: any) {
    if (err) {
      return console.error(err);
    }
  }
};

export interface ForgotPCredentials {
  email: string;
}

export const forgotPassword = async (forgotPasswordPayload: ForgotPCredentials): Promise<any> => {
  try {
    const response = await axios.post(
      "http://localhost:5299/api/auth/forgot-password",
      forgotPasswordPayload
    );
    const data = await response.data;
    return data;
  } catch (err: any) {
    if (err) {
      return console.error(err);
    }
  }
};

export interface ResetP {
  newPassword: string,
  confirmPassword: string,
  resetToken: string,
  userId: string,
};

export const resetPassword = async (
  resetPasswordPayload: ResetP
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

export interface ProfPic {
  pic: File,
}

export const uploadProfilePic = async (pic: ProfPic) => {
  try {
    const response = await axios.put("http://localhost:5299/api/auth/propic", pic);
    return response;
  } catch (error: any) {
    if(error) {
      throw error;
    }    
  }
};


// All these need an authorization header

export const getUser = async (): Promise<any> => {
  try {
    const response = await axios.get("http://localhost:5299/api/auth/me",{ headers: {"Authorization" : `Bearer ${cookies.get(COOKIE_NAME_TOKEN)} ${cookies.get(COOKIE_NAME_USER)._id}`}});
    const data = await response.data;
    return data;
  } catch (err: any) {
    if (err) {
      throw err;
    }
  }
};

export interface UpdateProfileCredentials {
  email: string,
  username: string,
  role: string,
};

export const updateProfile = async (updateProfilePayload: any): Promise<any> => {
  try {
    const response = await axios.put("http://localhost:localhost:5299/api/auth/update-profile", updateProfilePayload, { headers: {"Authorization" : `Bearer ${cookies.get(COOKIE_NAME_TOKEN)} ${cookies.get(COOKIE_NAME_USER)._id}`}} );
    return response;
  } catch (error: any) {
    if(error){
      throw error;
    }
  }
};

export interface UpdatePasswordCredentials {
  currentPassword: string,
  newPassword: string,
}

export const updatePassword = async (updatePasswordPayload: any): Promise<any> => {
  try {
    const response = await axios.put("http://localhost:localhost:5299/api/auth/update-password", updatePasswordPayload, { headers: {"Authorization" : `Bearer ${cookies.get(COOKIE_NAME_TOKEN)} ${cookies.get(COOKIE_NAME_USER)._id}`}} );
    return response;
  } catch (error: any) {
    if(error){
      throw error;
    }
  }
};