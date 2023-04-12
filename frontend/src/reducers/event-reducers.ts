import { FETCH_ALL_EVENTS_REQUEST, FETCH_ALL_EVENTS_SUCCESS, FETCH_ALL_EVENTS_FAIL, FETCH_SINGLE_EVENT_REQUEST, FETCH_SINGLE_EVENT_SUCCESS, FETCH_SINGLE_EVENT_FAILURE, CREATE_NEW_EVENT_REQUEST, CREATE_NEW_EVENT_SUCCESS, CREATE_NEW_EVENT_FAIL } from './../constants/event-constants';
import { IEventState } from 'types/event-types';
import { ISingleEventState } from 'types/event-types';

const initialEventState = { // Initial state for the events (empty array)
    events: []
}

const singleEventState = {
    event: {}
}

export const eventsReducer = (state = initialEventState as IEventState, action: any): IEventState => {

    switch(action.type) {

        case FETCH_ALL_EVENTS_REQUEST:
            return {loading: true, error: undefined}

        case FETCH_ALL_EVENTS_SUCCESS:
            return {...state, loading: false, events: action.payload.events}

        case FETCH_ALL_EVENTS_FAIL:
            return {loading: false, error: action.payload.error}

        default:
            return state
    }

}

export const singleEventReducer = (state = singleEventState as ISingleEventState, action: any): ISingleEventState => {

    switch(action.type) {

         case FETCH_SINGLE_EVENT_REQUEST:
            return {loading: true, ...state, event: {}, error: undefined }

        case FETCH_SINGLE_EVENT_SUCCESS:
            return {loading: false, ...state, event: action.payload.event, error: undefined}

        case FETCH_SINGLE_EVENT_FAILURE:
            return {loading: false, error: action.payload.error, event: {}}

        case CREATE_NEW_EVENT_REQUEST:
            return {loading: true, error: undefined, event: {}}

        case CREATE_NEW_EVENT_SUCCESS:
            return {...state, loading: false, error: undefined, event: action.payload}

        case CREATE_NEW_EVENT_FAIL:
            return {loading: false, error: action.payload, event: {} }

        default:
            return state;
    }


}