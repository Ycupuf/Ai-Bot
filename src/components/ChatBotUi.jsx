import React, { useState } from "react";
import star from "../assets/star.png";
import sendIcon from "../assets/send.png";

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
<div className="relative w-full h-full min-h-screen bg-white overflow-hidden">
      {/* Arka plan ışık efektleri */}
      <div className="absolute top-[483px] left-1/2 -translate-x-1/2 w-[412px] h-[464px]">
        <div className="absolute top-0 left-[calc(50%-6px)] w-[212px] h-[280px] bg-[#89bcff] rounded-[140px] blur-[150px]" />
        <div className="absolute top-[50px] left-[calc(50%-206px)] w-[313px] h-[414px] bg-[#ff86e1] rounded-[207px] blur-[250px]" />
      </div>

      {/* Header */}
      <header className="absolute flex flex-col items-center w-[310px] gap-12 top-[calc(50%-270px)] left-[calc(50%-155px)]">
        <div className="flex justify-center items-center">
  <img
    src={star}
    alt="Star"
    className="w-8 h-8 object-contain opacity-90"
  />
</div>

        <h1 className="text-[#160211] text-2xl text-center">
          Ask our AI anything
        </h1>
      </header>

      {/* Öneriler */}
     <section className="absolute top-[622px] left-1/2 -translate-x-1/2 w-[667px]">
        <h2 className="mb-6 text-sm font-bold text-[#56637e]">
          Suggestions on what to ask Our AI
        </h2>

        <div className="flex gap-2">
          {suggestions.map((txt, i) => (
            <button
              key={i}
              onClick={() => setInputValue(txt)}
              className={`${
                i === 0 ? "w-[283px]" : "w-[376px]"
              } h-[49px] flex items-center justify-center bg-white/50 border border-white rounded-lg p-2.5 hover:bg-white/70 transition`}
              type="button"
            >
              <span className="text-sm text-[#160211] text-left">{txt}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Input alanı */}
      <form
        onSubmit={handleSubmit}
        className="absolute top-[721px] left-1/2 -translate-x-1/2 w-[668px]"
      >
        <div className="flex items-center justify-between p-2.5 bg-white border border-[#1602114c] rounded-lg">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything about your projects"
            className="w-full text-sm text-[#160211] placeholder-[#56637e] focus:outline-none mr-3"
          />

          <button type="submit">
            <img
              src={sendIcon}
              alt="Send"
              className="w-9 h-9 object-contain"
            />
          </button>
        </div>
      </form>
    </div>
  );
};