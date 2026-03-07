export default function CodeScanner() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f0c29] to-[#302b63] to-[#24243e]">
      <div className="flex justify-center p-5 flex-col items-center gap-10">
        {/* header */}
        <div className="flex justify-center flex-col items-center gap-1">
          <div
            className="text-[60px] font-press-start bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent filter: drop-shadow"
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
            className="h-64 w-[600px] bg-[#1a1a2e] text-[#8bdeda] font-mono text-sm p-4 rounded-lg border border-[#4a4080] outline-none resize-none code-input"
            placeholder="YOUR CODE..."
          />
          
        </div>
      </div>
    </div>
  );
}
