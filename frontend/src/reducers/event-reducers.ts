import { initialEventState, singleEventState } from './../state/event-state';
import { FETCH_ALL_EVENTS_REQUEST, FETCH_ALL_EVENTS_SUCCESS, FETCH_ALL_EVENTS_FAIL, FETCH_SINGLE_EVENT_REQUEST, FETCH_SINGLE_EVENT_SUCCESS, FETCH_SINGLE_EVENT_FAILURE, CREATE_NEW_EVENT_REQUEST, CREATE_NEW_EVENT_SUCCESS, CREATE_NEW_EVENT_FAIL, EDIT_EVENT_REQUEST, EDIT_EVENT_SUCCESS, EDIT_EVENT_FAIL, UPLOAD_EVENT_PHOTO_REQUEST, UPLOAD_EVENT_PHOTO_SUCCESS, UPLOAD_EVENT_PHOTO_FAIL } from './../constants/event-constants';
import { IEventState } from 'types/event-types';
import { ISingleEventState } from 'types/event-types';

export const eventsReducer = (state = initialEventState as IEventState, action: any): IEventState => {

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

export const singleEventReducer = (state = singleEventState as ISingleEventState, action: any): ISingleEventState => { // Event Reducer function accepts the initial state and action to dispatch

    switch(action.type) {

         case FETCH_SINGLE_EVENT_REQUEST:
            return {loading: true, error: undefined, event: {} }

        case FETCH_SINGLE_EVENT_SUCCESS:
            return {...state, loading: false, event: action.payload}

        case FETCH_SINGLE_EVENT_FAILURE:
            return {loading: false, error: action.payload.error}

        case CREATE_NEW_EVENT_REQUEST:
            return {loading: true, event: {}, error: undefined}

        case CREATE_NEW_EVENT_SUCCESS:
            return {...state, loading: false, event: action.payload, error: undefined}

        case CREATE_NEW_EVENT_FAIL:
            return {...state, loading: false, error: action.payload, event: {} }

        case EDIT_EVENT_REQUEST:
            return {loading: true, error: undefined, event: {} }

        case EDIT_EVENT_SUCCESS:
            return {...state, loading: false, error: undefined, event: action.payload}

        case EDIT_EVENT_FAIL:
            return {...state, loading: false, error: action.payload, event: {} }

        case UPLOAD_EVENT_PHOTO_REQUEST:
            return {loading: true, message: undefined, error: undefined}

        case UPLOAD_EVENT_PHOTO_SUCCESS:
            return {...state, loading: false, message: action.payload, error: undefined}

        case UPLOAD_EVENT_PHOTO_FAIL:
            return {...state, loading: false, message: undefined, error: action.payload}

        default:
            return state;
    }

}