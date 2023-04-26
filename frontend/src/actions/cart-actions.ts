import { ADD_TO_CART, REMOVE_ITEM_FROM_CART } from "constants/cart-constants";
import { Dispatch } from "redux";
import axios from 'axios';

// @function-description: Adds one or more tickets to cart. The function accepts the ticket ID to be fetched from the backend including the current quantity chosen
export const addToCart = (id: string, currQuantity: number) => async (dispatch: Dispatch, getState: any): Promise<void> => {

    try {

        const {data} = await axios.get(`https://ethertix.co.uk/api/v1/tickets/${id}`); // Fetch the ticket ID to add to cart
        dispatch({type: ADD_TO_CART, payload: {name: data.ticket.name, ticketClass: data.ticket.ticketClass, quantity: Number(currQuantity)    }})
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
    }
    
    catch(error) {

        if(error) {
            return console.error(error);
        }

    }
}

export const removeItemFromCart = (id: string) => async (dispatch: Dispatch, getState: any): Promise<void> => {

    try {
        dispatch({type: REMOVE_ITEM_FROM_CART, payload: id});
        localStorage.setItem('basketItems', JSON.stringify(getState().cart.cartItems))
    } 
    
    catch(error) {

     if(error) {
        return console.error(error);
      }

    }
}