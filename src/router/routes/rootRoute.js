import RootLayout from "../../layout/RootLayout";
import PATHS from "../../constants/paths";
import Home from "../../Page/Home";
import Login from "../../Page/Login";
const rootRoutes = [
  {
    path: PATHS["ROOT"]["INDEX"],
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: PATHS.ROOT.LOGIN,
        Component: Login,
      },
    ],
  },
];
export default rootRoutes;
