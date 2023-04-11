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
    const [events, setEvents] = useState<Array<Event>>([]);;
    const [scrollPosition, setScrollPosition] = useState(0);
    const rowRef = useRef(null);

   useEffect(() => {

      const fetchEvents = async () => {

        try {
          const { data } = await axios.get("http://localhost:5301/api/v1/events");
          setEvents(data.events);
        } 
        
        catch (error) {
          console.error(error);
        }

      };
  
      fetchEvents();
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

          <Row>

            {events.length === 0 ? (
              <p>No events found</p>
            ) : (
              events.map((event: Event) => (

                <Card key = {event.id}
                  style={{ width: "18rem", margin: "0 10px" }}
                  className="text-center"
                >
                  <Card.Img variant="top" src={event.image} />

                  <Card.Body>
                    <Card.Title>{event.name}</Card.Title>
                    <Card.Text>{event.description}</Card.Text>

                    <Button type="submit" onClick={goToEvent}>
                      View Event
                    </Button>

                    
                  </Card.Body>
                </Card>

              ))
            )}
          </Row>
          <div className="event-scroll">
            <Button className="click-left" onClick={scrollLeft}>
              &lt;
            </Button>
            <Button className="click-right" onClick={scrollRight}>
              &gt;
            </Button>
          </div>
        </Container>
      </div>
    );
  };
    
  
  export default EventList;
