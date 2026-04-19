"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/lib/db";
import { useBootstrap } from "@/lib/bootstrap-context";
import { addWordWithCard } from "@/lib/scheduler";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertTriangle,
  BookOpen,
  ChevronDown,
  Lock,
  Plus,
  RotateCcw,
  Search,
} from "lucide-react";
import { useStats } from "@/hooks/use-stats";
import type { TOTCaptureSource, Word } from "@/lib/types";
import { TIER_UNLOCK_LEVELS, TOT_CAPTURE_SOURCES } from "@/lib/types";
import {
  isDuplicateWord,
  isTierLocked,
  normalizeWord,
  type LibraryTierFilter,
} from "@/lib/word-library";

// ── Tier config ────────────────────────────────────────────────────────

const TIER_BADGE_COLORS: Record<string, string> = {
  "1": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  "2": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  "3": "bg-purple-500/10 text-purple-500 border-purple-500/20",
  custom: "bg-amber-500/10 text-amber-500 border-amber-500/20",
};

const TIER_INFO: Record<string, { label: string; color: string; bg: string; border: string }> = {
  "1": { label: "Core Articulation", color: "text-emerald-500", bg: "bg-emerald-500", border: "border-l-emerald-500/40" },
  "2": { label: "Precision Vocabulary", color: "text-blue-500", bg: "bg-blue-500", border: "border-l-blue-500/40" },
  "3": { label: "Power Words", color: "text-purple-500", bg: "bg-purple-500", border: "border-l-purple-500/40" },
  custom: { label: "Custom", color: "text-amber-500", bg: "bg-amber-500", border: "border-l-amber-500/40" },
};

const TOT_SOURCE_LABELS: Record<TOTCaptureSource, string> = {
  speech: "Speech",
  writing: "Writing",
  reading: "Reading",
  meeting: "Meeting",
  other: "Other",
};

const INITIAL_TOT_FORM = {
  word: "",
  definition: "",
  weakSubstitute: "",
  context: "",
  source: "speech" as TOTCaptureSource,
};

function trimOptional(value: string): string | undefined {
  const trimmed = value.trim();
  return trimmed || undefined;
}

function formatCaptureDate(capturedAt: string): string {
  const parsed = new Date(capturedAt);
  if (Number.isNaN(parsed.getTime())) {
    return "Unknown";
  }

  return parsed.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ── Word row ───────────────────────────────────────────────────────────

function WordRow({ word, isExpanded, onToggle }: { word: Word; isExpanded: boolean; onToggle: () => void }) {
  const tierKey = String(word.tier);

  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-muted/30 transition-colors border-b border-border/30 last:border-b-0 group"
      >
        <span className="font-semibold text-sm min-w-[120px] sm:min-w-[140px] shrink-0">{word.word}</span>
        <Badge
          variant="outline"
          className={`text-[10px] border shrink-0 ${TIER_BADGE_COLORS[tierKey] ?? TIER_BADGE_COLORS.custom}`}
        >
          {word.tier === "custom" ? "Custom" : `T${word.tier}`}
        </Badge>
        {word.totCapture && (
          <Badge
            variant="outline"
            className="text-[10px] border border-amber-500/30 bg-amber-500/10 text-amber-500 shrink-0"
          >
            TOT x{word.totCapture.count}
          </Badge>
        )}
        <span className="text-sm text-muted-foreground truncate flex-1">{word.definition}</span>
        <ChevronDown className={`size-3.5 text-muted-foreground shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 py-3 bg-muted/20 border-b border-border/30 space-y-2.5">
              <p className="text-sm">{word.definition}</p>

              {word.examples.length > 0 && (
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Examples</p>
                  {word.examples.map((ex, i) => (
                    <p key={i} className="text-sm text-muted-foreground italic pl-2 border-l-2 border-border/40">
                      {ex}
                    </p>
                  ))}
                </div>
              )}

              {word.synonyms.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs text-muted-foreground">Synonyms:</span>
                  {word.synonyms.map((s) => (
                    <Badge key={s} variant="secondary" className="text-xs">
                      {s}
                    </Badge>
                  ))}
                </div>
              )}

              {word.totCapture && (
                <div className="space-y-2 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="size-4 text-amber-500" />
                    <p className="text-xs uppercase tracking-widest text-amber-500 font-medium">
                      Blanking Capture
                    </p>
                    <Badge variant="outline" className="text-[10px] border-amber-500/30 text-amber-500">
                      {word.totCapture.count} logged
                    </Badge>
                  </div>
                  <div className="grid gap-1 text-sm text-muted-foreground sm:grid-cols-2">
                    <p>
                      <span className="text-foreground">Source:</span>{" "}
                      {TOT_SOURCE_LABELS[word.totCapture.source]}
                    </p>
                    <p>
                      <span className="text-foreground">Last captured:</span>{" "}
                      {formatCaptureDate(word.totCapture.capturedAt)}
                    </p>
                  </div>
                  {word.totCapture.weakSubstitute && (
                    <p className="text-sm text-muted-foreground">
                      <span className="text-foreground">Used instead:</span>{" "}
                      {word.totCapture.weakSubstitute}
                    </p>
                  )}
                  {word.totCapture.context && (
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      <span className="text-foreground">Context:</span>{" "}
                      {word.totCapture.context}
                    </p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────

export default function WordsPage() {
  const { profile } = useStats();
  const { seedStatus, seedError, retrySeed } = useBootstrap();
  const playerLevel = profile?.level ?? 1;
  const [words, setWords] = useState<Word[]>([]);
  const [search, setSearch] = useState("");
  const [activeTier, setActiveTier] = useState<LibraryTierFilter>("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [totDialogOpen, setTotDialogOpen] = useState(false);

  const [newWord, setNewWord] = useState("");
  const [newDef, setNewDef] = useState("");
  const [newExample, setNewExample] = useState("");
  const [totForm, setTotForm] = useState(INITIAL_TOT_FORM);
  const duplicateWord = isDuplicateWord(newWord, words);
  const selectedTierLocked = isTierLocked(activeTier, playerLevel);
  const normalizedTOTWord = normalizeWord(totForm.word);
  const existingTOTWord = useMemo(
    () => words.find((word) => normalizeWord(word.word) === normalizedTOTWord),
    [normalizedTOTWord, words],
  );
  const totNeedsDefinition = Boolean(normalizedTOTWord) && !existingTOTWord;

  const loadWords = useCallback(async () => {
    const all = await db.words.toArray();
    setWords(all.sort((a, b) => a.word.localeCompare(b.word)));
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadInitialWords() {
      const all = await db.words.toArray();
      if (cancelled) return;
      setWords(all.sort((a, b) => a.word.localeCompare(b.word)));
    }

    void loadInitialWords();

    return () => {
      cancelled = true;
    };
  }, [seedStatus]);

  // Filter by tier + search
  const filtered = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return words
      .filter((w) => activeTier === "all" || w.tier === activeTier)
      .filter((w) => {
        if (!normalizedSearch) {
          return true;
        }

        return [
          w.word,
          w.definition,
          w.totCapture?.weakSubstitute,
          w.totCapture?.context,
        ].some((value) => value?.toLowerCase().includes(normalizedSearch));
      });
  }, [words, activeTier, search]);

  // Group by tier for "all" view
  const grouped = useMemo(() => {
    if (activeTier !== "all") return null;
    const groups: { tier: string; words: Word[] }[] = [];
    for (const tier of ["1", "2", "3", "custom"] as const) {
      const tierWords = filtered.filter((w) => String(w.tier) === tier);
      if (tierWords.length > 0) {
        groups.push({ tier, words: tierWords });
      }
    }
    return groups;
  }, [filtered, activeTier]);

  // Tier counts (from all words, ignoring search)
  const tierCounts = useMemo(() => {
    const counts: Record<string, number> = { all: words.length, "1": 0, "2": 0, "3": 0, custom: 0 };
    for (const w of words) {
      counts[String(w.tier)] = (counts[String(w.tier)] || 0) + 1;
    }
    return counts;
  }, [words]);

  const handleAdd = async () => {
    if (!newWord.trim() || !newDef.trim() || duplicateWord) return;
    await addWordWithCard({
      word: newWord.trim(),
      definition: newDef.trim(),
      examples: newExample.trim() ? [newExample.trim()] : [],
      tier: "custom",
      synonyms: [],
      createdAt: new Date(),
    });
    setNewWord("");
    setNewDef("");
    setNewExample("");
    setDialogOpen(false);
    await loadWords();
  };

  const resetTOTForm = useCallback(() => {
    setTotForm(INITIAL_TOT_FORM);
  }, []);

  const handleTOTDialogChange = useCallback((open: boolean) => {
    setTotDialogOpen(open);
    if (!open) {
      resetTOTForm();
    }
  }, [resetTOTForm]);

  const handleCaptureTOT = async () => {
    const targetWord = totForm.word.trim();
    const definition = totForm.definition.trim();
    if (!targetWord || (totNeedsDefinition && !definition)) return;

    const weakSubstitute = trimOptional(totForm.weakSubstitute);
    const context = trimOptional(totForm.context);
    const capturedAt = new Date().toISOString();

    if (existingTOTWord?.id) {
      await db.words.update(existingTOTWord.id, {
        totCapture: {
          source: totForm.source,
          weakSubstitute,
          context,
          capturedAt,
          updatedAt: capturedAt,
          count: (existingTOTWord.totCapture?.count ?? 0) + 1,
        },
      });
    } else {
      await addWordWithCard({
        word: targetWord,
        definition,
        examples: context ? [context] : [],
        tier: "custom",
        synonyms: [],
        totCapture: {
          source: totForm.source,
          weakSubstitute,
          context,
          capturedAt,
          updatedAt: capturedAt,
          count: 1,
        },
        createdAt: new Date(),
      });
    }

    handleTOTDialogChange(false);
    await loadWords();
  };

  const tierFilters: { key: LibraryTierFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: 1, label: "Tier 1" },
    { key: 2, label: "Tier 2" },
    { key: 3, label: "Tier 3" },
    { key: "custom", label: "Custom" },
  ];

  const renderWordList = (wordList: Word[]) => (
    <Card size="sm" className="overflow-hidden">
      <div>
        {wordList.map((w) => (
          <WordRow
            key={w.id}
            word={w}
            isExpanded={expandedId === w.id}
            onToggle={() => setExpandedId(expandedId === w.id ? null : (w.id ?? null))}
          />
        ))}
      </div>
    </Card>
  );

  if (seedStatus === "seeding" && words.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center">
          <span className="text-3xl animate-pulse">&#x2692;&#xFE0F;</span>
          <p className="text-sm text-muted-foreground">Stocking your library...</p>
        </div>
      </main>
    );
  }

  if (seedStatus === "error" && words.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
            <AlertTriangle className="size-7" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Library setup failed</h1>
            <p className="max-w-md text-sm text-muted-foreground">
              {seedError ?? "Retry setup to load the built-in word library."}
            </p>
          </div>
          <Button onClick={retrySeed} className="gap-2">
            <RotateCcw className="size-4" />
            Retry Setup
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <BookOpen className="size-4.5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Word Library</h1>
            <p className="text-xs text-muted-foreground">
              {words.length} words collected
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={totDialogOpen} onOpenChange={handleTOTDialogChange}>
            <DialogTrigger render={<Button size="sm" variant="outline" className="gap-1.5" />}>
              <AlertTriangle className="size-3.5" />
              Capture TOT
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Capture Blanking Moment</DialogTitle>
                <DialogDescription>
                  Save the exact word that stalled, what you used instead, and where it happened.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 pt-1">
                <Input
                  placeholder="Target word"
                  value={totForm.word}
                  onChange={(event) =>
                    setTotForm((current) => ({ ...current, word: event.target.value }))
                  }
                />
                {normalizedTOTWord && (
                  existingTOTWord ? (
                    <p className="text-sm text-emerald-500">
                      This word is already in your library. Saving here will reinforce that entry.
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      This will create a new custom word, so add a definition before saving.
                    </p>
                  )
                )}
                {totNeedsDefinition && (
                  <Input
                    placeholder="Definition"
                    value={totForm.definition}
                    onChange={(event) =>
                      setTotForm((current) => ({ ...current, definition: event.target.value }))
                    }
                  />
                )}
                <Input
                  placeholder="What you said instead (optional)"
                  value={totForm.weakSubstitute}
                  onChange={(event) =>
                    setTotForm((current) => ({
                      ...current,
                      weakSubstitute: event.target.value,
                    }))
                  }
                />
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                    Context
                  </label>
                  <textarea
                    value={totForm.context}
                    onChange={(event) =>
                      setTotForm((current) => ({ ...current, context: event.target.value }))
                    }
                    placeholder="Where did it happen? Paste the sentence or describe the moment."
                    className="flex min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                    Source
                  </label>
                  <select
                    value={totForm.source}
                    onChange={(event) =>
                      setTotForm((current) => ({
                        ...current,
                        source: event.target.value as TOTCaptureSource,
                      }))
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  >
                    {TOT_CAPTURE_SOURCES.map((source) => (
                      <option key={source} value={source}>
                        {TOT_SOURCE_LABELS[source]}
                      </option>
                    ))}
                  </select>
                </div>
                <Button
                  onClick={handleCaptureTOT}
                  className="w-full gap-2"
                  disabled={!totForm.word.trim() || (totNeedsDefinition && !totForm.definition.trim())}
                >
                  <AlertTriangle className="size-4" />
                  Save Blanking Moment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger render={<Button size="sm" className="gap-1.5" />}>
              <Plus className="size-3.5" />
              Add Word
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Custom Word</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 pt-3">
                <Input
                  placeholder="Word"
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                />
                {duplicateWord && (
                  <p className="text-sm text-red-500">
                    This word is already in your library.
                  </p>
                )}
                <Input
                  placeholder="Definition"
                  value={newDef}
                  onChange={(e) => setNewDef(e.target.value)}
                />
                <Input
                  placeholder="Example sentence (optional)"
                  value={newExample}
                  onChange={(e) => setNewExample(e.target.value)}
                />
                <Button
                  onClick={handleAdd}
                  className="w-full"
                  disabled={!newWord.trim() || !newDef.trim() || duplicateWord}
                >
                  Add to Library
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search words, definitions, or blanking notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-9 text-sm bg-muted/30 border-border/50"
        />
      </div>

      {/* Tier filter pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto">
        {tierFilters.map(({ key, label }) => {
          const count = tierCounts[String(key)] || 0;
          const isActive = activeTier === key;
          const tierInfo = key !== "all" ? TIER_INFO[String(key)] : null;
          const locked = isTierLocked(key, playerLevel);

          return (
            <Button
              key={String(key)}
              variant={isActive ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTier(key)}
              disabled={locked}
              className={`gap-1 text-xs shrink-0 ${
                isActive && tierInfo ? `${tierInfo.bg} hover:${tierInfo.bg}/90` : ""
              }`}
            >
              {locked && <Lock className="size-3" />}
              {label}
              <span className={`text-[10px] tabular-nums ${isActive ? "opacity-80" : "text-muted-foreground"}`}>
                {count}
              </span>
            </Button>
          );
        })}
      </div>

      {/* Word list */}
      {grouped ? (
        // "All" view: grouped by tier with section headers
        <div className="space-y-4">
          {grouped.map(({ tier, words: tierWords }) => {
            const info = TIER_INFO[tier];
            const unlockLevel = TIER_UNLOCK_LEVELS[tier] ?? 1;
            const isLocked = playerLevel < unlockLevel;
            return (
              <div key={tier} className="space-y-1.5">
                <div className={`flex items-center gap-2 pl-2 border-l-2 ${info.border}`}>
                  <span className={`text-xs font-semibold uppercase tracking-widest ${info.color}`}>
                    {tier === "custom" ? "Custom" : `Tier ${tier}`}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {info.label} ({tierWords.length})
                  </span>
                  {isLocked && (
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground/60">
                      <Lock className="size-2.5" />
                      Unlocks at Level {unlockLevel}
                    </span>
                  )}
                </div>
                {isLocked ? (
                  <div className="rounded-xl bg-muted/10 border border-border/20 p-4 text-center text-sm text-muted-foreground/50">
                    <Lock className="size-5 mx-auto mb-1.5 opacity-40" />
                    Reach Level {unlockLevel} to unlock {info.label}
                  </div>
                ) : (
                  renderWordList(tierWords)
                )}
              </div>
            );
          })}
        </div>
      ) : selectedTierLocked ? (
        <div className="rounded-xl bg-muted/10 border border-border/20 p-4 text-center text-sm text-muted-foreground/50">
          <Lock className="size-5 mx-auto mb-1.5 opacity-40" />
          Reach Level {TIER_UNLOCK_LEVELS[String(activeTier)]} to unlock{" "}
          {TIER_INFO[String(activeTier)]?.label ?? "this tier"}
        </div>
      ) : (
        // Filtered single-tier view
        filtered.length > 0 ? (
          renderWordList(filtered)
        ) : null
      )}

      {filtered.length === 0 && !selectedTierLocked && (
        <div className="text-center py-8">
          <BookOpen className="size-7 text-muted-foreground/50 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            {search ? "No words match your search." : "No words in library."}
          </p>
        </div>
      )}
    </main>
  );
}
