import { FETCH_ALL_TICKETS_REQUEST, FETCH_ALL_TICKETS_SUCCESS, FETCH_ALL_TICKETS_FAIL, FETCH_SINGLE_TICKET_REQUEST, FETCH_SINGLE_TICKET_SUCESS, FETCH_SINGLE_TICKET_FAIL } from './../constants/ticket-constants';

const initialTicketsState = {
    tickets: [] // Initial state for the tickets
}

const singleTicketState = {
    ticket: {}
}

export const fetchAllTicketsReducer = (state = initialTicketsState as any, action: any) => {

    switch(action.type) {

        case FETCH_ALL_TICKETS_REQUEST:
            return {loading: true, tickets: []}

        case FETCH_ALL_TICKETS_SUCCESS:
            return {loading: false, ...state, tickets: action.payload.tickets}

        case FETCH_ALL_TICKETS_FAIL:
            return {loading: false, error: action.payload.error, message: action.payload.error.message}

        default: // By default just return the state
            return state
    }


}

export const fetchSingleTicketByIDReducer = (state = singleTicketState as any, action: any) => {

    switch(action.type) {

        case FETCH_SINGLE_TICKET_REQUEST: // In the event of requesting a single ticket
            return {loading: true, ticket: {} }

        case FETCH_SINGLE_TICKET_SUCESS: // In the event that the ticket was fetched, we return all the state, then the payload object is set to the ticket object
            return {loading: false, ...state, ticket: action.payload.ticket}

        case FETCH_SINGLE_TICKET_FAIL:
            return {loading: false, error: action.payload.error, message: action.payload.error.message}

        default:
            return state;
    }

}