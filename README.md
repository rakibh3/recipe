## 📚 **Features Implemented**

### 🚀 **New Features (Technical Terms)**

| **Feature**               | **Description**                                                                                      | **Technical Details**                                                              |
| ------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| **Add Recipe to Cart**    | Users can add meals to the cart.                                                                     | Calls **POST /cart** with userId and meal details.                                 |
| **Update Quantity**       | Users can increase or decrease the meal quantity.                                                    | Uses **PATCH /cart/:userId/:itemId** API.                                          |
| **Remove Item from Cart** | Users can remove items from the cart.                                                                | Calls **DELETE /cart/:userId/:itemId** API.                                        |
| **Cart Storage**          | Cart data is stored **locally** for non-logged-in users and **in the database** for logged-in users. | Uses **LocalStorage** for non-logged-in users and **MongoDB** for logged-in users. |
| **User Authentication**   | Provides secure login and signup with Firebase.                                                      | Uses **Firebase Auth** for user authentication.                                    |

---

### 💡 **New Features (Non-Technical Terms)**

1. **Add to Cart**: Users can add meals to the cart. If they are logged in, their cart is stored in the database; if not, it is stored locally in their browser.
2. **Update Quantity**: Users can increase or decrease the quantity of meals directly in the cart.
3. **Remove from Cart**: Users can remove items from their cart at any time.
4. **Order Summary**: Displays the total cost of the items in the cart, including taxes.
5. **User Authentication**: Users can securely log in, sign up, and log out using **Firebase Authentication**.

---

## 🔧 **Bug Fixes**

| **Bug**                    | **Description**                                    | **Fix**                                                              |
| -------------------------- | -------------------------------------------------- | -------------------------------------------------------------------- |
| **Cannot POST /cart**      | POST requests to `/cart` were not recognized.      | Created **/api/cart.js** and configured Vercel routes properly.      |
| **CORS Issue**             | Cross-Origin Requests were blocked.                | Added **Access-Control-Allow-Origin** and preflight request handler. |
| **Double Quantity Update** | Clicking "+" increased quantity by 2 instead of 1. | Corrected the logic in **setQueryData()**.                           |
| **Firebase Login Failure** | Firebase login requests were not successful.       | Implemented correct Firebase Auth configuration and error handling.  |

---

## ⏰ **Time Estimate**

| **Task**                    | **Time Spent (Hours)** |
| --------------------------- | ---------------------- |
| **Setup Project**           | 1 Hours                |
| **API Development**         | 3 Hours                |
| **Frontend Development**    | 4 Hours                |
| **CORS Fixes**              | 2 Hours                |
| **Bug Fixes**               | 4 Hours                |
| **Firebase Authentication** | 2 Hours                |
| **Testing & Debugging**     | 2 Hours                |
| **Documentation (README)**  | 1 Hour                 |

**Total Time Spent**: **19 Hours**

---

## 📑 **API Endpoints**

| **Method** | **Endpoint**            | **Description**                       |
| ---------- | ----------------------- | ------------------------------------- |
| **POST**   | `/cart`                 | Add an item to the cart.              |
| **PATCH**  | `/cart/:userId/:itemId` | Update item quantity in cart.         |
| **DELETE** | `/cart/:userId/:itemId` | Remove an item from the cart.         |
| **GET**    | `/cart/:userId`         | Retrieve all cart items for the user. |

---

**Server-Side Github URL**: [https://github.com/rakibh3/recipe-repliq-server](https://github.com/rakibh3/recipe-repliq-server)
