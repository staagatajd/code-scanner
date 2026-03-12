"use client";

import { ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { Finding } from "@/lib/scanner";
import IssueCard from "./components/issueCard";
import AIPanel from "./components/aiPanel";
import ChatBox from "./components/aiChatBox";

export default function CodeScanner() {
  const [code, setCode] = useState<string>("");
  const [findings, setFindings] = useState<Finding[]>([]);
  const [hasScanned, setHasScanned] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const findingsPerPage = 6;
  const totalPages = Math.ceil(findings.length / findingsPerPage);
  const start = (currentPage - 1) * findingsPerPage;
  const currentFindings = findings.slice(start, start + findingsPerPage);

  const handleCode = async () => {
    if (code.trim() === "") {
      return;
    }

    setHasScanned(true);
    setCurrentPage(1);

    const res = await fetch("/api/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    const { findings } = await res.json();
    setFindings(findings);
  };

  const handleAnalyze = async () => {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ findings }),
    });

    const { analysis } = await res.json();
    setAnalysis(analysis);
  };

  useEffect(() => {
    if (code.trim() === "") {
      setHasScanned(false);
    }
  }, [code]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f0c29] to-[#302b63] to-[#24243e]">
      <div className="flex justify-center p-5 flex-col items-center">
        {/* header */}
        <div className="flex justify-center flex-col items-center gap-1">
          <div
            className="text-[60px] font-press-start bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent filter: drop-shadow animate-gradient"
            style={{
              textShadow: "none",
              filter: "drop-shadow(0 0 20px rgba(167, 139, 250, 0.8))",
            }}
          >
            [Static Code Analyzer]
          </div>
          <div className="text-[13px] font-mono">by JD Sta. Agata</div>
        </div>

        {/* input area */}
        <div className="flex items-center justify-center flex-col mb-4">
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

        {findings.length > 0 && hasScanned && (
          <div className="flex flex-col items-center justify-center m-2">
            <button
              onClick={handleAnalyze}
              className="px-6 py-2 rounded-lg font-mono text-sm font-bold cursor-pointer
            bg-gradient-to-r from-purple-500 to-cyan-500
            hover:from-purple-400 hover:to-cyan-400
            shadow-[0_0_20px_rgba(167,139,250,0.4)]
            hover:shadow-[0_0_30px_rgba(167,139,250,0.8)] 
            transition-all duration-300 hover:scale-105 active:scale-95"
            >
              ANALYZE WITH AI
            </button>
            <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
              {/* Gemini SVG Icon */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 fill-cyan-400 animate-pulse"
              >
                <path d="M12 2L14.7 8.3L21 11L14.7 13.7L12 20L9.3 13.7L3 11L9.3 8.3L12 2Z" />
              </svg>

              <p className="text-[10px] font-mono tracking-wider">
                Powered by{" "}
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  GEMINI
                </span>
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center gap-4 h-[650px] justify-between">
          <div className="w-full">
            <div className="grid grid-cols-3 gap-4 w-full content-start p-2">
              {currentFindings.length > 0 && hasScanned ? (
                currentFindings.map((finding, index) => (
                  <IssueCard {...finding} key={index} />
                ))
              ) : hasScanned ? (
                <div className="col-span-3 flex flex-col justify-center items-center">
                  <div className="flex items-center justify-center gap-3">
                    <ShieldCheck size={20} className="text-emerald-400" />
                    <span className="text-gray-400">No Issues Found</span>
                  </div>
                  <div className="text-gray-500 font-mono text-sm">
                    Code passed all OWASP security checks
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {totalPages > 1 && hasScanned ? (
            <div className="flex items-center gap-4 font-mono text-sm">
              <button
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage === 1}
                className="px-4 py-1 rounded-lg border border-[#4a4080] text-purple-400
                hover:border-purple-400 transition-all duration-200
                disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                ← PREV
              </button>
              <span className="text-purple-400/70">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-1 rounded-lg border border-[#4a4080] text-purple-400
                hover:border-purple-400 transition-all duration-200
                disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                NEXT →
              </button>
            </div>
          ) : null}
        </div>

        {analysis !== "" && hasScanned && (
          <div className="mt-10 flex flex-col items-center">
            <div className="text-[45px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
  <span className="text-purple-500/50">[</span>
  GEMINI ANALYSIS
  <span className="text-purple-500/50">]</span>
</div>
            <AIPanel analysis={analysis} findings={findings} />

            <div className="text-[45px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 flex items-center gap-3">
              CHAT WITH GEMINI
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-17 h-17 fill-cyan-400 animate-pulse animate-spin"
                style={{ animation: "spin 6s linear infinite" }}
              >
                <path d="M12 2L14.7 8.3L21 11L14.7 13.7L12 20L9.3 13.7L3 11L9.3 8.3L12 2Z" />
              </svg>
            </div>

            <ChatBox/>
          </div>
        )}
      </div>
    </div>
  );
}
