# Revision Notes – Custom Hooks & Shopping Cart

These notes cover the shopping cart feature in `05. Custom Hooks/src/`. Open files side‑by‑side for code examples.

---

## 📁 Project structure

```
05. Custom Hooks/
  ├─ src/
  │   ├─ App.jsx              ← Main app, uses useCart hook
  │   ├─ hooks/
  │   │   └─ useCard.js       ← Custom cart hook (note: typo in filename)
  │   ├─ components/
  │   │   ├─ ProductCard.jsx  ← Displays product, add to cart
  │   │   ├─ Cart.jsx         ← Cart summary, total
  │   │   └─ CardItem.jsx     ← Individual cart item controls
  │   ├─ data/
  │   │   └─ product.js       ← Static product data
  │   └─ App.css              ← Styles
```

---

## 🪝 Custom Hooks

Custom hooks encapsulate reusable logic. They follow the `use*` naming convention and can use built‑in hooks.

### useCart Hook (`useCard.js`)

Manages cart state, persistence, and calculations.

#### State Initialization

```js
const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
});
```

- Lazy initialization: Runs only on mount.
- Loads from localStorage if available.

#### LocalStorage Sync

```js
useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);
```

- Saves cart to localStorage on every change.
- Dependency array `[cart]` ensures it runs when cart updates.

#### Cross‑Tab Sync

```js
useEffect(() => {
  const handleStorage = (e) => {
    if (e.key === "cart") {
      setCart(JSON.parse(e.newValue || "[]"));
    }
  };
  window.addEventListener("storage", handleStorage);
  return () => window.removeEventListener("storage", handleStorage);
}, []);
```

- Listens for `storage` events (fired when localStorage changes in other tabs).
- Updates state to sync across tabs.
- Cleanup removes listener on unmount.

#### Cart Operations

- **addToCart**: Increments quantity if item exists, else adds new.
- **removeFromCart**: Filters out the item.
- **updateQuantity**: Updates quantity, prevents < 1.

#### Total Calculation with useMemo

```js
const total = useMemo(() => {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}, [cart]);
```

- Memoizes total to avoid recalculating on every render.
- Recalculates only when `cart` changes.

---

## 🔄 useEffect & useMemo

### useEffect

Runs side effects after render.

```js
useEffect(() => {
  // Effect
  return () => {
    /* Cleanup */
  };
}, [dependencies]);
```

- Empty `[]`: Runs once on mount.
- With deps: Runs when deps change.
- Cleanup: Runs before next effect or unmount.

### useMemo

Memoizes expensive computations.

```js
const value = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

- Returns cached value if deps unchanged.
- Prevents unnecessary recalculations.

---

## 🛒 Components

### App.jsx

- Imports `useCart` hook.
- Renders `ProductCard`s and `Cart`.
- Passes cart functions as props.

### ProductCard.jsx

- Displays product name/price.
- Button calls `onAddToCart(product)`.

### Cart.jsx

- Maps cart items to `CardItem`.
- Shows total and checkout button.
- Handles empty cart state.

### CardItem.jsx

- Shows item details and quantity.
- Buttons for +/- quantity and remove.
- Uses icons from `react-icons`.

### product.js

- Exports array of product objects.
- Static data for demo.

---

## 💡 Key Points

- **Custom Hook Benefits**: Reusable logic, clean components.
- **LocalStorage**: Persists data across sessions. Parse/stringify JSON.
- **Cross‑Tab Sync**: Use `storage` event for multi‑tab apps.
- **Immutability**: Always return new arrays/objects in state updates.
- **Memoization**: Use `useMemo` for performance on heavy computations.
- **Error Handling**: Try/catch for localStorage operations.
- **Icons**: `react-icons` for UI elements.

---

## 📝 Notes from Code Comments

- Hooks in `.js` files (not `.jsx`).
- `useEffect` runs on mount; deps trigger re‑runs.
- Cleanup with return function.
- Lazy state init with arrow function.
- `useMemo` syntax similar to `useEffect`.
- localStorage stores strings; parse to JSON.

---

Happy revising! Reference the code for implementation details. 🛒
