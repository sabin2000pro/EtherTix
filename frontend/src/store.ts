import { fetchAllTicketsReducer, fetchSingleTicketByIDReducer } from './reducers/ticket-reducers'
import {configureStore} from '@reduxjs/toolkit'
import { fetchAllEvents, fetchSingleEventReducer } from 'reducers/event-reducers'

const store: any = configureStore({

    reducer: {
       tickets: fetchAllTicketsReducer,
       ticket: fetchSingleTicketByIDReducer,

       events: fetchAllEvents,
       event: fetchSingleEventReducer
    }
    
})


export default store