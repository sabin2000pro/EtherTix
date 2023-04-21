import { Dispatch } from 'redux';

export const fetchBookings = () => async (dispatch: Dispatch): Promise<void> => {
    try {
        
    } 
    
    catch(error) {

    }
}

export const fetchSingleBooking = (id: string) => async (dispatch: Dispatch): Promise<void> => {
    try {

    } 
    
    catch(error) {

    }
}

export const createNewBooking = (eventId: string, userId: string, tickets: string[], totalPrice: Number) => async (dispatch: Dispatch): Promise<void> => {

} 

export const deleteBookings = () => async (dispatch: Dispatch): Promise<void> => {

}

export const deleteBookingByID = (id: string) => async (dispatch: Dispatch): Promise<void> => {

}

export const cancelBooking = (id: string) => async (dispatch: Dispatch): Promise<void> => {

}