import React, { useState, useEffect} from "react";
import { Container, Row, Button } from "react-bootstrap";
import { useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchEventList } from 'actions/event-actions'
import { CartItem } from "models/cart";
import { Card } from "react-bootstrap";
import axios from 'axios';
import { Link } from "react-router-dom";

const EventList: React.FC = () => {
    const dispatch = useDispatch();
    const [selectedTicket, setSelectedTicket] = useState<CartItem | null>(null);
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

    const [ethPrice, setEthPrice] = useState<number>(0);
  
    const [scrollPosition, setScrollPosition] = useState(0);
    const {events} = useSelector((state: any) => state.events);

    console.log(`Events : `, events);

  useEffect(() => {

    const fetchEthPrice = async () => {

      try {

        const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
        setEthPrice(response.data.ethereum.usd);
      } 
      
      catch (error) {
        console.error(error);
      }

    };

    fetchEthPrice();

  }, [dispatch]);

   useEffect(() => {

      const fetchEvents = async () => {

        try {
           dispatch(fetchEventList() as any);
        } 
        
        catch (error) {
          console.error(error);
        }

      };
  
      fetchEvents();

    }, [dispatch])


    const scrollLeft = () => {
       setScrollPosition(scrollPosition - 200); // You can adjust the scroll amount
    };
    
    const scrollRight = () => {
       setScrollPosition(scrollPosition + 200); // You can adjust the scroll amount
    };

    return (

      <div className="event-list-container">

         <span>Current ETH Price:</span> ${ethPrice.toFixed(2)}

        <Container className="mt-5">

          <Row>

            {events && events.length === 0 ? (

              <p>No events found</p>

            ) : (

             events && events.map((event: any) => (

                <Card key = {event.id} style={{ width: "18rem", margin: "0 10px" }} className="text-center" >

                  <Card.Img variant = "top" src = {event.image} />

                  <Card.Body>

                    <Card.Title>{event.name}</Card.Title>

                    <Card.Text>{event.description}</Card.Text>

                    <Link to = {`/event-details/${event._id}`}>View Event</Link>
                    
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