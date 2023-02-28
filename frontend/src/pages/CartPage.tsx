import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

type Ticket = {
  id: number;
  name: string;
  price: number;
  image: string;
}

const tickets: Ticket[] = [
  { id: 1, name: "Cars Soundtrack", price: 75.55, image: "image-url-1" },
  { id: 2, name: "Ticket 2", price: 19.99, image: "image-url-2" },
  { id: 3, name: "Ticket 3", price: 199.99, image: "image-url-3" },
];

const CartPage = () => {
  const [currentTickets, setCurrentTickets] = useState<[] | undefined>(); // All the tickets are going to be stored in this array
  const [cart, setCart] = useState<{ [key: number]: Ticket & { quantity: number } }> ({} );
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [ethPrice, setEthPrice] = useState<number>(0);

  useEffect(() => {

     const fetchEventTickets = async () => {
      // Will use dispatcher to fetch the event tickets
      console.log(`In the fetch tickets function`);
     }

     fetchEventTickets();

  }, [])

// Add an item to the cart
const addToCart = (ticket: Ticket, quantity: number) => {

  const updatedCart = { ...cart };

  if (updatedCart[ticket.id]) {
     updatedCart[ticket.id].quantity += quantity;
  }
  
  else {
    updatedCart[ticket.id] = { ...ticket, quantity };
  }

  setCart(updatedCart);
}

// Remove an item from the cart
const removeFromCart = (ticketId: number) => {

  const updatedCart = { ...cart };

  if (updatedCart[ticketId].quantity === 1) {
    delete updatedCart[ticketId];
  } 
  
  else {
    updatedCart[ticketId].quantity -= 1;
  }
  
  setCart(updatedCart);
}

// Calculate total price of items in the cart
const getTotalPrice = () => {
  return Object.values(cart).reduce((acc, item) => acc + item.price * item.quantity, 0);
}

// Fetch the live Ethereum price on component mount
useEffect(() => {
  const fetchEthPrice = async () => {
    try {

      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=gbp');
      console.log(`Real time price : `, response);

      setEthPrice(response.data.ethereum.usd);
    } 
    
    catch (error) {
      console.error(error);
    }
  };


  fetchEthPrice();
}, []);

function calculateEthPrice(price: number) {
  return price / ethPrice;
}

return (

  
  <>

    <div className = "cart">

      <h2 className = "cart__heading">Your Cart</h2>

      {Object.keys(cart).length === 0 ? (

          <p>Your cart is empty</p>

      ) : (
        <>


          {Object.values(cart).map((item) => (

            <div key={item.id} className = "cart__item">

              <img
                className="cart__item-image"
                src={item.image}
                alt={item.name}
              />


              <div className="cart__item-description">
                  <div className="cart__item-name">{item.name}</div>
                  <div className="cart__item-price">
                    {calculateEthPrice(item.price).toFixed(6)} ETH (${item.price.toFixed(2)})
                    x {item.quantity}
                  </div>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>


          ))}
          <div className="cart__total">
            Total Cost: ${getTotalPrice().toFixed(2)} (${(getTotalPrice() / ethPrice).toFixed(6)} ETH)</div>
            <button className="cart__remove-all" onClick={() => setCart({})}>Remove All</button>
        </>
      )}


    </div>

    <div className="tickets">
    <h2 className="tickets__heading">Tickets:</h2>
    <ul>
      {tickets.map((ticket) => (
        <li key={ticket.id}>
          <img
            className="ticket__image"
            src={ticket.image}
            alt={ticket.name}
          />
          <div className="ticket__description">
            <div className="ticket__name">{ticket.name}</div>
            <div className="ticket__price">
              {calculateEthPrice(ticket.price).toFixed(6)} ETH (${ticket.price.toFixed(2)})
            </div>
            <div className="ticket__quantity">

              No of Tickets:{" "}
              <select
                defaultValue={1}
                onChange={(e) =>
                  setSelectedQuantity(parseInt(e.target.value))
                }
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <button onClick={() => setSelectedTicket(ticket)}>
              Add to Cart
            </button>

          </div>
        </li>
      ))}
    </ul>

    {selectedTicket && (
      <div>

        <h2>{selectedTicket.name}</h2>

        <p>
          Price: {calculateEthPrice(selectedTicket.price).toFixed(6)} ETH (${selectedTicket.price.toFixed(2)}) x {selectedQuantity}
        </p>

        <button onClick={() => addToCart(selectedTicket, selectedQuantity)}>
          Add to Cart
        </button>

        <button onClick={() => setSelectedTicket(null)}>Cancel</button>

      </div>
        )
      }

      </div>


      </>


      );
    }

export default CartPage;
