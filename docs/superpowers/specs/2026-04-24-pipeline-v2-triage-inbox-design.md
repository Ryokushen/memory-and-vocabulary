# Pipeline V2 Triage Inbox Design

Date: 2026-04-24
Status: Approved design, pending implementation plan

## Summary

Pipeline v2 adds a triage inbox for captured vocabulary inside the existing Word Library. The first slice focuses on deciding whether captured words are worth keeping for training. It does not introduce first-class `VocabularyItem` entities, generated practice lanes, coverage metrics, or a new sync architecture.

The inbox is an additive layer over the current `Word` plus `totCapture` model. Captured words start as pending triage items. The user can keep a capture, which moves it into normal queued training, or archive a capture, which removes capture-driven priority while keeping a recoverable record.

## Goals

- Add a visible Inbox filter inside the Word Library for pending captures.
- Let the user keep or archive captured words.
- Treat existing captured/TOT words as pending triage after the feature ships.
- Move kept captures into normal queued training, respecting current daily and session limits.
- Archive captures without deleting seeded words or breaking existing review history.
- Keep the v2 slice compatible with a later `VocabularyItem` architecture.

## Non-Goals

- Do not introduce a separate `VocabularyItem` or capture inbox table in this slice.
- Do not change FSRS scheduling semantics.
- Do not make kept captures jump ahead of daily/session limits.
- Do not hard-delete archived captures.
- Do not redesign the whole Word Library into a separate management workspace.
- Do not add generated practice lanes, coverage analysis, or collocation/chunk modeling yet.
- Do not rebuild Supabase sync unless a concrete failing case requires it.

## Product Behavior

The Word Library gains an Inbox filter tab alongside the existing All, phase, and custom filters. The Inbox tab shows only words whose capture metadata has `triageStatus: "pending"`.

Each pending row exposes two actions:

- Keep: accept the capture, remove it from Inbox, and move the word into normal queued training.
- Archive: archive the capture, remove it from Inbox, and suppress capture-based training priority.

Existing captures should be treated as pending on first bootstrap/backfill so older TOT entries can be reviewed. This avoids silently accepting captures the user has not triaged.

## Data Model

Add triage metadata to `TOTCapture`:

```ts
export type CaptureTriageStatus = "pending" | "accepted" | "archived";

export interface TOTCapture {
  source: TOTCaptureSource;
  weakSubstitute?: string;
  context?: string;
  capturedAt: string;
  updatedAt?: string;
  count: number;
  eventIds?: string[];
  triageStatus?: CaptureTriageStatus;
  triagedAt?: string;
}
```

This keeps the change local to capture metadata. If the app later introduces `VocabularyItem` or per-capture event entities, this status can migrate into that richer model.

## State Rules

New captures default to `pending`.

Existing captures with no `triageStatus` are backfilled to `pending`.

Keep sets:

```ts
totCapture.triageStatus = "accepted";
totCapture.triagedAt = now;
word.pipelineStage = maxPipelineStage(word.pipelineStage, "queued");
word.pipelineUpdatedAt = now;
```

Keep should move captured or untriaged words into normal queued training without demoting words that already reached learning, reviewing, contextualizing, productive, or mature.

Archive sets:

```ts
totCapture.triageStatus = "archived";
totCapture.triagedAt = now;
```

For seeded words, Archive applies only to the capture metadata. The seeded word remains in the library and can still be trained normally. For custom capture-created words, Archive hides the capture from Inbox and normal capture priority; the word should remain recoverable rather than hard-deleted.

## Training Behavior

Pending captures do not enter ordinary new-word training just because they were captured. They remain in the Inbox until kept. This applies to capture-created custom words as well as seeded words with capture metadata.

Accepted captures become normal queued words and obey existing daily new-word and session limits. They should not be manually promoted ahead of due reviews or the configured new-word intake in this v2 slice.

Archived captures should not contribute to TOT/capture priority in session assembly or retrieval-drill support. If the underlying word is already reviewed, seeded, or otherwise available, its normal FSRS behavior remains intact. If the underlying word exists only because of a capture-created custom entry, archive should keep it recoverable but exclude it from new-word selection until restored or accepted.

## UI Design

The Inbox is implemented as a filter tab in the existing Word Library filter strip. This matches the approved layout direction and keeps the first slice small.

The Inbox view should:

- Show a count of pending captures.
- Reuse the existing word row style where practical.
- Surface capture source, date, weak substitute, and context.
- Put Keep and Archive actions in the row detail or an action area that does not crowd the normal library list.
- Empty state: explain that new blanking captures will appear here for review.

Archived captures can be recoverable through row detail or a later Archive filter. The first implementation only needs to preserve the state and keep archived captures out of Inbox and capture-priority behavior.

## Backfill

During bootstrap or seed reconciliation, any word with `totCapture` and no `triageStatus` should receive:

```ts
triageStatus: "pending"
updatedAt: existing updatedAt or capturedAt
```

No changes are required for words without captures.

Backfill should be idempotent and should not overwrite `accepted` or `archived`.

## Sync Considerations

The v1 project status explicitly warns against rebuilding sync without a concrete failing case. This design should avoid a sync architecture rewrite.

If existing custom-word and TOT sync rows can carry the new fields compatibly, include `triageStatus` and `triagedAt` in the existing payload mapping. If the deployed Supabase shape cannot accept new fields without migration, keep triage local in the first implementation plan and document the limitation before expanding cloud sync.

Merge behavior should preserve the latest explicit triage decision. An accepted or archived capture should not become pending again because another device still has an older capture summary.

## Testing Strategy

Add focused tests for pure helper behavior and page helper behavior before wiring UI:

- pending, accepted, and archived capture classification.
- Inbox filter returns only pending captures.
- legacy captures without a status are treated as pending by helper/backfill logic.
- Keep updates triage status to accepted and moves captured/queued stages to queued without demoting higher pipeline stages.
- Archive updates only capture metadata for seeded words.
- Archived captures are excluded from capture-priority session behavior.
- Backfill is idempotent and does not overwrite accepted or archived captures.

Run the normal verification baseline after implementation:

- `npm run lint`
- `npm run test`
- `npm run build`

## Acceptance Criteria

- Word Library has an Inbox filter tab with a pending count.
- Existing captured/TOT words appear as pending until triaged.
- New captures default to pending.
- Keep removes a capture from Inbox and moves it into normal queued training.
- Archive removes a capture from Inbox without deleting seeded words.
- Archived captures no longer affect capture/TOT training priority.
- Triage state is recoverable and not hard-deleted.
- No FSRS scheduling behavior is replaced.
- No full `VocabularyItem` migration is included in this slice.

## Future Work

After this slice proves useful, pipeline v2 can expand into:

- archive browsing and restore actions,
- richer duplicate/merge workflows,
- first-class `VocabularyItem` entities,
- generated practice lanes,
- vocabulary coverage metrics,
- collocation and chunk modeling.
