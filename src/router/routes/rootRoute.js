import RootLayout from "../../layout/RootLayout";
import PATHS from "../../constants/paths";
import Home from "../../Page/Home";
const rootRoutes = [
  {
    path: PATHS["ROOT"]["INDEX"],
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
];
export default rootRoutes;
