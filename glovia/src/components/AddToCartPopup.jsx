
import { useNavigate } from "react-router-dom";
import "./AddToCartPopup.css";

function AddToCartPopup({ productName, onClose }) {
  const navigate = useNavigate();

  if (!productName) return null;

  const handleViewCart = () => {
    onClose();
    navigate("/cart");
  };

  return (
    <div className="cart-popup-overlay" onClick={onClose}>
      <div
        className="cart-popup"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="cart-popup-close"
          onClick={onClose}
          aria-label="Close popup"
        >
          ×
        </button>

        <div className="cart-popup-icon">✓</div>

        <h2>Added to Cart Successfully!</h2>

        <p className="cart-popup-product">
          {productName}
        </p>

        <p className="cart-popup-message">
          Your product has been added to your cart.
        </p>

        <div className="cart-popup-actions">
          <button
            type="button"
            className="cart-popup-continue"
            onClick={onClose}
          >
            Continue Shopping
          </button>

          <button
            type="button"
            className="cart-popup-view"
            onClick={handleViewCart}
          >
            View Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddToCartPopup;