import React from 'react'

const CartPage = () => {

  return (

    <>
<div className="cart">
  <h2 className="cart__heading">Your Cart</h2>
  <div className="cart__item">
    <img className="cart__item-image" src="image-url" />
    <div className="cart__item-description">
      <div className="cart__item-name">Item Name</div>
      <div className="cart__item-price">$15.00</div>
    </div>
  </div>
  ...
  <div className="cart__total">Total: $150.00</div>
</div>
    </>


  )
}

export default CartPage