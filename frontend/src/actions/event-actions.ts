<<<<<<< HEAD
import { FETCH_ALL_EVENTS_REQUEST, FETCH_ALL_EVENTS_SUCCESS, FETCH_ALL_EVENTS_FAIL } from './../constants/event-constants'
import axios from 'axios';


export const fetchEventList = () => async (dispatch: any) => {
    
     try {
        dispatch({type: FETCH_ALL_EVENTS_REQUEST});

        const {data} = await axios.get(`http://localhost:5301/api/v1/events`);
        console.log(`Event data : `, data);

        dispatch({type: FETCH_ALL_EVENTS_SUCCESS, payload: data.events});
=======
import { FETCH_ALL_EVENTS_REQUEST } from "constants/event-constants"

export const fetchEventList = () => async (dispatch: any) => {

     try {
       dispatch({type: FETCH_ALL_EVENTS_REQUEST});

       const {data} = await axios.get(`http://localhost:5301/api/v1/events`);
       console.log("Events Data : ", data);

       
>>>>>>> cc4c8d176be4f7b508942171efec4e3c11fdd446
     } 
     
     catch(error: any) {
        dispatch({FETCH_ALL_EVENTS_FAIL, payload: error.data.response.message})
     }
     
}

export const fetchSingleEvent = (id: number) => async (dispatch: any) => {
    try {
   
    } 
    
    catch(error: any) {
   
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