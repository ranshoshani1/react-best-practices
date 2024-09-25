import { Button, Stack } from "@mui/joy";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      width="100vh"
      height="100vh"
      gap={3}
    >
      <Button
        onClick={() => {
          navigate("/declarative");
        }}
      >
        Declarative vs imperative programming
      </Button>
    </Stack>
  );
}

export default App;
