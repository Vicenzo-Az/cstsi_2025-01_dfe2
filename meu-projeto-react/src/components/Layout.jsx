import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';   // Sem chaves
import Sidebar from './Sidebar'; // Sem chaves

export default function Layout() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1 p-4 bg-light">
          <Outlet />
        </main>
      </div>
    </div>
  );
}