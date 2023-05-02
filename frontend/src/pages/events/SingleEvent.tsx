import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleEvent } from "actions/event-actions";
import * as stor from "../../auth/store";
import { CartItem } from "models/cart";

const SingleEvent: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, event } = useSelector((state: any) => state.event);
  const [ticketCount, setTicketCount] = useState(0);

  useEffect(() => {
    const getSingleEvent = async () => {
      try {
        dispatch(fetchSingleEvent(id as any) as any);
      } catch (error) {
        if (error) {
          return console.error(error);
        }
      }
    };

    getSingleEvent();
  }, [dispatch, id]);

  const handleDecrement = () => {
    if (ticketCount > 0) {
      setTicketCount(ticketCount - 1);
    }
  };

  const handleAddtoCart = () => {
    const item = event;
    const data: CartItem = {
      id: item.ticket.id,
      name: item.ticket.name,
      price: item.ticket.price,
      image: item.ticket.image,
      quantity: ticketCount,
    };
    dispatch(stor.addItem(data));
  };

  return (
    <>
      {!loading && (
        <>
          <div className="single-event-container">
            <img
              className="single-event-image"
              src={event.image}
              alt="Event Image"
            />

            <div className="single-event-info">
              <h2 className="single-event-title">{event && event.name}</h2>
              <p className="single-event-description">
                {event && event.description}
              </p>
            </div>

            <div className="ticket-counter">
              <button onClick={handleDecrement}>-</button>
              <span>{ticketCount}</span>
              <button onClick={() => setTicketCount(ticketCount + 1)}>+</button>
              <button onClick={handleAddtoCart} disabled={ticketCount === 0}>
                Add to Cart
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SingleEvent;
