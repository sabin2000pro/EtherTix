import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from "../models/user"
import cookies from './cookies';


export const COOKIE_NAME_USER = "sessionUser";
export const COOKIE_NAME_LOGGED_IN = "seionLoggedIn"
export const COOKIE_NAME_TOKEN = "sessionToken";

interface AuthState {
  user: User | null,
  isLoggedIn: boolean,
  token: string | null;
}

//Initial state
const initialState: AuthState = {
  //cookies.get(COOKIE_NAME_USER) as User | 
  user: cookies.get(COOKIE_NAME_USER) as User | null,
  //cookies.get(COOKIE_NAME_LOGGED_IN) ? true : 
  isLoggedIn: cookies.get(COOKIE_NAME_LOGGED_IN) ? true : false,
  //cookies.get(COOKIE_NAME_TOKEN) as string | 
  token: cookies.get(COOKIE_NAME_TOKEN) as string | null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export const { login, logout, setToken } = authSlice.actions;

export default authSlice.reducer;