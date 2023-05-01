import React from 'react'

const Footer: React.FC = () => {
  
  const year = new Date().getFullYear();

  return (
    <>
    <footer className="footer">
      <div className="container">
        <div className="footer-row">
          <div className="footer-col">
            <h4>About Ether Tix</h4>
            <p>Hello! Here at EtherTix we offer many tickets to different events that you can pay for with Ethereum, a secure form of payment.</p>
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
        <div className='copyright-section'>
        {`Copyright © EtherTix ${year}`}
        </div>
    </footer>
    </>
  )
}

export default Footer;