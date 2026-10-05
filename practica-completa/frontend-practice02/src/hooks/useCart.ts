import { useState } from 'react';
import type { Product, CartItem } from '@/types/store';

export const useCart = () => {
const [cart, setCart] = useState<CartItem[]>([]);
  
const addProduct = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if(existing) {
        return prev.map(item => 
          item.id === product.id
          ? {...item, quantity: item.quantity + 1}
          : item
        );
      }
      return [...prev, {...product, quantity: 1}];
    });    
  };

  const increment = (id: number) => {
    setCart(prev => prev.map(item => item.id === id ? {...item, quantity: item.quantity + 1} : item));
  };

  const deleteFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const decrement = (id: number) => {
   setCart(prev => prev.map(item => item.id === id ? {...item, quantity: item.quantity - 1} : item).filter(i => i.quantity > 0)) ;
  };

  const totalToPay = cart.reduce((total, current) => total + (current.price * current.quantity), 0);
  const totalArticles = cart.reduce((total, current) => total + current.quantity, 0);

  return {
    cart,
    setCart,
    addProduct,
    increment,
    decrement,
    deleteFromCart,
    totalToPay,
    totalArticles
  };

};
