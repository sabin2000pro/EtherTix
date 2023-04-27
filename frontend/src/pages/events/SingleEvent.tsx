import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleEvent } from 'actions/event-actions';

const SingleEvent: React.FC = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const {loading, error, event} = useSelector((state: any) => state.event);
  const [ticketCount, setTicketCount] = useState(1);

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
      <div className="single-event-container" style={{display: 'flex'}}>
        <img className="single-event-image" src={event && event.image} alt="Event Image"/>
        <div className="single-event-info">
          <h2 className="single-event-title">{event && event.name}</h2>
          <p className="single-event-description">{event && event.description}</p>
          <div className="ticket-counter">
            <button onClick={() => setTicketCount(ticketCount - 1)}>-</button>
            <p>{ticketCount}</p>
            <button onClick={() => setTicketCount(ticketCount + 1)}>+</button>
          </div>
          <button className="add-to-cart-button">Add to Cart</button>
        </div>
      </div>
    </>
  )
}

export default SingleEvent;