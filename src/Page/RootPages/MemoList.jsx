import { useState, useEffect } from "react";

export default function MemoList() {
  const [memos, setMemos] = useState([]);
  const [deletedMemos, setDeletedMemos] = useState([]);
  const [filter, setFilter] = useState("전체"); // 전체, 미완료, 완료, 삭제됨

  // 로컬 스토리지에서 메모 불러오기
  useEffect(() => {
    const storedMemos = JSON.parse(localStorage.getItem("memos") || "[]");
    const storedDeletedMemos = JSON.parse(
      localStorage.getItem("deletedMemos") || "[]"
    );
    setMemos(storedMemos);
    setDeletedMemos(storedDeletedMemos);
  }, []);

  // 완료 상태 토글
  const toggleComplete = (id) => {
    const updatedMemos = memos.map((memo) =>
      memo.id === id ? { ...memo, completed: !memo.completed } : memo
    );
    setMemos(updatedMemos);
    localStorage.setItem("memos", JSON.stringify(updatedMemos));
  };

  // 메모 삭제 (삭제함으로 이동)
  const deleteMemo = (id) => {
    const memoToDelete = memos.find((memo) => memo.id === id);
    if (memoToDelete) {
      const updatedMemos = memos.filter((memo) => memo.id !== id);
      const updatedDeletedMemos = [
        ...deletedMemos,
        { ...memoToDelete, deletedAt: new Date().toISOString() },
      ];

      setMemos(updatedMemos);
      setDeletedMemos(updatedDeletedMemos);
      localStorage.setItem("memos", JSON.stringify(updatedMemos));
      localStorage.setItem("deletedMemos", JSON.stringify(updatedDeletedMemos));
    }
  };

  // 삭제된 메모 영구 삭제
  const permanentlyDelete = (id) => {
    const updatedDeletedMemos = deletedMemos.filter((memo) => memo.id !== id);
    setDeletedMemos(updatedDeletedMemos);
    localStorage.setItem("deletedMemos", JSON.stringify(updatedDeletedMemos));
  };

  // 삭제된 메모 복원
  const restoreMemo = (id) => {
    const memoToRestore = deletedMemos.find((memo) => memo.id === id);
    if (memoToRestore) {
      const { deletedAt: _deletedAt, ...restoredMemo } = memoToRestore;
      const updatedDeletedMemos = deletedMemos.filter((memo) => memo.id !== id);
      const updatedMemos = [...memos, restoredMemo];

      setDeletedMemos(updatedDeletedMemos);
      setMemos(updatedMemos);
      localStorage.setItem("deletedMemos", JSON.stringify(updatedDeletedMemos));
      localStorage.setItem("memos", JSON.stringify(updatedMemos));
    }
  };

  // 필터링된 메모 목록
  const filteredMemos =
    filter === "삭제됨"
      ? deletedMemos
      : memos.filter((memo) => {
          if (filter === "전체") return true;
          if (filter === "미완료") return !memo.completed;
          if (filter === "완료") return memo.completed;
          return true;
        });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">메모 목록</h1>

        {/* 필터 탭 */}
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setFilter("전체")}
            className={`px-6 py-2 rounded-lg font-medium ${
              filter === "전체"
                ? "bg-black text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            전체 ({memos.length})
          </button>
          <button
            onClick={() => setFilter("미완료")}
            className={`px-6 py-2 rounded-lg font-medium ${
              filter === "미완료"
                ? "bg-black text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            미완료 ({memos.filter((m) => !m.completed).length})
          </button>
          <button
            onClick={() => setFilter("완료")}
            className={`px-6 py-2 rounded-lg font-medium ${
              filter === "완료"
                ? "bg-black text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            완료 ({memos.filter((m) => m.completed).length})
          </button>
          <button
            onClick={() => setFilter("삭제됨")}
            className={`px-6 py-2 rounded-lg font-medium ${
              filter === "삭제됨"
                ? "bg-black text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            삭제됨 ({deletedMemos.length})
          </button>
        </div>

        {/* 메모 목록 */}
        {filteredMemos.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-gray-500 text-lg">
              아직 메모가 없습니다.
              <br />
              메모 작성 페이지에서 새로운 할 일을 만들어보세요.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMemos.map((memo) => (
              <div
                key={memo.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between space-x-4">
                  {/* 메모 내용 */}
                  <div className="flex-1">
                    <p
                      className={`mb-3 text-lg ${
                        memo.completed
                          ? "line-through text-gray-400"
                          : "text-gray-900"
                      }`}
                    >
                      {memo.content}
                    </p>

                    {/* 메모 상세 정보 */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {memo.dueDate && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                          📅 {memo.dueDate}
                          {memo.dueTime && (
                            <span className="ml-1 font-medium">
                              {memo.dueTime}
                            </span>
                          )}
                        </span>
                      )}
                      {memo.category && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                          🏷️ {memo.category}
                        </span>
                      )}
                      {memo.priority && (
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                            memo.priority === "높음"
                              ? "bg-red-100 text-red-800"
                              : memo.priority === "중간"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          ⭐ {memo.priority}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-gray-400">
                      생성일: {memo.createdAt}
                    </p>
                  </div>

                  {/* 버튼 그룹 */}
                  <div className="flex flex-col space-y-2 min-w-[180px]">
                    {filter !== "삭제됨" ? (
                      <>
                        {/* 완료/미완료 버튼 */}
                        <button
                          onClick={() => toggleComplete(memo.id)}
                          className={`px-4 py-2 rounded-md font-medium whitespace-nowrap ${
                            memo.completed
                              ? "bg-yellow-500 text-white hover:bg-yellow-600"
                              : "bg-green-500 text-white hover:bg-green-600"
                          }`}
                        >
                          {memo.completed ? "미완료로 되돌리기" : "완료"}
                        </button>

                        {/* 삭제 버튼 */}
                        <button
                          onClick={() => deleteMemo(memo.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 font-medium"
                        >
                          삭제
                        </button>
                      </>
                    ) : (
                      <>
                        {/* 복원 버튼 */}
                        <button
                          onClick={() => restoreMemo(memo.id)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-medium whitespace-nowrap"
                        >
                          복원
                        </button>

                        {/* 영구 삭제 버튼 */}
                        <button
                          onClick={() => permanentlyDelete(memo.id)}
                          className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 font-medium whitespace-nowrap"
                        >
                          영구 삭제
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
