import "@fontsource/oswald";
import { Sheet } from "@mui/joy";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Declarative from "./lectures/declarative-react/index.tsx";
import LectureUseEffect from "./lectures/use-effect/index.tsx";
import ThemeProvider from "./providers/theme-provider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/declarative",
    element: <Declarative />,
  },
  {
    path: "/use-effect",
    element: <LectureUseEffect />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider colorScheme="dark">
      <Sheet sx={{ height: "100%" }} variant="soft">
        <RouterProvider router={router} />
      </Sheet>
    </ThemeProvider>
  </StrictMode>
);
