"use client";

import { useState, useCallback, useMemo } from "react";
import type {
  ContextSentence,
  GameMode,
  SessionState,
  SessionWord,
  SessionResult,
  SessionSummary,
} from "@/lib/types";
import {
  loadSessionWords,
  processAnswer,
  finalizeSession,
  pickMode,
  getContextSentence,
} from "@/lib/session-engine";
import {
  playCorrect,
  playStreakCorrect,
  playIncorrect,
  playSessionComplete,
  playLevelUp,
} from "@/lib/sounds";

export function useSession() {
  const [state, setState] = useState<SessionState>("idle");
  const [words, setWords] = useState<SessionWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<SessionResult[]>([]);
  const [summary, setSummary] = useState<SessionSummary | null>(null);
  const [promptStartTime, setPromptStartTime] = useState<number>(0);
  const [currentMode, setCurrentMode] = useState<GameMode>("recall");
  const [currentContextSentence, setCurrentContextSentence] =
    useState<ContextSentence | null>(null);

  const currentWord = words[currentIndex] ?? null;
  const progress = words.length > 0 ? currentIndex / words.length : 0;

  const pickModeForWord = useCallback((word: SessionWord) => {
    const mode = pickMode(word.word);
    setCurrentMode(mode);
    if (mode === "context") {
      setCurrentContextSentence(getContextSentence(word.word));
    } else {
      setCurrentContextSentence(null);
    }
  }, []);

  const startSession = useCallback(async () => {
    setState("loading");
    const sessionWords = await loadSessionWords();
    if (sessionWords.length === 0) {
      setState("idle");
      return;
    }
    setWords(sessionWords);
    setCurrentIndex(0);
    setResults([]);
    setSummary(null);
    setPromptStartTime(Date.now());

    // Pick mode for first word
    const mode = pickMode(sessionWords[0].word);
    setCurrentMode(mode);
    if (mode === "context") {
      setCurrentContextSentence(getContextSentence(sessionWords[0].word));
    } else {
      setCurrentContextSentence(null);
    }

    setState("active");
  }, []);

  const submitAnswer = useCallback(
    async (answer: string, manualRating?: 1 | 2 | 3 | 4) => {
      if (!currentWord || state !== "active") return;

      const responseTimeMs = Date.now() - promptStartTime;
      const { result } = await processAnswer(
        currentWord,
        answer,
        responseTimeMs,
        currentMode,
        currentContextSentence?.answer,
        manualRating,
      );

      // Play sound based on result
      if (result.correct) {
        // Count consecutive correct for streak sound
        const prevCorrectStreak = results
          .slice()
          .reverse()
          .findIndex((r) => !r.correct);
        const streak =
          prevCorrectStreak === -1 ? results.length : prevCorrectStreak;
        if (streak >= 2) {
          playStreakCorrect();
        } else {
          playCorrect();
        }
      } else {
        playIncorrect();
      }

      setResults((prev) => [...prev, result]);
      setState("reviewing");
    },
    [currentWord, state, promptStartTime, currentMode, currentContextSentence, results],
  );

  const nextWord = useCallback(async () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= words.length) {
      const sessionSummary = await finalizeSession(results);
      setSummary(sessionSummary);
      if (sessionSummary.leveledUp) {
        playLevelUp();
      } else {
        playSessionComplete();
      }
      setState("complete");
    } else {
      setCurrentIndex(nextIndex);
      setPromptStartTime(Date.now());

      // Pick mode for next word
      const mode = pickMode(words[nextIndex].word);
      setCurrentMode(mode);
      if (mode === "context") {
        setCurrentContextSentence(getContextSentence(words[nextIndex].word));
      } else {
        setCurrentContextSentence(null);
      }

      setState("active");
    }
  }, [currentIndex, words, results]);

  const resetSession = useCallback(() => {
    setState("idle");
    setWords([]);
    setCurrentIndex(0);
    setResults([]);
    setSummary(null);
    setCurrentMode("recall");
    setCurrentContextSentence(null);
  }, []);

  return {
    state,
    currentWord,
    currentIndex,
    totalWords: words.length,
    progress,
    results,
    summary,
    currentMode,
    currentContextSentence,
    startSession,
    submitAnswer,
    nextWord,
    resetSession,
  };
}
