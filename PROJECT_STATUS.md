# Lexforge Project Status

_Last updated: 2026-04-25_

This file is the quick "do not redo work" reference for contributors.

## Shipped Foundations (Do Not Re-Implement)

These capabilities are already in `master` and should be treated as baseline behavior:

- Cross-device sync via Supabase + GitHub OAuth
- Review-log sync with explicit `session_id` handling
- Review-card reconciliation that preserves progressed scheduler state
- Sync key hardening with normalized word keys
- Additive TOT capture merge behavior (count/event preservation)
- Local-only Supabase auth fallback so session completion does not crash without cloud env vars
- Background sync retry and recovery behavior
- Partial session save-on-exit flow with dashboard resume messaging
- Quest-card separation of due reviews, eligible new words, pending capture Inbox items, and next-session mix
- Canonical 700-word curriculum across four seeded phases
- Unlock gating for unseen higher-phase words, while preserving already-introduced reviews and custom words
- Vocabulary pipeline stage tracking across seeded, custom, and TOT-captured words
- Word library pipeline badges and stats-page acquisition flow summary
- Word Library Inbox and Archive triage for pending or archived captured words, including restore-without-training behavior
- Word Library Duplicates workflow for exact normalized duplicate entries, with local merge preview, review-log reassignment, strongest-card preservation, conservative metadata merge, and absorbed local-row cleanup
- First-class `VocabularyItem` bridge over `Word`, generated practice-lane routing, vocabulary coverage summaries, and collocation practice-unit scaffolding
- Practice-lane session integration: session words carry coverage routes, missing lanes can force the relevant mode, and collocation routes now produce deterministic context-style rewrite prompts
- Stats-page training coverage transparency: aggregate lane coverage, automatic fill-input counts, and explicit FSRS-first copy without manual drill selection
- Dashboard quest-card session-plan transparency: FSRS reviews first, eligible new-word backfill second, coverage signals shape prompt type, and Inbox captures stay held out
- Stat-aware prompt support beyond Rapid Retrieval: weak Recall keeps Context prompts scaffolded longer, strong Recall permits production/rewrite transfer, and weak Creativity strengthens existing association mnemonics before recall
- Deeper Context transfer: deeply fluent words can now get constrained scenario-variation prompts that require target-word use plus a source-scene anchor, graded deterministically without LLM review

## Current Product Gap

- RPG stats now drive session mode weighting, retrieval-drill timing, and selected prompt support. Context mode spans replacement, target-word production, fluent rewrite-transfer, constrained scenario variation, and collocation rewrite prompts, with low Recall holding scaffolding longer. Association mode can now strengthen existing mnemonics when Creativity lags. The vocabulary pipeline tracks acquisition stage from capture through mature production with Inbox, Archive, Duplicates, `VocabularyItem`, coverage, and generated practice-lane foundations. The dashboard distinguishes eligible new training words from pending capture Inbox items, explains the automatic next-session order, the Word Library exposes per-word lane coverage in expanded rows, and Stats shows aggregate lane coverage as automatic training-engine signals. The remaining gap is deciding which transparency or coverage surfaces are actually useful after real session usage.

## Active Next Priorities

1. Broaden stat-aware support only where it can be tied to existing prompt quality signals.
2. Decide whether scenario variation should feed a separate coverage metric after real usage, rather than adding another manual drill control.
3. Decide whether coverage transparency needs a compact dashboard trend after real usage, rather than adding more busywork UI now.
4. Evolve the vocabulary pipeline beyond the transitional `VocabularyItem` bridge only after a persistence design is concrete.
5. Keep the canonical 700-word ranking authoritative for future seed updates. Reference material: [docs/700-word-retiering-plan.md](docs/700-word-retiering-plan.md), [docs/word-frequency-audit.md](docs/word-frequency-audit.md), [docs/word-addition-candidates.md](docs/word-addition-candidates.md).

## Recent Completion Record

- Completed Pipeline v2 Tasks 1-6 covering capture triage helpers, seed backfill, training/session gating, Word Library Inbox UI, sync merge preservation, documentation, and full verification.
- Completed follow-up: dashboard now shows pending capture Inbox count separately from eligible new training words and explains automatic session-plan order.
- Completed follow-up: local-only Supabase auth fallback prevents post-session crashes when cloud env vars are absent.
- Completed follow-up: Word Library Archive browsing and Restore for archived captures, plus AppStatusBanner hydration stabilization.
- Completed follow-up: Word Library Duplicates browsing and local merge workflow for exact normalized duplicates, preserving review continuity while removing absorbed duplicate rows.
- Completed follow-up: `VocabularyItem` bridge, generated practice-lane routing, coverage summaries, collocation practice scaffolding, session integration for missing lane practice, Stats/Word Library/dashboard coverage transparency, stat-aware prompt support, and deterministic scenario-variation prompts for deeply fluent context practice.
- Historical triage design doc: [docs/superpowers/specs/2026-04-24-pipeline-v2-triage-inbox-design.md](docs/superpowers/specs/2026-04-24-pipeline-v2-triage-inbox-design.md).
- Historical triage implementation plan: [docs/superpowers/plans/2026-04-24-pipeline-v2-triage-inbox.md](docs/superpowers/plans/2026-04-24-pipeline-v2-triage-inbox.md).

## Active Work In Progress

- Current branch: stat-aware prompt support plus scenario context transfer.

## Verification Baseline

- `./scripts/verify.sh lint`
- `./scripts/verify.sh test` (full Vitest suite)
- `./scripts/verify.sh build` (Next.js production build + TypeScript checks)

## Scope Guardrail

Before opening a "sync hardening" task, verify a concrete failing case first (test or reproducible bug). Default assumption is that sync hardening is already complete and should not be re-built from scratch.
