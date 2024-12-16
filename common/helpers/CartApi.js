import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const CartApi = {
  // POST /cart - Add item to cart or create a new cart
  addItemToCart: async (userId, item) => {
    try {
      const response = await axios.post(`${BASE_URL}/cart`, { userId, item });
      return response.data;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  },

  // PATCH /cart/:userId/:itemId - Update the quantity of an item in the cart
  updateCartItemQuantity: async (userId, itemId, change) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/cart/${userId}/${itemId}`,
        { change: change.quantity }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating item quantity:', error);
      throw error;
    }
  },

  // DELETE /cart/:userId/:itemId - Remove a specific item from the cart
  removeCartItem: async (userId, itemId) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/cart/${userId}/${itemId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    }
  },

  // GET /cart/:userId - Retrieve the user's cart with calculated totals
  getUserCart: async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/cart/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user cart:', error);
      throw error;
    }
  },

  // DELETE /cart/:userId - Clear all items in the user's cart
  clearUserCart: async (userId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/cart/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error clearing user cart:', error);
      throw error;
    }
  },
};

export default CartApi;
