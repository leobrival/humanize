"use client";

import { useState } from "react";
import { humanizeString } from "humanize-ai-lib";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Copy, Check, GitCompare } from "lucide-react";
import { AnimatedTitle } from "@/components/animated-title";
import { TextDiff } from "@/components/text-diff";

export function HumanizeClient() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [changeCount, setChangeCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showDiff, setShowDiff] = useState(false);

  const handleHumanize = () => {
    if (!inputText.trim()) return;

    setIsProcessing(true);

    // Simulate processing delay for better UX
    setTimeout(() => {
      const result = humanizeString(inputText, {
        transformHidden: true,
        transformTrailingWhitespace: true,
        transformDashes: true,
        transformQuotes: true,
        keyboardOnly: false,
      });

      setOutputText(result.text);
      setChangeCount(result.count);
      setIsProcessing(false);
    }, 300);
  };

  const handleCopy = async () => {
    if (!outputText) return;

    await navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setChangeCount(0);
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 sm:py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
          🤖 → 🙂
        </h1>
        <AnimatedTitle className="text-2xl sm:text-3xl font-semibold mb-3">
          Humanize Your AI Text
        </AnimatedTitle>
        <p className="text-muted-foreground text-sm sm:text-base">
          Remove AI markers and make your text flow naturally
        </p>
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {inputText && (
            <Button variant="ghost" size="sm" onClick={handleClear}>
              Clear
            </Button>
          )}
          <Button
            onClick={handleHumanize}
            disabled={!inputText.trim() || isProcessing}
            size="default"
          >
            {isProcessing ? "Processing..." : "Humanize Text"}
          </Button>
        </div>
        {outputText && (
          <div className="flex gap-2">
            <Button
              variant={showDiff ? "default" : "outline"}
              size="sm"
              onClick={() => setShowDiff(!showDiff)}
            >
              <GitCompare className="size-4 mr-2" />
              {showDiff ? "Hide Diff" : "Show Diff"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              title="Copy to clipboard"
            >
              {copied ? (
                <>
                  <Check className="size-4 mr-2 text-green-600" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="size-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Main Interface - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <label htmlFor="input-text" className="block text-sm font-medium mb-2">
            Original Text
          </label>
          <Textarea
            id="input-text"
            placeholder="Enter text to humanize..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[400px] resize-none"
          />
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-muted-foreground">
              {inputText.length} characters
            </span>
          </div>
        </Card>

        {/* Output Section */}
        <Card className="p-6">
          <label htmlFor="output-text" className="block text-sm font-medium mb-2">
            Humanized Text
          </label>
          {outputText ? (
            <>
              {showDiff ? (
                <TextDiff original={inputText} modified={outputText} />
              ) : (
                <Textarea
                  id="output-text"
                  value={outputText}
                  readOnly
                  className="min-h-[400px] resize-none bg-muted/30"
                />
              )}
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-muted-foreground">
                  {outputText.length} characters
                </span>
                {changeCount > 0 && (
                  <span className="text-xs text-green-600 font-medium">
                    ✓ {changeCount} {changeCount === 1 ? "change" : "changes"} made
                  </span>
                )}
                {changeCount === 0 && (
                  <span className="text-xs text-muted-foreground">
                    No changes needed
                  </span>
                )}
              </div>
            </>
          ) : (
            <div className="min-h-[400px] flex items-center justify-center border rounded-md bg-muted/30">
              <p className="text-sm text-muted-foreground">
                Result will appear here...
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Footer Info */}
      <div className="mt-16 text-center">
        <p className="text-sm text-muted-foreground mb-2">
          Removes: em-dashes • fancy quotes • hidden unicode • trailing whitespace
        </p>
        <p className="text-xs text-muted-foreground">
          Powered by{" "}
          <a
            href="https://github.com/Nordth/humanize-ai-lib"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            humanize-ai-lib
          </a>
        </p>
      </div>
    </div>
  );
}
