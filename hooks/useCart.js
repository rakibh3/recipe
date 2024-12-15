'use client';

import { useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import toast from 'react-hot-toast';

const TAX_RATE = 0.1;
const DEFAULT_PRICE = 14.99;

const calculateCartTotals = (items) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * TAX_RATE;
  return {
    items,
    subtotal,
    tax,
    total: subtotal + tax,
  };
};

export const useCart = () => {
  const [cartItems, setCartItems] = useLocalStorage('cart', []);

  const updateCartItem = (id, updates) => {
    setCartItems((items) =>
      items.map((item) => (item.idMeal === id ? { ...item, ...updates } : item))
    );
  };

  const addToCart = (recipe) => {
    const existingItem = cartItems.find(
      (item) => item.idMeal === recipe.idMeal
    );
    if (existingItem) {
      updateCartItem(recipe.idMeal, { quantity: existingItem.quantity + 1 });
      toast.success(`${recipe.strMeal} quantity updated! 🛒`, {
        duration: 4000,
      });
    } else {
      setCartItems((items) => [
        ...items,
        { ...recipe, quantity: 1, price: DEFAULT_PRICE },
      ]);
      toast.success(`${recipe.strMeal} added to cart! 🎉`, { duration: 4000 });
    }
  };

  const removeFromCart = (id) => {
    setCartItems((items) => items.filter((item) => item.idMeal !== id));
  };

  const updateQuantity = (id, change) => {
    updateCartItem(id, {
      quantity: Math.max(
        0,
        cartItems.find((item) => item.idMeal === id).quantity + change
      ),
    });
  };

  const clearCart = () => setCartItems([]);

  const cart = useMemo(() => calculateCartTotals(cartItems), [cartItems]);

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart };
};
