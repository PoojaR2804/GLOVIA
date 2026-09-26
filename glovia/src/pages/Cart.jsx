
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotal,
  } = useCart();

  const delivery = cart.length > 0 ? 49 : 0;
  const finalTotal = cartTotal + delivery;

  return (
    <>
      <Navbar />

      <div className="cart-page">
      
        <section className="cart-header">
          <p>GLOVIA COLLECTION</p>

          <h1>My Cart</h1>

          <span>
            Review your beauty essentials before checkout.
          </span>
        </section>

        
        {cart.length > 0 ? (
          <div className="cart-layout">
            
            <section className="cart-items">
              {cart.map((product) => (
                <div
                  className="cart-item"
                  key={product.id}
                >
                  
                  <div className="cart-item-image">
                    <Link
                      to={`/product/${product.id}`}
                      className="cart-item-image-link"
                    >
                      <img
                        src={product.image || product.Image}
                        alt={product.name}
                      />
                    </Link>
                  </div>

                  
                  <div className="cart-item-info">
                    <p>{product.category}</p>

                    <h3>{product.name}</h3>

                    <strong>
                      ₹{product.price}
                    </strong>

                    
                    <div className="cart-item-actions">
                      <div className="quantity-control">
                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(product.id)
                          }
                        >
                          −
                        </button>

                        <span>{product.quantity}</span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(product.id)
                          }
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="cart-remove"
                        onClick={() =>
                          removeFromCart(product.id)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  
                  <div className="cart-item-total">
                    ₹
                    {Number(product.price) *
                      product.quantity}
                  </div>
                </div>
              ))}
            </section>

            
            <aside className="cart-summary">
              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal</span>
                <strong>₹{cartTotal}</strong>
              </div>

              <div className="summary-row">
                <span>Delivery</span>
                <strong>₹{delivery}</strong>
              </div>

              <div className="summary-line"></div>

              <div className="summary-total">
                <span>Total</span>
                <strong>₹{finalTotal}</strong>
              </div>

            
              <Link
                to="/checkout"
                className="checkout-button"
              >
                Proceed to Checkout →
              </Link>

              <Link
                to="/products"
                className="continue-shopping"
              >
                ← Continue Shopping
              </Link>
            </aside>
          </div>
        ) : (
          
          <section className="empty-cart">
            <div className="empty-cart-icon">
              🛒
            </div>

            <h2>Your Cart is Empty</h2>

            <p>
              Add your favorite beauty essentials
              to your cart.
            </p>

            <Link
              to="/products"
              className="shop-now-button"
            >
              Explore Products →
            </Link>
          </section>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Cart;