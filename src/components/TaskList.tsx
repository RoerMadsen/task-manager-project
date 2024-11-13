import React from 'react';
import ShopItem from './TaskItem';

interface ShopListProps {
  shopItems: {
    id: number;
    name: string;
    priority: string;
    completed: boolean;
    shop: string;
  }[];
  removeShopItem: (id: number) => void;
  toggleShopItemCompletion: (id: number) => void;
}

const departmentOrder: { [key: string]: number } = {
  'frugt/grønt': 1,
  'brød': 2,
  'kød': 3,
  'mejeri': 4,
  'konserves': 5,
  'frost': 6,
  'nonfood': 7,
};

const ShopList: React.FC<ShopListProps> = ({ shopItems, removeShopItem, toggleShopItemCompletion }) => {
  const sortedShopItems = shopItems.sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return departmentOrder[a.priority] - departmentOrder[b.priority];
  });

  const groupedShopItems = sortedShopItems.reduce((acc, shopItem) => {
    if (!acc[shopItem.shop]) {
      acc[shopItem.shop] = [];
    }
    acc[shopItem.shop].push(shopItem);
    return acc;
  }, {} as { [key: string]: typeof shopItems[0][] });

  return (
    <div>
      {Object.keys(groupedShopItems).map((shop) => (
        <div key={shop}>
          <h2>{shop}</h2>
          <ul>
            {groupedShopItems[shop].map((shopItem) => (
              <ShopItem
                key={shopItem.id}
                shopItem={shopItem}
                removeShopItem={removeShopItem}
                toggleShopItemCompletion={toggleShopItemCompletion}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ShopList;