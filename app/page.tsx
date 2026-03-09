"use client";

import { useState } from "react";
import { Finding } from "@/lib/scanner";
import IssueCard from "./components/issueCard";

export default function CodeScanner() {
  const [code, setCode] = useState<string>("");
  const [findings, setFindings] = useState<Finding[]>([]);

  const handleCode = async () => {
    if (code.trim() === "") {
      return;
    }

    const res = await fetch("/api/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    const { findings } = await res.json();
    setFindings(findings);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f0c29] to-[#302b63] to-[#24243e]">
      <div className="flex justify-center p-5 flex-col items-center gap-10">
        {/* header */}
        <div className="flex justify-center flex-col items-center gap-1">
          <div
            className="text-[60px] font-press-start bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent filter: drop-shadow animate-gradient"
            style={{
              textShadow: "none",
              filter: "drop-shadow(0 0 20px rgba(167, 139, 250, 0.8))",
            }}
          >
            Static Code Analyzer
          </div>
          <div className="text-[13px] font-mono">by JD Sta. Agata</div>
        </div>

        {/* input area */}
        <div className="flex items-center justify-center flex-col">
          <div className="font-mono text-sm font-bold bg-gradient-to-r from-[#8bdeda] to-[#43add0] to-[#998ee0] to-[#e17dc2] to-[#ef9393] bg-clip-text text-transparent animate-gradient">
            Paste your code here
          </div>

          <textarea
            value={code}
            className="h-64 w-[600px] bg-[#1a1a2e] text-[#8bdeda] font-mono text-sm p-4 rounded-lg border border-[#4a4080] border-4 outline-none resize-none code-input
            overflow-y-auto scrollbar-thin 
            scrollbar-thumb-zinc-700 
            scrollbar-track-transparent 
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-zinc-500
            [&::-webkit-scrollbar-thumb]:rounded-full
            hover:[&::-webkit-scrollbar-thumb]:bg-zinc-700
            shadow-[0_0_20px_rgba(167,139,250,0.15)]"
            placeholder="YOUR CODE..."
            onChange={(e) => setCode(e.target.value)}
          />

          <button
            onClick={handleCode}
            disabled={code.trim() === ""}
            className="mt-4 px-6 py-2 rounded-lg font-mono text-sm font-bold cursor-pointer
            bg-gradient-to-r from-purple-500 to-cyan-500
            hover:from-purple-400 hover:to-cyan-400
            transition-all duration-300
            shadow-[0_0_20px_rgba(167,139,250,0.4)]
            hover:shadow-[0_0_30px_rgba(167,139,250,0.8)] transition-transform duration-150 hover:scale-105 active:scale-95
            disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
          >
            SCAN
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
            {findings.length > 0 &&
              findings.map((finding, index) => (
                <IssueCard {...finding} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
}
