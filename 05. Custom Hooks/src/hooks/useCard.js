// Usually hooks are in .js file, and not .jsx
// Use Effect is executed furst when the component runs for the very first time.
// You can also put variables in the syntax of useEffect, and every time the value is changed, this will be updated.

// Syntax - useEffect(()=>{}, []) -> We have an arrow funciton first, and then we have an array which will store the variables, which on change will trigger the re-render.
// Inside the useEffect, we can also have a return function, which is a call back function, and this is like a clean up function. - This is the most common interview question. How do we clean up in useEffect? We can have a return with a callback funciton, inside that we can have all the clean up code.

// You can have any number of useEffect in any component.

// useEffect(() => {
//   XYZ
//   return () => {
//     XYZ
//   }
// }, [XYZ])

import { useState, useEffect, useMemo } from "react";

// For any hook in react, it is the standard practice to start any hook with the keyword "use".
export function useCart() {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error(`Failed to laod data from internla storage, ${error}`);
      return [];
    }
  });

  // Now, since we are storing data in the local storage, we now have a dependency and we have to update the data in the local storage whenever the data in the cart is updated, so that the local storage has the latest data always. This can remind us of useEffect, where on change of a value, we will run a function.

  // Update the local storage
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error(`Failed to set data into local storage, ${error}`);
    }
  }, [cart]);

  // Sync across tabs (Browser tabs) - When React state is synced with `localStorage`, the state initially reads the stored value during component initialization. However, if the same app is open in multiple browser tabs and one tab updates `localStorage`, the other tabs will not automatically know about this change because their React state was already initialized. Browsers solve this using the `storage` event, which fires in all other tabs when `localStorage` is modified. By adding a `window.addEventListener("storage", handleStorage)` listener inside a `useEffect`, we can detect when the `cart` key changes and update the React state using `setCart`. This keeps all tabs synchronized without requiring a page reload. The listener is attached when the component mounts and removed in the cleanup function to prevent memory leaks. Note that the `storage` event does **not** fire in the tab that made the change, only in the other open tabs.

  // When the browser fires a storage event, it includes useful information about the change:
  // e.key        // Which key changed
  // e.oldValue   // Previous value
  // e.newValue   // New value after change
  // e.url        // Page that made the change

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "cart") {
        try {
          const newCart = JSON.parse(e.newValue || "[]");
          setCart(newCart);
        } catch (error) {
          console.error("failed to fetch card from the local storage", error);
        }
      }
    };

    // Adding the event lister on the storage
    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => product.id === item.id);
      if (existingItem) {
        return currentCart.map((item) => {
          return item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      }
      // If we do not have the item, then
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId),
    );
  };

  const updateQuantity = (productid, quantity) => {
    if (quantity < 1) return;

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productid ? { ...item, quantity } : item,
      ),
    );
  };

  // This is not required in react 19 or later, as useEffect itself is doing this. However, you can find this in older code bases. The funcitonality for this is that, it will store the value of the vatriables inside [] accross re-renders, and in case the value is not changed, it will not execute the function, whereas in older case, useEffect would have re-render when the component was being re-rendered.
  // This is nt reqiuired, now, but it is better to have idea around this.
  // Syntaxtically, this is same as useEffect()
  const total = useMemo(() => {
    return Number(
      cart
        .reduce((sum, item) => {
          const itemTotal = item.price * (item.quantity || 0);
          return sum + itemTotal;
        }, 0)
        .toFixed(2),
    );
  }, [cart]);

  return { cart, addToCart, removeFromCart, updateQuantity, total };
}

// Note - You can also have an arrow funciton in place of default value of useState. This act as a lazy loader.
// The benefit of doing this is that, we can have the value from the local storage if in case it is present, so we can save time in API calls, and if it is not present then we can fetch normally, like we used to do.

// Whenever you get data from local storage, it is usually fetched in the form of strings, so you have to parase it back to the JSON format.
// Data in local storage is stored in the form of key value pair.
