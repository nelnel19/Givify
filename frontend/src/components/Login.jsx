import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";
import GivifyImage from "../Assets/givify1.png";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-content">
          <div className="login-header">
            <h1>Login</h1>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="login-options">
              <a href="#forgot" className="forgot-password">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          <div className="signup-section">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="signup-link">
                Sign up
              </Link>
            </p>
          </div>

          <div className="footer">
            <p>It's better to give than to recieve. Always be greatful for what you have.</p>
          </div>
        </div>
        
        <div className="login-image">
          <img 
            src={GivifyImage} 
            alt="Givify" 
            className="login-image-content"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;