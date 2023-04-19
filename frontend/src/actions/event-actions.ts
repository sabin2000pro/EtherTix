import { FETCH_ALL_EVENTS_REQUEST, FETCH_ALL_EVENTS_SUCCESS, EDIT_EVENT_REQUEST, CREATE_NEW_EVENT_REQUEST, CREATE_NEW_EVENT_SUCCESS, CREATE_NEW_EVENT_FAIL, FETCH_ALL_EVENTS_FAIL, FETCH_SINGLE_EVENT_REQUEST, FETCH_SINGLE_EVENT_FAILURE, FETCH_SINGLE_EVENT_SUCCESS } from './../constants/event-constants'
import axios from 'axios';
import { Dispatch } from 'redux';

export const fetchEventList = () => async (dispatch: Dispatch): Promise<void> => {

    try {
        dispatch({type: FETCH_ALL_EVENTS_REQUEST});

        const {data} = await axios.get(`http://localhost:5301/api/v1/events`);
        dispatch({type: FETCH_ALL_EVENTS_SUCCESS, payload: data.events});
    } 
    
    catch(error: any) {

       if(error) {
           dispatch({type: FETCH_ALL_EVENTS_FAIL, payload: error.data.response.message})
       }

    }

}

export const fetchSingleEvent = (id: number) => async (dispatch: any): Promise<void> => {

    try {

        dispatch({type: FETCH_SINGLE_EVENT_REQUEST});
        const {data} = await axios.get(`http://localhost:5301/api/v1/events/${id}`);

        dispatch({type: FETCH_SINGLE_EVENT_SUCCESS, payload: data.event});
    } 
    
    catch(error: any) {

        if(error) {
            dispatch({type: FETCH_SINGLE_EVENT_FAILURE, payload: error.data.response.message});
        }

    }

}

const validateEventDates = (startAt: Date, endsAt: Date) => {
    const currentDate = new Date();
    return (startAt < currentDate || endsAt < currentDate || endsAt < startAt);
}

export const createNewEvent = (organiser: string, venue: string, tickets: string[], name: string, summary: string, description: string, startAt: Date, endsAt: Date, eventStatus: string, format: string, isOnline: boolean, capacity: number, reservedSeating: boolean, salesStatus: string) => async (dispatch: Dispatch): Promise<void> => {

    try {   

       validateEventDates(startAt, endsAt);
       

       dispatch({type: CREATE_NEW_EVENT_REQUEST});
       const {data} = await axios.post(`http://localhost:5301/api/v1/events`, {organiser, venue, tickets, name, summary, description, startAt, endsAt, eventStatus, format, isOnline, capacity, reservedSeating, salesStatus});

       dispatch({type: CREATE_NEW_EVENT_SUCCESS, payload: data.event});
    } 
    
    catch(error: any) {

       if(error) {
         dispatch({type: CREATE_NEW_EVENT_FAIL, payload: error.data.response.message});
       }

    }
}

export const editEventByID = (id: number) => async (dispatch: Dispatch): Promise<any> => {

    try {
       dispatch({type: EDIT_EVENT_REQUEST});
    } 
    
    catch(error: any) {
   
    }


}

export const uploadEventPhoto = () => async (dispatch: any) => {

    try {
   
    } 
    
    catch(error: any) {
   
    }
}

export const deleteEventByID = (id: number) => async (dispatch: any) => {
    try {
   
    } 
    
    catch(error: any) {
   
    }
}


export const deleteAllEvents = () => async (dispatch: any) => {
    
    try {
   
    } 
    
    catch(error: any) {
   
    }

}