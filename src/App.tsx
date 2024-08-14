import { createBrowserRouter } from "react-router-dom";

import { Home } from "./Pages/home";
import { Login } from "./Pages/login";
import { Dashboard } from "./Pages/dashboard";
import { New } from "./Pages/dashboard/new";
import { Detail } from "./Pages/detail";
import { Layout } from "./Components/layout";

import { Private } from "./routes/private";

const router = createBrowserRouter([
    {
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: <Home/>
        },
        {
          path: "/dashboard",
          element: <Private><Dashboard/></Private>
        },
        {
          path: "/dashboard/new",
          element: <Private><New/></Private>
        },
        {
          path: "/detail/:id",
          element: <Detail/>
        }
      ]
    },
    {
      path: "/login",
      element: <Login/>
    }
])

export { router };