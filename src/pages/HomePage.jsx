import React from 'react';
import { useSelector } from 'react-redux';
import './HomePage.css';

const HomePage = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="home-page">
      <div className="welcome-banner glass">
        <div className="welcome-content">
          <h1 className="welcome-title">
            Welcome, <span className="gradient-text">{user?.firstName} {user?.lastName}</span>!
          </h1>
          <p className="welcome-subtitle">Here is what's happening with your products today.</p>
        </div>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card glass">
          <h3>Total Products</h3>
          <p className="stat-value">--</p>
        </div>
        <div className="stat-card glass">
          <h3>Categories</h3>
          <p className="stat-value">--</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
