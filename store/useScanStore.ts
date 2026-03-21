import { create } from "zustand";
import { Finding } from "@/lib/scanner";
import { persist } from "zustand/middleware";

interface ScanStore
{
    findings: Finding[];
    setFindings: (findings: Finding[]) => void;
}

export const useScanStore = create<ScanStore>()(
    persist(
        (set) => ({
    findings: [], 
    setFindings: (findings) => set({findings}),}),
    {
        name: "scan-store",
    })
)