"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { playTick } from "@/lib/sounds";
import type { ContextSentence } from "@/lib/types";

interface ContextPromptProps {
  sentence: ContextSentence;
  wordDisplay: string; // the target word for display after answer
  onSubmit: (answer: string) => void;
}

export function ContextPrompt({
  sentence,
  wordDisplay,
  onSubmit,
}: ContextPromptProps) {
  const [selected, setSelected] = useState<string | null>(null);

  // Shuffle answer into distractors
  const choices = useMemo(() => {
    const all = [...sentence.distractors, sentence.answer];
    // Fisher-Yates shuffle
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    return all;
  }, [sentence]);

  useEffect(() => {
    setSelected(null);
  }, [sentence]);

  // Render sentence with the weak word highlighted
  const parts = sentence.sentence.split(`**${sentence.weakWord}**`);

  const handleSelect = (choice: string) => {
    playTick();
    setSelected(choice);
    // Small delay so the user sees their selection
    setTimeout(() => onSubmit(choice), 300);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="pt-6 space-y-6">
        <div className="flex items-center gap-2">
          <Badge variant="outline">Context Mode</Badge>
          <span className="text-xs text-muted-foreground">
            Replace the weak word with a more precise one
          </span>
        </div>

        <div className="text-lg leading-relaxed">
          {parts[0]}
          <span className="bg-yellow-200/50 dark:bg-yellow-500/20 px-1 rounded font-semibold">
            {sentence.weakWord}
          </span>
          {parts[1]}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {choices.map((choice) => (
            <Button
              key={choice}
              variant={selected === choice ? "default" : "outline"}
              className="h-12 text-base"
              onClick={() => handleSelect(choice)}
              disabled={selected !== null}
            >
              {choice}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
