import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "../components/HOC/RootLayout";
import Home from "../pages/Home";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import NotFound from "../pages/NotFound";
import MyTickets from "../pages/MyTickets";
import ScannerPage from "../pages/ScannerPage";
import Admin from "../pages/Admin";
import Dashboard from "../template/Dashboard";
import Settings from "../template/Settings";
import EditEvent from "../template/EditEvent";
import AddEvent from "../template/AddEvent";
import AllEvents from "../template/AllEvents";
import PersistLogin from "../components/HOC/PersistLogin";
import NotProtectdRoute from "../components/HOC/withNotProtect"
import ProtectdRoute from "../components/HOC/withProtect"
import AddUser from "../template/AddUser";


const router = createBrowserRouter([
  {
    element: <PersistLogin />,
    children: [
      {
        path: "/",
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: (<Home />),
          },
          {
            path: "/myTickets",
            element: (<ProtectdRoute path="/myTickets" element={<MyTickets />} />),
          },
        ],
      },
      {
        path: "/admin",
        element: (
          <ProtectdRoute path="/admin" element={<Admin />} />
        ),
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "addEvent",
            element: <AddEvent />,
          },
          {
            path: "allEvents",
            element: <AllEvents />,
          },
          {
            path: "allEvents/editEvent",
            element: (<EditEvent />),
          },
          {
            path: "addUser",
            element: <AddUser />,
          },

        ],
      },
      {
        path: "/qrScanner",
        element: (
          <ProtectdRoute path="/qrScanner" element={<ScannerPage />} />
        ),
      },
      {
        path: "logIn",
        element: (
          <NotProtectdRoute path="logIn" element={<LogIn />} />
        ),
      },
      {
        path: "signUp",
        element: (<NotProtectdRoute path="signUp" element={<SignUp />} />),
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
