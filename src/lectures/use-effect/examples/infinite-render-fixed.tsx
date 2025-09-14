import { Button, Stack, Typography } from "@mui/joy";
import { useCallback, useEffect, useState } from "react";

interface DataDisplayProps {
  onFetchComplete: () => void;
  filter: string;
}

function DataDisplay({ onFetchComplete, filter }: DataDisplayProps) {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    console.log("Fetching data...");
    const mockData = ["Item A", "Item B", "Item C", "Special"];
    const filtered = mockData.filter((item) =>
      item.toLowerCase().includes(filter.toLowerCase())
    );

    setData(filtered);

    onFetchComplete();
  }, [onFetchComplete, filter]);

  return (
    <Stack gap={2}>
      <Typography level="body-sm">
        Found {data.length} items for filter: "{filter}"
      </Typography>
      {data.map((item, index) => (
        <Typography key={index}>{item}</Typography>
      ))}
    </Stack>
  );
}

export default function App() {
  const [filter, setFilter] = useState("");
  const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);

  const handleFetchComplete = useCallback(() => {
    setLastFetchTime(new Date());
  }, []);

  return (
    <Stack gap={3}>
      <Stack direction="row" gap={2}>
        <Button onClick={() => setFilter("")} variant="outlined">
          All
        </Button>
        <Button onClick={() => setFilter("Special")} variant="outlined">
          Special
        </Button>
        <Button onClick={() => setFilter("Item")} variant="outlined">
          Items
        </Button>
      </Stack>

      {lastFetchTime && (
        <Typography level="body-xs">
          Last fetch: {lastFetchTime.toLocaleTimeString()}
        </Typography>
      )}

      <DataDisplay onFetchComplete={handleFetchComplete} filter={filter} />
    </Stack>
  );
}
