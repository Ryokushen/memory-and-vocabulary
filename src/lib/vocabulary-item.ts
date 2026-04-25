import type {
  CaptureTriageStatus,
  PipelineStage,
  ReviewLog,
  Word,
  WordTier,
} from "./types";
import {
  getCaptureTriageStatus,
  getTOTEventIds,
  shouldIncludeNewWordInTraining,
} from "./word-library";

export type VocabularyItemId = number;
export type VocabularyItemSourceKind = "seeded" | "custom";
export type VocabularyItemCoverageState = "unknown" | "practiced";

export type VocabularyItemSourceSummary = {
  kind: VocabularyItemSourceKind;
  isSeeded: boolean;
  isCustom: boolean;
  isCaptured: boolean;
  captureCount: number;
  captureTriageStatus: CaptureTriageStatus | null;
  captureEventIds: string[];
};

export type VocabularyItemCoverage = {
  retrieval: VocabularyItemCoverageState;
  context: VocabularyItemCoverageState;
  association: VocabularyItemCoverageState;
  collocation: VocabularyItemCoverageState;
};

export type VocabularyItem = {
  id: VocabularyItemId;
  backingWordId: number;
  word: string;
  definition: string;
  examples: string[];
  synonyms: string[];
  tier: WordTier;
  createdAt: Date;
  pipelineStage?: PipelineStage;
  pipelineUpdatedAt?: string;
  trainingEligible: boolean;
  source: VocabularyItemSourceSummary;
  coverage: VocabularyItemCoverage;
};

export type VocabularyItemProjectionOptions = {
  reviewLogs?: ReviewLog[];
};

function getPersistedWordId(word: Word): number {
  if (typeof word.id !== "number") {
    throw new Error("Cannot project a vocabulary item without a persisted word id.");
  }

  return word.id;
}

function projectSourceSummary(word: Word): VocabularyItemSourceSummary {
  const isCustom = word.tier === "custom";
  const captureTriageStatus = getCaptureTriageStatus(word.totCapture);

  return {
    kind: isCustom ? "custom" : "seeded",
    isSeeded: !isCustom,
    isCustom,
    isCaptured: Boolean(word.totCapture),
    captureCount: word.totCapture?.count ?? 0,
    captureTriageStatus,
    captureEventIds: word.totCapture ? getTOTEventIds(word, word.totCapture) : [],
  };
}

function projectCoverage(
  word: Word,
  wordId: number,
  options: VocabularyItemProjectionOptions,
): VocabularyItemCoverage {
  const wordLogs = (options.reviewLogs ?? []).filter((log) => log.wordId === wordId);
  const hasContextPractice = wordLogs.some((log) => Boolean(log.contextPromptKind));
  const hasAssociationPractice = Boolean(word.association?.trim());

  return {
    retrieval: "unknown",
    context: hasContextPractice ? "practiced" : "unknown",
    association: hasAssociationPractice ? "practiced" : "unknown",
    collocation: "unknown",
  };
}

export function wordToVocabularyItem(
  word: Word,
  options: VocabularyItemProjectionOptions = {},
): VocabularyItem {
  const wordId = getPersistedWordId(word);

  return {
    id: wordId,
    backingWordId: wordId,
    word: word.word,
    definition: word.definition,
    examples: word.examples,
    synonyms: word.synonyms,
    tier: word.tier,
    createdAt: word.createdAt,
    pipelineStage: word.pipelineStage,
    pipelineUpdatedAt: word.pipelineUpdatedAt,
    trainingEligible: shouldIncludeNewWordInTraining(word),
    source: projectSourceSummary(word),
    coverage: projectCoverage(word, wordId, options),
  };
}

export function wordsToVocabularyItems(
  words: Word[],
  options: VocabularyItemProjectionOptions = {},
): VocabularyItem[] {
  return words
    .filter((word) => typeof word.id === "number")
    .map((word) => wordToVocabularyItem(word, options));
}
