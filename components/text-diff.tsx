"use client";

import { useMemo } from "react";

interface TextDiffProps {
  original: string;
  modified: string;
}

interface DiffPart {
  value: string;
  type: "added" | "removed" | "unchanged";
}

function computeDiff(original: string, modified: string): DiffPart[] {
  const parts: DiffPart[] = [];
  const origChars = original.split("");
  const modChars = modified.split("");
  const maxLen = Math.max(origChars.length, modChars.length);

  for (let i = 0; i < maxLen; i++) {
    const origChar = origChars[i];
    const modChar = modChars[i];

    if (origChar === modChar) {
      // Unchanged character
      if (parts.length > 0 && parts[parts.length - 1].type === "unchanged") {
        parts[parts.length - 1].value += origChar || "";
      } else {
        parts.push({ value: origChar || "", type: "unchanged" });
      }
    } else {
      // Character changed
      if (origChar && modChar) {
        // Replacement: both removed and added
        if (parts.length > 0 && parts[parts.length - 1].type === "removed") {
          parts[parts.length - 1].value += origChar;
        } else {
          parts.push({ value: origChar, type: "removed" });
        }
        parts.push({ value: modChar, type: "added" });
      } else if (origChar) {
        // Deletion
        if (parts.length > 0 && parts[parts.length - 1].type === "removed") {
          parts[parts.length - 1].value += origChar;
        } else {
          parts.push({ value: origChar, type: "removed" });
        }
      } else if (modChar) {
        // Addition
        if (parts.length > 0 && parts[parts.length - 1].type === "added") {
          parts[parts.length - 1].value += modChar;
        } else {
          parts.push({ value: modChar, type: "added" });
        }
      }
    }
  }

  return parts;
}

export function TextDiff({ original, modified }: TextDiffProps) {
  const diffParts = useMemo(() => {
    return computeDiff(original, modified);
  }, [original, modified]);

  if (!original || !modified) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-card p-4 font-mono text-sm overflow-x-auto whitespace-pre-wrap break-words">
      {diffParts.map((part, index) => {
        if (part.type === "removed") {
          return (
            <span
              key={index}
              className="bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 rounded px-0.5"
            >
              {part.value}
            </span>
          );
        }
        if (part.type === "added") {
          return (
            <span
              key={index}
              className="bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 rounded px-0.5"
            >
              {part.value}
            </span>
          );
        }
        return <span key={index}>{part.value}</span>;
      })}
    </div>
  );
}
