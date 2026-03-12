"use client";
import { Finding } from "@/lib/scanner";
import { useState, useEffect, useRef} from "react";
import Spinner from "./spinnerIcon";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "ai";
  content: string;
};

type ChatBoxProps = {
  findings: Finding[];
}; 

export default function ChatBox({findings}: ChatBoxProps) {
  const [userMessage, setUserMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth"});
  }, [messages])

  const handleSend = async () =>
  {
    try
    {
        if(userMessage.trim() === "" || loading)
      {
        return;
      }
      
      const newMessages: Message[] = [...messages, {role: "user", content: userMessage },];

      setMessages(newMessages);
      setUserMessage("");
      setLoading(true);

      const res = await fetch("/api/chat",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({message: userMessage, history: messages, findings: findings}),
      });

      const data = await res.json();
      setMessages([...newMessages, {role: "ai", content: data.response}]);
      setLoading(false);
    }
    catch(error)
    {
      console.error(error);
    }
    
  } 

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
        {messages.map((chat, index) => (
          <div key = {index} className={`mb-3 flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}>
            <span className={`px-3 py-2 rounded-xl text-sm font-mono max-w-[75%] ${chat.role === "user" ? "bg-purple-600 text-white" : "bg-[#0f0c29] text-[#8bdeda] border border-[#4a4080]" }`}>
              <ReactMarkdown>{chat.content}</ReactMarkdown>
            </span>
          </div>
        ))}

        {loading && (
        <div>
          <Spinner/>
        </div>)}
        <div ref={bottomRef} />
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
            value={userMessage}
            onChange={(e) => {setUserMessage(e.target.value)}}
            onKeyDown={(e) => {e.key === "Enter" && handleSend()}}
          />

          <button
            className="text-sm font-bold font-mono px-3 py-1 rounded-lg
            bg-gradient-to-r from-purple-500 to-cyan-500
            hover:from-purple-400 hover:to-cyan-400
            transition-all duration-200 hover:scale-105 active:scale-95"
            onClick={handleSend}
            disabled = {loading}
            >
            SEND
           </button>
        </div>
      </div>  
    </div>
  );
}
