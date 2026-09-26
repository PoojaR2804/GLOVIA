import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("Verification link sent to your email!");

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="forgot-page">

      <div className="forgot-card">

        <div className="forgot-icon">
          🔐
        </div>

        <h1>Forgot Password?</h1>

        <p>
          No worries! Enter your email address and
          we'll help you reset your password.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Email Address</label>

          <div className="forgot-input">
            <span>✉</span>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit">
            Send Verification Link
          </button>

        </form>

        {message && (
          <div className="forgot-message">
            {message}
          </div>
        )}

        <Link to="/login" className="back-login">
          ← Back to Login
        </Link>

      </div>

    </div>
  );
}

export default ForgotPassword;