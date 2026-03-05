// We have used bun to install this project instead of npm. Bun is much faster than npm and can be used interchangeably.

import { useState } from "react";
import "./App.css";

export default function App() {
  const [count, setCount] = useState(0);
  const [countToSet, setCountToSet] = useState(0);

  function handleDecrease() {
    setCount(Math.max(count - 1, 0));
  }

  function handleReset() {
    setCount(0);
  }

  return (
    <>
      {/* Buttons: Increase, Decrease, Reset */}
      {/* You can apply inline styles using double curly braces, e.g. style={{ height: "12px" }}. */}
      {/* The three buttons illustrate different ways to use onClick handlers. */}
      {/*
        - Increase: the state update is written directly inside an arrow function.
        - Decrease: we call a separate handler function defined above.
      */}
      {/*
        When calling a handler function from JSX, include the parentheses
        (e.g. onClick={() => handleDecrease()}). If you simply pass the
        function reference (onClick={handleDecrease}), React will call it
        with the click event automatically.
      */}
      {/*
        For the Reset button we use onClick={handleReset} (no parentheses).
        Adding () would invoke the function immediately during rendering,
        which is not what we want. In general:
        * use an inline arrow function when you need to pass arguments or
          compute a value at click time
        * pass the handler reference directly when no arguments are needed
      */}
      {/* Form notes */}
      {/*
        The input element uses the standard JavaScript onChange event. The
        event object is passed as the first argument; the current value lives
        at e.target.value. */}
      {/*
        Because the <input type="text" /> always returns a string, we
        convert it to a number (Number(e.target.value)) before updating
        state. */}
      <h1>Counter</h1>
      <div className="mt-2"> Count is {count}</div>
      <div className="mt-2">
        <button
          onClick={() => {
            setCount(count + 1);
          }}
          style={{ margin: "0 5px" }}
        >
          Increase
        </button>
        <button
          onClick={() => {
            handleDecrease();
          }}
          style={{ margin: "0 5px" }}
        >
          Decrease
        </button>
        <button onClick={handleReset} style={{ margin: "0 5px" }}>
          Reset
        </button>
      </div>
      <div style={{ margin: "10px 0" }}>
        <input
          style={{
            width: "100px",
            border: "1px solid white",
            margin: "0 5px",
            padding: "0.6em 1.2em",
          }}
          type="text"
          value={countToSet}
          onChange={(e) => {
            setCountToSet(Number(e.target.value));
          }}
        />
        <button
          className="mt-2"
          onClick={() => {
            setCount(Number(countToSet));
            setCountToSet(0);
          }}
        >
          Set to {countToSet}
        </button>
      </div>
    </>
  );
}
