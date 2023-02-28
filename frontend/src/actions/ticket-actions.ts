import { FETCH_ALL_TICKETS_REQUEST, FETCH_ALL_TICKETS_SUCCESS, FETCH_ALL_TICKETS_FAIL, FETCH_SINGLE_TICKET_REQUEST, FETCH_SINGLE_TICKET_SUCESS, FETCH_SINGLE_TICKET_FAIL } from './../constants/ticket-constants';
import axios from 'axios';

const TICKETS_URI = `http://localhost:5303/api/tickets`;

export const fetchAllTickets = () => async (dispatch: any) => {

    try {

        dispatch({type: FETCH_ALL_TICKETS_REQUEST});

        const response = await axios.get(TICKETS_URI);

        console.log(`Response `, response);

        dispatch({type: FETCH_ALL_TICKETS_SUCCESS, payload: { tickets: response.data }});

        console.log(`Response : `, response.data);

    } 
    
    catch(error: any) {

        if(error) {
            console.log(error.response.data);
            dispatch({type: FETCH_ALL_TICKETS_FAIL, payload: {error: error.response.data}  })
        }

    }


}

export const fetchTicketByID = (id: number) => async (dispatch: any) => {

       try {

           dispatch({type: FETCH_SINGLE_TICKET_REQUEST});
           const response = await axios.get(`${TICKETS_URI}/${id}`);

           dispatch({type: FETCH_SINGLE_TICKET_SUCESS, payload: {ticket: response.data}});

           console.log(`Single Ticket Response : `, response)

    } 
    
    catch(error: any) {

      if(error) {
          dispatch({type: FETCH_SINGLE_TICKET_FAIL, payload: {error: error.response.data} })
      }

    }

}