# Revision Notes – Props Guide & Context API

These notes cover the concepts from `04. Prop Guide/src/`. Open the component files side‑by‑side for code examples.

---

## 📁 Project structure

```
04. Prop Guide/
  ├─ src/
  │   ├─ components/
  │   │   ├─ BasicProps.jsx      ← Basic props usage
  │   │   ├─ ChildrenProps.jsx   ← Special children prop
  │   │   ├─ ComplexProps.jsx    ← Objects/arrays as props
  │   │   ├─ RefProps.jsx        ← Refs and forwardRef
  │   │   └─ ThemeToggler.jsx    ← Context API demo
  │   ├─ context/
  │   │   └─ ThemeContext.jsx    ← Context definition
  │   ├─ hooks/
  │   │   └─ useTheme.jsx        ← Custom hook
  │   └─ Practice/               ← Test components for practice
  └─ index.css                   ← Global styles
```

---

## 🔧 Props Fundamentals

Props are how data flows from parent to child components. They're read‑only in the child.

### Basic Props (`BasicProps.jsx`)

Pass simple values like strings, numbers, booleans.

```jsx
<Button text="Click me" color="primary" onClick={handleClick} />
```

- Customize appearance/behavior via props.
- Set defaults: `function Button({ text, color = "primary" })`

### Children Prop (`ChildrenProps.jsx`)

Special prop for content between tags. Can be text, JSX, or components.

```jsx
<Card title="My Card">
  <p>Any content here</p>
</Card>
```

- Access via `{children}` in component.
- Combine with other props.

### Complex Props (`ComplexProps.jsx`)

Pass objects, arrays, or functions.

```jsx
<UserProfileCard user={userObj} theme={themeObj} actions={actionsObj} />
```

- Use spread: `<Component {...props} />`
- Iterate objects: `Object.entries(obj).map(...)`

### Refs & forwardRef (`RefProps.jsx`)

Refs access DOM elements. forwardRef passes refs through components.

```jsx
const CustomInput = forwardRef((props, ref) => <input ref={ref} {...props} />);

// Usage
const ref = useRef();
<CustomInput ref={ref} />;
ref.current.focus();
```

- `useRef` creates ref.
- `forwardRef` forwards ref to DOM element.

---

## 🌐 Context API (`ThemeToggler.jsx`, `ThemeContext.jsx`, `useTheme.jsx`)

Share state without prop drilling.

### Setup

```jsx
// ThemeContext.jsx
const ThemeContext = createContext();
export function ThemeProvider({ children }) { ... }

// useTheme.jsx
export function useTheme() {
  const context = useContext(ThemeContext);
  // error if outside provider
  return context;
}
```

### Usage

```jsx
// App.jsx
<ThemeProvider>
  <App />
</ThemeProvider>;

// Any component
function MyComponent() {
  const { theme, toggleTheme, isDark } = useTheme();
  return <button onClick={toggleTheme}>Toggle</button>;
}
```

- Provider wraps tree.
- Hook accesses context anywhere in tree.
- Best practices: Separate files for context, hooks, components.

---

## 🧪 Practice Components (`Practice/` folder)

- `Test.jsx`, `Test2.jsx`, etc.: Experiment with props variations.
- Use these to practice concepts before building real features.

---

## ✅ Key Takeaways

- **Props**: Parent → child data flow. Simple (primitives), complex (objects), special (children).
- **Refs**: Direct DOM access. Forward through components with `forwardRef`.
- **Context**: Global state. Avoid drilling with provider + hooks.
- Always destructure props for clarity.
- Test components in `Practice/` to solidify understanding.

---

Happy revising! Reference the code for implementation details. 💡
