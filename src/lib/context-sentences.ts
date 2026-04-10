import type { ContextSentence } from "./types";

/**
 * Context sentences mapped by answer word.
 * Each sentence has a weak/vague word that should be replaced
 * with the precise vocabulary word.
 */
export const CONTEXT_SENTENCES: Record<string, ContextSentence[]> = {
  nuanced: [
    {
      sentence: "Her understanding of the situation was very **detailed** and showed awareness of all sides.",
      weakWord: "detailed",
      answer: "nuanced",
      distractors: ["verbose", "complex", "thorough"],
    },
    {
      sentence: "The debate requires a more **careful** approach than simply picking a side.",
      weakWord: "careful",
      answer: "nuanced",
      distractors: ["cautious", "deliberate", "measured"],
    },
  ],
  deliberate: [
    {
      sentence: "Every word in his speech felt **planned** and full of purpose.",
      weakWord: "planned",
      answer: "deliberate",
      distractors: ["prepared", "rehearsed", "calculated"],
    },
  ],
  compelling: [
    {
      sentence: "She made a really **good** case for why the project should continue.",
      weakWord: "good",
      answer: "compelling",
      distractors: ["decent", "solid", "strong"],
    },
    {
      sentence: "The evidence was **interesting** enough to change the jury's mind.",
      weakWord: "interesting",
      answer: "compelling",
      distractors: ["notable", "curious", "engaging"],
    },
  ],
  substantive: [
    {
      sentence: "The meeting finally produced some **real** results after weeks of stalling.",
      weakWord: "real",
      answer: "substantive",
      distractors: ["actual", "concrete", "tangible"],
    },
  ],
  pragmatic: [
    {
      sentence: "We need a **practical** solution, not a theoretical one.",
      weakWord: "practical",
      answer: "pragmatic",
      distractors: ["simple", "useful", "realistic"],
    },
  ],
  candid: [
    {
      sentence: "I appreciate your **honest** feedback on my presentation.",
      weakWord: "honest",
      answer: "candid",
      distractors: ["direct", "blunt", "sincere"],
    },
  ],
  concise: [
    {
      sentence: "Keep your emails **short** — no one reads long messages.",
      weakWord: "short",
      answer: "concise",
      distractors: ["brief", "quick", "simple"],
    },
  ],
  cogent: [
    {
      sentence: "He presented a very **convincing** argument at the board meeting.",
      weakWord: "convincing",
      answer: "cogent",
      distractors: ["compelling", "strong", "valid"],
    },
  ],
  salient: [
    {
      sentence: "The most **important** point in the report was buried on page twelve.",
      weakWord: "important",
      answer: "salient",
      distractors: ["key", "critical", "major"],
    },
  ],
  tenuous: [
    {
      sentence: "The connection between the two incidents is very **weak** at best.",
      weakWord: "weak",
      answer: "tenuous",
      distractors: ["fragile", "slim", "faint"],
    },
  ],
  pervasive: [
    {
      sentence: "There's a **widespread** feeling of burnout across the organization.",
      weakWord: "widespread",
      answer: "pervasive",
      distractors: ["common", "general", "broad"],
    },
  ],
  exacerbate: [
    {
      sentence: "The new policy will only **worsen** the existing supply chain problems.",
      weakWord: "worsen",
      answer: "exacerbate",
      distractors: ["increase", "deepen", "intensify"],
    },
  ],
  mitigate: [
    {
      sentence: "We need to **reduce** the risk before moving to production.",
      weakWord: "reduce",
      answer: "mitigate",
      distractors: ["minimize", "lower", "decrease"],
    },
  ],
  precipitate: [
    {
      sentence: "The CEO's resignation **caused** a wave of executive departures.",
      weakWord: "caused",
      answer: "precipitated",
      distractors: ["triggered", "started", "led to"],
    },
  ],
  delineate: [
    {
      sentence: "The contract should clearly **define** each party's responsibilities.",
      weakWord: "define",
      answer: "delineate",
      distractors: ["describe", "outline", "state"],
    },
  ],
  substantiate: [
    {
      sentence: "Can you **prove** that claim with actual data?",
      weakWord: "prove",
      answer: "substantiate",
      distractors: ["support", "back up", "confirm"],
    },
  ],
  elucidate: [
    {
      sentence: "Could you **explain** the reasoning behind this decision?",
      weakWord: "explain",
      answer: "elucidate",
      distractors: ["describe", "clarify", "discuss"],
    },
  ],
  contingent: [
    {
      sentence: "The deal is **dependent** on board approval by Friday.",
      weakWord: "dependent",
      answer: "contingent",
      distractors: ["reliant", "conditional", "based"],
    },
  ],
  efficacy: [
    {
      sentence: "The **effectiveness** of the new training program is still unproven.",
      weakWord: "effectiveness",
      answer: "efficacy",
      distractors: ["usefulness", "value", "impact"],
    },
  ],
  disparity: [
    {
      sentence: "The **difference** between the two teams' budgets was striking.",
      weakWord: "difference",
      answer: "disparity",
      distractors: ["gap", "contrast", "variation"],
    },
  ],
  catalyst: [
    {
      sentence: "The incident was the **cause** of a complete policy overhaul.",
      weakWord: "cause",
      answer: "catalyst",
      distractors: ["reason", "trigger", "source"],
    },
  ],
  cursory: [
    {
      sentence: "He gave the document only a **quick** glance before signing.",
      weakWord: "quick",
      answer: "cursory",
      distractors: ["brief", "fast", "hasty"],
    },
  ],
  amenable: [
    {
      sentence: "The client was **open** to our revised timeline.",
      weakWord: "open",
      answer: "amenable",
      distractors: ["receptive", "agreeable", "willing"],
    },
  ],
  equivocal: [
    {
      sentence: "His **unclear** response left everyone unsure of his position.",
      weakWord: "unclear",
      answer: "equivocal",
      distractors: ["vague", "ambiguous", "confusing"],
    },
  ],
  perfunctory: [
    {
      sentence: "His **halfhearted** apology did nothing to ease the tension.",
      weakWord: "halfhearted",
      answer: "perfunctory",
      distractors: ["weak", "insincere", "mechanical"],
    },
  ],
  tantamount: [
    {
      sentence: "Ignoring the warning signs is basically **equal** to negligence.",
      weakWord: "equal",
      answer: "tantamount",
      distractors: ["similar", "close", "equivalent"],
    },
  ],
  lucid: [
    {
      sentence: "Her explanation was remarkably **clear** despite the complex topic.",
      weakWord: "clear",
      answer: "lucid",
      distractors: ["simple", "plain", "straightforward"],
    },
  ],
  ostensible: [
    {
      sentence: "The **supposed** reason for the meeting was budget review, but layoffs were discussed.",
      weakWord: "supposed",
      answer: "ostensible",
      distractors: ["apparent", "alleged", "claimed"],
    },
  ],
  nebulous: [
    {
      sentence: "The project goals remain **vague** — we need concrete requirements.",
      weakWord: "vague",
      answer: "nebulous",
      distractors: ["unclear", "fuzzy", "hazy"],
    },
  ],
  ubiquitous: [
    {
      sentence: "Smartphones have become **everywhere** in the modern workplace.",
      weakWord: "everywhere",
      answer: "ubiquitous",
      distractors: ["common", "universal", "standard"],
    },
  ],
  superfluous: [
    {
      sentence: "Remove any **unnecessary** steps from the process.",
      weakWord: "unnecessary",
      answer: "superfluous",
      distractors: ["extra", "redundant", "unneeded"],
    },
  ],
  galvanize: [
    {
      sentence: "The safety incident **motivated** the team into updating all procedures.",
      weakWord: "motivated",
      answer: "galvanized",
      distractors: ["pushed", "inspired", "encouraged"],
    },
  ],
  volatile: [
    {
      sentence: "The market has been very **unstable** since the announcement.",
      weakWord: "unstable",
      answer: "volatile",
      distractors: ["unpredictable", "chaotic", "erratic"],
    },
  ],
  nascent: [
    {
      sentence: "The **new** AI team is already producing impressive results.",
      weakWord: "new",
      answer: "nascent",
      distractors: ["young", "fresh", "emerging"],
    },
  ],
};
