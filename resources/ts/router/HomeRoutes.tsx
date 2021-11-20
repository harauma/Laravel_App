import React from "react";
import { Home } from "../components/pages/Home";
import { Setting } from "../components/pages/Setting";
import { UserManagement } from "../components/pages/UserManagement";
import { Page404 } from "../components/pages/Page404";

export const HomeRoutes = [
  {
    path: "/",
    exact: true,
    Children: <Home />,
  },
  {
    path: "/user_management",
    exact: false,
    Children: <UserManagement />,
  },
  {
    path: "/setting",
    exact: false,
    Children: <Setting />,
  },
  {
    path: "*",
    exact: false,
    Children: <Page404 />,
  },
];
