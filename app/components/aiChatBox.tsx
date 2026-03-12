"use Client";
import { useState } from "react";
import { SendHorizonal } from "lucide-react";

export default function ChatBox() {
  const [userMessage, setUserMessage] = useState<string>("");
  const [messageHistory, setMessageHistory] = useState<string>("");

  return (
    //chat box
    <div className="flex flex-col w-[924px] mt-6 rounded-xl border border-[#4a4080] bg-[#1a1a2e] p-2 shadow-[0_0_30px_rgba(167,139,250,0.1)] font-sans text-gray-200 h-[450px] mb-8 relative ">
      <div
        className="flex-1 overflow-y-auto scrollbar-thin 
            scrollbar-thumb-zinc-700 
            scrollbar-track-transparent 
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-zinc-500
            [&::-webkit-scrollbar-thumb]:rounded-full
            hover:[&::-webkit-scrollbar-thumb]:bg-zinc-700 p-3"
      >
        <div>chat here</div>
      </div>

      <div className="flex gap-2 p-4">
        <div
          className="flex flex-1 items-center h-11 px-4 rounded-xl border border-[#4a4080] bg-[#0f0c29]
            shadow-[0_0_20px_rgba(167,139,250,0.15)]
            hover:shadow-[0_0_30px_rgba(167,139,250,0.35)]
            focus-within:border-purple-500/60
            transition-all duration-300"
        >
          <input
            placeholder="Ask AI here..."
            className="flex-1 bg-transparent text-[#8bdeda] text-sm font-mono outline-none placeholder:text-gray-600"
          />

          <button
            className="text-sm font-bold font-mono px-3 py-1 rounded-lg
            bg-gradient-to-r from-purple-500 to-cyan-500
            hover:from-purple-400 hover:to-cyan-400
            transition-all duration-200 hover:scale-105 active:scale-95"
            >
            SEND
           </button>
        </div>
      </div>
    </div>
  );
}
