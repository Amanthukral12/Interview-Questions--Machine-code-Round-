import { useState, useMemo } from "react";
import "./App.css";

function App() {
  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(100);

  const squaredValue = () => {
    console.log("Expensive calculation");
    return counter * counter;
  };

  const memoizedSquaredValue = useMemo(squaredValue, [counter]);

  return (
    <>
      <h2>Counter: {counter}</h2>
      <h2>SquaredCouunter: {memoizedSquaredValue}</h2>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      <h2>Counter2: {counter2}</h2>
      <button onClick={() => setCounter2(counter2 - 1)}>Decrement</button>
    </>
  );
}

export default App;
