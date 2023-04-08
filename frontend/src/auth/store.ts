import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../models/user";
import { CartItem } from "../models/cart";
import cookies, { COOKIE_NAME_CART } from "./cookies";

export const COOKIE_NAME_USER = "sessionUser";
export const COOKIE_NAME_LOGGED_IN = "seionLoggedIn";
export const COOKIE_NAME_TOKEN = "sessionToken";

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  cartItems: CartItem[];
}

//Initial state
const initialState: AuthState = {
  //cookies.get(COOKIE_NAME_USER) as User |
  user: cookies.get(COOKIE_NAME_USER) as User | null,
  //cookies.get(COOKIE_NAME_LOGGED_IN) ? true :
  isLoggedIn: cookies.get(COOKIE_NAME_LOGGED_IN) ? true : false,
  cartItems: cookies.getCartContent() as [] //| [],
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
        (itemId) => itemId.id === action.payload.id // find index by itemId instead of object
      );
      if (itemIndex === -1) {
        state.cartItems.push(action.payload);
      } else {
        const item = state.cartItems[itemIndex] as CartItem;
        item.quantity += action.payload.quantity;
        state.cartItems[itemIndex] = item;
      }
      cookies.setCartContent(state.cartItems)
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const itemIndex = state.cartItems.findIndex(
        (itemId) => itemId.id === action.payload // find index by itemId instead of object
      );
      if (state.cartItems[itemIndex].quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (itemId) => itemId.id !== action.payload
        );
      } else {
        state.cartItems[itemIndex].quantity -= 1; 
      }
      cookies.setCartContent(state.cartItems);
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const itemIndex = state.cartItems.findIndex(
        (itemId) => itemId.id === action.payload.id // find index by itemId instead of object
      );
      if (itemIndex !== -1) {
        const item = state.cartItems[itemIndex] as CartItem;
        item.quantity = action.payload.quantity;
        state.cartItems[itemIndex] = item;
      }
      cookies.setCartContent(state.cartItems);
    },
    clearCart: (state) => {
      state.cartItems = [];
      cookies.remove(COOKIE_NAME_CART);
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
