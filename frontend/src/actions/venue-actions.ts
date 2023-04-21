import { Dispatch } from 'redux';
import { FETCH_VENUES_REQUEST, FETCH_VENUES_SUCCESS, FETCH_VENUES_FAIL, FETCH_SINGLE_VENUE_FAIL, FETCH_SINGLE_VENUE_REQUEST, FETCH_SINGLE_VENUE_SUCCESS } from './../constants/venue-constants';

export const fetchAllVenues = (searchKeyword = '') => async (dispatch: Dispatch): Promise<void> => {

}

export const fetchVenueByID = (id: string) => async (dispatch: Dispatch): Promise<void> => {
    
}