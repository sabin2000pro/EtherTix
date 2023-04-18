import { ADD_TO_CART, REMOVE_ITEM_FROM_CART } from "constants/cart-constants";
import { Dispatch } from "redux";
import axios from 'axios';

export const addToCart = (id: string, currQuantity: number) => async (dispatch: Dispatch, getState: any): Promise<void> => {
    try {
        const {data} = await axios.get(`http://localhost:5303/api/v1/tickets/${id}`);
        dispatch({type: ADD_TO_CART, payload: {name: data.ticket.name, ticketClass: data.ticket.ticketClass, quantity: Number(currQuantity)}  })

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