import MealCart from "@/components/Cart/MealCart";

const Cart = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center">
      <div className="container mx-auto">
        {/* Cart page */}
        <MealCart />
      </div>
    </div>
  );
};

export default Cart;
