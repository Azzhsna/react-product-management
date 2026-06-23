import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentUser } from '../../store/authSlice';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Handle responsive sidebar on mount and window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch current user if not available but we are authenticated
  useEffect(() => {
    if (!user) {
      dispatch(fetchCurrentUser());
    }
  }, [user, dispatch]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} user={user} />
      
      <div className={`main-wrapper ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Navbar onMenuToggle={toggleSidebar} user={user} />
        
        <main className="main-content fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
