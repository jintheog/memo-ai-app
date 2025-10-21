import axios from "axios";

const BASE_URL = import.meta.env.VITE_SUPABASE_URL;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Axios 기본 인스턴스
export const api = axios.create({
  baseURL: `${BASE_URL}/rest/v1`,
  headers: {
    apikey: ANON_KEY,
    "Content-Type": "application/json",
  },
});

// 인증 토큰 추가 인터셉터
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};
