import React from 'react';
import { useParams } from 'react-router-dom';
import itemsData from '../../data/items.json';

export default function ItemDetail() {
  const { id } = useParams();
  const item = itemsData.find(i => i.id === parseInt(id, 10));

  if (!item) return <p>Item not found.</p>;
  return (
    <div>
      <h2>{item.name}</h2>
      <p>{item.description}</p>
    </div>
  );
}