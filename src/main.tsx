import "@fontsource/oswald";
import { Sheet, IconButton } from "@mui/joy";
import { Close } from "@mui/icons-material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Declarative from "./lectures/declarative-react/index.tsx";
import LectureUseEffect from "./lectures/use-effect/index.tsx";
import ThemeProvider from "./providers/theme-provider.tsx";
import CursorFollow from "./lectures/cursor-follow/index.tsx";

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && (
        <IconButton
          onClick={() => navigate("/")}
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 1000,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          <Close />
        </IconButton>
      )}
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "declarative",
        element: <Declarative />,
      },
      {
        path: "use-effect",
        element: <LectureUseEffect />,
      },
      {
        path: "cursor-follow",
        element: <CursorFollow />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider colorScheme="dark">
      <Sheet sx={{ height: "100%" }} variant="soft" className="dark">
        <RouterProvider router={router} />
      </Sheet>
    </ThemeProvider>
  </StrictMode>
);
