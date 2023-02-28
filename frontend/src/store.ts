import { fetchAllTicketsReducer, fetchSingleTicketByIDReducer } from './reducers/ticket-reducers'
import {configureStore} from '@reduxjs/toolkit'
import { fetchAllEvents, fetchSingleEventReducer } from 'reducers/event-reducers'
import { cartReducer } from 'reducers/cart-reducers'

const store: any = configureStore({

    reducer: {
       tickets: fetchAllTicketsReducer,
       ticket: fetchSingleTicketByIDReducer,

       events: fetchAllEvents,
       event: fetchSingleEventReducer,
       cart: cartReducer(1)
    }
    
})


export default store