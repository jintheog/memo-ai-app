import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Props message : 사용자 or AI 메세지 객체
export default function ChatMessage({
  message,
  onSaveMemo,
  onCancelMemo,
  isDisabled,
}) {
  // 사용자 메세지 / AI 메세지 확인용 변수
  const isUser = message["role"] === "user";
  const isAi = message["role"] === "ai";
  const isMemo = message["type"] === "memo";

  return (
    // 메세지 role에 따라 정렬 방향 결정
    <div className={`mt-16 flex ${isUser ? "justify-end" : "justify-start"}`}>
      {/* AI 메세지 : 마크다운 표현 */}
      {/* 사용자 메세지 : 일반 텍스트 표현 */}
      {isAi ? (
        <div className="max-w-[90%]">
          {isMemo ? (
            // 메모 카드 표시 (사진과 동일한 UI)
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <div className="mb-4">
                <p className="text-gray-700 mb-4">{message.content}</p>

                {/* 메모 상세 정보 카드 */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        할일 내용:
                      </span>
                      <p className="text-gray-900 font-medium">
                        {message.memoData.content || message.memoData.title}
                      </p>
                    </div>

                    {message.memoData.dueDate && (
                      <div>
                        <span className="text-sm font-medium text-gray-600">
                          마감 날짜:
                        </span>
                        <p className="text-gray-900">
                          {message.memoData.dueDate}
                          {message.memoData.dueTime && (
                            <span className="ml-2 text-blue-600 font-medium">
                              {message.memoData.dueTime}
                            </span>
                          )}
                        </p>
                      </div>
                    )}

                    {message.memoData.priority && (
                      <div>
                        <span className="text-sm font-medium text-gray-600">
                          우선순위:
                        </span>
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-medium ml-2 ${
                            message.memoData.priority === "높음"
                              ? "bg-red-100 text-red-800"
                              : message.memoData.priority === "중간"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {message.memoData.priority}
                        </span>
                      </div>
                    )}

                    {message.memoData.category && (
                      <div>
                        <span className="text-sm font-medium text-gray-600">
                          카테고리:
                        </span>
                        <p className="text-gray-900">
                          {message.memoData.category}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 액션 버튼 */}
              <div className="flex space-x-3">
                <button
                  onClick={() => onSaveMemo(message.memoData, message.memoId)}
                  disabled={isDisabled}
                  className={`px-4 py-2 rounded-md font-medium ${
                    isDisabled
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  생성하기
                </button>
                <button
                  onClick={() => onCancelMemo(message.memoId)}
                  disabled={isDisabled}
                  className={`px-4 py-2 rounded-md font-medium ${
                    isDisabled
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  취소
                </button>
              </div>
            </div>
          ) : (
            // 일반 텍스트 메시지 (메모로 생성 불가능한 경우)
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
              <div className="markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-3 bg-blue-500 text-white rounded-xl">
          {message.content}
        </div>
      )}
    </div>
  );
}
