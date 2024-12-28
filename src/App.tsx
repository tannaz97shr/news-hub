import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Preferences from "./pages/Preferences";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/preferences", element: <Preferences /> },
    ],
  },
  { path: "*", element: <NotFound /> }, // Handle unmatched routes
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
