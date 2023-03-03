
import { ADD_TO_CART, REMOVE_ITEM_FROM_CART, CLEAR_CART } from "constants/cart-constants"

const cartInitialState = {
  cartItems: []   
}

export const addToCartReducer = (state = cartInitialState as any , action: any) => {
    switch(action.type) {

        case ADD_TO_CART:
            return {loading: false, ...state, cartItems: [...state.cartItems, action.cartItems]}

        default:
            return state
    }
}

export const removeItemFromCart = (state = cartInitialState as any, action: any) => {

    switch(action.type) {

        case REMOVE_ITEM_FROM_CART:
            return {loading: false, ...state, cartItems: state.cartItems.filter((currentItemToRemove: any) => currentItemToRemove.id !== action.payload)}

        default:
            return state;
    }


}

export const clearCart = (state = cartInitialState as any, action: any) => {
    switch(action.type) {

        case CLEAR_CART:
            return state.cartItems
    }

    
}