import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as memoService from "../services/memoService";

// 메모 목록 조회
export const fetchMemos = createAsyncThunk(
  "memos/fetchMemos",
  async (_, { rejectWithValue }) => {
    try {
      const data = await memoService.getMemos();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 메모 생성
export const addMemo = createAsyncThunk(
  "memos/addMemo",
  async (memoData, { rejectWithValue }) => {
    try {
      const data = await memoService.createMemo(memoData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 메모 수정 (완료 상태 토글)
export const updateMemo = createAsyncThunk(
  "memos/updateMemo",
  async ({ id, memoData }, { rejectWithValue }) => {
    try {
      const data = await memoService.updateMemo(id, memoData);
      return { id, memoData: data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 메모 삭제
export const removeMemo = createAsyncThunk(
  "memos/removeMemo",
  async (id, { rejectWithValue }) => {
    try {
      await memoService.deleteMemo(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  memos: [],
  deletedMemos: [],
  loading: false,
  error: null,
};

const memoSlice = createSlice({
  name: "memos",
  initialState,
  reducers: {
    // 로컬 상태 초기화
    clearMemos: (state) => {
      state.memos = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 메모 목록 조회
      .addCase(fetchMemos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMemos.fulfilled, (state, action) => {
        state.loading = false;
        state.memos = action.payload;
      })
      .addCase(fetchMemos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 메모 생성
      .addCase(addMemo.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMemo.fulfilled, (state, action) => {
        state.loading = false;
        state.memos.unshift(action.payload[0]); // Supabase는 배열로 반환
      })
      .addCase(addMemo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 메모 수정
      .addCase(updateMemo.fulfilled, (state, action) => {
        const { id } = action.payload;
        const index = state.memos.findIndex((memo) => memo.id === id);
        if (index !== -1) {
          state.memos[index] = action.payload.memoData[0];
        }
      })
      // 메모 삭제
      .addCase(removeMemo.fulfilled, (state, action) => {
        state.memos = state.memos.filter((memo) => memo.id !== action.payload);
      });
  },
});

export const { clearMemos, clearError } = memoSlice.actions;
export default memoSlice.reducer;
