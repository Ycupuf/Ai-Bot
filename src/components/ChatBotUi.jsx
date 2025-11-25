import React, { useState } from "react";
import star from "../assets/star.png";

import { SendButton } from "./ui/SendButton";
import { InputBar } from "./ui/InputBar";
import { SectionTitle } from "./ui/SectionTitle";
import { SuggestionButton } from "./ui/SuggestionButton";

export const ChatBotUi = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  const suggestions = [
    "What can I ask you to do?",
    "What projects should I be concerned about right now?",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: inputValue }]);
    setInputValue("");
  };

  const chatStarted = messages.length > 0;

  return (
    <div className="w-full h-screen flex flex-col px-4 py-6 bg-white overflow-hidden relative">

      {/* SMALL STAR TOP-LEFT */}
      {chatStarted && (
        <div className="absolute top-4 left-4">
          <img src={star} alt="star" className="w-5 h-5 opacity-80" />
        </div>
      )}

      {/* HEADER (visible before chat starts) */}
      {!chatStarted && (
        <div className="flex flex-col items-center gap-4 mt-10">
          <img src={star} alt="star" className="w-10 h-10 opacity-80" />
          <h1 className="text-xl font-medium text-gray-800">
            Ask our AI anything
          </h1>
        </div>
      )}

      {/* CHAT BUBBLES */}
      {chatStarted && (
        <div
          className="
            flex flex-col gap-3 
            w-full max-w-[620px] 
            mx-auto 
            grow
            overflow-y-auto 
            scrollbar-none 
            pt-14 pb-6
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
              `}
            >
              {m.text}
            </div>
          ))}
        </div>
      )}

      {/* SUGGESTIONS (only before chat starts) */}
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

      {/* INPUT BAR (always visible) */}
      <InputBar
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSubmit}
      />
    </div>
  );
};