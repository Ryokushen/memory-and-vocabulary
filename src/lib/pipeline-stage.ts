import type { PipelineStage, ReviewLog, Word } from "./types";

export const PIPELINE_STAGE_ORDER: PipelineStage[] = [
  "captured",
  "queued",
  "learning",
  "reviewing",
  "contextualizing",
  "productive",
  "mature",
];

export type PipelineSummary = {
  counts: Record<PipelineStage, number>;
  recognitionToProductionRate: number | null;
  reviewingOrLaterCount: number;
  productiveOrMatureCount: number;
};

const LABELS: Record<PipelineStage, string> = {
  captured: "Captured",
  queued: "Queued",
  learning: "Learning",
  reviewing: "Reviewing",
  contextualizing: "Context",
  productive: "Productive",
  mature: "Mature",
};

const DESCRIPTIONS: Record<PipelineStage, string> = {
  captured: "Saved from a real-world blanking moment; not yet stabilized.",
  queued: "Accepted into the lexicon but not reviewed yet.",
  learning: "Training has started; clean recall is not stable yet.",
  reviewing: "Clean recall exists and FSRS review is active.",
  contextualizing: "Ready for context and transfer practice.",
  productive: "Successfully used in a production-style prompt.",
  mature: "Stable recall plus successful production history.",
};

function stageRank(stage: PipelineStage): number {
  return PIPELINE_STAGE_ORDER.indexOf(stage);
}

function isCleanExactRecall(log: ReviewLog): boolean {
  return (
    log.correct &&
    log.retrievalKind === "exact" &&
    (log.cueLevel ?? 0) === 0 &&
    log.contextPromptKind !== "produce" &&
    log.contextPromptKind !== "rewrite"
  );
}

function isSuccessfulProduction(log: ReviewLog): boolean {
  return (
    log.correct &&
    (log.contextPromptKind === "produce" ||
      log.contextPromptKind === "rewrite")
  );
}

function hasContextExposure(log: ReviewLog): boolean {
  return Boolean(log.contextPromptKind);
}

export function getPipelineStageLabel(stage: PipelineStage): string {
  return LABELS[stage];
}

export function getPipelineStageDescription(stage: PipelineStage): string {
  return DESCRIPTIONS[stage];
}

export function shouldAdvancePipelineStage(
  current: PipelineStage | undefined,
  next: PipelineStage,
): boolean {
  if (!current) return true;
  return stageRank(next) > stageRank(current);
}

export function maxPipelineStage(
  current: PipelineStage | undefined,
  next: PipelineStage,
): PipelineStage {
  if (!current) return next;
  return shouldAdvancePipelineStage(current, next) ? next : current;
}

export function getPipelineStage(word: Word, logs: ReviewLog[]): PipelineStage {
  const sortedLogs = [...logs].sort(
    (left, right) => left.reviewedAt.getTime() - right.reviewedAt.getTime(),
  );

  if (sortedLogs.length === 0) {
    return word.totCapture ? "captured" : "queued";
  }

  const cleanExactCount = sortedLogs.filter(isCleanExactRecall).length;
  const hasAnyCleanExact = cleanExactCount > 0;
  const hasAnyContext = sortedLogs.some(hasContextExposure);
  const hasProduction = sortedLogs.some(isSuccessfulProduction);

  let inferred: PipelineStage = hasAnyCleanExact ? "reviewing" : "learning";

  if (hasAnyContext) {
    inferred = maxPipelineStage(inferred, "contextualizing");
  }

  if (hasProduction) {
    inferred = maxPipelineStage(inferred, "productive");
  }

  if (cleanExactCount >= 3 && hasProduction) {
    inferred = "mature";
  }

  return maxPipelineStage(word.pipelineStage, inferred);
}

export function getPipelineSummary(words: Word[]): PipelineSummary {
  const counts: Record<PipelineStage, number> = {
    captured: 0,
    queued: 0,
    learning: 0,
    reviewing: 0,
    contextualizing: 0,
    productive: 0,
    mature: 0,
  };

  for (const word of words) {
    counts[word.pipelineStage ?? "queued"] += 1;
  }

  const reviewingOrLaterCount =
    counts.reviewing +
    counts.contextualizing +
    counts.productive +
    counts.mature;
  const productiveOrMatureCount = counts.productive + counts.mature;

  return {
    counts,
    reviewingOrLaterCount,
    productiveOrMatureCount,
    recognitionToProductionRate:
      reviewingOrLaterCount > 0
        ? Math.round((productiveOrMatureCount / reviewingOrLaterCount) * 100)
        : null,
  };
}
