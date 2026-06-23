import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import './Sidebar.css';

export default function Sidebar({ isOpen, onToggle, user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`sidebar__overlay ${isOpen ? 'sidebar__overlay--visible' : ''}`}
        onClick={onToggle}
        aria-hidden="true"
      />

      <aside className={`sidebar ${!isOpen ? 'sidebar--closed' : ''}`}>
        {/* User Profile */}
        <div className="sidebar__profile">
          <img
            src={user?.image}
            alt={`${user?.firstName ?? ''} ${user?.lastName ?? ''}`}
            className="sidebar__avatar"
          />
          <div className="sidebar__user-info">
            <div className="sidebar__user-name">
              {user?.firstName} {user?.lastName}
            </div>
            <div className="sidebar__user-role">Product Manager</div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="sidebar__nav">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `sidebar__nav-link ${isActive ? 'active' : ''}`
            }
          >
            <svg
              className="sidebar__nav-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `sidebar__nav-link ${isActive ? 'active' : ''}`
            }
          >
            <svg
              className="sidebar__nav-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
            Products
          </NavLink>
        </nav>

        {/* Logout */}
        <div className="sidebar__footer">
          <button
            type="button"
            className="sidebar__logout-btn"
            onClick={handleLogout}
          >
            <svg
              className="sidebar__nav-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
