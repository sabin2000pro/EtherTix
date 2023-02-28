import { FETCH_ALL_EVENTS_REQUEST, FETCH_ALL_EVENTS_REQUEST_SUCCESS } from './../constants/event-constants';

const initialEventState = {
    events: []
}

const singleEventState = {
    event: {}
}

export const fetchAllEvents = (state = initialEventState, action: any) => {


    switch(action.type) {

        case FETCH_ALL_EVENTS_REQUEST:
            return {loading: true, ...state, events: []}

        case FETCH_ALL_EVENTS_REQUEST_SUCCESS
    }

}

export const fetchSingleEventReducer = (state = singleEventState as any, action: any) => {

    switch(action.type) {

    }


}

export const createNewEventReducer = (state = initialEventState, action: any) => {

}