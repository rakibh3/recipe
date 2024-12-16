'use client';

import CartApi from '@/common/helpers/CartApi';
import useAuth from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FiMinus, FiPlus, FiShoppingCart, FiTrash } from 'react-icons/fi';

const MealCart = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isMounted, setIsMounted] = useState(false);
  const { cart: localCart, updateQuantity, removeFromCart } = useCart();

  const {
    data: serverCart,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['carts', user?.uid],
    queryFn: () => (user ? CartApi.getUserCart(user?.uid) : null),
    enabled: !!user,
  });

  const cart = user ? serverCart?.cart : localCart;
  const items = cart?.items || [];
  const subtotal = cart?.subtotal || 0;
  const tax = cart?.tax || 0;
  const total = cart?.total || 0;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleUpdateQuantity = (idMeal, change) => {
    // 🟢 Update the Tanstack Query cache instantly (optimistic update)
    queryClient.setQueryData(['carts', user?.uid], (oldData) => {
      if (!oldData?.cart?.items) return oldData;

      const updatedItems = oldData.cart.items.map((item) =>
        item.idMeal === idMeal
          ? { ...item, quantity: item.quantity + change }
          : item
      );

      return {
        ...oldData,
        cart: {
          ...oldData.cart,
          items: updatedItems,
        },
      };
    });

    updateQuantity(idMeal, change); // 🟢 Update the local state and server
  };

  const handleRemoveFromCart = (idMeal) => {
    // 🟢 Update the Tanstack Query cache instantly (optimistic update)
    queryClient.setQueryData(['carts', user?.uid], (oldData) => {
      if (!oldData?.cart?.items) return oldData;

      const updatedItems = oldData.cart.items.filter(
        (item) => item.idMeal !== idMeal
      );

      return {
        ...oldData,
        cart: {
          ...oldData.cart,
          items: updatedItems,
        },
      };
    });

    removeFromCart(idMeal); // 🟢 Update the local state and server
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-yellow-900">
                  Meal Cart
                </h2>
                <div className="flex items-center gap-2">
                  <FiShoppingCart className="text-yellow-700" />
                  <span className="text-yellow-700 font-semibold">
                    {cart?.items?.length} items
                  </span>
                </div>
              </div>

              {isLoading ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Loading....</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart?.items?.map((item) => (
                    <div
                      key={item.idMeal}
                      className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                    >
                      <Image
                        height={100}
                        width={100}
                        src={item?.strMealThumb}
                        alt={item?.strMeal}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-yellow-900">
                          {item?.strMeal}
                        </h3>
                        <p className="text-yellow-700 font-medium">
                          ${item?.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.idMeal, -1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <FiMinus className="w-4 h-4 text-yellow-700" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.idMeal, 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <FiPlus className="w-4 h-4 text-yellow-700" />
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          handleRemoveFromCart(item?.idMeal);
                        }}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <FiTrash className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-yellow-900 mb-4">
                Order Summary
              </h2>
              <div className="space-y-3 text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold text-yellow-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 py-3 px-6 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-400 active:bg-yellow-500">
                <span className="block text-yellow-900 font-semibold">
                  Proceed to Checkout
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCart;
