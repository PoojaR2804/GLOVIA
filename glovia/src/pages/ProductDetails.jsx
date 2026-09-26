import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AddToCartPopup from "../components/AddToCartPopup";
import { useCart } from "../context/CartContext";

import products from "../data/products";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  
  const [addedProduct, setAddedProduct] = useState(null);

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [quantity, setQuantity] = useState(1);

  const [wishlist, setWishlist] = useState(() =>
    JSON.parse(
      localStorage.getItem("gloviaWishlist") || "[]"
    )
  );

  if (!product) {
    return (
      <>
        <Navbar />

        <div className="product-not-found">
          <h1>Product Not Found</h1>
          <p>
            Sorry, we couldn't find the product you're looking for.
          </p>

          <Link to="/products">
            ← Back to Shop
          </Link>
        </div>

        <Footer />
      </>
    );
  }

  const isLoggedIn =
    localStorage.getItem("gloviaLoggedIn") === "true";

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  
  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    setAddedProduct(product.name);
  };

  
  const handleBuyNow = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const buyNowProduct = {
      ...product,
      quantity: quantity,
    };

    
    localStorage.setItem(
      "gloviaBuyNow",
      JSON.stringify(buyNowProduct)
    );

    
    navigate("/checkout?mode=buyNow");
  };

  
  const handleWishlist = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    let updatedWishlist;

    if (isWishlisted) {
      updatedWishlist = wishlist.filter(
        (item) => item.id !== product.id
      );
    } else {
      updatedWishlist = [...wishlist, product];
    }

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "gloviaWishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  
  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((current) =>
      current > 1 ? current - 1 : 1
    );
  };

  return (
    <>
      <Navbar />

      
      <AddToCartPopup
        productName={addedProduct}
        onClose={() => setAddedProduct(null)}
      />

      <main className="product-details-page">

      
        <div className="product-breadcrumb">
          <span>{product.name}</span>
        </div>

        
        <section className="product-details-container">

      
          <div className="product-details-image">
            <img
              src={product.image || product.Image}
              alt={product.name}
            />

            <button
              type="button"
              className={`product-details-wishlist ${
                isWishlisted ? "wishlist-active" : ""
              }`}
              onClick={handleWishlist}
              aria-label={
                isWishlisted
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
            >
              {isWishlisted ? "♥" : "♡"}
            </button>
          </div>

          
          <div className="product-details-info">

            <p className="product-details-category">
              {product.category}
            </p>

            <h1>{product.name}</h1>

            
            <div className="product-details-rating">
              <span>★</span>
              <strong>{product.rating}</strong>
              <span>Customer Rating</span>
            </div>

            
            <div className="product-details-price">
              ₹{product.price}
            </div>

            
            <p className="product-details-description">
              A carefully selected GLOVIA beauty essential
              designed to complement your daily skincare
              and personal care routine.
            </p>

            
            <div className="product-benefits">
              <div>
                <span>✦</span>
                Quality Ingredients
              </div>

              <div>
                <span>♡</span>
                Gentle Care
              </div>

              <div>
                <span>✓</span>
                Everyday Essentials
              </div>
            </div>

          
            <div className="quantity-section">
              <span>Quantity</span>

              <div className="quantity-control">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                >
                  −
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
            </div>

            
            <div className="product-delivery-date">
              <span>🚚</span>
              <p>
                <strong>Expected Delivery:</strong>{" "}
                {(() => {
                  const deliveryDate = new Date();
                  deliveryDate.setDate(
                    deliveryDate.getDate() + 5
                  );

                  return deliveryDate.toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  );
                })()}
              </p>
            </div>

            
            <div className="product-details-actions">

              
              <button
                type="button"
                className="product-details-cart"
                onClick={handleAddToCart}
              >
                🛒 Add to Cart
              </button>

              
              <button
                type="button"
                className="product-details-wishlist-button"
                onClick={handleWishlist}
              >
                {isWishlisted
                  ? "♥ Wishlisted"
                  : "♡ Add to Wishlist"}
              </button>

              
              <button
                type="button"
                className="buy-now-btn"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>

            </div>

            
            <div className="product-details-extra">
              <div>
                <strong>Free Delivery</strong>
                <span>On orders above ₹999</span>
              </div>

              <div>
                <strong>Secure Shopping</strong>
                <span>Safe and simple checkout</span>
              </div>

              <div>
                <strong>GLOVIA Care</strong>
                <span>
                  Beauty essentials selected for you
                </span>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default ProductDetails;