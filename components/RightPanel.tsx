"use client";

import React, { useState } from "react";

const RightPanel: React.FC = () => {
  const [messages, setMessages] = useState<
    { user: string; bot: string | null }[]
  >([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { user: userMessage, bot: null }]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages.map((msg) => ({ role: "user", content: msg.user })), { role: "user", content: userMessage }],
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await res.json();
      setMessages((prev) => {
        const updatedMessages = [...prev];
        updatedMessages[updatedMessages.length - 1].bot = data.response;
        return updatedMessages;
      });
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => {
        const updatedMessages = [...prev];
        updatedMessages[updatedMessages.length - 1].bot =
          "エラーが発生しました。";
        return updatedMessages;
      });
    }
  };

  return (
    <div className="w-full h-full px-4 pt-8 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="mb-4">
            <div className="text-blue-600 font-bold">User:</div>
            <div className="mb-2">{msg.user}</div>
            {msg.bot && (
              <>
                <div className="text-green-600 font-bold">ChatGPT:</div>
                <div>{msg.bot}</div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
          placeholder="メッセージを入力してください..."
        />
        <button
          onClick={handleSend}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          送信
        </button>
      </div>
    </div>
  );
};

export default RightPanel;
