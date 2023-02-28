import { fetchAllTicketsReducer, fetchSingleTicketByIDReducer } from './reducers/ticket-reducers'
import {configureStore} from '@reduxjs/toolkit'

const store: any = configureStore({

    reducer: {
       tickets: fetchAllTicketsReducer,
       ticket: fetchSingleTicketByIDReducer
    }
    
})


export default store