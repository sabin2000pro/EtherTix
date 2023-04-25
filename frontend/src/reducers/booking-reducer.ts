import { ISingleBooking, IBooking } from './interfaces/booking-interfaces';
import { FETCH_BOOKINGS_REQUEST, FETCH_BOOKINGS_FAIL, FETCH_SINGLE_BOOKING_SUCCESS } from "constants/booking-constants"

import { initialBookingsState, initialBookingState } from 'state/booking-state';


export const bookingReducers = (state = initialBookingsState as IBooking, action: any) => {

    switch(action.type) {

        case FETCH_BOOKINGS_REQUEST:
            return {loading: true, error: undefined, bookings: [] }

        
    
        default:
            return state
    }    


}

export const singleBookingReducer = (state = initialBookingState as ISingleBooking, action: any) => {

    switch(action.type) {
        
        default:
            return state;
    }

}