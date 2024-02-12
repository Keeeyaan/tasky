import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import {
  Layout,
  Error,
  Landing,
  Login,
  Register,
  DashboardLayout,
  Task,
} from "./pages";
import PersistLogin from "./components/PersistLogin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <PersistLogin>
            <Landing />
          </PersistLogin>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: (
          <PersistLogin>
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          </PersistLogin>
        ),
        children: [
          {
            index: true,
            element: <Task />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
