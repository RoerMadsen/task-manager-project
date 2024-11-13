import React from 'react';
import './style.scss';

interface ShopItemProps {
  shopItem: {
    id: number;
    name: string;
    priority: string;
    completed: boolean;
  };
  removeShopItem: (id: number) => void;
  toggleShopItemCompletion: (id: number) => void;
}

const ShopItem: React.FC<ShopItemProps> = ({ shopItem, removeShopItem, toggleShopItemCompletion }) => {
  const handleCompleteClick = (id: number) => {
    if (!shopItem.completed) {
      toggleShopItemCompletion(id);
    }
  };

  const handleDeleteClick = (id: number) => {
    const confirmed = window.confirm("Er du sikker på du ønsker at slette?");
    if (confirmed) {
      removeShopItem(id);
    }
  };

  return (
    <li className={`shop-item ${shopItem.completed ? 'completed' : ''}`}>
      <span>{shopItem.name}</span>
      <span className={`priority-${shopItem.priority}`}> - Afdeling: {shopItem.priority}</span>
      <button 
        onClick={() => handleCompleteClick(shopItem.id)} 
        className={`complete ${shopItem.completed ? 'active' : ''}`}
      >
        {shopItem.completed ? 'Undo' : 'Complete'}
      </button>
      <button 
        onClick={() => handleDeleteClick(shopItem.id)} 
        className="delete"
      >
        Delete
      </button>
    </li>
  );
}

export default ShopItem;
