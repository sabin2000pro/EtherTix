import axios from "axios";

const defaultOptions = {
  // Default config options for authentication

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
  username: string;
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

export const getUser = async (): Promise<any> => {
  try {
    const response = await axios.get("http://localhost:5299/api/auth/me");
    const data = await response.data;
    return data;
  } catch (err: any) {
    if (err) {
      throw err;
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

export const forgotPassword = async (forgotPasswordPayload: {
  email: string;
}): Promise<any> => {
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

export const resetPassword = async (
  resetPasswordPayload: {resetToken: string; newPassword: string}
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
