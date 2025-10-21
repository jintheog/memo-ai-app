import { useState } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import MessageList from "../../components/MessageList";
import ChatForm from "../../components/ChatForm";
import { chat, config } from "../../utils/genai";
import { createMemo } from "../../services/memoService";

export default function MemoCreate() {
  const [prompt, setPrompt] = useState(""); // 사용자 입력 프롬프트 관리 상태
  const [messages, setMessages] = useState([]); // 사용자 - AI 메세지 관리 상태
  const [isLoading, setIsLoading] = useState(false); // AI 요청 후 응답 대기 상태
  const [disabledMemos, setDisabledMemos] = useState(new Set()); // 비활성화된 메모 ID 관리

  // Redux에서 토큰 가져오기
  const token = useSelector((state) => state.auth.token);

  // 토큰에서 user_id 추출
  const getUserId = () => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded.sub; // Supabase JWT의 user_id는 'sub' 필드에 있음
    } catch (error) {
      console.error("토큰 디코딩 실패:", error);
      return null;
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    // 프롬프트가 비어있거나 AI 응답을 대기 중이라면
    // isLoading === true 라면
    if (isLoading === true || prompt.trim() === "") return;

    setMessages((prev) => [...prev, { role: "user", content: prompt }]);

    // currentPrompt 변수
    const currentPrompt = prompt;
    // 상태 prompt 초기화
    setPrompt("");

    setIsLoading(true); // 요청 시작
    await generateAiContent(currentPrompt); // AI 응답 생성 함수
    setIsLoading(false); // 요청 종료
  }
  // AI에게 요청을 보내서 응답을 생성하는 함수
  async function generateAiContent(currentPrompt) {
    try {
      const response = await chat.sendMessage({
        message: currentPrompt,
        config: config,
      });

      console.log(response.data);

      // AI 응답을 파싱하여 메모 데이터 추출
      const memoData = parseAiResponse(response.text);

      if (memoData) {
        // 메모로 변환 가능한 경우
        const memoId = Date.now(); // 고유 ID 생성
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: "사용자의 입력을 처리했습니다. 아래 메모를 생성할까요?",
            type: "memo",
            memoData: memoData,
            memoId: memoId, // 메모 ID 추가
          },
        ]);
      } else {
        // 메모로 변환 불가능한 경우
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content:
              "죄송합니다. 입력하신 내용을 메모로 만들 수 없습니다. 구체적인 일정이나 할 일을 입력해주세요.",
            type: "text",
          },
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "오류가 발생했습니다. 다시 시도해주세요.",
          type: "text",
        },
      ]);
    }
  }

  // AI 응답을 파싱하여 메모 데이터 추출
  function parseAiResponse(aiResponse) {
    try {
      // AI 응답이 이미 객체인 경우
      if (typeof aiResponse === "object" && aiResponse !== null) {
        if (aiResponse.isMemo === false) {
          return null;
        }
        return aiResponse;
      }

      // AI 응답에서 JSON 형태의 메모 데이터 추출 시도
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const memoData = JSON.parse(jsonMatch[0]);
        // isMemo가 false면 메모가 아님
        if (memoData.isMemo === false) {
          return null;
        }
        // 필수 필드 확인
        if (memoData.content) {
          return memoData;
        }
      }
      return null;
    } catch (error) {
      console.error("메모 데이터 파싱 실패:", error);
      return null;
    }
  }

  // 메모 저장 함수 (Supabase)
  async function saveMemo(memoData, memoId) {
    // 이미 처리된 메모인지 확인
    if (disabledMemos.has(memoId)) return;

    const userId = getUserId();
    if (!userId) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "로그인이 필요합니다.",
          type: "text",
        },
      ]);
      return;
    }

    // Supabase에 저장
    try {
      await createMemo({
        user_id: userId,
        content: memoData.content || memoData.title,
        dueDate: memoData.dueDate || null,
        dueTime: memoData.dueTime || null,
        priority: memoData.priority || "중간",
        category: memoData.category || "일반",
        completed: false,
        deleted: false,
      });
    } catch (e) {
      console.error(e);
      // 실패 시 사용자에게 안내
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "저장에 실패했습니다. 다시 시도해주세요.",
          type: "text",
        },
      ]);
      return;
    }

    // 메모 ID를 비활성화 목록에 추가
    setDisabledMemos((prev) => new Set(prev).add(memoId));

    // AI 응답으로 저장 완료 메시지 추가
    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        content: "메모가 저장되었습니다! 메모 목록에서 확인하실 수 있습니다.",
        type: "text",
      },
    ]);
  }

  // 메모 취소 함수
  function cancelMemo(memoId) {
    // 이미 처리된 메모인지 확인
    if (disabledMemos.has(memoId)) return;

    // 메모 ID를 비활성화 목록에 추가
    setDisabledMemos((prev) => new Set(prev).add(memoId));

    // AI 응답으로 취소 메시지 추가
    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        content: "메모 생성이 취소되었습니다.",
        type: "text",
      },
    ]);
  }

  function IntroBox() {
    return (
      <div className="flex flex-col items-center mt-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">AI 메모 생성기</h2>
        <p className="text-gray-600 mb-6 text-center">
          자연어로 할 일을 입력하면
          <br />
          AI가 자동으로 메모를 생성합니다.
        </p>
        <div className="bg-gray-100 rounded-lg p-6 text-gray-700 max-w-md text-center">
          <div className="font-semibold mb-2">예시</div>
          <ul className="space-y-2 text-sm">
            <li>“내일 오후 3시에 회의 준비하기”</li>
            <li>“다음 주까지 프로젝트 보고서 작성”</li>
            <li>“금요일에 병원 예약하기”</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <IntroBox />
        ) : (
          <MessageList
            messages={messages}
            onSaveMemo={saveMemo}
            onCancelMemo={cancelMemo}
            disabledMemos={disabledMemos}
          />
        )}
      </div>

      {/** 사용자 - AI 대화 내용 출력 컴포넌트 */}
      {/** 사용자의 프롬프트 작성 폼 컴포넌트 */}
      <div className="sticky bottom-0 bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <ChatForm
            prompt={prompt} // 사용자 입력값 관리 상태
            setPrompt={setPrompt} // 사용자 입력값 상태 변경함수
            isLoading={isLoading} // AI 응답 대기 상태
            onSubmit={handleSubmit} // form 요소 제출 이벤트 핸들러 함수
          />
        </div>
      </div>
    </div>
  );
}
