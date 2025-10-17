import PATHS from "../constants/paths";
import { NavLink, Link } from "react-router-dom";
export default function NavigationBar() {
  return (
    <div>
      <div className="w-full px-1 sm:px-1 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <NavLink
              to={PATHS.ROOT.INDEX}
              className="text-lg sm:text-xl font-bold text-gray-900"
            >
              Memo AI
            </NavLink>
            <NavLink
              to={PATHS.ROOT.MEMO_CREATE}
              className="text-gray-600 px-3 py-2 cursor-pointer"
            >
              메모 작성
            </NavLink>
            <NavLink
              to={PATHS.ROOT.MEMO_LIST}
              className="text-gray-600 px-3 py-2 cursor-pointer"
            >
              메모 목록
            </NavLink>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <NavLink
              to={PATHS.ROOT.LOGIN}
              className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium"
            >
              로그인
            </NavLink>
            <NavLink
              to={PATHS.ROOT.SIGNUP}
              className="bg-gray-800 hover:bg-gray-900 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium"
            >
              회원가입
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
