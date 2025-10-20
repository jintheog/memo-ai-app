import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../../store/authSlice";
import { useNavigate, Link } from "react-router-dom";
import PATHS from "../../constants/paths";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (token) {
      navigate(PATHS.ROOT.INDEX);
    }
  }, [token, navigate]);

  // 컴포넌트 마운트 시 에러 초기화
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      if (error.error_code === "invalid_credentials") {
        setFormError("이메일 또는 비밀번호가 올바르지 않습니다.");
      } else {
        setFormError(error.msg || "로그인 중 오류가 발생했습니다.");
      }
    }
  }, [error]);

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
    dispatch(clearError()); // 이전 에러 초기화
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
              {error && !formError && (
                <p className="text-red-500 text-sm">
                  {error.error_code === "invalid_credentials"
                    ? "이메일 또는 비밀번호가 올바르지 않습니다."
                    : error.msg || "로그인 중 오류가 발생했습니다."}
                </p>
              )}
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
