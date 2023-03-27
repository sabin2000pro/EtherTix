import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const services = [  { id: 1, title: "Service 1", image: "https://source.unsplash.com/random/400x400", description: "Service 1 description" },  { id: 2, title: "Service 2", image: "https://source.unsplash.com/random/400x400", description: "Service 2 description" },  { id: 3, title: "Service 3", image: "https://source.unsplash.com/random/400x400", description: "Service 3 description" },  { id: 4, title: "Service 4", image: "https://source.unsplash.com/random/400x400", description: "Service 4 description" },  { id: 5, title: "Service 5", image: "https://source.unsplash.com/random/400x400", description: "Service 5 description" },  { id: 6, title: "Service 6", image: "https://source.unsplash.com/random/400x400", description: "Service 6 description" },  { id: 7, title: "Service 7", image: "https://source.unsplash.com/random/400x400", description: "Service 7 description" },  { id: 8, title: "Service 8", image: "https://source.unsplash.com/random/400x400", description: "Service 8 description" }];

const Home = () => {
  const containerRef = useRef(null);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    const scrollPosition = container.scrollLeft;
    container.scrollTo({
      top: 0,
      left: scrollPosition + event.deltaY,
      behavior: 'smooth'
    });
  }

  return (
    <>
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-text">
            <h1 className="hero-title">Ether Tix</h1>
            <p className="hero-subtitle">Buy and sell tickets for your favorite events using Ethereum.</p>
            <button className="hero-cta">Get Started, Register here!</button>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="container text-center" onWheel={handleWheel} ref={containerRef}>
          <h2 className="services-title">Services</h2>
          <div className="services-items">
            {services.map((service) => (
              <div key={service.id} className="services-item">
                <div className="services-image">
                  <img src={service.image} alt={service.title} />
                </div>
                <h3 className="services-title">{service.title}</h3>
                <p className="services-description">{service.description}</p>
                <Link to={`/service${service.id}`}><button className="services-cta">Learn More</button></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

<footer className="footer">
  <div className="container">
    <div className="footer-row">
      <div className="col-md-4">
        <h4>About Ether Tix</h4>
        <p>Hello we are Ether Tix</p>
      </div>
      <div className="col-md-4">
        <h4>Contact Us</h4>
        <ul>
          <li>Email: contact@ethertix.com</li>
          <li>Phone: 555-555-5555</li>
          <li>Address: 123 St, Ednburgh, United Kingdom</li>
        </ul>
      </div>
      <div className="col-md-4">
        <h4>Follow Us</h4>
        <ul>
          <li>Facebook</li>
          <li>Twitter</li>
          <li>Instagram</li>
        </ul>
      </div>
    </div>
  </div>
    </footer>
    </>
  );
};

export default Home;