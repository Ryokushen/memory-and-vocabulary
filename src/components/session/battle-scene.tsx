"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { SessionResult } from "@/lib/types";

// ── Monster pool ───────────────────────────────────────────────────────

const MONSTERS = [
  { name: "Minotaur", icon: "/icons/monster-minotaur.svg" },
  { name: "Troll", icon: "/icons/monster-troll.svg" },
  { name: "Ogre", icon: "/icons/monster-ogre.svg" },
  { name: "Daemon", icon: "/icons/monster-daemon.svg" },
  { name: "Zombie", icon: "/icons/monster-zombie.svg" },
  { name: "Shambler", icon: "/icons/monster-shambler.svg" },
];

const PLAYERS = [
  "/icons/player-knight.svg",
  "/icons/player-cavalry.svg",
  "/icons/player-helm.svg",
];

// ── Props ──────────────────────────────────────────────────────────────

interface BattleSceneProps {
  sessionSeed: number;
  totalWords: number;
  results: SessionResult[];
  /** Signals the reviewing state so we can trigger attack animation */
  lastResult: SessionResult | null;
}

export function BattleScene({
  sessionSeed,
  totalWords,
  results,
  lastResult,
}: BattleSceneProps) {
  // Stable cosmetic selection derived from the session seed.
  const monster = MONSTERS[sessionSeed % MONSTERS.length];
  const playerIcon =
    PLAYERS[Math.floor(sessionSeed / MONSTERS.length) % PLAYERS.length];
  const attackPhase = lastResult
    ? (lastResult.correct ? "hit" : "miss")
    : "idle";

  // Monster HP: starts at totalWords, decreases by 1 per correct answer
  const correctCount = results.filter(r => r.correct).length;
  const monsterMaxHp = totalWords;
  const monsterHp = Math.max(monsterMaxHp - correctCount, 0);
  const hpPct = monsterMaxHp > 0 ? (monsterHp / monsterMaxHp) * 100 : 0;
  const isDead = monsterHp === 0;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Monster info bar */}
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-xs font-semibold text-red-400">{monster.name}</span>
        <div className="flex-1 h-2 bg-muted/40 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${
              hpPct > 50 ? "bg-red-500" : hpPct > 25 ? "bg-amber-500" : "bg-red-600"
            }`}
            animate={{ width: `${hpPct}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
        <span className="text-xs font-mono tabular-nums text-muted-foreground">
          {monsterHp}/{monsterMaxHp}
        </span>
      </div>

      {/* Battle arena */}
      <div className="relative h-24 flex items-center justify-between px-4 rounded-xl bg-muted/20 border border-border/40 overflow-hidden">
        {/* Decorative ground line */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-border/30" />

        {/* Player character (left) */}
        <motion.div
          key={`player-${lastResult?.wordId ?? "idle"}-${attackPhase}`}
          className="relative z-10"
          animate={
            attackPhase === "hit"
              ? { x: [0, 30, 0] }
              : attackPhase === "miss"
                ? { x: [0, 20, 0] }
                : { x: 0 }
          }
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Image
            src={playerIcon}
            alt="Player"
            width={64}
            height={64}
            className="size-16 opacity-90 drop-shadow-[0_0_6px_rgba(139,92,246,0.4)]"
            style={{ filter: "brightness(0) invert(1) sepia(1) saturate(3) hue-rotate(230deg)" }}
          />
        </motion.div>

        {/* Clash FX (center) */}
        <AnimatePresence>
          {lastResult && (
            <motion.div
              key={`clash-${lastResult.wordId}-${attackPhase}`}
              initial={{ scale: 0, opacity: 0, rotate: -30 }}
              animate={{ scale: [0, 1.2, 0.9], opacity: [0, 1, 0], rotate: [-30, 0, 0] }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <Image
                src="/icons/fx-sword-clash.svg"
                alt=""
                width={48}
                height={48}
                className={`size-12 ${
                  attackPhase === "hit"
                    ? "drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                    : "drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]"
                }`}
                style={{
                  filter: attackPhase === "hit"
                    ? "brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(90deg)"
                    : "brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(330deg)"
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Monster (right) */}
        <AnimatePresence>
          {!isDead ? (
            <motion.div
              key={`monster-${lastResult?.wordId ?? "idle"}-${attackPhase}`}
              className="relative z-10"
              animate={
                attackPhase === "hit"
                  ? { x: [0, 8, -8, 4, -4, 0], opacity: [1, 0.5, 1] }
                  : attackPhase === "miss"
                    ? { scale: [1, 1.1, 1] }
                    : { x: 0, scale: 1 }
              }
              transition={{ duration: 0.4 }}
            >
              <Image
                src={monster.icon}
                alt={monster.name}
                width={64}
                height={64}
                className="size-16 opacity-90 drop-shadow-[0_0_6px_rgba(239,68,68,0.4)]"
                style={{ filter: "brightness(0) invert(1) sepia(1) saturate(3) hue-rotate(330deg)", transform: "scaleX(-1)" }}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 1, scale: 1, rotate: 0 }}
              animate={{ opacity: 0, scale: 0.5, rotate: 15, y: 20 }}
              transition={{ duration: 0.6 }}
              className="relative z-10"
            >
              <Image
                src="/icons/fx-skull-crack.svg"
                alt="Defeated"
                width={64}
                height={64}
                className="size-16 opacity-60"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
