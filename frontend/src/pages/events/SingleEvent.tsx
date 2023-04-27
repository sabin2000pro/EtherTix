import React, {useEffect } from 'react'
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleEvent } from 'actions/event-actions';

const SingleEvent: React.FC = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const {loading, error, event} = useSelector((state: any) => state.event);

   useEffect(() => {
    
    const getSingleEvent = async () => {

       try {
           dispatch(fetchSingleEvent(id as any) as any);
       } 
       
       catch(error) {

        if(error) {
          return console.error(error);
        }


       }
    }

    getSingleEvent();

   }, [dispatch, id])

   const handleAddToCart = () => {
    // Add the selected number of tickets to the cart
  };

   console.log(`Loading ? `, loading);
  
  return (

    <>

    <div className = "events-container">

        <h2>{event && event.name}</h2>

        <img className = "single-event-image" src = {event && event.image} alt="image"/>

        <text className = "single-event-description">{event && event.description}</text>

        <button onClick ={handleAddToCart}>Add To Cart</button>

    </div>
    </>
  )
}

export default SingleEvent