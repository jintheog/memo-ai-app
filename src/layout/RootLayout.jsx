import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import PATHS from "../constants/paths";

export default function RootLayout() {
  return (
    <div>
      <div>
        <Link to={PATHS.ROOT.INDEX}>Memo AI</Link>
        <Link>메모 작성</Link>
        <Link>메모 목록</Link>
        <Link>로그인</Link>
        <Link>회원가입</Link>
      </div>
    </div>
  );
}
