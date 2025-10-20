import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/authSlice";
import { useNavigate, Link } from "react-router-dom";
import PATHS from "../../constants/paths";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      alert("로그인 상태입니다.");
    }
  }, [token, navigate]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!email && !password) {
      setFormError("이메일과 비밀번호를 입력하세요");
      return;
    }
    if (!email) {
      setFormError("이메일을 입력하세요.");
      return;
    }

    if (!password) {
      setFormError("비밀번호를 입력하세요.");
      return;
    }
    setFormError("");
    dispatch(login({ email, password }));
  }

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              로그인
            </h2>
            <p className="text-sm text-gray-600">계정에 로그인하세요</p>
          </div>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="flex flex-col gap-4">
              <input
                placeholder="이메일 주소"
                className="px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                placeholder="비밀번호"
                className="px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {formError && <p className="text-red-500 text-sm">{formError}</p>}
              <button
                className="py-2 px-4 text-sm font-medium text-white bg-indigo-600 cursor-pointer"
                type="submit"
              >
                로그인
              </button>
              <Link
                to={PATHS.AUTH.SIGNUP}
                className="py-2 px-4 text-sm font-medium text-white bg-gray-600 text-center cursor-pointer"
              >
                회원가입
              </Link>
              <Link
                to={PATHS.ROOT.INDEX}
                className="py-2 px-4 text-sm font-medium text-white bg-green-600 text-center cursor-pointer"
              >
                처음으로
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
