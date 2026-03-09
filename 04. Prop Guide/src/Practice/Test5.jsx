import { useTest5 } from "../hooks/useTest5";

function Test5() {
  const { count, increament, decreament, reset } = useTest5();

  return (
    <div>
      <div className="text-gray-800">Count is: {count}</div>
      <div className="flex flex-wrap gap-2 ">
        <button
          className="bg-blue-400 px-2 py-1 rounded-lg shadow-md cursor-pointer"
          onClick={increament}
        >
          Increament
        </button>
        <button
          className={`bg-blue-400 px-2 py-1 rounded-lg shadow-md ${count === 0 ? "cursor-not-allowed" : "cursor-pointer"}`}
          onClick={decreament}
          disabled={count === 0}
        >
          Decreament
        </button>
        <button
          className="bg-blue-400 px-2 py-1 rounded-lg shadow-md cursor-pointer"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Test5;
