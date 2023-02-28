
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

