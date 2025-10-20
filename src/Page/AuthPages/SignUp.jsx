import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup, resetIsSignup } from "../../store/authSlice";
import { useNavigate, Link } from "react-router-dom";
import PATHS from "../../constants/paths";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSignup = useSelector((state) => state.auth.isSignup);

  const error = useSelector((state) => state.auth.error);

  function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
      return;
    }

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
    setPasswordError("");
    dispatch(signup({ email: email, password: password }));
  }

  useEffect(() => {
    if (isSignup === true) {
      alert(
        "회원가입을 성공했습니다. 메일함을 확인해주세요. 로그인 페이지로 이동 합니다"
      );
      dispatch(resetIsSignup());
      navigate(PATHS.AUTH.LOGIN);
    }
  }, [isSignup, dispatch, navigate]);
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              회원가입
            </h2>
            <p className="text-sm text-gray-600">새 계정을 만들어 보세요</p>
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
              <input
                placeholder="비밀번호 확인"
                className="px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}
              {formError && <p className="text-red-500 text-sm">{formError}</p>}
              <button
                className="py-2 px-4 text-sm font-medium text-white bg-indigo-600 cursor-pointer"
                type="submit"
              >
                회원가입
              </button>
              <Link
                to={PATHS.AUTH.LOGIN}
                className="py-2 px-4 text-sm font-medium text-white bg-gray-600 text-center cursor-pointer"
              >
                로그인
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
