import React, { useState, useEffect, useRef} from "react";
import axios from "axios";
import { Card, Container, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {useParams} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { fetchEventList } from "actions/event-actions";

interface Event {
  id: number;
  name: string;
  description: string;
  image: string;
}

const EventList: React.FC = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
   /* const {error, events} = useSelector((state: any) => state.events);*/
    const [events] = useState<Array<{ id: number; name: string; description: string; image: string }>>([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const rowRef = useRef(null);

   useEffect(() => {

      const loadEvents = async () => {
        
        try {
           dispatch(fetchEventList() as any)
        } 
        
        catch (error) {
          console.error(error);
        }
      };
  
      loadEvents();
    }, []); 

    const goToEvent = () => {
       navigate(`/events/${id}`)
    }

    const scrollLeft = () => {
      setScrollPosition(scrollPosition - 200); // You can adjust the scroll amount
    };
    
    const scrollRight = () => {
      setScrollPosition(scrollPosition + 200); // You can adjust the scroll amount
    };

    return (

    <div className="event-list-container">

    <Container className="mt-5">
        <Button className ="click-left" onClick={scrollLeft}>&lt;</Button>
    <Row>
          {events.length === 0

            ? [1, 2, 3,].map((i) => (

                <Card key={i} style={{ width: "18rem", margin: "0 10px" }} className="text-center">

                  <Card.Body>

                    <Card.Title>Event {i}</Card.Title>
                    <Card.Text>Description for event {i}</Card.Text>
                    <Button onClick = {goToEvent}>View Event</Button>

                  </Card.Body>
                </Card>

              ))

            : events.map((event: any) => (
                <Card
                  key={event.id}
                  style={{ width: "18rem", margin: "0 10px" }}
                  className="text-center"
                >
                  <Card.Img variant="top" src={event.image} />
                  <Card.Body>
                    <Card.Title>{event.name}</Card.Title>
                    <Card.Text>{event.description}</Card.Text>
                    <Button type = "submit" onClick = {goToEvent}>View Event</Button>
                  </Card.Body>
                </Card>
              ))}
        </Row>
        <Button className ="click-right" onClick={scrollRight}>&gt;</Button>
      </Container>
    </div>
    )
  };
  
  export default EventList;
