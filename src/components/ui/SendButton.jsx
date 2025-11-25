export const SendButton = () => {
  return (
    <button
      type="submit"
      className="
        p-2 rounded-xl 
        bg-white/30 backdrop-blur-xl 
        hover:bg-white/50 
        border border-gray-300/50
        shadow-md shadow-black/5
        transition flex items-center justify-center
      "
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth="2" 
        stroke="rgb(60 60 60)"
        className="w-6 h-6"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M4.5 12l15-6-6 15-1.8-5.7L4.5 12z" 
        />
      </svg>
    </button>
  );
};