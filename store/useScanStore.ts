import { create } from "zustand";
import { Finding } from "@/lib/scanner";
import { persist } from "zustand/middleware";

interface ScanStore
{
    findings: Finding[];
    hasScanned: boolean;
    analysis: string;
    code: string;
    setCode: (value: string) => void;
    setFindings: (findings: Finding[]) => void;
    setHasScanned: (value: boolean) => void;
    setAnalysis: (value: string) => void;
}

export const useScanStore = create<ScanStore>()(
    persist(
        (set) => ({
    findings: [], 
    hasScanned: false,
    analysis: "",
    code: "",
    setCode: (code) => set({ code }),
    setAnalysis:(value) => set({analysis: value}),
    setHasScanned:(value) => set({hasScanned: value}),
    setFindings: (findings) => set({findings}),}),
    {
        name: "scan-store",
    })
)