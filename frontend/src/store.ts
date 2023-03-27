import { ticketsReducer, singleTicketReducer } from './reducers/ticket-reducers'
import {configureStore} from '@reduxjs/toolkit'
/*import { fetchAllEvents, fetchSingleEventReducer } from 'reducers/event-reducers'*/
import { addToCartReducer, removeItemFromCart } from 'reducers/cart-reducers'


const store: any = configureStore({

    reducer: {
       tickets: ticketsReducer,
       ticket: singleTicketReducer,

      /* events: fetchAllEvents,
       event: fetchSingleEventReducer,*/
       addToCart: addToCartReducer,
       removeFromCart: removeItemFromCart
    }
    
})


export default store