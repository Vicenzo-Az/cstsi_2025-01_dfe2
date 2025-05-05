import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      <nav className="app-nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/items">Items</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}