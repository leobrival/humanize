"use client";

import { useState } from "react";
import { humanizeString } from "humanize-ai-lib";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";
import { AnimatedTitle } from "@/components/animated-title";

export function HumanizeClient() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [changeCount, setChangeCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

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
    <div className="container max-w-4xl mx-auto px-4 py-12 sm:py-20">
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

      {/* Main Interface */}
      <div className="space-y-6">
        {/* Input Section */}
        <Card className="p-6">
          <label htmlFor="input-text" className="block text-sm font-medium mb-2">
            Paste your AI-generated text
          </label>
          <Textarea
            id="input-text"
            placeholder="Enter text to humanize..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[200px] resize-none"
          />
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-muted-foreground">
              {inputText.length} characters
            </span>
            <div className="flex gap-2">
              {inputText && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClear}
                >
                  Clear
                </Button>
              )}
              <Button
                onClick={handleHumanize}
                disabled={!inputText.trim() || isProcessing}
                size="lg"
              >
                {isProcessing ? "Processing..." : "Humanize Text"}
              </Button>
            </div>
          </div>
        </Card>

        {/* Output Section */}
        {outputText && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="output-text" className="text-sm font-medium">
                Humanized text
              </label>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={handleCopy}
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="size-4 text-green-600" />
                ) : (
                  <Copy className="size-4" />
                )}
              </Button>
            </div>
            <Textarea
              id="output-text"
              value={outputText}
              readOnly
              className="min-h-[200px] resize-none bg-muted/30"
            />
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
          </Card>
        )}
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
