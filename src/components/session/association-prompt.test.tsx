/** @vitest-environment jsdom */

import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { SessionWord } from "@/lib/types";
import { AssociationPrompt } from "./association-prompt";

vi.mock("@/lib/db", () => ({
  db: {
    words: {
      update: vi.fn(),
    },
  },
}));

function makeSessionWord(overrides: Partial<SessionWord["word"]> = {}): SessionWord {
  return {
    word: {
      id: 1,
      word: "lucid",
      definition: "clear",
      examples: [],
      synonyms: [],
      tier: 1,
      createdAt: new Date("2026-04-01T00:00:00.000Z"),
      ...overrides,
    },
    reviewCard: {
      id: 1,
      wordId: 1,
      card: {
        due: new Date("2026-04-10T12:00:00.000Z"),
        stability: 0,
        difficulty: 0,
        elapsed_days: 0,
        scheduled_days: 0,
        reps: 0,
        lapses: 0,
        state: 0,
        last_review: undefined,
        learning_steps: 0,
      },
    },
  };
}

describe("AssociationPrompt", () => {
  it("prefills existing associations when create mode is used for strengthening", () => {
    render(
      <AssociationPrompt
        sessionWord={makeSessionWord({
          association: "A bright lantern cutting through fog.",
        })}
        phase="create"
        onSubmit={vi.fn()}
      />,
    );

    expect(screen.getByText("Strengthen a mental image")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveValue(
      "A bright lantern cutting through fog.",
    );
  });
});
