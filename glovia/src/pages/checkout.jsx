
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./checkout.css";

function Checkout() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();


  const isBuyNow =
    new URLSearchParams(location.search).get("mode") === "buyNow";

  
  const buyNowItem = isBuyNow
    ? JSON.parse(localStorage.getItem("gloviaBuyNow") || "null")
    : null;

  
  
  const checkoutItems =
    isBuyNow && buyNowItem ? [buyNowItem] : cart;

  
  const subtotal = checkoutItems.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity || 1),
    0
  );

  const deliveryCharge = subtotal >= 999 ? 0 : 50;
  const finalTotal = subtotal + deliveryCharge;

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    email: "",
    house: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkoutItems.length === 0) {
      setError("Your cart is empty. Please add products first.");
      return;
    }

    const checkoutData = {
      address,
      items: checkoutItems,
      total: finalTotal,
      subtotal,
      deliveryCharge,
      date: new Date().toISOString(),
      isBuyNow,
    };

    localStorage.setItem(
      "gloviaCheckout",
      JSON.stringify(checkoutData)
    );

    navigate("/payment");
  };

  return (
    <>
      <Navbar />

      <div className="checkout-page">
        
        <section className="checkout-heading">
          <p>GLOVIA COLLECTION</p>
          <h1>Checkout</h1>
          <span>
            Complete your order with your delivery details.
          </span>
        </section>

        {checkoutItems.length === 0 ? (
          <div className="checkout-empty">
            <h2>Your cart is empty!</h2>
            <p>Add some skincare products to continue.</p>

            <Link to="/products" className="checkout-shop-btn">
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="checkout-container">
        
            <div className="checkout-form-section">
              <h2>Delivery Address</h2>

              {error && (
                <p className="checkout-error">{error}</p>
              )}

              <form onSubmit={handleSubmit}>
                <div className="checkout-form-grid">
                  <div className="checkout-field">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={address.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="checkout-field">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter phone number"
                      value={address.phone}
                      onChange={handleChange}
                      pattern="[0-9]{10}"
                      maxLength="10"
                      required
                    />
                  </div>

                  <div className="checkout-field checkout-full-width">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={address.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="checkout-field checkout-full-width">
                    <label>House / Street Address</label>
                    <textarea
                      name="house"
                      placeholder="Enter your complete address"
                      value={address.house}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="checkout-field">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="Enter city"
                      value={address.city}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="checkout-field">
                    <label>State</label>
                    <input
                      type="text"
                      name="state"
                      placeholder="Enter state"
                      value={address.state}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="checkout-field checkout-full-width">
                    <label>PIN Code</label>
                    <input
                      type="text"
                      name="pincode"
                      placeholder="Enter 6-digit PIN code"
                      value={address.pincode}
                      onChange={handleChange}
                      pattern="[0-9]{6}"
                      maxLength="6"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="checkout-continue-btn"
                >
                  Continue to Payment
                </button>
              </form>
            </div>

    
            <div className="checkout-summary">
              <h2>Order Summary</h2>

              <div className="checkout-items">
                {checkoutItems.map((item) => (
                  <div
                    className="checkout-item"
                    key={item.id}
                  >
                    <img
                      src={item.image || item.Image}
                      alt={item.name}
                    />

                    <div className="checkout-item-info">
                      <h3>{item.name}</h3>
                      <p>Qty: {item.quantity || 1}</p>
                      <p>
                        ₹{Number(item.price).toFixed(2)} each
                      </p>
                    </div>

                    <strong>
                      ₹
                      {(
                        Number(item.price) *
                        Number(item.quantity || 1)
                      ).toFixed(2)}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="checkout-price-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="checkout-price-row">
                <span>Delivery Charge</span>
                <span>
                  {deliveryCharge === 0
                    ? "FREE"
                    : `₹${deliveryCharge.toFixed(2)}`}
                </span>
              </div>

              <div className="checkout-price-row checkout-total">
                <span>Total Amount</span>
                <span>₹{finalTotal.toFixed(2)}</span>
              </div>

              <p className="checkout-delivery-note">
                Free delivery on orders above ₹999.
              </p>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Checkout;