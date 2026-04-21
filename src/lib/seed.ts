import { db } from "./db";
import { addWordWithCard } from "./scheduler";
import { SEED_WORDS } from "./seed-words";

let seedPromise: Promise<void> | null = null;

/**
 * Seed the database with words, adding any new ones from SEED_WORDS.
 * Also reconciles the tier of existing non-custom words so seed rebalances
 * propagate to users whose local DB was already populated.
 */
export async function seedDatabase(): Promise<void> {
  const existing = await db.words.toArray();
  const seedByWord = new Map(
    SEED_WORDS.map((seed) => [seed.word.toLowerCase(), seed]),
  );
  const existingByWord = new Set(existing.map((w) => w.word.toLowerCase()));

  for (const local of existing) {
    if (local.tier === "custom") continue;
    if (local.id == null) continue;
    const seed = seedByWord.get(local.word.toLowerCase());
    if (!seed) continue;
    if (local.tier === seed.tier) continue;
    await db.words.update(local.id, { tier: seed.tier });
  }

  for (const seed of SEED_WORDS) {
    if (existingByWord.has(seed.word.toLowerCase())) continue;
    await addWordWithCard({
      word: seed.word,
      definition: seed.definition,
      examples: seed.examples,
      pronunciation: undefined,
      tier: seed.tier,
      synonyms: seed.synonyms,
      association: undefined,
      createdAt: new Date(),
    });
  }
}

/** Run database seeding at most once per app session. */
export function ensureSeedDatabase(): Promise<void> {
  if (!seedPromise) {
    seedPromise = seedDatabase();
  }

  return seedPromise;
}

export function resetSeedDatabase() {
  seedPromise = null;
}
