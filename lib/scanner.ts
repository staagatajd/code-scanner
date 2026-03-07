export type Severity = "low" | "medium" | "high" | "critical";

export interface Finding {
  ruleId: string;
  severity: Severity;
  line: number;
  message: string;
  snippet: string;
}

interface Rule {
  ruleId: string;
  severity: Severity;
  message: string;
  pattern: RegExp;
}

const rules: Rule[] = [
  {
    ruleId: "hardcoded-secret",
    severity: "high",
    message: "Possible hardcoded secret detected",
    pattern: /(?:api_key|secret|password|token)\s*=\s*["'].{6,}["']/gi,
  },
  {
    ruleId: "sql-injection",
    severity: "high",
    message: "Possible SQL injection vulnerability",
    pattern: /SELECT\s+.*\s+FROM\s+.*\s+WHERE\s+.*\+/gi,
  },
  {
    ruleId: "hql-injection",
    severity: "high",
    message: "Possible HQL injection vulnerability",
    pattern: /createQuery\s*\(.*\+/gi,
  },
  {
    ruleId: "command-injection",
    severity: "critical",
    message: "Possible command injection vulnerability",
    pattern: /exec\s*\(.*\+|spawn\s*\(.*\+/gi,
  },
  {
    ruleId: "weak-hashing",
    severity: "high",
    message: "Weak hashing algorithm detected, use bcrypt or SHA-256 instead",
    pattern: /MD5\s*\(|SHA1\s*\(/gi,
  },
  {
    ruleId: "insecure-http",
    severity: "low",
    message: "Insecure HTTP URL detected, use HTTPS instead",
    pattern: /http:\/\/(?!localhost)/gi,
  },
  {
    ruleId: "xss",
    severity: "medium",
    message: "Possible XSS vulnerability",
    pattern: /innerHTML\s*=\s*[^"'`]/gi,
  },
  {
    ruleId: "dangerous-function",
    severity: "medium",
    message: "Dangerous function detected",
    pattern: /eval\s*\(/gi,
  },
  {
    ruleId: "weak-jwt-secret",
    severity: "high",
    message: "Possible weak or hardcoded JWT secret",
    pattern: /jwt\.sign\s*\(.*,\s*["'].{1,20}["']/gi,
  },
  {
    ruleId: "plaintext-password",
    severity: "critical",
    message: "Password may be stored without hashing",
    pattern: /password\s*=\s*request|password\s*=\s*req\./gi,
  },
  {
    ruleId: "debug-enabled",
    severity: "low",
    message: "Debug mode appears to be enabled",
    pattern: /debug\s*[:=]\s*true/gi,
  },
  {
    ruleId: "stack-trace-exposed",
    severity: "medium",
    message: "Stack trace may be exposed to the client",
    pattern: /res\.send\s*\(.*\.stack|response\.send\s*\(.*\.stack/gi,
  },
  {
    ruleId: "directory-listing",
    severity: "medium",
    message: "Directory listing may be enabled",
    pattern: /autoIndex\s*:\s*true/gi,
  },
];

export function scanCode(code: string): Finding[] {
  const findings: Finding[] = [];
  const lines = code.split("\n");

  for (const rule of rules) {
    for (let i = 0; i < lines.length; i++) {
      if (rule.pattern.test(lines[i])) {
        findings.push({
          ruleId: rule.ruleId,
          severity: rule.severity,
          line: i + 1,
          message: rule.message,
          snippet: lines[i].trim(),
        });
      }
    }
  }
  return findings;
}
