import React from "react";

interface CountProps {
  count: number[];
}

function Count({ count }: CountProps) {
  console.log("Count");

  const sum = React.useMemo(() => {
    return count.reduce((acc: number, curr: number) => acc + curr, 0);
  }, [count]);

  return <h3>Sum : {sum}</h3>;
}

interface NumbersProps {
  addToCount: (num: number) => void;
}

function Numbers({ addToCount }: NumbersProps) {
  return (
    <>
      <button onClick={() => addToCount(1)}>1</button>
      <button onClick={() => addToCount(2)}>2</button>
      <button onClick={() => addToCount(3)}>3</button>
    </>
  );
}

export default function App() {
  const [count, setCount] = React.useState<number[]>([]);

  const addToCount = (num: number) => {
    setCount([...count, num]);
  };

  return (
    <div>
      <Numbers addToCount={addToCount} />
      <Count count={count} />
    </div>
  );
}
