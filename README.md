# Memory & Vocabulary

A gamified RPG vocabulary trainer that maps every game mechanic to clinically-evidenced cognitive training techniques. Built to fight vocabulary regression and lethologica (tip-of-the-tongue states).

## The Idea

Existing brain games are either fun but unscientific (Wordle, random trivia), or scientific but miserable to use (Anki). This app maps every game mechanic directly to the technique with the strongest clinical evidence, then wraps it in RPG progression so you actually open it every day.

Your character's stats reflect your real cognitive training, not arbitrary points.

## Game Modes

| Mode | Trains | How It Works |
|------|--------|-------------|
| **Recall** | Phonological retrieval | See a definition, type the word. No multiple choice — pure production. |
| **Context** | Real-life word selection | See a sentence with a weak word highlighted, pick a more precise replacement from 4 choices. |

Planned: Speed Mode (timed rapid-fire), Association Mode (visual mnemonics).

## RPG System

| Stat | Cognitive Skill | Evidence |
|------|----------------|----------|
| Recall | Phonological retrieval | Directly exercises the pathway that fails during tip-of-tongue states |
| Retention | Spaced repetition | 45% better recall vs. traditional schedules (Duolingo HLR study, 220M reviews) |
| Perception | Speed-of-processing | 20-year longitudinal data; 25% dementia risk reduction |
| Creativity | Visual association | 76% recall improvement via dual coding |

- **XP** from correct answers, streak bonuses, speed bonuses
- **HP** decays on missed days (mirrors real memory decay, floor at 20 — never zero)
- **Leveling** scales at 1.5x per level, restores HP on level-up

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js (App Router) | Consistent with other project patterns |
| Local storage | Dexie.js (IndexedDB) | Typed queries, offline-ready, no backend needed |
| Spaced repetition | ts-fsrs | State-of-the-art scheduler, what Anki switched to |
| Animations | Framer Motion | Card transitions, XP counters, level-up effects |
| Sound | Web Audio API | Synthesized feedback tones, zero audio files |
| UI | shadcn/ui + Tailwind | Accessible primitives, game feel comes from Framer Motion |
| Testing | Vitest | Interval math and scheduling logic |

## Architecture

```
src/
├── app/                    Next.js App Router pages
│   ├── page.tsx            Dashboard (stats, HP, streak, start button)
│   ├── session/page.tsx    Active training session
│   ├── words/page.tsx      Word library with search + add custom words
│   └── stats/page.tsx      Detailed progress and performance
├── components/
│   ├── dashboard/          Summary cards, RPG stat bars
│   └── session/            Recall prompt, context prompt, review result, XP award
├── hooks/
│   ├── use-session.ts      Session state machine (idle → active → reviewing → complete)
│   └── use-stats.ts        Live profile + due count from IndexedDB
└── lib/
    ├── db.ts               Dexie schema (words, reviewCards, reviewLogs, userProfile)
    ├── scheduler.ts        ts-fsrs wrapper (create, grade, query due cards)
    ├── session-engine.ts   Word selection, grading (edit distance + exact match), mode picking
    ├── gamification.ts     XP formula, leveling, HP decay, stat growth
    ├── context-sentences.ts Sentence bank for Context Mode (34 sentences)
    ├── seed-words.ts       50 curated Tier 1 vocabulary words
    ├── sounds.ts           Web Audio API synthesized sound effects
    └── types.ts            All TypeScript interfaces
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The database auto-seeds with 50 Tier 1 words on first launch.

## Research Foundation

Built on research documented in the companion Obsidian vault:

- **Memory Recall and Brain Training** — spaced repetition, dual coding, speed-of-processing evidence
- **Spaced Repetition Algorithms** — FSRS vs. HLR vs. MEMORIZE comparison, ts-fsrs validation
- **Gamification Psychology** — SDT framework, overjustification effect, deep vs. shallow mechanics
- **Gamification Psychology (Web)** — Octalysis Framework, novelty effect data

## Roadmap

- [ ] Speed Mode (timed rapid-fire rounds)
- [ ] Association Mode (visual mnemonics for new words)
- [ ] Expand word corpus from 50 to 200
- [ ] PWA with offline support (Serwist)
- [ ] Web Push notifications ("Your words are decaying")
- [ ] Supabase for multi-device sync (if needed)
