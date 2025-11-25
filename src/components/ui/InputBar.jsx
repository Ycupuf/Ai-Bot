import { SendButton } from "./SendButton";

export const InputBar = ({ value, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-[620px] mx-auto px-2 mb-4">
      <div
        className="
          w-full 
          bg-white/70 
          backdrop-blur-xl 
          border border-gray-300/70 
          rounded-2xl 
          shadow-lg shadow-black/10 
          flex items-center 
          p-3
        "
      >
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ask me anything..."
          className="
            flex-1 bg-transparent
            text-gray-800
            placeholder-gray-500
            text-sm
            outline-none pr-3
          "
        />
        <SendButton />
      </div>
    </form>
  );
};