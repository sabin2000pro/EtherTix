import { FETCH_BOOKINGS_REQUEST, FETCH_BOOKINGS_FAIL, FETCH_SINGLE_BOOKING_SUCCESS } from "constants/booking-constants"

export interface IBooking {
    bookings: any[],
    loading?: boolean,
    message?: string,
    error?: string
}

export interface ISingleBooking {
    
}

const initialBookingState = {
    bookings: [],   
}

const bookingState = {
    booking: {}
}

export const bookingReducers = (state = initialBookingState, action: any) => {

    switch(action.type) {

        case FETCH_BOOKINGS_REQUEST:
            return {loading: true, error: undefined, bookings: [] }

        
    
        default:
            return state
    }    


}

export const singleBookingReducer = (state = bookingState, action: any) => {

    switch(action.type) {
        
        default:
            return state;
    }

}