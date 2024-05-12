import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import MovieUpdate from "./pages/MovieUpdate";
import { Home } from "./pages/Home";
import MovieCreate from "./pages/MovieCreate";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        element: <MovieUpdate />,
        path: "/movies/update/:id",
      },
      {
        element: <MovieCreate />,
        path: "/movies/create",
      },
      {
        element: <NotFound />,
        path: "*",
      },
    ],
  },
]);
