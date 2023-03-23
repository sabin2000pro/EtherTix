import { FETCH_ALL_TICKETS_REQUEST, FETCH_ALL_TICKETS_SUCCESS, FETCH_ALL_TICKETS_FAIL, FETCH_SINGLE_TICKET_REQUEST, FETCH_SINGLE_TICKET_SUCCESS, FETCH_SINGLE_TICKET_FAIL, CREATE_TICKET_REQUEST, CREATE_TICKET_SUCCESS, CREATE_TICKET_FAIL, EDIT_TICKET_REQUEST } from './../constants/ticket-constants';
import axios from 'axios';
import { Dispatch } from 'redux';

export const fetchAllTickets = (keyword = '', page = 1) => async (dispatch: any) => {

    try {

        dispatch({type: FETCH_ALL_TICKETS_REQUEST});

        const {data} = await axios.get(`http://localhost:5303/api/tickets?keyword=${keyword}`);

        console.log(`All Tickets : `, data.tickets);
        dispatch({type: FETCH_ALL_TICKETS_SUCCESS, payload: data.tickets});

    } 
    
    catch(error: any) {

        if(error) {
            console.log(`Fetch Event Tickets Fail : `, error);
            dispatch({type: FETCH_ALL_TICKETS_FAIL, payload: {error: error.response.data}  })
        }

    }


}

// @description: Returns a single ticket by its ID
// @parameters: Ticket ID

export const fetchTicketByID = (id: number) => async (dispatch: Dispatch): Promise<void> => {

       try {

           dispatch({type: FETCH_SINGLE_TICKET_REQUEST});
           const {data} = await axios.get(`http://localhost:5303/api/tickets/${id}`)

           dispatch({type: FETCH_SINGLE_TICKET_SUCCESS, payload: data.ticket});
    } 
    
    catch(error: any) {

      if(error) {
          dispatch({type: FETCH_SINGLE_TICKET_FAIL, payload: error.response.data.message })
      }

    }

}

export const createTicket = (event: string, issuer: string, name: string, ticketClass: string, stock: Number, description: string, cost: Number) => async (dispatch: Dispatch): Promise<void> => {
    try {
        dispatch({type: CREATE_TICKET_REQUEST});

        const {data} = await axios.post(`http://localhost:5303/api/v1/tickets`, {event, issuer, name, ticketClass, stock, description, cost})

        console.log(`Created Ticket Data : `, data);
        dispatch({type: CREATE_TICKET_SUCCESS, payload: data.ticket});
    } 
    
    catch(error: any) {

      if(error) {
        console.log(`Create Ticket Error : `, error);
        dispatch({type: CREATE_TICKET_FAIL, payload: error.response.data.message});
      }


    }
}

export const editTicketDetails = (id: string, name: string, ticketClass: string, stock: Number, description: string, cost: Number) => async (dispatch: Dispatch): Promise<void> => {
    try {
        dispatch({type: EDIT_TICKET_REQUEST});

        const {data} = await axios.put(`http://localhost:5303/api/v1/tickets/${id}`, {name, ticketClass, stock, description, cost});

        console.log(`Updated Ticket Data : `, data);
    }
    
    catch(error) {

    }


}

export const deleteTicketByID = (id: string) => async (dispatch: Dispatch): Promise<void> => {
    try {

    }

     catch(error) {

     }

}

export const deleteTickets = () => async (dispatch: Dispatch): Promise<void> => {
    try {

    }
    
    catch(error: any) {

      if(error) {

      }

    }


}