import RootLayout from "../../layout/RootLayout";
import PATHS from "../../constants/paths";
import Home from "../../Page/RootPages/Home";
import Login from "../../Page/AuthPages/Login";
import SignUp from "../../Page/AuthPages/SignUp";
import MemoCreate from "../../Page/RootPages/MemoCreate";
import MemoList from "../../Page/RootPages/MemoList";

const rootRoutes = [
  {
    path: PATHS.ROOT.INDEX,
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
      {
        path: PATHS.ROOT.SIGNUP,
        Component: SignUp,
      },
      {
        path: PATHS.ROOT.MEMO_CREATE,
        Component: MemoCreate,
      },
      {
        path: PATHS.ROOT.MEMO_LIST,
        Component: MemoList,
      },
    ],
  },
];
export default rootRoutes;
