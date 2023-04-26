import { FETCH_ALL_TICKETS_REQUEST, FETCH_ALL_TICKETS_SUCCESS, FETCH_ALL_TICKETS_FAIL, FETCH_SINGLE_TICKET_REQUEST, FETCH_SINGLE_TICKET_SUCCESS, FETCH_SINGLE_TICKET_FAIL, CREATE_TICKET_REQUEST, CREATE_TICKET_SUCCESS, CREATE_TICKET_FAIL, EDIT_TICKET_REQUEST, EDIT_TICKET_FAIL, EDIT_TICKET_SUCCESS, DELETE_TICKET_REQUEST, DELETE_TICKET_FAIL, DELETE_TICKET_SUCCESS } from './../constants/ticket-constants';
import axios from 'axios';
import { Dispatch } from 'redux';

export const fetchAllTickets = () => async (dispatch: any) => {

    try {

        dispatch({type: FETCH_ALL_TICKETS_REQUEST});
        const {data} = await axios.get(`https://ethertix.co.uk/api/tickets`);
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

           if(!id) {

           }

           dispatch({type: FETCH_SINGLE_TICKET_REQUEST});
           const {data} = await axios.get(`https://ethertix.co.uk/api/tickets/${id}`)

           dispatch({type: FETCH_SINGLE_TICKET_SUCCESS, payload: data.ticket});
    } 
    
    catch(error: any) {

      if(error) {
          dispatch({type: FETCH_SINGLE_TICKET_FAIL, payload: error.response.data.message })
      }

    }

}

const validateTicketIssuer = (event: string, issuer: string): void => {

    try {

        if(event === undefined || issuer === undefined) {
            throw new Error(`Event ID and/or issuer ID must be present before creating new ticket`)
        }

    } 
    
    catch(error: any) {

        if(error) {
            throw new Error(error);
        }


    }


}
 
export const createTicket = (event: string, issuer: string, name: string, ticketClass: string, stock: Number, description: string, cost: Number) => async (dispatch: Dispatch): Promise<void> => {
    try {
        
        validateTicketIssuer(event, issuer);
        dispatch({type: CREATE_TICKET_REQUEST});
        const {data} = await axios.post(`https://ethertix.co.uk/api/v1/tickets`, {event, issuer, name, ticketClass, stock, description, cost})

        dispatch({type: CREATE_TICKET_SUCCESS, payload: data.ticket});
    } 
    
    catch(error: any) {

      if(error) {
        dispatch({type: CREATE_TICKET_FAIL, payload: error.response.data.message});
      }


    }
}

const validateEditTicketDetails = (id: string, name: string, ticketClass: string, stock: Number, description: string, cost: Number): void => {
    // Validate missing fields
    
    if(!id || !name || ! ticketClass || !stock || !description || !cost) {

    }

    if(stock === 0) {

    }

    
}

export const editTicketDetails = (id: string, name: string, ticketClass: string, stock: Number, description: string, cost: Number) => async (dispatch: Dispatch): Promise<void> => {
    try {


        validateEditTicketDetails(id, name, ticketClass, stock, description, cost);
        dispatch({type: EDIT_TICKET_REQUEST});
        const {data} = await axios.put(`https://ethertix.co.uk/api/v1/tickets/${id}`, {name, ticketClass, stock, description, cost});

        dispatch({type: EDIT_TICKET_SUCCESS, payload: data.message});
    }
    
    catch(error: any) {

     if(error) {
        dispatch({type: EDIT_TICKET_FAIL, payload: error.response.data.message});
     }

    }


}

export const deleteTicketByID = (id: string) => async (dispatch: Dispatch): Promise<void> => {

    try {

        if(!id) {
            throw new Error(`Cannot delete the ticket. No id found`)
        }

        const {data} = await axios.delete(`https://ethertix.co.uk/api/v1/tickets/${id}`)

        dispatch({type: DELETE_TICKET_SUCCESS, payload: data.message});

    }

     catch(error: any) {

        if(error) {
            dispatch({type: DELETE_TICKET_FAIL, payload: error.response.data.message});
        }

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