import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Card, Container, Row } from "react-bootstrap";

interface Event {
  id: number;
  name: string;
  description: string;
  image: string;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage, setEventsPerPage] = useState(5);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/events");
        setEvents(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;

  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <Container className="mt-5">
      <Row>
        {currentPage !== 1 && (
          <ArrowLeft onClick={previousPage} className="mr-3" />
        )}
        {currentEvents.map((event) => (
          <Card
            key={event.id}
            style={{ width: "18rem", margin: "0 10px" }}
            className="text-center"
          >
            <Card.Img variant="top" src={event.image} />
            <Card.Body>
              <Card.Title>{event.name}</Card.Title>
              <Card.Text>{event.description}</Card.Text>
            </Card.Body>
          </Card>
        ))}
        {currentPage !== Math.ceil(events.length / eventsPerPage) && (
          <ArrowRight onClick={nextPage} className="ml-3" />
        )}
      </Row>
    </Container>
  );
};

export default EventList;