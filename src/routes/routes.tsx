// src/routes/router.tsx
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/homePage/HomePage";
import ListPage from "../pages/ListPage/ListPage";
import SinglePage from "../pages/SinglePage/SinglePage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import ProfileUpdatePage from "../pages/UpdateProfilePage/UpdateProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "auth",
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
      {
        path: "list",
        element: <ListPage />,
      },
      {
        path: "profile",
        element: <PrivateRoutes />,
        children: [
          {
            index: true,
            element: <ProfilePage />,
          },
          {
            path: "update",
            element: <ProfileUpdatePage />,
          },
        ],
      },
      {
        path: ":id",
        element: <SinglePage />,
      },
    ],
  },
]);

export default router;
