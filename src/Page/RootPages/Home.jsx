import HomeMessage from "../../components/HomeMessage";
import PATHS from "../../constants/paths";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
export default function Home() {
  const token = useSelector((state) => state.auth.token);

  return (
    <div className="bg-white text-gray-900 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="flex flex-col items-center justify-center text-center">
          <div>
            <HomeMessage />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
            {!token ? (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md p-6">
                <div className="flex-1 px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold cursor-pointer">
                  <NavLink to={PATHS.AUTH.SIGNUP}>시작하기</NavLink>
                </div>
                <div className="flex-1 px-8 py-4 border-2 border-gray-900 hover:bg-gray-100 text-gray-900 font-semibold cursor-pointer">
                  <NavLink to={PATHS.AUTH.LOGIN}>로그인</NavLink>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md p-6">
                <div className="flex-1 px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold cursor-pointer">
                  <NavLink to={PATHS.ROOT.MEMO_CREATE}>메모 작성하기</NavLink>
                </div>
                <div className="flex-1 px-8 py-4 border-2 border-gray-900 hover:bg-gray-100 text-gray-900 font-semibold cursor-pointer">
                  <NavLink to={PATHS.ROOT.MEMO_LIST}>메모 목록 보기</NavLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
