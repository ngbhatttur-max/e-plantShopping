import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all items in cart
  const calculateTotalAmount = useCallback(() => {
    let total = 0;
    cart.forEach((item) => {
      const price = parseFloat(item.cost.substring(1)); // remove "$"
      total += price * item.quantity;
    });
    return total.toFixed(2);
  }, [cart]);

  // Increment quantity by 1
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  // Decrement quantity; if 1, remove item
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Remove item from cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost for one item
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.substring(1));
    return (price * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img
              className="cart-item-image"
              src={item.image}
              alt={item.name}
            />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{ marginTop: '20px', color: 'black' }}
        className="total_cart_amount"
      >
        {/* Optional: render total again if needed */}
      </div>

      {/* 🌿 A continue shopping button that links to the product listing page */}
      <button
        className="continue-shopping-button"
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '50px 50px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '20px',
        }}
        onClick={onContinueShopping}
      >
        Continue Shopping
      </button>

      <br />

      {/* 🌿 A checkout button that displays the message "Coming Soon" or similar */}
      <button
        className="get-started-button1"
        onClick={(e) => {
          e.preventDefault();
          alert('Coming Soon');
          // (optional) you can call onContinueShopping(e) to also close cart
          // onContinueShopping(e);
        }}
      >
        Checkout
      </button>
    </div>
  );
};

 export default CartItem;