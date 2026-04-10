"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { SessionWord, SessionResult } from "@/lib/types";

interface ReviewResultProps {
  sessionWord: SessionWord;
  result: SessionResult;
  onNext: () => void;
}

export function ReviewResult({
  sessionWord,
  result,
  onNext,
}: ReviewResultProps) {
  const { word } = sessionWord;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={`w-full max-w-2xl mx-auto border-2 transition-colors ${
          result.correct
            ? "border-green-500/40 bg-green-50/50 dark:bg-green-950/20"
            : "border-red-500/40 bg-red-50/50 dark:bg-red-950/20"
        }`}
      >
        <CardContent className="pt-6 space-y-6">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 15,
                delay: 0.05,
              }}
              className={`text-5xl mb-3 ${result.correct ? "text-green-500" : "text-red-500"}`}
            >
              {result.correct ? "+" : "x"}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-3xl font-bold"
            >
              {word.word}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-muted-foreground mt-1"
            >
              {word.definition}
            </motion.p>
          </div>

          {word.examples.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-1"
            >
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Example
              </p>
              <p className="text-sm italic">{word.examples[0]}</p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="flex items-center justify-between text-sm text-muted-foreground"
          >
            <span>
              Response time:{" "}
              {(result.responseTimeMs / 1000).toFixed(1)}s
            </span>
            <span className="flex items-center gap-1.5">
              {result.mode === "context" && (
                <span className="text-xs bg-muted px-1.5 py-0.5 rounded">CTX</span>
              )}
              Rating:{" "}
              {result.rating === 1
                ? "Again"
                : result.rating === 2
                  ? "Hard"
                  : result.rating === 3
                    ? "Good"
                    : "Easy"}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button onClick={onNext} className="w-full" size="lg">
              Next
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
