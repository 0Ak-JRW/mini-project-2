import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home.tsx"
import About from "./routes/About.tsx"
import Details from "./routes/Details.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // path ย่อยๆ ที่จะแสดงผลอยู่ภายใน App Component
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "product/:id", element: <Details /> },
      // { path: "favorites", element: <Favorites /> }, // เส้นทางสำหรับหน้าหนังโปรด
      // { path: "about", element: <About /> }, // เส้นทางสำหรับหน้าเกี่ยวกับ
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
