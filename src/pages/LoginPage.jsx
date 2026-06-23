import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/authSlice";
import Button from "../components/shared/Button";
import "./LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ username, password }));
    if (loginUser.fulfilled.match(result)) {
      navigate("/home");
    }
  };

  return (
    <div className="login-page">
      <div className="login-split">
        {/* LEFT — gradient promo panel */}
        <div className="login-promo">
          <div className="login-promo-mark">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2l2.4 7.2H22l-6.1 4.4 2.3 7.2L12 16.4 5.8 20.8l2.3-7.2L2 9.2h7.6L12 2z"
                fill="white"
              />
            </svg>
          </div>
          <div className="login-promo-content">
            <p className="login-promo-eyebrow">You can easily</p>
            <h2 className="login-promo-title">
              Get access to your
              <br />
              product dashboard
              <br />
              and inventory
            </h2>
          </div>
        </div>

        {/* RIGHT — form panel (white) */}
        <div className="login-formpanel">
          <div className="login-card">
            <div className="login-header">
              <div className="login-logo">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2l2.4 7.2H22l-6.1 4.4 2.3 7.2L12 16.4 5.8 20.8l2.3-7.2L2 9.2h7.6L12 2z"
                    fill="#6c5ce7"
                  />
                </svg>
              </div>
              <h1 className="login-title">Welcome Back</h1>
              <p className="login-subtitle">Sign in to manage your products</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              {error && (
                <div className="login-error">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 8v4m0 4h.01"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <div className="login-field">
                <label className="login-field-label" htmlFor="username">
                  Username
                </label>
                <div className="login-input-wrap">
                  <svg
                    className="login-input-icon"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="login-input"
                    required
                  />
                </div>
              </div>

              <div className="login-field">
                <label className="login-field-label" htmlFor="password">
                  Password
                </label>
                <div className="login-input-wrap">
                  <svg
                    className="login-input-icon"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M7 11V7a5 5 0 0110 0v4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                    required
                  />
                  <button
                    type="button"
                    className="login-eye-btn"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.1A10.4 10.4 0 0112 5c5 0 9 4 10 7-.5 1.5-1.4 3-2.7 4.2M6.7 6.7C4.5 8.2 2.9 10.3 2 12c1 3 5 7 10 7 1.1 0 2.1-.2 3.1-.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="login-submit-btn"
              >
                Sign In
              </Button>
            </form>

            <div className="login-divider">
              <span>or continue with</span>
            </div>

            <div className="login-social-row">
              <button
                type="button"
                className="login-social-btn"
                aria-label="Continue with Google"
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.07 5.07 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.69-2.26 1.1-3.71 1.1-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A10.99 10.99 0 0012 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.14a6.6 6.6 0 010-4.27V7.03H2.18a11 11 0 000 9.95l3.66-2.84z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.97 10.97 0 0012 1 11 11 0 002.18 7.03l3.66 2.84C6.7 7.3 9.14 5.38 12 5.38z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>

            <div className="login-footer">
              <p className="login-hint">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 16v-4m0-4h.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                Demo: <strong>emilys</strong> / <strong>emilyspass</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
