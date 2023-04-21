import React, { useRef } from "react";
import { Link } from "react-router-dom";

interface HomeProps {
  onSignUpClicked: () => void;
}

const services = [

  {
    id: 1,
    title: "Service 1",
    image: "https://source.unsplash.com/random/400x400",
    description: "Service 1 description",
  },

  {
    id: 2,
    title: "Service 2",
    image: "https://source.unsplash.com/random/400x400",
    description: "Service 2 description",
  },

  {
    id: 3,
    title: "Service 3",
    image: "https://source.unsplash.com/random/400x400",
    description: "Service 3 description",
  },


  {
    id: 4,
    title: "Service 4",
    image: "https://source.unsplash.com/random/400x400",
    description: "Service 4 description",
  },
  {
    id: 5,
    title: "Service 5",
    image: "https://source.unsplash.com/random/400x400",
    description: "Service 5 description",
  },
  {
    id: 6,
    title: "Service 6",
    image: "https://source.unsplash.com/random/400x400",
    description: "Service 6 description",
  },
  {
    id: 7,
    title: "Service 7",
    image: "https://source.unsplash.com/random/400x400",
    description: "Service 7 description",
  },
  {
    id: 8,
    title: "Service 8",
    image: "https://source.unsplash.com/random/400x400",
    description: "Service 8 description",
  },
];

const Home = ({ onSignUpClicked }: HomeProps) => {

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
            {services.map((service) => (
              <div key={service.id} className="services-item">
                <div className="services-image">
                  <img src={service.image} alt={service.title} />
                </div>
                <h3 className="services-title">{service.title}</h3>
                <p className="services-description">{service.description}</p>
                <Link to={`/service${service.id}`}>
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
