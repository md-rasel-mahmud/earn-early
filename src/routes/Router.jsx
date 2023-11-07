import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/dashboard/Profile";
import Analysis from "../pages/dashboard/analysis";
import Withdraw from "../pages/dashboard/Withdraw";
import Deposit from "../pages/dashboard/Deposit";
import AllUsers from "../pages/dashboard/AllUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Home />,
      },
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
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard",
        element: <Analysis />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "withdraw",
        element: <Withdraw />,
      },
      {
        path: "deposit",
        element: <Deposit />,
      },
      {
        path: "all-users",
        element: <AllUsers />,
      },
    ],
  },
]);
