import React, { useState, useRef, useEffect } from "react";
import star from "../assets/star.png";

import { InputBar } from "./ui/InputBar";
import { SectionTitle } from "./ui/SectionTitle";
import { SuggestionButton } from "./ui/SuggestionButton";

// Markdown -> basit HTML çevirici
function markdownToHtml(md) {
  return md
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // **bold**
    .replace(/\*(.*?)\*/g, "<em>$1</em>")             // *italic*
    .replace(/`(.*?)`/g, "<code>$1</code>")           // `code`
    .replace(/(?:\r\n|\r|\n)/g, "<br>");              // satır sonu
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
    <div className="w-full h-screen flex flex-col px-4 py-6 bg-white overflow-hidden relative">

      {/* HEADER – her zaman var, sadece konumu değişiyor */}
      <div
        className={`
          w-full flex flex-col items-center transition-all duration-500 z-20
          ${
            chatStarted
              ? "absolute top-0 left-0 py-3 bg-white/70 backdrop-blur-xl border-b border-gray-300/40"
              : "mt-10"
          }
        `}
      >
        <img
          src={star}
          alt="star"
          className={`
            opacity-80 transition-all duration-500
            ${chatStarted ? "w-5 h-5" : "w-10 h-10 mb-2"}
          `}
        />
        <h1
          className={`
            text-gray-800 transition-all duration-500
            ${chatStarted ? "text-lg font-semibold" : "text-xl font-medium mt-2"}
          `}
        >
          AI CV
        </h1>
      </div>

      {/* CHAT BUBBLES – sohbet başladıktan sonra */}
      {chatStarted && (
        <div
          className="
            flex flex-col gap-3 
            w-full max-w-[620px] 
            mx-auto 
            grow
            overflow-y-auto 
            mt-[90px] pb-6
            pr-2
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

      {/* SUGGESTIONS – sadece sohbet başlamadan önce */}
      {!chatStarted && (
        <div className="flex flex-col items-center gap-6 grow justify-center">
          <SectionTitle>Suggestions on what to ask</SectionTitle>

          <div className="flex flex-col gap-3 items-center">
            {suggestions.map((txt, i) => (
              <SuggestionButton key={i} text={txt} onClick={setInputValue} />
            ))}
          </div>
        </div>
      )}

      {/* INPUT – her zaman görünür */}
      <InputBar
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSubmit}
      />
    </div>
  );
};