import { FETCH_ALL_TICKETS_REQUEST, FETCH_ALL_TICKETS_SUCCESS, FETCH_ALL_TICKETS_FAIL } from './../constants/ticket-constants';


export const fetchAllTicketsReducer = (state: any, action: any) => {

    switch(action.type) {
        case FETCH_ALL_TICKETS_REQUEST:
            return {loading: true, payload: action.payload}

        case FETCH_ALL_TICKETS_SUCCESS:
            return {loading: false, ...state, payload: action.payload.tickets}

        case FETCH_ALL_TICKETS_FAIL:
            return {loading: false, error: action.payload.error, message: action.payload.error}

        default:
            return state
    }
}

export const fetchSingleTicketByIDReducer = (state: any, action: any) => {
    
}