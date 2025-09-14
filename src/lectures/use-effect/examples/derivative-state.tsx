import { Button, Stack } from "@mui/joy";
import { useEffect, useState } from "react";

interface CountProps {
  count: number[];
}

function Count({ count }: CountProps) {
  console.log("Count");

  const [sum, setSum] = useState<number>(0);

  useEffect(() => {
    setSum(count.reduce((acc: number, curr: number) => acc + curr, 0));
  }, [count]);

  return <h3>Sum : {sum}</h3>;
}

interface NumbersProps {
  addToCount: (num: number) => void;
}

function Numbers({ addToCount }: NumbersProps) {
  return (
    <Stack direction="row" gap={2}>
      <Button onClick={() => addToCount(1)}>1</Button>
      <Button onClick={() => addToCount(2)}>2</Button>
      <Button onClick={() => addToCount(3)}>3</Button>
    </Stack>
  );
}

export default function App() {
  const [count, setCount] = useState<number[]>([]);

  const addToCount = (num: number) => {
    setCount([...count, num]);
  };

  return (
    <Stack direction="row" gap={5}>
      <Numbers addToCount={addToCount} />
      <Count count={count} />
    </Stack>
  );
}
