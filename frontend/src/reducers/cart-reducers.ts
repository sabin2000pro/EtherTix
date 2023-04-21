import { ADD_TO_CART, REMOVE_ITEM_FROM_CART, CLEAR_CART } from "constants/cart-constants"
import { initialCartState } from "state/cart-state"

export const cartReducers = (state = initialCartState as any , action: any) => {

    switch(action.type) {

        case ADD_TO_CART:

            const currentCartItem = action.payload// Get the current cart item
            const currentCartItemExists = state.cartItems.find((currItem: any) => currItem.product === currentCartItem)

            if(currentCartItemExists) {
                return {...state, cartItems: state.cartItems.map((cartItem: any) => cartItem.product === currentCartItemExists.product ? currentCartItem : cartItem)}
            }

            else {
                return {...state, cartItems: [...state.cartItems, currentCartItem]}
            }

        case REMOVE_ITEM_FROM_CART:
            return {...state, cartItems: state.cartItems.filter((currItem: any) => currItem.item !== action.payload)}

        case CLEAR_CART:
            return {...state, cartItems: [] }

        default:
            return state
    }

}