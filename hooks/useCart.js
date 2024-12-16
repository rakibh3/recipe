'use client';

import { useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import toast from 'react-hot-toast';
import CartApi from '@/common/helpers/CartApi';
import useAuth from './useAuth';

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
  const { user } = useAuth();
  const [cartItems, setCartItems] = useLocalStorage('cart', []);

  const updateCartItem = async (id, updates) => {
    if (user) {
      try {
        await CartApi.updateCartItemQuantity(user?.uid, id, updates);
        toast.success('Item quantity updated');
      } catch (error) {
        toast.error('Failed to update item quantity');
      }
    } else {
      setCartItems((items) =>
        items.map((item) =>
          item.idMeal === id ? { ...item, ...updates } : item
        )
      );
    }
  };

  const addToCart = async (recipe) => {
    const newItem = { ...recipe, quantity: 1, price: DEFAULT_PRICE };
    if (user) {
      try {
        await CartApi.addItemToCart(user?.uid, newItem);
        toast.success(`${recipe.strMeal} added to cart! 🎉`, {
          duration: 4000,
        });
      } catch (error) {
        toast.error('Failed to add item to cart');
      }
    } else {
      const existingItem = cartItems.find(
        (item) => item.idMeal === recipe.idMeal
      );
      if (existingItem) {
        updateCartItem(recipe.idMeal, { quantity: existingItem.quantity + 1 });
      } else {
        setCartItems((items) => [...items, newItem]);
      }
      toast.success(`${recipe.strMeal} added to cart! 🎉`, { duration: 4000 });
    }
  };

  const removeFromCart = async (id) => {
    if (user) {
      try {
        await CartApi.removeCartItem(user?.uid, id);
        toast.success('Item removed from cart');
      } catch (error) {
        toast.error('Failed to remove item from cart');
      }
    } else {
      setCartItems((items) => items.filter((item) => item.idMeal !== id));
    }
  };

  const clearCart = async () => {
    if (user) {
      try {
        await CartApi.clearUserCart(user?.uid);
        toast.success('Cart cleared');
      } catch (error) {
        toast.error('Failed to clear cart');
      }
    } else {
      setCartItems([]);
    }
  };

  const updateQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.idMeal === id
          ? { ...item, quantity: item.quantity + change }
          : item
      )
    );

    const currentQuantity =
      cartItems.find((item) => item.idMeal === id)?.quantity || 0;
    if (currentQuantity + change <= 0) {
      removeFromCart(id);
    } else {
      if (user) {
        CartApi.updateCartItemQuantity(user?.uid, id, {
          quantity: currentQuantity + change,
        })
          .then(() => {
            toast.success('Item quantity updated');
          })
          .catch((error) => {
            toast.error('Failed to update item quantity');
          });
      }
    }
  };

  const cart = useMemo(() => calculateCartTotals(cartItems), [cartItems]);

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart };
};
