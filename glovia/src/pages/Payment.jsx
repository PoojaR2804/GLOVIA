import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Payment.css";

function Payment() {
  const navigate = useNavigate();

  const checkoutData = JSON.parse(
    localStorage.getItem("gloviaCheckout") || "null"
  );

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  if (!checkoutData) {
    return (
      <>
        <Navbar />
        <div className="payment-empty">
          <h2>No order found</h2>
          <p>Please complete checkout before making a payment.</p>
          <Link to="/cart">Go to Cart</Link>
        </div>
        <Footer />
      </>
    );
  }

  const subtotal = Number(checkoutData.total || 0);
  const delivery = subtotal >= 999 ? 0 : 50;
  const total = subtotal + delivery;

  const handlePayment = (e) => {
    e.preventDefault();

    if (paymentMethod === "upi" && !upiId.trim()) {
      alert("Please enter your UPI ID.");
      return;
    }

    if (paymentMethod === "card") {
      if (!cardNumber.trim() || !expiry.trim() || !cvv.trim()) {
        alert("Please fill in all card details.");
        return;
      }
    }

    
    const orderDate = new Date();
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(deliveryDate.getDate() + 5);

    
    const order = {
      ...checkoutData,
      total,
      paymentMethod,
      paymentStatus:
        paymentMethod === "cod"
          ? "Cash on Delivery"
          : "Demo Payment Successful",
      orderId: "GLOVIA" + Date.now(),
      orderDate: orderDate.toISOString(),
      deliveryDate: deliveryDate.toISOString(),
      trackingStatus: 0,
    };

    
    const existingOrders = JSON.parse(
      localStorage.getItem("gloviaOrders") || "[]"
    );

    localStorage.setItem(
      "gloviaOrders",
      JSON.stringify([...existingOrders, order])
    );

  
    localStorage.setItem(
      "gloviaCurrentOrder",
      JSON.stringify(order)
    );

  
    localStorage.setItem("gloviaCart", "[]");

    
    navigate("/order-success");
  };

  return (
    <>
      <Navbar />

      <div className="payment-page">
        <section className="payment-heading">
          <p>GLOVIA COLLECTION</p>
          <h1>Payment</h1>
          <span>Choose your preferred payment method.</span>
        </section>

        <div className="payment-layout">
          <form className="payment-form" onSubmit={handlePayment}>
            
            <div className="payment-card payment-address-card">
              <div className="payment-address-heading">
                <h2>Delivery Address</h2>
                <Link
                  to="/checkout"
                  className="payment-edit-address"
                >
                  Edit Address
                </Link>
              </div>

              <div className="payment-address-details">
                <h3>{checkoutData.address?.fullName}</h3>

                <p>{checkoutData.address?.house}</p>

                <p>
                  {checkoutData.address?.city},{" "}
                  {checkoutData.address?.state} -{" "}
                  {checkoutData.address?.pincode}
                </p>

                <p>Phone: {checkoutData.address?.phone}</p>
                <p>Email: {checkoutData.address?.email}</p>
              </div>
            </div>

            
            <div className="payment-card">
              <h2>Select Payment Method</h2>

          
              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                />
                <span>UPI Payment</span>
              </label>

              {paymentMethod === "upi" && (
                <div className="payment-input-group">
                  <label>UPI ID</label>
                  <input
                    type="text"
                    placeholder="example@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                  <small>
                    Demo only. No real payment will be processed.
                  </small>
                </div>
              )}

              
              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                />
                <span>Credit / Debit Card</span>
              </label>

              {paymentMethod === "card" && (
                <div className="payment-input-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    placeholder="Enter any demo card number"
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(e.target.value)
                    }
                  />

                  <div className="card-details-row">
                    <div>
                      <label>Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) =>
                          setExpiry(e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <label>CVV</label>
                      <input
                        type="password"
                        placeholder="CVV"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                      />
                    </div>
                  </div>

                  <small>
                    Demo only. Do not enter real card information.
                  </small>
                </div>
              )}

            
              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                />
                <span>Cash on Delivery</span>
              </label>

              {paymentMethod === "cod" && (
                <p className="cod-message">
                  Pay when your order is delivered to your address.
                </p>
              )}
            </div>

            
            <button
              type="submit"
              className="payment-submit-btn"
            >
              {paymentMethod === "cod"
                ? "Confirm Order"
                : `Pay ₹${total.toFixed(2)}`}
            </button>

            <Link to="/checkout" className="payment-back-link">
              ← Back to Checkout
            </Link>
          </form>

          
          <div className="payment-summary">
            <h2>Order Summary</h2>

            {checkoutData.items?.map((item, index) => (
              <div
                className="payment-product"
                key={item.id || index}
              >
                <img
                  src={item.image || item.Image}
                  alt={item.name || item.Name || "Product"}
                />

                <div>
                  <h4>{item.name || item.Name}</h4>
                  <p>Quantity: {item.quantity || 1}</p>
                  <span>
                    ₹
                    {(
                      Number(item.price || item.Price || 0) *
                      Number(item.quantity || 1)
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}

            <div className="payment-summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="payment-summary-row">
              <span>Delivery</span>
              <span>
                {delivery === 0 ? "FREE" : `₹${delivery}`}
              </span>
            </div>

            <div className="payment-summary-total">
              <span>Total</span>
              <strong>₹{total.toFixed(2)}</strong>
            </div>

            <div className="payment-secure-note">
              ♡ Thank you for choosing GLOVIA.
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Payment;