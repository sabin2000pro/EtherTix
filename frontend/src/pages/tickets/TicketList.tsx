import React, {useState, useEffect} from 'react'
import { CartItem } from 'models/cart';
import { addToCart, removeItemFromCart } from 'actions/cart-actions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTickets } from 'actions/ticket-actions';

const TicketList = () => { // component that is responsible for fetching ticket data and renders in a drop-down menu next to an event

  return (

    <>
      <h2>Available Tickets - Dashboard</h2>
    </>


  )
}

export default TicketList