import { FETCH_ALL_EVENTS_REQUEST, FETCH_ALL_EVENTS_SUCCESS, FETCH_ALL_EVENTS_FAIL, FETCH_SINGLE_EVENT_REQUEST, FETCH_SINGLE_EVENT_SUCCESS, FETCH_SINGLE_EVENT_FAILURE, CREATE_NEW_EVENT_REQUEST, CREATE_NEW_EVENT_SUCCESS, CREATE_NEW_EVENT_FAIL } from './../constants/event-constants';
import { IEventState } from 'types/event-types';
import { ISingleEventState } from 'types/event-types';

const initialEventState = { // Initial state for the events (empty array)
    events: []
}

const singleEventState = {
    event: {}
}

export const eventsReducer = (state = initialEventState as any, action: any): any => {

    switch(action.type) {

        case FETCH_ALL_EVENTS_REQUEST:
            return {loading: true}

        case FETCH_ALL_EVENTS_SUCCESS:
            return {...state, loading: false, events: action.payload}

        case FETCH_ALL_EVENTS_FAIL:
            return {loading: false, error: action.payload.error}

        default:
            return state
    }

}

export const singleEventReducer = (state = singleEventState as ISingleEventState, action: any): ISingleEventState => {

    switch(action.type) {

         case FETCH_SINGLE_EVENT_REQUEST:
            return {loading: true }

        case FETCH_SINGLE_EVENT_SUCCESS:
            return {...state, loading: false, event: action.payload}

        case FETCH_SINGLE_EVENT_FAILURE:
            return {loading: false, error: action.payload.error}

        default:
            return state;
    }


}