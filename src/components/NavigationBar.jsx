import PATHS from "../constants/paths";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

export default function NavigationBar() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMemoClick = (path) => {
    if (!token) {
      navigate(PATHS.AUTH.LOGIN);
      return;
    }
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate(PATHS.ROOT.INDEX);
  };

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
            <button
              onClick={() => handleMemoClick(PATHS.ROOT.MEMO_CREATE)}
              className="text-gray-600 px-3 py-2 cursor-pointer hover:text-gray-900"
            >
              메모 작성
            </button>
            <button
              onClick={() => handleMemoClick(PATHS.ROOT.MEMO_LIST)}
              className="text-gray-600 px-3 py-2 cursor-pointer hover:text-gray-900"
            >
              메모 목록
            </button>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            {!token ? (
              // 비로그인 상태:
              <>
                <NavLink
                  to={PATHS.AUTH.LOGIN}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium"
                >
                  로그인
                </NavLink>
                <NavLink
                  to={PATHS.AUTH.SIGNUP}
                  className="bg-gray-800 hover:bg-gray-900 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium"
                >
                  회원가입
                </NavLink>
              </>
            ) : (
              // 로그인 상태:
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium cursor-pointer"
              >
                로그아웃
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
