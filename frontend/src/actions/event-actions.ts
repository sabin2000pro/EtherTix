import { FETCH_ALL_EVENTS_REQUEST, FETCH_ALL_EVENTS_SUCCESS, FETCH_ALL_EVENTS_FAIL, FETCH_SINGLE_EVENT_REQUEST, FETCH_SINGLE_EVENT_FAILURE, FETCH_SINGLE_EVENT_SUCCESS } from './../constants/event-constants'
import axios from 'axios';
import { Dispatch } from 'redux';

export const fetchEventList = () => async (dispatch: Dispatch): Promise<void> => {

    try {
        dispatch({type: FETCH_ALL_EVENTS_REQUEST});

        const {data} = await axios.get(`http://localhost:5301/api/v1/events`);
        console.log(`Logged events : `, data.events);
        dispatch({type: FETCH_ALL_EVENTS_SUCCESS, payload: data.events});
    } 
    
    catch(error: any) {

       if(error) {
        console.log(`Fetch Events Error : `, error);
           dispatch({type: FETCH_ALL_EVENTS_FAIL, payload: error.data.response.message})
       }


    }
}

export const fetchSingleEvent = (id: number) => async (dispatch: any): Promise<void> => {

    try {
        dispatch({type: FETCH_ALL_EVENTS_REQUEST});

        const {data} = await axios.get(`http://localhost:5301/api/v1/events/${id}`);
        console.log(`Event data : `, data);

        dispatch({type: FETCH_SINGLE_EVENT_SUCCESS, payload: data.event});
    } 
    
    catch(error: any) {

        if(error) {

            dispatch({type: FETCH_SINGLE_EVENT_FAILURE, payload: error.data.response.message});
        }
    }

}

export const createNewEvent = () => async (dispatch: any) => {
    try {
   
    } 
    
    catch(error: any) {
   
    }


}

export const editEventByIDAction = (id: number) => async (dispatch: any) => {

    try {
   
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