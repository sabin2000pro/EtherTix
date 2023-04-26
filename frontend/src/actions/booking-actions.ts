import { FETCH_BOOKINGS_REQUEST, FETCH_SINGLE_BOOKING_REQUEST, FETCH_BOOKINGS_FAIL } from './../constants/booking-constants';
import { Dispatch } from 'redux';
import axios from 'axios';

export const fetchBookings = () => async (dispatch: Dispatch): Promise<void> => {

    try {

        dispatch({type: FETCH_BOOKINGS_REQUEST});
        const {data} = await axios.get(`https:/ethertix.co.uk/api/v1/bookings`);
        
        console.log(data);
    } 
    
    catch(error: any) {

        if(error) {
            dispatch({type: FETCH_BOOKINGS_FAIL, payload: error.data.response.message});
        }


    }
}

export const fetchSingleBooking = (id: string) => async (dispatch: Dispatch): Promise<void> => {

    try {

        if(!id) {
            throw new Error(`ID ${id} not found`);
        }

        dispatch({type: FETCH_SINGLE_BOOKING_REQUEST});

        const {data} = await axios.get(`https://ethertix.co.uk/api/v1/bookings/${id}`);
        console.log(data);

        


    } 
    
    catch(error) {

    }
}

export const createNewBooking = (eventId: string, userId: string, tickets: string[], totalPrice: Number) => async (dispatch: Dispatch): Promise<void> => {
    try {
    
    } 
     
    catch(error) {
    
    }
} 

export const deleteBookings = () => async (dispatch: Dispatch): Promise<void> => {
    try {

    }
    
    catch(error) {

    }


}

export const deleteBookingByID = (id: string) => async (dispatch: Dispatch): Promise<void> => {
    try {

    }
    
    catch(error) {

    }

}

export const cancelBooking = (id: string) => async (dispatch: Dispatch): Promise<void> => {
    try {

    }
    
    catch(error) {

    }


}