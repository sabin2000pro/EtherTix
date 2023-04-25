export interface IRegisterCredentials {
    forename: string;
    surname: string;
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }

export interface UpdatePasswordCredentials {
    currentPassword: string;
    newPassword: string;
    passwordConfirm: string;
  }

export interface UpdateProfileCredentials {
    email?: string;
    username?: string;
    role?: string;
}

export interface MfaEmailProps {
    email: string;
    password: string;
}

export interface ForgotPCredentials {
    email: string;
  }


export interface ILoginCredentials {
    email: string;
    password: string;
    mfaToken: string;
  }