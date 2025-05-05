import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ItemsList from './pages/ItemsList';
import ItemDetail from './pages/ItemDetail';
import Profile from './pages/Profile';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="items" element={<ItemsList />} />
        <Route path="items/:id" element={<ItemDetail />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}