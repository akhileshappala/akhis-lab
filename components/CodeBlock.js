"use client";

import { useState } from "react";

export default function CodeBlock({ code, output }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div>
      <div className="codeblock">
        <button className="copy" onClick={copy}>{copied ? "Copied ✓" : "Copy"}</button>
        <pre><code>{code}</code></pre>
      </div>
      {output ? (
        <div className="codeblock output">
          <pre><code>{output}</code></pre>
        </div>
      ) : null}
    </div>
  );
}
