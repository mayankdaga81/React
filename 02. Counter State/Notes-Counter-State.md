# Revision Notes – Counter State & Hooks

These notes correspond to the example in `02. Counter State/src/App.jsx`. Open that file side‑by‑side with this document when you review.

---

## 📁 Project structure

```
02. Counter State/
  ├─ src/
  │   └─ App.jsx          ← everything is in this single component for the demo
  └─ index.css           ← global styles (see below)
```

| File        | Purpose                                                                |
| ----------- | ---------------------------------------------------------------------- |
| `index.css` | global CSS rules that apply to the whole app (imported in `main.jsx`). |
| `App.css`   | styles specific to `App` component (scoped via import in `App.jsx`).   |

> 💡 **Global CSS vs component CSS**
>
> - Put site‑wide rules, resets, fonts, colors etc. in `index.css`.
> - When a component needs its own styles, create/modify a CSS file and import it at the top of that component file (`import "./App.css"`).

---

## 🪝 React Hooks & State

### Hook definition

A _hook_ is a special function provided by React. Hooks let you "hook into" React features such as state, lifecycle, or context from a functional component.

`useState` is a built‑in hook used for local state. It always starts with the word `use`.

```js
const [count, setCount] = useState(0);
```

- `count` is the current state value (initially `0`).
- `setCount` is the updater function we call to modify `count`.
- Hooks must be called at the **top level of the component** and not inside loops/conditions.

### What is state?

State is a special object managed by React that determines what the UI renders. Unlike plain JavaScript variables, updating state tells React to re‑render the component automatically.

> State vs. normal variables:
>
> - Normal variables are reset every render and don't trigger updates.
> - State is preserved between renders and changing it causes React to schedule an update.

### Updating state

Never mutate the state variable directly; always use the `set…` function returned by `useState`.

```js
setCount(5);
setCount(count + 1);
```

By convention the setter is named `setX` where `X` is the state name.

#### Multiple updates in one render

When you call the setter several times in the same render, React may batch them:

```js
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
// count increases by 1 only because `count` was the same
```

Use the functional form to always compute from the previous value:

```js
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
setCount((prev) => prev + 1); // +3
```

The functional updater receives the latest state value, avoiding stale closures.

---

## ✅ App.jsx walkthrough

1. **State declarations**

   ```js
   const [count, setCount] = useState(0);
   const [countToSet, setCountToSet] = useState(0);
   ```

   - `count` holds the counter.
   - `countToSet` stores the value from the text input.

2. **Handler functions**

   ```js
   function handleDecrease() {
     setCount(Math.max(count - 1, 0));
   }

   function handleReset() {
     setCount(0);
   }
   ```

   These illustrate separate functions versus inline updates.

3. **Buttons**
   - `Increase` uses an inline arrow function: `onClick={() => setCount(count + 1)}`.
   - `Decrease` calls the handler inside an arrow: `onClick={() => handleDecrease()}`.
   - `Reset` passes the handler directly: `onClick={handleReset}`.

   > When you need to provide arguments or compute values, wrap the call in an arrow; otherwise you may pass the function reference directly.

4. **Form input**

   ```jsx
   <input
     type="text"
     value={countToSet}
     onChange={(e) => setCountToSet(Number(e.target.value))}
   />
   ```

   - `onChange` receives an event; the input value is at `e.target.value`.
   - Convert the string to a number before updating state.

5. **Set button**
   ```jsx
   <button
     onClick={() => {
       setCount(Number(countToSet));
       setCountToSet(0);
     }}
   >
     Set to {countToSet}
   </button>
   ```

   - Demonstrates updating multiple pieces of state in a single handler.

---

## 🔁 Additional notes

- The counter resets to `0` if you try to decrement below zero (see `Math.max`).
- Buttons and inputs are styled inline in this example, but you can move those rules to `App.css` when refactoring.
- Examples in `App.jsx` can be copied into other components; the same state logic applies.

---

Feel free to add any extra insights you discover while revisiting the code!😍
