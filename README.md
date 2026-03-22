# Static Code Analyzer

A static code analysis tool that scans source code for security vulnerabilities without executing it, mapped to the OWASP Top 10 2025.

## Features

- Regex-based static analysis across 20+ vulnerability rules
- OWASP Top 10 2025 coverage (SQLi, XSS, command injection, hardcoded secrets, and more)
- AI-powered analysis and chat via Groq (llama-3.3-70b-versatile)
- Severity dashboard with visual breakdown
- Drag and drop file upload
- Export findings as PDF or JSON
- Persistent state across navigation via Zustand

## Tech Stack

- Next.js + TypeScript
- Tailwind CSS
- Zustand (state management)
- Groq API
- jsPDF

## Disclaimer

> This is a learning project built to explore static analysis concepts and common web vulnerabilities. It is not a replacement for production security tools like Snyk or SonarQube. Regex-based analysis has known limitations — it cannot understand code context and may produce false positives.