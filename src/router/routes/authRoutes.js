import AuthLayout from "../../layout/AuthLayout";
import Login from "../../Page/AuthPages/Login";
import SignUp from "../../Page/AuthPages/SignUp";
import PATHS from "../../constants/paths";

const authRoutes = [
  {
    path: PATHS.AUTH.INDEX,
    Component: AuthLayout,
    children: [
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
