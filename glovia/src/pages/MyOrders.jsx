
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrders = JSON.parse(
      localStorage.getItem("gloviaOrders") || "[]"
    );

    
    const uniqueOrders = savedOrders.filter(
      (order, index, self) =>
        order.orderId
          ? index ===
            self.findIndex(
              (item) => item.orderId === order.orderId
            )
          : true
    );

    
    const updatedOrders = uniqueOrders.map((order) => {
      if (order.deliveryDate) {
        return order;
      }

      const baseDate = new Date(
        order.orderDate || order.date || Date.now()
      );

      const deliveryDate = new Date(baseDate);
      deliveryDate.setDate(deliveryDate.getDate() + 5);

      return {
        ...order,
        deliveryDate: deliveryDate.toISOString(),
      };
    });

    
    localStorage.setItem(
      "gloviaOrders",
      JSON.stringify(updatedOrders)
    );

    
    setOrders([...updatedOrders].reverse());
  }, []);

  const handleTrackOrder = (order) => {
    localStorage.setItem(
      "gloviaCurrentOrder",
      JSON.stringify(order)
    );

    navigate("/track-order");
  };

  const trackingStages = [
    "Order Placed",
    "Order Confirmed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  return (
    <>
      <Navbar />

  
      <section className="cart-header">
        <p>GLOVIA COLLECTION</p>
        <h1>My Orders</h1>
        <p className="my-orders-subtitle">
          View your orders and track your deliveries.
        </p>
      </section>

      
      <div className="my-orders-page">
        <div className="my-orders-container">
          {orders.length === 0 ? (
            <div className="no-orders">
              <h2>No Orders Yet</h2>
              <p>You haven't placed any orders yet.</p>

              <Link to="/products" className="shop-now-btn">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="my-orders-list">
              {orders.map((order, index) => {
                const statusIndex = Math.min(
                  Math.max(
                    Number(order.trackingStatus) || 0,
                    0
                  ),
                  4
                );

                const isDelivered = statusIndex === 4;

                return (
                  <div
                    className="my-order-card"
                    key={order.orderId || index}
                  >
                    
                    <div className="my-order-header">
                      <div>
                        <h3>Order ID</h3>
                        <p>{order.orderId || "N/A"}</p>
                      </div>

                      <div>
                        <h3>Order Date</h3>
                        <p>
                          {order.orderDate
                            ? new Date(
                                order.orderDate
                              ).toLocaleDateString("en-IN")
                            : order.date
                            ? new Date(
                                order.date
                              ).toLocaleDateString("en-IN")
                            : "N/A"}
                        </p>
                      </div>
                    </div>

                  
                    <div className="my-order-products">
                      {(order.items || []).map(
                        (item, itemIndex) => (
                          <div
                            className="my-order-product"
                            key={item.id || itemIndex}
                          >
                            <img
                              src={item.image || item.Image}
                              alt={
                                item.name ||
                                item.Name ||
                                "Product"
                              }
                            />

                            <div className="my-order-product-info">
                              <h4>{item.name || item.Name}</h4>

                              <p>
                                Quantity: {item.quantity || 1}
                              </p>

                              <p>
                                ₹
                                {(
                                  Number(
                                    item.price ||
                                      item.Price ||
                                      0
                                  ) *
                                  Number(item.quantity || 1)
                                ).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    
                    <div className="my-order-footer">
                      <div>
                        <h3>
                          Total: ₹
                          {Number(order.total || 0).toFixed(2)}
                        </h3>

                        <p>
                          Payment: {order.paymentMethod || "N/A"}
                        </p>

                        <p>
                          Status: {trackingStages[statusIndex]}
                        </p>

                        <p>
                          <strong>
                            {isDelivered
                              ? "Delivery Date:"
                              : "Expected Delivery:"}
                          </strong>{" "}

                          {order.deliveryDate
                            ? new Date(
                                order.deliveryDate
                              ).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })
                            : "Not available"}
                        </p>
                      </div>

                      
                      {!isDelivered && (
                        <button
                          className="my-order-track-btn"
                          onClick={() =>
                            handleTrackOrder(order)
                          }
                        >
                          Track Order
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default MyOrders;