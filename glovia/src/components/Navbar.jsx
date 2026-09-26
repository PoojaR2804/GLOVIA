import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { cartCount } = useCart();

  const [profileOpen, setProfileOpen] = useState(false);
  const [categoriesActive, setCategoriesActive] = useState(false);

  const isLoggedIn =
    localStorage.getItem("gloviaLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("gloviaLoggedIn");
    setProfileOpen(false);
    navigate("/");
  };

  const handleCategoriesClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();

      setCategoriesActive(true);

      document.getElementById("categories")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      navigate("/");

      setTimeout(() => {
        document.getElementById("categories")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  return (
    <nav className="glovia-navbar">

      
      <Link to="/" className="glovia-logo">
        <span className="logo-text">
          GLOVIA
        </span>

        <div className="logo-decoration">
          <i></i>
          <b>♡</b>
          <i></i>
        </div>
      </Link>


      
      <div className="main-navigation">

        
        <Link
          to="/"
          className={
            location.pathname === "/" && !categoriesActive
              ? "active"
              : ""
          }
          onClick={() => setCategoriesActive(false)}
        >
          Home

          {location.pathname === "/" && !categoriesActive && (
            <span className="nav-dot"></span>
          )}
        </Link>


        
        <Link
          to="/products"
          className={
            location.pathname === "/products"
              ? "active"
              : ""
          }
        >
          Shop

          {location.pathname === "/products" && (
            <span className="nav-dot"></span>
          )}
        </Link>


        
        <a
          href="#categories"
          className={
            categoriesActive
              ? "active"
              : ""
          }
          onClick={handleCategoriesClick}
        >
          Categories

          {categoriesActive && (
            <span className="nav-dot"></span>
          )}
        </a>


        
        <Link
          to="/wishlist"
          className={
            location.pathname === "/wishlist"
              ? "active"
              : ""
          }
        >
          Wishlist

          <span className="nav-heart">
            ♡
          </span>

          {location.pathname === "/wishlist" && (
            <span className="nav-dot"></span>
          )}
        </Link>


        
        <Link
          to="/cart"
          className={
            location.pathname === "/cart"
              ? "active cart-link"
              : "cart-link"
          }
        >
          Cart

          <span className="cart-symbol">
            🛒
          </span>

          <span className="cart-count">
            {cartCount}
          </span>

          {location.pathname === "/cart" && (
            <span className="nav-dot"></span>
          )}
        </Link>


        
        {isLoggedIn && (
          <div className="profile-dropdown">

            <button
              type="button"
              className={
                location.pathname === "/profile"
                  ? "profile-link active"
                  : "profile-link"
              }
              onClick={() =>
                setProfileOpen(!profileOpen)
              }
            >
              ♡

              <span>
                Profile
              </span>

              <span className="profile-arrow">
                {profileOpen ? "" : ""}
              </span>

              {location.pathname === "/profile" && (
                <span className="nav-dot"></span>
              )}
            </button>


          
            {profileOpen && (
              <div className="profile-menu">

                <Link
                  to="/profile"
                  onClick={() =>
                    setProfileOpen(false)
                  }
                >
                  
                </Link>


                <Link
                  to="/orders"
                  onClick={() =>
                    setProfileOpen(false)
                  }
                >
                  <span>📦</span>
                  My Orders
                </Link>

                  
                <div className="profile-menu-line"></div>


                <button
                  type="button"
                  onClick={handleLogout}
                >
                  <span>↪</span>
                  Logout
                </button>

              </div>
            )}

          </div>
        )}

      </div>

    </nav>
  );
}

export default Navbar;