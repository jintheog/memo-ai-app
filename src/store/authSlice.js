import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthToken } from "../services/api";
import axios from "axios";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const signup = createAsyncThunk(
  "auth",
  async (payload, { rejectWithValue }) => {
    try {
      const config = {
        url: `${SUPABASE_URL}/auth/v1/signup`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiKey: SUPABASE_ANON_KEY,
        },
        data: {
          email: payload.email,
          password: payload.password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/login`,
          },
        },
      };
      const { data } = await axios(config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const login = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const config = {
        url: `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiKey: SUPABASE_ANON_KEY,
        },
        data: {
          email: payload.email,
          password: payload.password,
        },
      };
      const { data } = await axios(config);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const logout = createAsyncThunk("auth/logout", async () => {
  // 클라이언트 측에서 토큰만 삭제 (API 호출 불필요)
  return null;
});

const initialState = {
  token: null,
  error: null,
  isSignup: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    resetIsSignup: (state) => {
      state.isSignup = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state) => {
        state.isSignup = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.access_token;
        setAuthToken(state.token);
        state.error = null; // 로그인 성공 시 에러 초기화
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.token = null; // 로그인 실패 시 토큰 초기화
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        setAuthToken(null);
        state.error = null; // 로그아웃 시 에러 초기화
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { resetIsSignup, clearError } = authSlice.actions;
export default authSlice.reducer;
export { signup, login, logout };
