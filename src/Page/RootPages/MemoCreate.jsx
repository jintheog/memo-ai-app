import { useState } from "react";
import MessageList from "../../components/MessageList";
import ChatForm from "../../components/ChatForm";
import { chat, config } from "../../utils/genai";

export default function MemoCreate() {
  const [prompt, setPrompt] = useState(""); // 사용자 입력 프롬프트 관리 상태
  const [messages, setMessages] = useState([]); // 사용자 - AI 메세지 관리 상태
  const [isLoading, setIsLoading] = useState(false); // AI 요청 후 응답 대기 상태

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
      //사용자 입력 프롬프트 초기화
      // setPrompt("");

      // messages 상태에 AI와 응답을 저장
      setMessages((prev) => [...prev, { role: "ai", content: response.text }]);
    } catch (error) {
      console.error(error);
    }
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
          <MessageList messages={messages} />
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
