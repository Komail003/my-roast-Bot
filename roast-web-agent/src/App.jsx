// import { useState } from "react";
// import { model } from "./firebaseAI";

// function App() {
//   const [message, setMessage] = useState("");
//   const [reply, setReply] = useState("");
//   const [loading, setLoading] = useState(false);

//   const sendRoast = async () => {
//     if (!message.trim()) return;
//     setLoading(true);
//     setReply("");

//     const prompt = `
// Tum ek funny AI roast agent ho. Hamesha Roman Urdu main roast style main reply do,
// jab tak user alag language na maange.
// User ne kaha: "${message}"
// `;

//     try {
//       const result = await model.generateContent(prompt);
//       const response = result.response;
//       const text = await response.text();

//       setReply(text);
//     } catch (err) {
//       console.error("Gemini Error:", err);
//       setReply("⚠️ Abhi roast karne ka mood nahi hai (API error).");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
//       <div className="w-full max-w-xl bg-gray-900/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-gray-700">
//         <h1 className="text-2xl font-bold mb-6 text-center">
//           🔥 Roast Bot (Roman Urdu)
//         </h1>

//         <textarea
//           rows={3}
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Apna message likho..."
//           className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 outline-none resize-none"
//         />

//         <button
//           onClick={sendRoast}
//           disabled={loading}
//           className="w-full mt-4 py-3 rounded-lg font-semibold bg-pink-600 hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//         >
//           {loading ? "Roasting..." : "Roast it!"}
//         </button>

//         {reply && (
//           <div className="mt-6 bg-gray-800/70 border border-gray-700 rounded-lg p-4">
//             <p className="text-sm text-gray-400 mb-2">🤖 Reply:</p>
//             <p className="whitespace-pre-wrap">{reply}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
import React from "react";
import ChatWidget from "./components/Chatwidget";
function App() {
  return (
    <div className="App">
      <h1>Welcome to my site</h1>

      {/* Floating Chat Widget */}
      <ChatWidget />
    </div>
  );
}

export default App;
