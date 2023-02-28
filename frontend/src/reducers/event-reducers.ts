import { FETCH_ALL_EVENTS_REQUEST, FETCH_ALL_EVENTS_REQUEST_SUCCESS, FETCH_ALL_EVENTS_REQUEST_FAILURE, FETCH_SINGLE_EVENT_REQUEST } from './../constants/event-constants';

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
    }

}

export const fetchSingleEventReducer = (state = singleEventState as any, action: any) => {

    switch(action.type) {
         case FETCH_SINGLE_EVENT_REQUEST:
            return {loading: true, ...state, event: {} }
    }


}

export const createNewEventReducer = (state = initialEventState, action: any) => {

}