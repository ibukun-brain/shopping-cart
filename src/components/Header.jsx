import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../contexts/CartContext";

const Header = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [showDropdown, setShowDropDown] = useState(false);
  const itemCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cart
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">Shopper</h1>

      <div className="relative">
        <button
          className="cursor-pointer"
          onClick={() => setShowDropDown(!showDropdown)}
        >
          <FaShoppingCart className="text-2xl text-gray-700" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {itemCount}
            </span>
          )}
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg z-50">
            <div className="p-4">
              <h2 className="font-semibold text-lg mb-2">Cart Items</h2>
              {cart.length === 0 ? (
                <p className="text-gray-500 text-sm">Your cart is empty</p>
              ) : (
                <>
                  <ul className="max-h-60 overflow-y-auto divide-y divide-gray-200">
                    {cart.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center py-2"
                      >
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            {item.qty} x ${item.price}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="mt 4 flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>${totalPrice}</span>
                  </div>
                  <button
                    onClick={clearCart}
                    className="mt-3 w-full bg-red-500 text-white py-1 rounded transition hover:bg-red-600"
                  >Clear Cart</button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
