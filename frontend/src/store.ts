import { ticketsReducer, singleTicketReducer } from './reducers/ticket-reducers'
import {configureStore} from '@reduxjs/toolkit'
import { addToCartReducer, removeItemFromCart } from 'reducers/cart-reducers'
import { eventsReducer } from 'reducers/event-reducers'

// Global store
export const store = configureStore({

    reducer: {
       tickets: ticketsReducer,
       ticket: singleTicketReducer,
       events: eventsReducer,
       addToCart: addToCartReducer,
       removeFromCart: removeItemFromCart
    }
    
})
