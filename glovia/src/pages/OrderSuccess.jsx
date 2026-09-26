
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./OrderSuccess.css";

function OrderSuccess() {
  const order = JSON.parse(
    localStorage.getItem("gloviaCurrentOrder") || "null"
  );

  if (!order) {
    return (
      <>
        <Navbar />
        <div className="order-success-empty">
          <h2>No order found</h2>
          <p>Please place an order to view your confirmation.</p>
          <Link to="/products">Continue Shopping</Link>
        </div>
        <Footer />
      </>
    );
  }

  const address = order.address || {};

  return (
    <>
      <Navbar />

      <main className="order-success-page">
        <div className="order-success-card">
          <div className="order-success-icon">✓</div>

          <p className="order-success-brand">GLOVIA COLLECTION</p>

          <h1>Order Placed Successfully!</h1>

          <p className="order-success-message">
            Thank you for shopping with GLOVIA.
            Your order has been confirmed.
          </p>

          <div className="order-success-id">
            <span>Order ID</span>
            <strong>{order.orderId}</strong>
          </div>

          <div className="order-success-details">
            <h2>Order Details</h2>

            <div className="success-detail-row">
              <span>Order Date</span>
              <strong>
                {order.orderDate
                  ? new Date(order.orderDate).toLocaleDateString("en-IN")
                  : "N/A"}
              </strong>
            </div>

            <div className="success-detail-row">
              <span>Payment Method</span>
              <strong>
                {order.paymentMethod === "upi"
                  ? "UPI"
                  : order.paymentMethod === "card"
                  ? "Credit / Debit Card"
                  : "Cash on Delivery"}
              </strong>
            </div>

            <div className="success-detail-row">
              <span>Payment Status</span>
              <strong className="success-status">
                {order.paymentStatus}
              </strong>
            </div>

            <div className="success-detail-row success-total-row">
              <span>Total Amount</span>
              <strong>₹{Number(order.total || 0).toFixed(2)}</strong>
            </div>
          </div>

          <div className="success-address">
            <h2>Delivery Address</h2>

            <h3>{address.fullName}</h3>
            <p>{address.house}</p>
            <p>
              {address.city}, {address.state} - {address.pincode}
            </p>
            <p>Phone: {address.phone}</p>
            <p>Email: {address.email}</p>
          </div>

          <div className="success-products">
            <h2>Items Ordered</h2>

            {order.items?.map((item) => (
              <div className="success-product" key={item.id}>
                <img
                  src={item.image || item.Image}
                  alt={item.name}
                />

                <div className="success-product-info">
                  <h4>{item.name}</h4>
                  <p>Quantity: {item.quantity || 1}</p>
                  <strong>
                    ₹
                    {(
                      Number(item.price) * Number(item.quantity || 1)
                    ).toFixed(2)}
                  </strong>
                </div>
              </div>
            ))}
          </div>

          <div className="order-success-actions">
            <Link to="/products" className="success-shop-btn">
              Continue Shopping
            </Link>

            <Link to="/orders" className="success-orders-btn">
              My Orders
            </Link>
          </div>
           <Link to="/track-order" className="success-track-btn">
  Track My Order
</Link>

          <p className="order-success-thanks">
            ♡ Thank you for choosing GLOVIA ♡
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default OrderSuccess;