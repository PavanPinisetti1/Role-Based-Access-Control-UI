import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();  // Get current route

  return (
    <nav className="navbar">
      <Link to="/admin" className="navbar-brand">
        Admin
      </Link>
      <div className="nav-links">
        <Link
          to="/dashboard"
          className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
        >
          Dashboard
        </Link>
        <Link
          to="/users"
          className={`nav-link ${location.pathname === '/users' ? 'active' : ''}`}
        >
          Users
        </Link>
        <Link
          to="/roles"
          className={`nav-link ${location.pathname === '/roles' ? 'active' : ''}`}
        >
          Roles
        </Link>
        <Link
          to="/permissions"
          className={`nav-link ${location.pathname === '/permissions' ? 'active' : ''}`}
        >
          Permissions
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
