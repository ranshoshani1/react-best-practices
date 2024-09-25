import { Button, Stack } from "@mui/joy";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Stack width="50%" gap={3}>
        <Button
          onClick={() => {
            navigate("/declarative");
          }}
        >
          Declarative vs imperative programming
        </Button>
        <Button
          onClick={() => {
            navigate("/use-effect");
          }}
        >
          Use Effect
        </Button>
      </Stack>
    </Stack>
  );
}

export default App;
