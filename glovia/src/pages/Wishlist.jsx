import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AddToCartPopup from "../components/AddToCartPopup";
import { useCart } from "../context/CartContext";

function Wishlist() {
  const navigate = useNavigate();


  const [addedProduct, setAddedProduct] = useState(null);

  const [wishlist, setWishlist] = useState(() =>
    JSON.parse(localStorage.getItem("gloviaWishlist") || "[]")
  );

  const { addToCart } = useCart();

  
  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(
      (item) => item.id !== id
    );

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "gloviaWishlist",
      JSON.stringify(updatedWishlist)
    );
  };


  const handleAddToCart = (product) => {
    const isLoggedIn =
      localStorage.getItem("gloviaLoggedIn") === "true";

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    addToCart(product);
    setAddedProduct(product.name);
  };

  return (
    <>
      <Navbar />

      
      <AddToCartPopup
        productName={addedProduct}
        onClose={() => setAddedProduct(null)}
      />

      <div className="wishlist-page">
    
        <section className="wishlist-header">
          <p>GLOVIA COLLECTION</p>

          <h1>My Wishlist</h1>

          <span>
            Save your favorite beauty essentials for later.
          </span>
        </section>

      
        {wishlist.length > 0 ? (
          <section className="wishlist-grid">
            {wishlist.map((product) => (
              <div
                className="wishlist-card"
                key={product.id}
              >
                
                <div className="wishlist-image">
                  <Link
                    to={`/product/${product.id}`}
                    className="wishlist-image-link"
                  >
                    <img
                      src={product.image || product.Image}
                      alt={product.name}
                    />
                  </Link>

                  
                  <button
                    type="button"
                    className="wishlist-remove-heart"
                    onClick={() =>
                      removeFromWishlist(product.id)
                    }
                    aria-label="Remove from wishlist"
                  >
                    ♥
                  </button>
                </div>

                
                <div className="wishlist-info">
                  <p>{product.category}</p>

                  <h3>{product.name}</h3>

                  <div className="wishlist-rating">
                    ★ {product.rating}
                  </div>

                  <div className="wishlist-price">
                    ₹{product.price}
                  </div>

            
                  <button
                    type="button"
                    className="wishlist-cart-button"
                    onClick={() => handleAddToCart(product)}
                  >
                    <span>🛒</span>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </section>
        ) : (
      
          <section className="empty-wishlist">
            <div className="empty-wishlist-icon">
              ♡
            </div>

            <h2>Your Wishlist is Empty</h2>

            <p>
              Save products you love and find them here later.
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

export default Wishlist;