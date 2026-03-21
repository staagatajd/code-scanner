"use client";

import { useScanStore } from "@/store/useScanStore";

export default function Dashboard() {
  const { findings } = useScanStore();

  const counts = {
    critical: findings.filter((f) => f.severity === "critical").length,
    high: findings.filter((f) => f.severity === "high").length,
    medium: findings.filter((f) => f.severity === "medium").length,
    low: findings.filter((f) => f.severity === "low").length,
  };    

  const total = findings.length;

  const severities = [
    {
      label: "CRITICAL",
      count: counts.critical,
      color: "from-red-500 to-red-700",
      glow: "rgba(239,68,68,0.4)",
    },
    {
      label: "HIGH",
      count: counts.high,
      color: "from-orange-500 to-orange-700",
      glow: "rgba(249,115,22,0.4)",
    },
    {
      label: "MEDIUM",
      count: counts.medium,
      color: "from-yellow-500 to-yellow-700",
      glow: "rgba(234,179,8,0.4)",
    },
    {
      label: "LOW",
      count: counts.low,
      color: "from-green-500 to-green-700",
      glow: "rgba(34,197,94,0.4)",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f0c29] to-[#302b63] to-[#24243e] p-10">
      <div className="flex flex-col items-center mb-10">
        <div
          className="text-[50px] font-press-start bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
          style={{ filter: "drop-shadow(0 0 20px rgba(167, 139, 250, 0.8))" }}
        >
          [DASHBOARD]
        </div>

        <div className="font-mono text-xs text-cyan-200 mt-2" >{total} TOTAL FINDINGS</div>
      </div>

      <div className="grid grid-cols-4 gap-6 max-w-4xl mx-auto mb-10">
        {severities.map((s) => (
          <div
            key={s.label}
            className={`rounded-xl p-6 bg-gradient-to-br ${s.color} flex flex-col items-center gap-2`}
            style={{ boxShadow: `0 0 24px ${s.glow}` }}
          >
            <div className="text-white font-mono text-xs tracking-widest">{s.label}</div>
            <div className="text-white font-bold text-5xl">{s.count}</div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto bg-[#1a1a2e] rounded-xl p-6 border border-[#4a4080]">
        <div className="font-mono text-sm text-purple-400 mb-4">SEVERITY BREAKDOWN</div>
        <div className="flex flex-col gap-4">
          {severities.map((s) => (
            <div key={s.label} className="flex items-center gap-4">
              <div className="font-mono text-xs text-gray-400 w-16">{s.label}</div>
              <div className="flex-1 bg-[#0f0c29] rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${s.color} transition-all duration-700`}
                  style={{ width: total > 0 ? `${(s.count / total) * 100}%` : "0%" }}
                />
              </div>
              <div className="font-mono text-xs text-gray-400 w-6 text-right">{s.count}</div>
            </div>
          ))}
        </div>
      </div>


      <div className="flex justify-center mt-10">
        <button
          onClick={() => window.history.back()}
          className="px-6 py-2 rounded-lg font-mono text-sm font-bold cursor-pointer
          bg-gradient-to-r from-purple-500 to-cyan-500
          hover:from-purple-400 hover:to-cyan-400
          transition-all duration-300
          shadow-[0_0_20px_rgba(167,139,250,0.4)]
          hover:shadow-[0_0_30px_rgba(167,139,250,0.8)] hover:scale-105 active:scale-95"
        >
          ← BACK
        </button>
      </div>
    </div>
  );
}
