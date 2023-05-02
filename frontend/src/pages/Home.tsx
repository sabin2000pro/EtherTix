import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { fetchEventList } from 'actions/event-actions'

interface HomeProps {
  onSignUpClicked: () => void;
}

const Home = ({ onSignUpClicked }: HomeProps) => {
  const {events} = useSelector((state: any) => state.events);
  const dispatch = useDispatch();
  const containerRef = useRef(null);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {

    const container = event.currentTarget;
    const scrollPosition = container.scrollLeft;

    container.scrollTo({
      top: 0,
      left: scrollPosition + event.deltaY,
      behavior: "smooth",
    });


  };

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


  return (
    <>

      <section className = "hero-section">

        <div className="hero-container">
          <div className="hero-text">


            <h1 className="hero-title">Ether Tix</h1>

            <p className="hero-subtitle">

              Buy and sell tickets for your favourite events on the Ethereum Blockchain
            </p>

            <button className="hero-cta" onClick={onSignUpClicked}>
              Get Started, Register here!
            </button>
          </div>

          <div className="homepage-image">
            <img src="images\threesisters.jpg" alt="display_image" />
          </div>

          
        </div>
      </section>

      <section className="services-container">
        <div

          className="container text-center"
          onWheel={handleWheel}
          ref={containerRef}
        >
          <h2 className="services-title">Services</h2>
          <div className="services-items">
            {events && events.map((event: any) => (
              <div key={event.id} className="services-item">
                <div className="services-image">
                  <img src={event.image} alt={event.title} />
                </div>
                <h3 className="services-title">{event.title}</h3>
                <p className="services-description">{event.description}</p>
                <Link to={`/event-details/${event._id}`}>
                  <button className="services-cta">Learn More</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
