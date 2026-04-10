"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { UserProfile } from "@/lib/types";

interface DailySummaryProps {
  profile: UserProfile;
  dueCount: number;
  wordCount: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
};

export function DailySummary({
  profile,
  dueCount,
  wordCount,
}: DailySummaryProps) {
  const hpPct = (profile.hp / profile.maxHp) * 100;
  const xpPct = (profile.xp / profile.xpToNextLevel) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <motion.div custom={0} variants={cardVariants} initial="hidden" animate="visible">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-4xl font-bold">{dueCount}</div>
            <p className="text-sm text-muted-foreground mt-1">Words due</p>
            <p className="text-xs text-muted-foreground">
              {wordCount} total in library
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div custom={1} variants={cardVariants} initial="hidden" animate="visible">
        <Card>
          <CardContent className="pt-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Streak</span>
              <span className="text-2xl font-bold">
                {profile.currentStreak} day{profile.currentStreak !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>HP</span>
                <span>
                  {profile.hp}/{profile.maxHp}
                </span>
              </div>
              <Progress
                value={hpPct}
                className={`h-2 ${hpPct < 30 ? "[&>div]:bg-red-500" : hpPct < 60 ? "[&>div]:bg-yellow-500" : "[&>div]:bg-green-500"}`}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div custom={2} variants={cardVariants} initial="hidden" animate="visible">
        <Card>
          <CardContent className="pt-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Level</span>
              <span className="text-2xl font-bold">{profile.level}</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>XP</span>
                <span>
                  {profile.xp}/{profile.xpToNextLevel}
                </span>
              </div>
              <Progress value={xpPct} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
