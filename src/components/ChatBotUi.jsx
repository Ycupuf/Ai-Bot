import React, { useState } from "react";
import star from "../assets/star.png";
import { SendIcon } from "./icons/SendIcon";

export const ChatBotUi = () => {
  const [inputValue, setInputValue] = useState("");

  const suggestions = [
    "What can I ask you to do?",
    "What projects should I be concerned about right now?",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    console.log("Submitted:", inputValue);
    setInputValue("");
  };

  return (
    <div
      className="
        w-full h-full 
        flex flex-col 
        items-center 
        justify-between 
        px-4 py-10
      "
    >
      {/* ÜST KISIM */}
      <div className="flex flex-col items-center gap-4 mt-10">
        <img src={star} alt="star" className="w-10 h-10 opacity-80" />
        <h1 className="text-xl font-medium text-gray-800">
          Ask our AI anything
        </h1>
      </div>

      {/* ÖNERİLER (ORTADA COLUMN) */}
      <div className="flex flex-col items-center gap-6 grow justify-center">
        <h2 className="text-sm font-medium text-gray-600">
          Suggestions on what to ask
        </h2>

        <div className="flex flex-col gap-3 items-center">
          {suggestions.map((txt, i) => (
            <button
              key={i}
              onClick={() => setInputValue(txt)}
              className="
                w-[260px] h-12
                flex items-center justify-center
                bg-white/40 
                backdrop-blur-xl
                border border-white/50
                rounded-2xl
                shadow-md shadow-black/5
                text-gray-800
                hover:bg-white/60
                transition
              "
            >
              {txt}
            </button>
          ))}
        </div>
      </div>

      {/* ALT INPUT BAR */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[620px] px-2"
      >
        <div
          className="
            w-full 
            bg-white/60 
            backdrop-blur-xl 
            border border-white/50 
            rounded-2xl 
            shadow-md shadow-black/5 
            flex items-center 
            p-3
          "
        >
          <input
            type="text"
            className="
              flex-1 bg-transparent
              text-gray-800
              placeholder-gray-500
              text-sm
              outline-none
              pr-3
            "
            placeholder="Ask me anything..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <button type="submit" className="p-2 rounded-xl hover:bg-white/40 transition">
  <SendIcon className="w-6 h-6 text-gray-700 opacity-80 hover:opacity-100" />
</button>
        </div>
      </form>
    </div>
  );
};