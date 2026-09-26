
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./OrderTracking.css";

const trackingStages = [
  {
    title: "Order Placed",
    description: "Your order has been placed successfully.",
  },
  {
    title: "Order Confirmed",
    description: "Your order has been confirmed.",
  },
  {
    title: "Shipped",
    description: "Your package is on its way.",
  },
  {
    title: "Out for Delivery",
    description: "Your package is on the way to your address.",
  },
  {
    title: "Delivered",
    description: "Your order has been delivered successfully.",
  },
];

function OrderTracking() {
  const [order, setOrder] = useState(() => {
    const saved = JSON.parse(
      localStorage.getItem("gloviaCurrentOrder") || "null"
    );

    if (!saved) return null;

    return {
      ...saved,
      trackingStatus: saved.trackingStatus || 0,
    };
  });

  const updateTracking = (nextStatus) => {
    if (!order) return;

    const updatedOrder = {
      ...order,
      trackingStatus: nextStatus,
    };

    setOrder(updatedOrder);
    localStorage.setItem(
      "gloviaCurrentOrder",
      JSON.stringify(updatedOrder)
    );

    const orders = JSON.parse(
      localStorage.getItem("gloviaOrders") || "[]"
    );

    const updatedOrders = orders.map((item) =>
      item.orderId === updatedOrder.orderId
        ? updatedOrder
        : item
    );

    localStorage.setItem("gloviaOrders", JSON.stringify(updatedOrders));
  };

  if (!order) {
    return (
      <>
        <Navbar />
        <div className="tracking-empty">
          <h2>No Order Found</h2>
          <p>Please place an order to track its delivery.</p>
          <Link to="/products">Continue Shopping</Link>
        </div>
        <Footer />
      </>
    );
  }

  const currentStage = Math.min(
    Math.max(Number(order.trackingStatus) || 0, 0),
    trackingStages.length - 1
  );

  const address = order.address || {};

  return (
    <>
      <Navbar />

      <main className="tracking-page">
        <section className="tracking-heading">
          <p>GLOVIA COLLECTION</p>
          <h1>Track Your Order</h1>
          <span>Follow your order's journey to your doorstep.</span>
        </section>

        <div className="tracking-container">
          <div className="tracking-order-card">
            <div className="tracking-order-top">
              <div>
                <span className="tracking-label">Order ID</span>
                <h2>{order.orderId}</h2>
              </div>

              <span className="tracking-status-badge">
                {trackingStages[currentStage].title}
              </span>
            </div>

            <div className="tracking-order-info">
              <div>
                <span>Order Date</span>
                <strong>
                  {order.orderDate
                    ? new Date(order.orderDate).toLocaleDateString("en-IN")
                    : "N/A"}
                </strong>
              </div>

              <div>
                <span>Total Amount</span>
                <strong>₹{Number(order.total || 0).toFixed(2)}</strong>
              </div>
            </div>
          </div>

          <div className="tracking-progress-card">
            <h2>Delivery Progress</h2>

            <div className="tracking-timeline">
              {trackingStages.map((stage, index) => {
                const isCompleted = index <= currentStage;
                const isCurrent = index === currentStage;

                return (
                  <div
                    className={`tracking-step ${
                      isCompleted ? "completed" : ""
                    } ${isCurrent ? "current" : ""}`}
                    key={stage.title}
                  >
                    <div className="tracking-step-marker">
                      {isCompleted ? "✓" : index + 1}
                    </div>

                    <div className="tracking-step-content">
                      <h3>{stage.title}</h3>
                      <p>{stage.description}</p>

                      {isCurrent && (
                        <span className="tracking-current-label">
                          Current Status
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="tracking-demo-note">
              This is a demo tracking system. Status updates are simulated.
            </div>

            {currentStage < trackingStages.length - 1 ? (
              <button
                className="tracking-update-btn"
                onClick={() => updateTracking(currentStage + 1)}
              >
                Simulate Next Status →
              </button>
            ) : (
              <div className="tracking-delivered-message">
                ♡ Your order has been delivered!
              </div>
            )}
          </div>

          <div className="tracking-details-grid">
            <div className="tracking-info-card">
              <h2>Delivery Address</h2>
              <h3>{address.fullName}</h3>
              <p>{address.house}</p>
              <p>
                {address.city}, {address.state} - {address.pincode}
              </p>
              <p>Phone: {address.phone}</p>
            </div>

            <div className="tracking-info-card">
              <h2>Order Summary</h2>

              {order.items?.map((item) => (
                <div className="tracking-product" key={item.id}>
                  <img
                    src={item.image || item.Image}
                    alt={item.name}
                  />

                  <div>
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity || 1}</p>
                    <strong>
                      ₹
                      {(
                        Number(item.price) *
                        Number(item.quantity || 1)
                      ).toFixed(2)}
                    </strong>
                  </div>
                </div>
              ))}

              <div className="tracking-total">
                <span>Total</span>
                <strong>₹{Number(order.total || 0).toFixed(2)}</strong>
              </div>
            </div>
          </div>

          <div className="tracking-actions">
            <Link to="/products" className="tracking-shop-btn">
              Continue Shopping
            </Link>

            <Link to="/orders" className="tracking-orders-btn">
              My Orders
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default OrderTracking;