import { FETCH_ALL_EVENTS_REQUEST } from "constants/event-constants"

export const fetchEventList = () => async (dispatch: any) => {

     try {
       dispatch({type: FETCH_ALL_EVENTS_REQUEST});

       const {data} = await axios.get(`http://localhost:5301/api/v1/events`);
       console.log("Events Data : ", data);

       
     } 
     
     catch(error: any) {
    
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