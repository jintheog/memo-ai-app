import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const SUPABSE_URL = import.meta.env.VITE_SUPABSE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const signup = createAsyncThunk(
  "auth",
  async (payload, { rejectWithValue }) => {
    try {
      const config = {
        url: `${SUPABSE_URL}/auth/v1/signup`,
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
        url: `${SUPABSE_URL}/auth/v1/token?grant_type=password`,
        method: "POST",
        headers: {
          "Content-Type": "application.json",
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

const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, getState }) => {
    try {
      const config = {
        url: `${SUPABSE_URL}/auth/v1/logout`,
        method: "POST",
        headers: {
          "Content-Type": "application.json",
          apiKey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${getState().auth.token}`,
        },
      };
      const { data } = await axios(config);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state) => {
        state.isSignup = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.access_token;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { resetIsSignup } = authSlice.actions;
export default authSlice.reducer;
export { signup, login, logout };
