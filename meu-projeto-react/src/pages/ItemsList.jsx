import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import itemsData from '../data/items.json';

export default function ItemsList() {
  const [items] = useState(itemsData);

  return (
    <div>
      <h2>Items</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <Link to={`${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}