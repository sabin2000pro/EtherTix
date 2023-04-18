import { ticketsReducer, singleTicketReducer } from './reducers/ticket-reducers'
import {configureStore} from '@reduxjs/toolkit'
import { cartReducers } from 'reducers/cart-reducers'
import { eventsReducer } from 'reducers/event-reducers'
import { authReducer } from 'reducers/auth-reducer'

// Global store
export const store = configureStore({

    reducer: {
       tickets: ticketsReducer,
       ticket: singleTicketReducer,
       events: eventsReducer,
       cart: cartReducers,
       auth: authReducer
    }
    
})
