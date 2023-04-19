import React from "react";
import {useDispatch } from "react-redux";
import { removeItemFromCart } from "actions/cart-actions";

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = JSON.parse(localStorage.getItem('cartItems') as any);

  return (

    <div className = "container">

      <div className="row">

        <div className="col-md-6">

          <div className="eth-price">

          
          </div>

          <div className="cart">

          <h2 className="cart__heading">Your Cart</h2>

            {cart?.length === 0 ? (

              <p>Your cart is empty</p>

            ) : (
              <>

                {cart.map((item: any) => (

                  <>

                    <div key={item.id} className = "cart__item">

                      <img className = "cart__item-image" src={item.image} alt={item.name}
                      />

                      <div className="cart__item-description">

                        <div className="cart__item-name">{item.name}</div>

                        <div className="cart__item-price">

                        
                        </div>

                      </div>
                    </div>
                  </>
                ))}

              </>


            )}
          </div>
        </div>

      </div>
    </div>
  );
};


export default CartPage;