import { api } from "./api";

// 메모 목록 조회
export const getMemos = async () => {
  const response = await api.get("/memo", {
    params: {
      select: "*",
      order: "created_at.desc",
    },
  });
  return response.data;
};

// 메모 생성
export const createMemo = async (memoData) => {
  const response = await api.post("/memo", memoData);
  return response.data;
};

// 메모 수정
export const updateMemo = async (id, memoData) => {
  const response = await api.patch(`/memo?id=eq.${id}`, memoData);
  return response.data;
};

// 메모 삭제
export const deleteMemo = async (id) => {
  // 소프트 삭제: deleted=true 로 갱신
  const response = await api.patch(`/memo?id=eq.${id}`, { deleted: true });
  return response.data;
};

// 영구 삭제 (삭제됨 탭에서 사용)
export const hardDeleteMemo = async (id) => {
  const response = await api.delete(`/memo?id=eq.${id}`);
  return response.data;
};
