"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { SessionWord } from "@/lib/types";

interface RecallPromptProps {
  sessionWord: SessionWord;
  onSubmit: (answer: string) => void;
}

export function RecallPrompt({ sessionWord, onSubmit }: RecallPromptProps) {
  const [answer, setAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { word } = sessionWord;

  useEffect(() => {
    setAnswer("");
    setShowHint(false);
    inputRef.current?.focus();
  }, [sessionWord]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim()) {
      onSubmit(answer.trim());
    }
  };

  const tierLabel = word.tier === "custom" ? "Custom" : `Tier ${word.tier}`;

  return (
    <motion.div
      key={word.id}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6 space-y-6">
          <div className="flex items-center justify-between">
            <Badge variant="outline">{tierLabel}</Badge>
            {showHint && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-muted-foreground font-mono"
              >
                Starts with &ldquo;{word.word[0].toUpperCase()}&rdquo; &middot;{" "}
                {word.word.length} letters
              </motion.span>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Definition
            </p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl leading-relaxed"
            >
              {word.definition}
            </motion.p>
          </div>

          {showHint && word.examples.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-1"
            >
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Example
              </p>
              <p className="text-sm text-muted-foreground italic">
                {word.examples[0].replace(
                  new RegExp(word.word, "gi"),
                  "______",
                )}
              </p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              ref={inputRef}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type the word..."
              className="text-lg h-12"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <div className="flex gap-2">
              <Button type="submit" className="flex-1" disabled={!answer.trim()}>
                Submit
              </Button>
              {!showHint && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowHint(true)}
                >
                  Hint
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
