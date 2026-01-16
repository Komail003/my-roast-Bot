import { useState } from "react";
import { model } from "../firebaseAI";
import { motion, AnimatePresence } from "framer-motion";

function ChatWidget() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [typing, setTyping] = useState(false);

  // Professional quick replies
  const quickReplies = [
    "Account info",
    "How does Enaam.pk work?",
    "How do you pick winners?",
    "When luckdraw happens?",
  ];

  const sendMessage = async (customMessage) => {
    const msg = customMessage || message;
    if (!msg.trim()) return;

    setMessage("");
    setChat((prev) => [
      ...prev,
      { sender: "user", text: msg, time: new Date() },
    ]);
    setLoading(true);
    setTyping(true);

    const prompt = `You are a professional customer support bot for enaam.pk . Enaam.pk : Turning Dreams into Reality Through Skill-Based Competitions Since 2023 Since its launch in 2023, Enaam.pk has been dedicated to transforming dreams into reality through engaging skill-based competitions. Our mission is clear: to provide everyone with an equal opportunity to win tangible prizes, from the latest gadgets and home appliances to automobiles and beyond. At Enaam.pk , we believe that skill matters. Participants demonstrate their knowledge and abilities by answering straightforward questions, making the experience both challenging and rewarding. Our competitions are designed to empower individuals to chase their dreams while honing their skills in a fun and exciting way. Inclusivity is at the heart of Enaam.pk . We welcome individuals of all ages and genders to join our vibrant community and embrace the thrill of competition. Whether you’re aiming for that top-tier gadget or simply seeking a rush of excitement, Enaam.pk offers you the chance to win prizes that align with your passions. Join us today to participate in skill-based competitions that not only provide the chance to win but also enrich your knowledge and expertise. Remember, while winning is exhilarating, the true joy comes from participating and improving your skills along the way. Take your shot at daily exciting prizes—because every day presents a new opportunity to showcase your skills and make your dreams come true! For any questions or assistance, feel free to contact us at info@enaam.pk...
If you need help or you have any questions, feel free to contact me by email.
support@enaam.pk
    Always Reply in polite, clear, aur helpful English.
User says: "${msg}"
`;

    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = await response.text();

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
          text: "⚠️ Sorry, something went wrong (API error).",
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
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl hover:bg-blue-700 transition-all z-50"
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
            <div className="bg-blue-600 p-3 flex justify-between items-center rounded-t-2xl">
              <h2 className="text-white font-bold">📞 Enaam Support Bot</h2>
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
                  onClick={() => sendMessage(qr)}
                  className="bg-blue-500/80 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded-full transition-all"
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
                    <div className="self-end bg-blue-100 p-2 rounded-xl text-sm max-w-[75%]">
                      <strong>You:</strong> {c.text}
                    </div>
                  ) : (
                    <div className="self-start bg-gray-200 p-2 rounded-xl text-sm max-w-[75%]">
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
                <div className="self-start bg-gray-200 p-2 rounded-xl text-sm max-w-[50%] animate-pulse">
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
                className="flex-1 p-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-600 outline-none resize-none"
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 rounded-lg transition-all disabled:opacity-50"
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
