import React from 'react';
import { useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onMenuToggle, user }) => {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/home') return 'Dashboard';
    if (path === '/products') return 'Products';
    if (path === '/products/add') return 'Add Product';
    if (path.startsWith('/products/edit/')) return 'Edit Product';
    if (path.startsWith('/products/')) return 'Product Detail';
    return 'Dashboard';
  };

  return (
    <header className="navbar glass">
      <div className="navbar-left">
        <button className="menu-toggle" onClick={onMenuToggle} aria-label="Toggle Menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <h2 className="page-title">{getPageTitle()}</h2>
      </div>

      <div className="navbar-right">
        <div className="navbar-user">
          <span className="navbar-user-name">{user?.firstName}</span>
          <div className="navbar-avatar">
            {user?.image ? (
              <img src={user.image} alt={user.username} />
            ) : (
              <span>{user?.firstName?.charAt(0) || 'U'}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
