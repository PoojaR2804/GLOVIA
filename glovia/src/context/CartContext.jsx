import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    return JSON.parse(
      localStorage.getItem("gloviaCart") || "[]"
    );
  });

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      let updatedCart;

      if (existingProduct) {
        updatedCart = currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      } else {
        updatedCart = [
          ...currentCart,
          {
            ...product,
            quantity: 1,
          },
        ];
      }

      localStorage.setItem(
        "gloviaCart",
        JSON.stringify(updatedCart)
      );

      return updatedCart;
    });
  };

  const increaseQuantity = (id) => {
    setCart((currentCart) => {
      const updatedCart = currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );

      localStorage.setItem(
        "gloviaCart",
        JSON.stringify(updatedCart)
      );

      return updatedCart;
    });
  };

  const decreaseQuantity = (id) => {
    setCart((currentCart) => {
      const updatedCart = currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0);

      localStorage.setItem(
        "gloviaCart",
        JSON.stringify(updatedCart)
      );

      return updatedCart;
    });
  };

  const removeFromCart = (id) => {
    setCart((currentCart) => {
      const updatedCart = currentCart.filter(
        (item) => item.id !== id
      );

      localStorage.setItem(
        "gloviaCart",
        JSON.stringify(updatedCart)
      );

      return updatedCart;
    });
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}