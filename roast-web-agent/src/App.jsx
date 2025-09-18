import { useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    try {
      const response = await axios.post("http://localhost:7000/chat", {
        message: input,
      });

      const botMessage = { role: "assistant", content: response.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage = {
        role: "assistant",
        content: "⚠️ Error from server",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <h1 className="text-4xl font-extrabold mb-6 text-red-500 drop-shadow-[0_0_10px_rgba(255,0,0,0.7)] animate-pulse">
        🔥 AI Roast Agent 🤖
      </h1>

      {/* Chat Box */}
      <div className="w-[28rem] h-[28rem] overflow-y-auto border border-gray-700 p-4 rounded-2xl mb-4 bg-gray-800/80 shadow-lg backdrop-blur">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-3 p-3 rounded-xl max-w-[80%] ${
              msg.role === "user"
                ? "bg-blue-600 text-left self-start ml-auto text-white shadow-md"
                : "bg-green-600 text-left self-start text-white shadow-md"
            }`}
          >
            <b>{msg.role === "user" ? "🙋 You" : "🤖 RoastBot"}:</b>{" "}
            {msg.content}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex w-[28rem]">
        <input
          className="flex-1 p-3 rounded-l-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your roast bait..."
        />
        <button
          onClick={sendMessage}
          className="bg-red-600 px-6 rounded-r-xl hover:bg-red-700 active:scale-95 transition-all shadow-[0_0_10px_rgba(255,0,0,0.6)]"
        >
          Send 🚀
        </button>
      </div>
    </div>
  );
}

export default App;
