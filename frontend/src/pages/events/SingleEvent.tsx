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
  
  return (

    <>

      <div className = "events-container">
          <h2>{event.name}</h2>
          <img className = "single-event-image" src = {event.image} alt="image"/>

          <p className = "single-event-description">{event.description}</p>

      </div>


    </>
  )
}

export default SingleEvent