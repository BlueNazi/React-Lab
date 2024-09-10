import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function CartPage({ cart }) {
  return (
    <div className="cart-page">
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="cart-item">
            <h4>{item.title}</h4>
            <p>Price: {item.price}$</p>
          </div>
        ))
      )}
      
    </div>
  );
}

export default CartPage;