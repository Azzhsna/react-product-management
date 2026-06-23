import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const { user } = useSelector((state) => state.auth);
  const { total, categories } = useSelector((state) => state.products);
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="welcome-banner">
        <div className="banner-bg" aria-hidden="true">
          <div className="banner-orb orb-1"></div>
          <div className="banner-orb orb-2"></div>
          <div className="banner-orb orb-3"></div>
        </div>
        <div className="welcome-content">
          <span className="welcome-eyebrow">Dashboard Overview</span>
          <h1 className="welcome-title">
            Welcome back,{" "}
            <span className="gradient-text">
              {user?.firstName} {user?.lastName}
            </span>
          </h1>
          <p className="welcome-subtitle">
            Here's what's happening with your store today.
          </p>
          <button className="banner-cta" onClick={() => navigate("/products")}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="3" width="20" height="14" rx="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
            View Products
          </button>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon-wrap stat-icon-purple">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </div>
          <div className="stat-body">
            <span className="stat-label">Total Products</span>
            <span className="stat-value">
              {total > 0 ? total.toLocaleString() : "--"}
            </span>
          </div>
          <button className="stat-action" onClick={() => navigate("/products")}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap stat-icon-teal">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
              <line x1="7" y1="7" x2="7.01" y2="7"></line>
            </svg>
          </div>
          <div className="stat-body">
            <span className="stat-label">Categories</span>
            <span className="stat-value">
              {categories.length > 0 ? categories.length : "--"}
            </span>
          </div>
          <button className="stat-action" onClick={() => navigate("/products")}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap stat-icon-amber">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <div className="stat-body">
            <span className="stat-label">Quick Add</span>
            <span className="stat-value stat-value-sm">New Product</span>
          </div>
          <button
            className="stat-action"
            onClick={() => navigate("/products/add")}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
