"use client";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface AIPanelProps {
  analysis: string;
  findings: any[];
}

export default function AIPanel({ analysis, findings }: AIPanelProps) {
  return (
    <div
      className="w-[924px] mt-6 rounded-xl border border-[#4a4080] bg-[#1a1a2e] p-6 shadow-[0_0_30px_rgba(167,139,250,0.1)] font-sans text-gray-200 max-h-[450px] overflow-y-auto scrollbar-thin 
            scrollbar-thumb-zinc-700 
            scrollbar-track-transparent 
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-zinc-500
            [&::-webkit-scrollbar-thumb]:rounded-full
            hover:[&::-webkit-scrollbar-thumb]:bg-zinc-700
            shadow-[0_0_20px_rgba(167,139,250,0.15)] mb-8"
    >
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown
          components={{
            // Style the code blocks
            code({ node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <div className="my-4 rounded-lg overflow-hidden border border-[#4a4080]">
                  <SyntaxHighlighter
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      scrollbarWidth: "thin",
                      scrollbarColor: "#71717a transparent",
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code
                  className="bg-[#2d2d44] px-1.5 py-0.5 rounded text-purple-300"
                  {...props}
                >
                  {children}
                </code>
              );
            },
            // Style Headings
            h3: ({ children }) => (
              <h3 className="text-xl font-bold text-purple-400 mt-6 mb-2 border-b border-[#4a4080] pb-2">
                {children}
              </h3>
            ),
            // Style Bold text (Findings labels)
            strong: ({ children }) => (
              <strong className="text-purple-300 font-semibold">
                {children}
              </strong>
            ),
            // Style Lists
            ul: ({ children }) => (
              <ul className="list-disc ml-6 space-y-2 my-4 text-gray-300">
                {children}
              </ul>
            ),
            // Style Dividers
            hr: () => <hr className="my-8 border-[#4a4080] opacity-50" />,
            // Style Paragraphs
            p: ({ children }) => (
              <p className="leading-relaxed mb-4">{children}</p>
            ),
          }}
        >
          {analysis}
        </ReactMarkdown>
      </div>
    </div>
  );
}
