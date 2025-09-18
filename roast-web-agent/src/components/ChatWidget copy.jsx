import { useState } from "react";
import { model } from "../firebaseAI";
import { motion, AnimatePresence } from "framer-motion";

function ChatWidget() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [typing, setTyping] = useState(false);

  const quickReplies = [
    "Tum bohot funny ho 😎",
    "Bhai thoda serious ho jao 😂",
    "Kya bakwas hai ye 😏",
    "Hahaha ye to zabardast tha 🤣",
  ];

  const sendRoast = async (customMessage) => {
    const msg = customMessage || message;
    if (!msg.trim()) return;

    setMessage("");
    setChat((prev) => [
      ...prev,
      { sender: "user", text: msg, time: new Date() },
    ]);
    setLoading(true);
    setTyping(true);

    const prompt = `
Tum ek professional AI roast bot ho for Enaam.pk.
Hamesha polite, witty, aur funny Roman Urdu style main reply do,
lekin respectful aur clean language me. 
User ne kaha: "${msg}"
`;

    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = await response.text();

      // Simulate typing delay
      setTimeout(() => {
        setChat((prev) => [...prev, { sender: "bot", text, time: new Date() }]);
        setTyping(false);
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error(err);
      setChat((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Abhi roast karne ka mood nahi hai (API error).",
          time: new Date(),
        },
      ]);
      setTyping(false);
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-[#FF4081] text-white flex items-center justify-center shadow-xl hover:bg-[#F50057] transition-all z-50"
      >
        💬
      </button>

      {/* Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="text-gray-900 fixed bottom-24 right-6 w-80 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl flex flex-col border border-gray-300 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#FF4081] p-3 flex justify-between items-center rounded-t-2xl">
              <h2 className="text-white font-bold">🔥 Enaam Roast Bot</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white font-bold"
              >
                ✕
              </button>
            </div>

            {/* Quick Replies */}
            <div className="flex flex-wrap gap-2 p-2">
              {quickReplies.map((qr, idx) => (
                <button
                  key={idx}
                  onClick={() => sendRoast(qr)}
                  className="bg-[#FF4081]/80 hover:bg-[#F50057] text-white text-xs px-2 py-1 rounded-full transition-all"
                >
                  {qr.length > 15 ? qr.slice(0, 15) + "..." : qr}
                </button>
              ))}
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-2 max-h-64 space-y-2">
              {chat.map((c, idx) => (
                <div key={idx} className="flex flex-col space-y-1">
                  {c.sender === "user" ? (
                    <div className="self-end bg-[#E1BEE7] p-2 rounded-xl text-sm max-w-[75%]">
                      <strong>You:</strong> {c.text}
                    </div>
                  ) : (
                    <div className="self-start bg-[#FFCDD2] p-2 rounded-xl text-sm max-w-[75%]">
                      <strong>Bot:</strong> {c.text}
                    </div>
                  )}
                  <span className="text-xs text-gray-500 self-end">
                    {c.time.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}
              {typing && (
                <div className="self-start bg-[#FFCDD2] p-2 rounded-xl text-sm max-w-[50%] animate-pulse">
                  Bot is typing...
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-2 border-t border-gray-300 flex gap-2">
              <textarea
                rows={1}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-[#FF4081] outline-none resize-none"
              />
              <button
                onClick={() => sendRoast()}
                disabled={loading}
                className="bg-[#FF4081] hover:bg-[#F50057] text-white px-3 rounded-lg transition-all disabled:opacity-50"
              >
                {loading ? "..." : "Send"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ChatWidget;
