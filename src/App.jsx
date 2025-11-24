import "./index.css";
import { ChatBotUi } from "./components/ChatBotUi";

function App() {
  return (
    <div className="w-full h-screen bg-linear-to-br from-[#f5f5f7] to-[#e8e8ea] overflow-hidden">
      <ChatBotUi />
    </div>
  );
}

export default App;