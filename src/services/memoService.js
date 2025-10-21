import { api } from "./api";

// 메모 목록 조회
export const getMemos = async () => {
  const response = await api.get("/memos", {
    params: {
      select: "*",
      order: "created_at.desc",
    },
  });
  return response.data;
};

// 메모 생성
export const createMemo = async (memoData) => {
  const response = await api.post("/memos", memoData);
  return response.data;
};

// 메모 수정
export const updateMemo = async (id, memoData) => {
  const response = await api.patch(`/memos?id=eq.${id}`, memoData);
  return response.data;
};

// 메모 삭제
export const deleteMemo = async (id) => {
  const response = await api.delete(`/memos?id=eq.${id}`);
  return response.data;
};
