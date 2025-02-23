import React, { useState } from "react";
import "./Cart.css";

const Cart = () => {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  const [subscription, setSubscription] = useState(() => {
    const storedSubscription = localStorage.getItem("subscription");
    return storedSubscription ? JSON.parse(storedSubscription) : null;
  });

  const [errorMessage, setErrorMessage] = useState(""); // State to track error message

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleSubscription = (type, price) => {
    // Check if there's already a subscription in the cart
    if (cart.some((item) => item.id === "subscription-id")) {
      setErrorMessage("You can only purchase one active subscription at a time.");
      return; // Stop further execution
    }

    const newSubscription = { id: "subscription-id", type, price };

    // Remove any existing subscriptions in the cart
    const updatedCart = cart.filter((item) => item.id !== "subscription-id");
    updatedCart.push(newSubscription); // Add the new subscription

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Store the subscription in localStorage
    setSubscription(newSubscription);
    localStorage.setItem("subscription", JSON.stringify(newSubscription));

    // Clear the error message if the subscription is successfully added
    setErrorMessage("");
  };

  // Calculate total price
  const calculateTotal = () => {
    let total = 0;

    // Add the price of each movie and subscription
    cart.forEach((item) => {
      total += item.price || 0; // If it's a movie, price will be 0
    });

    return total.toFixed(2); // Format the total to 2 decimal places
  };

  return (
    <div className="cart-page">
      <div className="cart-overlay">
        <h1 className="cart-title">Your Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                {item.poster_path ? (
                  <>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={item.title}
                    />
                    <p>{item.title}</p>
                  </>
                ) : (
                  <p>{item.type}</p> // Show subscription type if it's not a movie
                )}
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Display error message if trying to add more than one subscription */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Subscription Options */}
        <div className="subscription-options">
          <h3>Subscribe to StreamList</h3>
          <p>Select a subscription plan:</p>
          <div className="subscription-buttons">
            <button
              onClick={() => handleSubscription("StreamList Basic (Ads)", 4.99)}
              className={`subscription-btn ${subscription?.type === "StreamList Basic (Ads)" ? "selected" : ""}`}
            >
              StreamList Basic (Ads) $4.99
            </button>
            <button
              onClick={() => handleSubscription("StreamList Pro (No-Ads)", 9.99)}
              className={`subscription-btn ${subscription?.type === "StreamList Pro (No-Ads)" ? "selected" : ""}`}
            >
              StreamList Pro (No-Ads) $9.99
            </button>
          </div>
          {subscription && <p>You've selected: {subscription.type}</p>}
        </div>

        {/* Display total */}
        <div className="total">
          <h3>Total: ${calculateTotal()}</h3>
        </div>
      </div>
    </div>
  );
};

export default Cart;
