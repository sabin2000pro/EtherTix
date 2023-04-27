import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "models/cart";
import * as stor from "../auth/store";
import axios from "axios";

const COINGECKO_ETH_API_URI = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"

export const CartPage: React.FC = () => {

  const dispatch = useDispatch();
  const [ethPrice, setEthPrice] = useState<number>(0);
  const cart: CartItem[] = useSelector((state: any) => state.auth.cartItems);

  useEffect(() => {

    const fetchEthPrice = async () => {

      try {

        const response = await axios.get(COINGECKO_ETH_API_URI);
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

                      <img className = "cart__item-image" src = {item.image} alt={item.name} />

                      <div className = "cart__item-description">

                        <div className="cart__item-name">{item.name}</div>

                        <div className = "cart__item-price">
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

                <div className = "cart__total">

                  Total Cost: ${getTotalPrice.toFixed(2)} ({(getTotalPrice / ethPrice).toFixed(6)} ETH)

                </div>

                <button className="cart__remove-all" onClick={() => dispatch(stor.clearCart())}>
                  Remove Items
                </button>

              </>
            )}


          </div>
        </div>
       
                
      </div>
    </div>

  );

};