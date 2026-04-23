import { describe, expect, it } from "vitest";
import type { ReviewLog, Word } from "./types";
import {
  getPipelineStage,
  getPipelineStageDescription,
  getPipelineStageLabel,
  getPipelineSummary,
  shouldAdvancePipelineStage,
} from "./pipeline-stage";

function makeWord(overrides: Partial<Word> = {}): Word {
  return {
    id: 1,
    word: "lucid",
    definition: "clear and easy to understand",
    examples: ["A lucid explanation."],
    synonyms: [],
    tier: 1,
    createdAt: new Date("2026-04-01T00:00:00.000Z"),
    ...overrides,
  };
}

function makeLog(overrides: Partial<ReviewLog> = {}): ReviewLog {
  return {
    id: 1,
    wordId: 1,
    rating: 3,
    responseTimeMs: 1500,
    correct: true,
    cueLevel: 0,
    retrievalKind: "exact",
    reviewedAt: new Date("2026-04-10T12:00:00.000Z"),
    ...overrides,
  };
}

describe("pipeline stage inference", () => {
  it("classifies captured and queued words without reviews", () => {
    expect(
      getPipelineStage(
        makeWord({
          totCapture: {
            source: "speech",
            capturedAt: "2026-04-10T12:00:00.000Z",
            count: 1,
          },
        }),
        [],
      ),
    ).toBe("captured");

    expect(getPipelineStage(makeWord(), [])).toBe("queued");
  });

  it("classifies learning and reviewing from retrieval logs", () => {
    expect(
      getPipelineStage(makeWord(), [
        makeLog({
          rating: 1,
          correct: false,
          retrievalKind: "failed",
        }),
      ]),
    ).toBe("learning");

    expect(getPipelineStage(makeWord(), [makeLog()])).toBe("reviewing");
  });

  it("classifies contextualizing and productive context stages", () => {
    expect(
      getPipelineStage(makeWord(), [
        makeLog(),
        makeLog({
          id: 2,
          contextPromptKind: "replace",
          retrievalKind: "exact",
        }),
      ]),
    ).toBe("contextualizing");

    expect(
      getPipelineStage(makeWord(), [
        makeLog(),
        makeLog({
          id: 2,
          rating: 2,
          correct: true,
          retrievalKind: "assisted",
          contextPromptKind: "produce",
        }),
      ]),
    ).toBe("productive");
  });

  it("classifies mature after repeated clean recall and successful production", () => {
    expect(
      getPipelineStage(makeWord(), [
        makeLog({ id: 1, reviewedAt: new Date("2026-04-10T12:00:00.000Z") }),
        makeLog({ id: 2, reviewedAt: new Date("2026-04-09T12:00:00.000Z") }),
        makeLog({ id: 3, reviewedAt: new Date("2026-04-08T12:00:00.000Z") }),
        makeLog({
          id: 4,
          rating: 2,
          correct: true,
          retrievalKind: "assisted",
          contextPromptKind: "rewrite",
          reviewedAt: new Date("2026-04-07T12:00:00.000Z"),
        }),
      ]),
    ).toBe("mature");
  });

  it("does not demote an already advanced stage", () => {
    expect(shouldAdvancePipelineStage("productive", "captured")).toBe(false);
    expect(shouldAdvancePipelineStage("reviewing", "productive")).toBe(true);
  });

  it("exposes stable labels and descriptions", () => {
    expect(getPipelineStageLabel("contextualizing")).toBe("Context");
    expect(getPipelineStageDescription("mature")).toBe(
      "Stable recall plus successful production history.",
    );
  });
});

describe("pipeline summary", () => {
  it("counts stages and computes recognition-to-production conversion", () => {
    const summary = getPipelineSummary([
      makeWord({ id: 1, pipelineStage: "captured" }),
      makeWord({ id: 2, pipelineStage: "reviewing" }),
      makeWord({ id: 3, pipelineStage: "productive" }),
      makeWord({ id: 4, pipelineStage: "mature" }),
    ]);

    expect(summary.counts).toMatchObject({
      captured: 1,
      reviewing: 1,
      productive: 1,
      mature: 1,
    });
    expect(summary.recognitionToProductionRate).toBe(67);
  });
});
