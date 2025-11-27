import React, { useState, useRef, useEffect } from "react";
import star from "../assets/star.png";

import { InputBar } from "./ui/InputBar";
import { SectionTitle } from "./ui/SectionTitle";
import { SuggestionButton } from "./ui/SuggestionButton";

// Markdown -> basit HTML çevirici
function markdownToHtml(md) {
  return md
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, "<code>$1</code>")
    .replace(/(?:\r\n|\r|\n)/g, "<br>");
}

export const ChatBotUi = () => {
  const messagesEndRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  const suggestions = [
    "Tell me about Yusuf's projects.",
    "Show me Yusuf's coding strengths.",
  ];

  // Mesaj geldikçe en alta kaydır
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = inputValue;

    // Kullanıcı balonu
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInputValue("");

    // Loading balonu
    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: "...", loading: true },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      const aiReply = markdownToHtml(data.reply || "");

      setMessages((prev) => {
        const withoutLoading = prev.filter((m) => !m.loading);
        return [...withoutLoading, { role: "assistant", text: aiReply }];
      });
    } catch (err) {
      console.error("Frontend fetch error:", err);
      setMessages((prev) => {
        const withoutLoading = prev.filter((m) => !m.loading);
        return [
          ...withoutLoading,
          {
            role: "assistant",
            text: "There was a connection problem while talking to the AI.",
          },
        ];
      });
    }
  };

  const chatStarted = messages.length > 0;

  return (
    <div className="w-full h-[100dvh] flex flex-col bg-white relative overflow-hidden">

      {/* HEADER – her zaman sabit */}
      <div className="
        fixed top-0 left-0 w-full 
        flex flex-col items-center 
        py-3
        bg-white/70 backdrop-blur-xl 
        border-b border-gray-300/40
        z-20
      ">
        <img src={star} alt="star" className="w-7 h-7 opacity-80" />
        <h1 className="text-gray-800 text-lg font-semibold mt-1">AI CV</h1>
      </div>

      {/* CHAT BUBBLES – sadece ortası scroll */}
      {chatStarted && (
        <div
          className="
            flex flex-col gap-3 
            w-full max-w-[620px] 
            mx-auto 
            flex-1
            overflow-y-auto 
            pt-[90px] 
            pb-[100px]
            px-2
            z-10
          "
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`
                max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed
                ${
                  m.role === "user"
                    ? "self-end bg-white/70 backdrop-blur-xl border border-gray-300/70 text-gray-900 shadow-md"
                    : "self-start bg-white/40 backdrop-blur-xl border border-gray-300/50 text-gray-700 shadow-md"
                }
                ${m.loading ? "animate-pulse" : ""}
              `}
              dangerouslySetInnerHTML={{ __html: m.text }}
            />
          ))}

          <div ref={messagesEndRef} />
        </div>
      )}

      {/* SUGGESTIONS – sohbet başlamadan önce */}
      {!chatStarted && (
        <div className="flex flex-col items-center gap-6 justify-center flex-1 pt-[90px] pb-[100px]">
          <SectionTitle>Suggestions on what to ask</SectionTitle>

          <div className="flex flex-col gap-3 items-center">
            {suggestions.map((txt, i) => (
              <SuggestionButton key={i} text={txt} onClick={setInputValue} />
            ))}
          </div>
        </div>
      )}

      {/* INPUT – altta sabit */}
      <div className="
        fixed bottom-0 left-0 w-full
        bg-white/80 backdrop-blur-xl 
        border-t border-gray-300/40
        px-4 py-3
        z-20
      ">
        <InputBar
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};