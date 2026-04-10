"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { playXPTick } from "@/lib/sounds";
import type { SessionSummary } from "@/lib/types";

interface XPAwardProps {
  summary: SessionSummary;
  onDone: () => void;
}

function AnimatedNumber({ target, duration = 1000 }: { target: number; duration?: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (target === 0) return;
    const steps = Math.min(target, 20);
    const interval = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += Math.ceil(target / steps);
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setValue(current);
      playXPTick();
    }, interval);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <>{value}</>;
}

export function XPAward({ summary, onDone }: XPAwardProps) {
  const accuracy =
    summary.totalWords > 0
      ? Math.round((summary.totalCorrect / summary.totalWords) * 100)
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Session Complete</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {summary.leveledUp && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="text-center py-4"
            >
              <div className="text-4xl font-bold text-yellow-500">
                LEVEL UP!
              </div>
              <p className="text-muted-foreground">
                You reached level {summary.newLevel}
              </p>
            </motion.div>
          )}

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 }}
            className="text-center"
          >
            <div className="text-5xl font-bold text-primary">
              +<AnimatedNumber target={summary.xpEarned} /> XP
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-4 text-center"
          >
            <div>
              <div className="text-2xl font-semibold">
                {summary.totalCorrect}/{summary.totalWords}
              </div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">{accuracy}%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">
                {(summary.averageResponseTimeMs / 1000).toFixed(1)}s
              </div>
              <div className="text-sm text-muted-foreground">Avg Time</div>
            </div>
          </motion.div>

          {Object.entries(summary.statGains).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-2"
            >
              <p className="text-sm font-medium">Stat Gains</p>
              {Object.entries(summary.statGains).map(([stat, gain]) => (
                <div key={stat} className="flex items-center gap-2">
                  <span className="text-sm capitalize w-20">{stat}</span>
                  <motion.div
                    className="flex-1"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    style={{ originX: 0 }}
                  >
                    <Progress value={100} className="h-2" />
                  </motion.div>
                  <span className="text-sm font-medium text-green-500">
                    +{gain}
                  </span>
                </div>
              ))}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <Button onClick={onDone} className="w-full" size="lg">
              Back to Dashboard
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
