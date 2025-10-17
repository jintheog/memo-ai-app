import React from "react";

export default function HomeMessage() {
  return (
    <div className="text-center">
      <div className="text-6xl font-bold p-4">Memo AI</div>
      <div className="text-4xl p-4">지능형 메모 관리</div>
      <div className="text-xl max-w-3xl leading-relaxed">
        자연어로 할 일을 입력하면 AI가 자동으로 구조화된 메모로 변환해주는
        지능형 메모 관리 서비스입니다.
      </div>
    </div>
  );
}
