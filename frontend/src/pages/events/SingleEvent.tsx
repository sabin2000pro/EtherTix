import React, { useState, useEffect } from 'react'
import {useNavigate, useParams} from 'react-router-dom';
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
    
    </div>


    </>
  )
}

export default SingleEvent