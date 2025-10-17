import AuthLayout from "../../layout/AuthLayout";
import AuthHome from "../../Page/AuthPages/AuthHome";
import Login from "../../Page/AuthPages/Login";
import SignUp from "../../Page/AuthPages/SignUp";
import PATHS from "../../constants/paths";
const authRoutes = [
  {
    path: PATHS.AUTH.INDEX,
    Component: AuthLayout,
    children: [
      {
        index: true,
        Component: AuthHome,
      },
      {
        path: PATHS.AUTH.LOGIN,
        Component: Login,
      },
      {
        path: PATHS.AUTH.SIGNUP,
        Component: SignUp,
      },
    ],
  },
];

export default authRoutes;
