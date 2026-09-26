
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import AddToCartPopup from "../components/AddToCartPopup";

function Home() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const isLoggedIn =
    localStorage.getItem("gloviaLoggedIn") === "true";


  const [addedProduct, setAddedProduct] = useState(null);

  
  const categories = [
    { icon: "🧴", name: "Face Care", text: "Glow & nourish" },
    { icon: "💇", name: "Hair Care", text: "Healthy & beautiful" },
    { icon: "🧼", name: "Body Care", text: "Soft & refreshed" },
    { icon: "☀️", name: "Sun Care", text: "Protect your skin" },
    { icon: "💋", name: "Lip Care", text: "Soft & hydrated" },
    { icon: "🪒", name: "Grooming", text: "Everyday essentials" },
  ];

  
  const products = [
    {
      id: 1,
      category: "FACE CARE",
      wishlistCategory: "Face Care",
      name: "Hydrating Face Serum",
      price: "₹499",
      numericPrice: 499,
      rating: "★★★★★",
      reviews: "128",
      image:
        "https://i.pinimg.com/736x/b7/ed/58/b7ed5860528f5a05b933676419121f07.jpg",
    },
    {
      id: 8,
      category: "BODY CARE",
      wishlistCategory: "Body Care",
      name: "Gentle Body Wash",
      price: "₹349",
      numericPrice: 349,
      rating: "★★★★☆",
      reviews: "96",
      image:
        "https://i.pinimg.com/1200x/d9/90/4a/d9904aebb68408e72b9a624e8c41f58d.jpg",
    },
    {
      id: 5,
      category: "HAIR CARE",
      wishlistCategory: "Hair Care",
      name: "Silky Hair Serum",
      price: "₹399",
      numericPrice: 399,
      rating: "★★★★★",
      reviews: "74",
      image:
        "https://i.pinimg.com/736x/4a/58/1b/4a581b69de0742be200f3cccd820452b.jpg",
    },
    {
      id: 11,
      category: "SUN CARE",
      wishlistCategory: "Sun Care",
      name: "Daily Sunscreen SPF 50",
      price: "₹599",
      numericPrice: 599,
      rating: "★★★★★",
      reviews: "110",
      image:
        "https://i.pinimg.com/1200x/7d/00/87/7d008721779024847158783e8685ed91.jpg",
    },
  ];

  
  const [wishlist, setWishlist] = useState(() =>
    JSON.parse(localStorage.getItem("gloviaWishlist") || "[]")
  );

  const toggleWishlist = (product) => {
    const alreadyAdded = wishlist.some(
      (item) => item.id === product.id
    );

    let updatedWishlist;

    if (alreadyAdded) {
      updatedWishlist = wishlist.filter(
        (item) => item.id !== product.id
      );
    } else {
      const wishlistProduct = {
        id: product.id,
        name: product.name,
        category: product.wishlistCategory,
        price: product.numericPrice,
        rating: product.rating.replace("☆", "").length,
        Image: product.image,
      };

      updatedWishlist = [...wishlist, wishlistProduct];
    }

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "gloviaWishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  const isWishlisted = (productId) =>
    wishlist.some((item) => item.id === productId);

  
  const handleShopNow = () => {
    navigate(isLoggedIn ? "/products" : "/login");
  };


  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      category: product.wishlistCategory,
      price: product.numericPrice,
      Image: product.image,
    });

    
    setAddedProduct(product.name);
  };

  return (
    <div className="glovia-home">
      <Navbar />

      
      <AddToCartPopup
        productName={addedProduct}
        onClose={() => setAddedProduct(null)}
      />

      
    <section className="glovia-hero">
        <div className="hero-left">
          <p className="hero-overline">BEAUTY • CARE • GLOW</p>

          <h1>
            Your Skin.
            <br />
            Your <em>Glow.</em>
          </h1>

          <p className="hero-text">
            Discover skincare and personal care products specially
            selected to make your everyday beauty routine better.
          </p>

          <button
            type="button"
            className="primary-button"
            onClick={handleShopNow}
          >
            Shop Now <span>→</span>
          </button>
        </div>

        <div className="hero-right">
          <div className="hero-photo">
            <img
              src="https://i.pinimg.com/736x/74/9c/77/749c778d65c4662cf82607059fd4de41.jpg"
              alt="GLOVIA skincare collection"
            />
          </div>

          <span className="floating-petal petal-one">✿</span>
          <span className="floating-petal petal-two">❀</span>
          <span className="floating-petal petal-three">✿</span>
        </div>
      </section>

      
      <section className="category-section" id="categories">
        <div className="decorative-heading">
          <p>SHOP BY CATEGORY</p>
          <div className="heading-decoration">
            <span></span>
            <b>♡</b>
            <span></span>
          </div>
        </div>

        <div className="category-container">
          {categories.map((category, index) => (
            <Link
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="category-box"
              key={index}
            >
              <div className="category-icon">{category.icon}</div>
              <h3>{category.name}</h3>
              <p>{category.text}</p>
            </Link>
          ))}
        </div>
      </section>

      
      <section className="featured-section">
        <div className="featured-heading">
          <p>OUR PICKS</p>
          <div className="featured-title-row">
            <span></span>
            <h2>Featured Products</h2>
            <span></span>
          </div>
          <div className="small-heart">♡</div>
        </div>

        <div className="products-container">
          {products.map((product) => (
            <div className="featured-product" key={product.id}>
              
              <div className="product-image-box">
                <Link
                  to={`/product/${product.id}`}
                  className="product-image-link"
                >
                  <img src={product.image} alt={product.name} />
                </Link>

              
                <button
                  className={`wishlist-button ${
                    isWishlisted(product.id)
                      ? "wishlist-button-active"
                      : ""
                  }`}
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  aria-label={
                    isWishlisted(product.id)
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                >
                  {isWishlisted(product.id) ? "♥" : "♡"}
                </button>
              </div>

            
              <div className="product-information">
                <p className="product-category">
                  {product.category}
                </p>

                <h3>{product.name}</h3>

                <div className="rating">
                  <span>{product.rating}</span>
                  <small>({product.reviews})</small>
                </div>

                <div className="product-bottom">
                  <strong>{product.price}</strong>

                
                  <button
                    className="add-cart-button"
                    type="button"
                    onClick={() => handleAddToCart(product)}
                  >
                    <span className="cart-button-icon">🛒</span>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-container">
          <Link to="/products" className="view-all-button">
            View All Products →
          </Link>
        </div>
      </section>

    
      <section className="lower-section">
        
        <div className="offer-card">
          <div className="offer-details">
            <p>GLOVIA SPECIAL</p>

            <h2>
              Glow More,
              <br />
              Spend Less <span>✦</span>
            </h2>

            <p className="offer-description">
              Get up to <strong>30% OFF</strong> on selected
              skincare essentials.
            </p>

            <Link to="/products" className="offer-button">
              Explore Offers →
            </Link>
          </div>

          <div className="gift-box">
            <div className="gift-ribbon"></div>
            <div className="gift-lid"></div>
            <div className="gift-body"></div>
          </div>

          <div className="discount-circle">
            <span>UP TO</span>
            <strong>30%</strong>
            <span>OFF</span>
          </div>
        </div>

      
        <div className="why-glovia">
          <div className="why-heading">
            <p>WHY GLOVIA?</p>
            <h2>Beauty Made Simple</h2>

            <div className="why-line">
              <span></span>
              <b>♡</b>
              <span></span>
            </div>
          </div>

          <div className="why-items">
            <div className="why-item">
              <div className="why-icon">♧</div>
              <h3>Carefully Selected</h3>
              <p>
                Products chosen with your everyday beauty needs in
                mind.
              </p>
            </div>

            <div className="why-item">
              <div className="why-icon">♥</div>
              <h3>Made For You</h3>
              <p>
                Simple beauty essentials for every skincare routine.
              </p>
            </div>

            <div className="why-item">
              <div className="why-icon">🚚</div>
              <h3>Easy Shopping</h3>
              <p>
                Smooth, secure and fast delivery to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

    
      <footer className="glovia-footer">
        <div className="footer-logo">
          <div className="footer-brand">GLOVIA</div>

          <div className="footer-decoration">
            <span></span>
            <b>♡</b>
            <span></span>
          </div>

          <p>Glow Begins With You ✨</p>
        </div>

        <div className="footer-menu">
          <Link to="/home">Home</Link>
          <Link to="/products">Shop</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Cart</Link>
        </div>

        <p className="copyright">
          © 2026 GLOVIA. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;