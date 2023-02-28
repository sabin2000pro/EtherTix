import { FETCH_ALL_EVENTS_REQUEST, FETCH_ALL_EVENTS_REQUEST_SUCCESS, FETCH_ALL_EVENTS_REQUEST_FAILURE, FETCH_SINGLE_EVENT_REQUEST, FETCH_SINGLE_EVENT_SUCCESS, FETCH_SINGLE_EVENT_FAILURE } from './../constants/event-constants';

interface IEventState {
    loading: boolean,
    error?: string
}

const initialEventState = { // Initial state for the events (empty array)
    events: []
}

const singleEventState = {
    event: {}
}

export const fetchAllEvents = (state = initialEventState as any, action: any) => {


    switch(action.type) {

        case FETCH_ALL_EVENTS_REQUEST:
            return {loading: true, ...state, events: []}

        case FETCH_ALL_EVENTS_REQUEST_SUCCESS:
            return {loading: false, ...state, events: action.payload.events}

        case FETCH_ALL_EVENTS_REQUEST_FAILURE:
            return {loading: false, error: action.payload.error, message: action.payload.error.message}

        default:
            return state
    }

}

export const fetchSingleEventReducer = (state = singleEventState as any, action: any) => {

    switch(action.type) {

         case FETCH_SINGLE_EVENT_REQUEST:
            return {loading: true, ...state, event: {} }

        case FETCH_SINGLE_EVENT_SUCCESS:
            return {loading: false, ...state, event: action.payload.event}

        case FETCH_SINGLE_EVENT_FAILURE:
            return {loading: false, error: action.payload.error, message: action.payload.error.message}

        default:
            return state;
    }


}

export const createNewEventReducer = (state = initialEventState, action: any) => {
    switch(action.type) {


        default:
            return state
    }
}

export const updateEventReducer = (state = singleEventState, action: any) => {
    
}