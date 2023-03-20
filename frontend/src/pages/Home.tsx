import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
    {/* Hero section */}
    
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
        <div className="container text-center">
          <h2 className="services-title">Services</h2>
          <div className="services-items">
            <div className="services-item">
              <div className="services-image">
                <img src="https://source.unsplash.com/random/400x400" alt="Promo" />
              </div>
              <h3 className="services-title">Service1</h3>
              <p className="services-description">What we offer </p>
              <Link to="/Service1"><button className="services-cta">Learn More</button></Link>
            </div>
            <div className="services-item">
              <div className="services-image">
                <img src="https://source.unsplash.com/random/400x400" alt="Promo" />
              </div>
              <h3 className="services-title">Service2</h3>
              <p className="services-description">What we offer </p>
              <Link to="/Service2"><button className="services-cta">Learn More</button></Link>
            </div>
            <div className="services-item">
              <div className="services-image">
                <img src="https://source.unsplash.com/random/400x400" alt="Promo" />
              </div>
              <h3 className="services-title">Service3</h3>
              <p className="services-description">What we offer </p>
              <Link to="/service3"><button className="services-cta">Learn More</button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer section */}
      <footer className="footer">
        <div className="container">
          <div className="footer-row">
            <div className="footer-col">
              <h4>About Ether Tix</h4>
              <p>Hello we are Ether Tix</p>
            </div>
            <div className="footer-col">
              <h4>Contact Us</h4>
              <ul>
                <li>Email: contact@ethertix.com</li>
                <li>Phone: 555-555-5555</li>
                <li>Address: 123 St, Ednburgh, United Kingdom</li>
              </ul>
            </div>
            <div className="footer-col">
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
