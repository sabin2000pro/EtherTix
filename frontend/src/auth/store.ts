import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../models/user";
import { CartItem } from "../models/cart";
import cookies from "./cookies";

export const COOKIE_NAME_USER = "sessionUser";
export const COOKIE_NAME_LOGGED_IN = "seionLoggedIn";
export const COOKIE_NAME_TOKEN = "sessionToken";
export const COOKIE_NAME_CART = "sessionCart";

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  cartItems: string[];
}

//Initial state
const initialState: AuthState = {
  //cookies.get(COOKIE_NAME_USER) as User |
  user: cookies.get(COOKIE_NAME_USER) as User | null,
  //cookies.get(COOKIE_NAME_LOGGED_IN) ? true :
  isLoggedIn: cookies.get(COOKIE_NAME_LOGGED_IN) ? true : false,
  cartItems: cookies.getCartContent() as [], // | [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    addItem: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.cartItems.findIndex(
        (itemId) => itemId === action.payload.id // find index by itemId instead of object
      );
      if (itemIndex === -1) {
        state.cartItems.push(JSON.stringify(action.payload)); // serialize object before adding to array
      } else {
        const item = JSON.parse(state.cartItems[itemIndex]) as CartItem; // deserialize object before updating quantity
        item.quantity += action.payload.quantity;
        state.cartItems[itemIndex] = JSON.stringify(item); // serialize object before updating array
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (itemId) => itemId !== action.payload
      );
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const itemIndex = state.cartItems.findIndex(
        (itemId) => itemId === action.payload.id // find index by itemId instead of object
      );
      if (itemIndex !== -1) {
        const item = JSON.parse(state.cartItems[itemIndex]) as CartItem; // deserialize object before updating quantity
        item.quantity = action.payload.quantity;
        state.cartItems[itemIndex] = JSON.stringify(item); // serialize object before updating array
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  login,
  logout,
  addItem,
  removeItem,
  updateItemQuantity,
  clearCart,
} = authSlice.actions;

export default authSlice.reducer;
