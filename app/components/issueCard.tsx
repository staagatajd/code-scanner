import { Finding } from "@/lib/scanner";

export default function IssueCard({
  ruleId,
  severity,
  line,
  message,
  snippet,
}: Finding) {
  return (
    <div
      className="relative flex flex-col gap-3 p-4 w-72 rounded-xl border border-[#4a4080]
    bg-[#1a1a2e] shadow-[0_0_20px_rgba(167,139,250,0.15)]
    hover:shadow-[0_0_30px_rgba(167,139,250,0.35)] transition-all duration-300 hover:scale-102"
    >
      {/* Severity badge */}
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-mono font-bold px-2 py-1 rounded-full border ${
            severity === "critical"
              ? "text-red-400 border-red-500/50 bg-red-500/10"
              : severity === "high"
                ? "text-orange-400 border-orange-500/50 bg-orange-500/10"
                : severity === "medium"
                  ? "text-yellow-400 border-yellow-500/50 bg-yellow-500/10"
                  : "text-cyan-400 border-cyan-500/50 bg-cyan-500/10"
          }`}
        >
          {severity?.toUpperCase()}
        </span>
        <span className="text-xs font-mono text-purple-400/70">
          Line {line}
        </span>
      </div>

      {/* Message */}
      <div className="text-sm font-mono font-semibold bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
        {message}
      </div>

      {/* Code snippet */}
      <div
        className="bg-[#0f0c29] border border-[#4a4080]/60 rounded-lg px-3 py-2 font-mono text-xs text-[#8bdeda] overflow-x-auto
        scrollbar-thin
        [&::-webkit-scrollbar]:h-1
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-purple-500/40
        [&::-webkit-scrollbar-thumb]:rounded-full
        hover:[&::-webkit-scrollbar-thumb]:bg-purple-400/70"
      >
        {snippet}
      </div>

      {/* Rule ID */}
      <div className="text-xs font-mono text-purple-400/60">
        rule: <span className="text-purple-300">{ruleId}</span>
      </div>
    </div>
  );
}
