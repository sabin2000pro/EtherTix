import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "models/cart";
import * as stor from "../auth/store";
import axios from "axios";

const CartPage: React.FC = () => {

  const dispatch = useDispatch();
  const [ethPrice, setEthPrice] = useState<number>(0);
  const cart: CartItem[] = useSelector((state: any) => state.auth.cartItems);

  useEffect(() => {

    const fetchEthPrice = async () => {
      try {

        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        );

        setEthPrice(response.data.ethereum.usd);
      }
      
      catch (error) {
        console.error(error);
      }
    };


    fetchEthPrice();
  }, []);

  const getTotalPrice = cart.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0);

  function calculateEthPrice(price: number) {
    return price / ethPrice;
  }

  return (
    
    <div className = "container">


      <div className = "row" style={{justifyContent: "center"}}>

        <div className = "col-md-6">

          <div className = "eth-price">
            <span>Current ETH Price in USD:</span> ${ethPrice.toFixed(2)}
          </div>

          <div className = "cart">

            <h2 className="cart__heading">Your Cart</h2>

            {cart.length === 0 ? (

              <p>Your cart is empty</p>

            ) : (
              <>

                {cart.map((item: CartItem) => (

                  <>

                    <div key = {item.id} className="cart__item">

                      <img className = "cart__item-image" src={item.image} alt={item.name} />

                      <div className="cart__item-description">

                        <div className="cart__item-name">{item.name}</div>

                        <div className="cart__item-price">
                          {calculateEthPrice(item.price).toFixed(6)} ETH ($
                          {item.price.toFixed(2)}) x {item.quantity}
                        </div>

                        <button onClick={() => dispatch(stor.removeItem(item.id))}>
                          Remove
                        </button>


                      </div>
                    </div>
                  </>
                ))}

                <div className="cart__total">

                  Total Cost: ${getTotalPrice.toFixed(2)} ($

                  {(getTotalPrice / ethPrice).toFixed(6)} ETH)

                </div>

                <button className="cart__remove-all" onClick={() => dispatch(stor.clearCart())}>
                  Remove Items
                </button>

              </>
            )}

            
          </div>
        </div>
        {/* <div className="col-md-6">
        <div className="tickets">
          <h2 className="tickets__heading">Popular tickets:</h2>
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
                    {calculateEthPrice(ticket.price).toFixed(6)} ETH ($
                    {ticket.price.toFixed(2)})
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
                Price: {calculateEthPrice(selectedTicket.price).toFixed(6)}{" "}
                ETH (${selectedTicket.price.toFixed(2)}) x {selectedQuantity}
              </p>
              <button onClick={handleAddToCart}>Add to Cart</button>
              <button onClick={() => setSelectedTicket(null)}>Cancel</button>
            </div>
          )}
        </div>
      </div> */}
      </div>
    </div>
  );
};

export default CartPage;
