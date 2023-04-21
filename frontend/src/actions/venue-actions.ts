import { Dispatch } from 'redux';
import { FETCH_VENUES_REQUEST, FETCH_VENUES_SUCCESS, FETCH_VENUES_FAIL, FETCH_SINGLE_VENUE_FAIL, FETCH_SINGLE_VENUE_REQUEST, FETCH_SINGLE_VENUE_SUCCESS } from './../constants/venue-constants';

export const fetchAllVenues = (searchKeyword = '') => async (dispatch: Dispatch): Promise<void> => {
    try {

    }
    
    catch(error) {

    }
}

export const fetchVenueByID = (id: string) => async (dispatch: Dispatch): Promise<void> => {
    try {

    } 
    
    catch(error) {

    }
}

export const createVenueLocation = (event: string, name: string, email: string, phone: string, ageRestriction: string, venueCapacity: number, openTime: Date, closeTime: Date, hasPublicAccess: boolean, smokingAllowed: boolean, address: string) => async (dispatch: Dispatch): Promise<void> => {

}

export const editVenueDetails = (id: string) => async (dispatch: Dispatch): Promise<void> => {

}

export const deleteVenueByID = (id: string) => async (dispatch: Dispatch): Promise<void> => {
    try {

    } 
    
    catch(error) {

    }
}

export const editVenueDates = (id: string, newOpenDate: Date, newCloseDate: Date) => async (dispatch: Dispatch): Promise<void> => {
    try {

    } 
    
    catch(error) {

    }
}