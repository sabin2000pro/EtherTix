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