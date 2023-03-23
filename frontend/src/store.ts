import { ticketsReducer, singleTicketReducer } from './reducers/ticket-reducers'
import {configureStore} from '@reduxjs/toolkit'
import { eventsReducer, singleEventReducer } from 'reducers/event-reducers'
import { addToCartReducer, removeItemFromCart } from 'reducers/cart-reducers'

// Global store
const store: any = configureStore({

    reducer: {
       tickets: ticketsReducer,
       ticket: singleTicketReducer,
       events: eventsReducer,
       event: singleEventReducer,
       addToCart: addToCartReducer,
       removeFromCart: removeItemFromCart
    }
    
})


export default store