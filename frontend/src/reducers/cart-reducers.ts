
import { ADD_TO_CART, REMOVE_ITEM_FROM_CART, CLEAR_CART } from "constants/cart-constants"

export interface ICartProps {
    product: any
}


const cartInitialState = {
  cartItems: []   
}

export const addToCartReducer = (state = cartInitialState as any , action: any) => {

    switch(action.type) {

        case ADD_TO_CART:
            const currentCartItem = action.payload// Get the current cart item
            const currentCartItemExists = state.cartItems.find((currItem: any) => currItem.product === currentCartItem)

            if(currentCartItemExists) { // @TODO
                
            }

            else {
                return {...state, cartItems: [...state.cartItems, currentCartItem]}
            }


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