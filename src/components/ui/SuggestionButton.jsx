export const SuggestionButton = ({ text, onClick }) => {
  return (
    <button
      onClick={() => onClick(text)}
      className="
        w-[260px] h-12
        flex items-center justify-center
        bg-white/70 
        backdrop-blur-xl
        border border-gray-300/70
        rounded-2xl
        shadow-md shadow-black/10
        text-gray-800 text-[13px]
        hover:bg-white/80
        transition
      "
    >
      {text}
    </button>
  );
};