import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleEvent } from "actions/event-actions";
import * as stor from "../../auth/store";
import { CartItem } from "models/cart";
import { Col, Container, Row } from "react-bootstrap";

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
        <Container
          style={{
            marginTop: "60px",
            // marginLeft: "180px",
            border: "2px solid black",
            borderRadius: "15px",
            justifyContent: "center"
          }}
        >
          <div className="single-event-container">
            <Row>
              <Col>
                <img
                  className="single-event-image"
                  src={`/${event.image}`}
                  alt="Event_Image"
                  style={{
                    height: "300px",
                    width: "600px",
                  }}
                />
              </Col>
              <Col>
                <div className="single-event-info">
                  <h2 className="single-event-title">{event && event.name}</h2>
                  <p className="single-event-description">
                    {event && event.description}
                  </p>
                </div>
              </Col>
            </Row>
            <Row style={{ justifyContent: "center", marginTop: "100px" }}>
              <div className="ticket-counter">
                <button onClick={handleDecrement}>-</button>
                <span style={{ margin: "5px" }}>{ticketCount}</span>
                <button onClick={() => setTicketCount(ticketCount + 1)}>
                  +
                </button>
                <button
                  onClick={handleAddtoCart}
                  disabled={ticketCount === 0}
                  style={{ margin: "10px" }}
                >
                  Add to Cart
                </button>
              </div>
            </Row>
          </div>
        </Container>
      )}
    </>
  );
};

export default SingleEvent;
