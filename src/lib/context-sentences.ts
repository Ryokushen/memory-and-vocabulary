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
  abstraction: [
    {
      sentence: "Talking about justice as just a **general idea** makes it hard to implement in policy.",
      weakWord: "general idea",
      answer: "abstraction",
      distractors: ["concept", "theory", "notion"],
    },
  ],
  acute: [
    {
      sentence: "The hospital is struggling with a very **serious** shortage of nurses.",
      weakWord: "serious",
      answer: "acute",
      distractors: ["severe", "critical", "urgent"],
    },
  ],
  adversity: [
    {
      sentence: "She built her resilience by pushing through **hard times** early in her career.",
      weakWord: "hard times",
      answer: "adversity",
      distractors: ["hardship", "struggle", "difficulty"],
    },
  ],
  alleviate: [
    {
      sentence: "The new software should **ease** some of the manual work for the team.",
      weakWord: "ease",
      answer: "alleviate",
      distractors: ["reduce", "minimize", "lessen"],
    },
  ],
  ambiguous: [
    {
      sentence: "The instructions were **unclear** and led to three different interpretations.",
      weakWord: "unclear",
      answer: "ambiguous",
      distractors: ["confusing", "vague", "muddled"],
    },
  ],
  ambivalent: [
    {
      sentence: "She felt **unsure** about accepting the promotion — excited but also nervous.",
      weakWord: "unsure",
      answer: "ambivalent",
      distractors: ["conflicted", "hesitant", "uncertain"],
    },
  ],
  ameliorate: [
    {
      sentence: "New regulations were introduced to **improve** conditions in the warehouses.",
      weakWord: "improve",
      answer: "ameliorate",
      distractors: ["fix", "enhance", "correct"],
    },
  ],
  analytical: [
    {
      sentence: "We need someone with a **logical** mind to interpret all this data.",
      weakWord: "logical",
      answer: "analytical",
      distractors: ["systematic", "methodical", "sharp"],
    },
  ],
  anomalous: [
    {
      sentence: "The sensor readings were **strange** and didn't match any expected pattern.",
      weakWord: "strange",
      answer: "anomalous",
      distractors: ["unusual", "irregular", "odd"],
    },
  ],
  antithesis: [
    {
      sentence: "Her laid-back style is the complete **opposite** of the company's intense culture.",
      weakWord: "opposite",
      answer: "antithesis",
      distractors: ["contrast", "reverse", "negation"],
    },
  ],
  apprehensive: [
    {
      sentence: "He was **nervous** about presenting to the executive team for the first time.",
      weakWord: "nervous",
      answer: "apprehensive",
      distractors: ["worried", "anxious", "uneasy"],
    },
  ],
  arbitrary: [
    {
      sentence: "The deadline felt completely **random** — no one could explain the reasoning.",
      weakWord: "random",
      answer: "arbitrary",
      distractors: ["inconsistent", "unreasonable", "capricious"],
    },
  ],
  ardent: [
    {
      sentence: "She is a very **passionate** supporter of environmental reform.",
      weakWord: "passionate",
      answer: "ardent",
      distractors: ["devoted", "fervent", "enthusiastic"],
    },
  ],
  articulate: [
    {
      sentence: "He was able to **clearly express** his concerns without offending anyone.",
      weakWord: "clearly express",
      answer: "articulate",
      distractors: ["communicate", "convey", "voice"],
    },
  ],
  aspiration: [
    {
      sentence: "Her long-term **goal** is to lead a team of researchers at a top university.",
      weakWord: "goal",
      answer: "aspiration",
      distractors: ["ambition", "aim", "dream"],
    },
  ],
  assertive: [
    {
      sentence: "In negotiations, you need to be **confident** about stating your needs.",
      weakWord: "confident",
      answer: "assertive",
      distractors: ["direct", "firm", "forceful"],
    },
  ],
  astute: [
    {
      sentence: "She made a very **smart** observation that everyone else had missed.",
      weakWord: "smart",
      answer: "astute",
      distractors: ["sharp", "shrewd", "perceptive"],
    },
  ],
  attribute: [
    {
      sentence: "Researchers **linked** the drop in performance to a lack of sleep.",
      weakWord: "linked",
      answer: "attributed",
      distractors: ["connected", "credited", "assigned"],
    },
  ],
  attrition: [
    {
      sentence: "The company lost a quarter of its staff through natural **turnover** last year.",
      weakWord: "turnover",
      answer: "attrition",
      distractors: ["departure", "loss", "reduction"],
    },
  ],
  augment: [
    {
      sentence: "We're looking for ways to **boost** the team's capacity without hiring.",
      weakWord: "boost",
      answer: "augment",
      distractors: ["expand", "increase", "supplement"],
    },
  ],
  authentic: [
    {
      sentence: "Customers respond well to brands that feel **genuine** rather than polished.",
      weakWord: "genuine",
      answer: "authentic",
      distractors: ["real", "honest", "sincere"],
    },
  ],
  benevolent: [
    {
      sentence: "The **kind** manager always made time to mentor junior employees.",
      weakWord: "kind",
      answer: "benevolent",
      distractors: ["generous", "caring", "compassionate"],
    },
  ],
  candor: [
    {
      sentence: "I appreciated her **honesty** when she told me the pitch wasn't working.",
      weakWord: "honesty",
      answer: "candor",
      distractors: ["frankness", "openness", "directness"],
    },
  ],
  captivating: [
    {
      sentence: "His opening story was so **interesting** that the room fell completely silent.",
      weakWord: "interesting",
      answer: "captivating",
      distractors: ["engaging", "gripping", "compelling"],
    },
  ],
  circumvent: [
    {
      sentence: "They found a way to **get around** the approval process entirely.",
      weakWord: "get around",
      answer: "circumvent",
      distractors: ["bypass", "sidestep", "avoid"],
    },
  ],
  coalesce: [
    {
      sentence: "Several small movements **came together** to form a unified political force.",
      weakWord: "came together",
      answer: "coalesce",
      distractors: ["merged", "united", "combined"],
    },
  ],
  codify: [
    {
      sentence: "It's time to **write down** these informal practices into official policy.",
      weakWord: "write down",
      answer: "codify",
      distractors: ["formalize", "document", "record"],
    },
  ],
  coherent: [
    {
      sentence: "Please revise the proposal so the argument is more **logical** from start to finish.",
      weakWord: "logical",
      answer: "coherent",
      distractors: ["consistent", "organized", "clear"],
    },
  ],
  complacent: [
    {
      sentence: "After years of success, the team became **too comfortable** and stopped innovating.",
      weakWord: "too comfortable",
      answer: "complacent",
      distractors: ["careless", "lazy", "satisfied"],
    },
  ],
  composure: [
    {
      sentence: "Despite the chaos, she maintained her **calm** throughout the press conference.",
      weakWord: "calm",
      answer: "composure",
      distractors: ["poise", "control", "steadiness"],
    },
  ],
  comprehensive: [
    {
      sentence: "The audit gave us a very **thorough** view of the company's finances.",
      weakWord: "thorough",
      answer: "comprehensive",
      distractors: ["complete", "extensive", "detailed"],
    },
  ],
  conducive: [
    {
      sentence: "Open offices aren't always **helpful** for deep, focused work.",
      weakWord: "helpful",
      answer: "conducive",
      distractors: ["favorable", "suitable", "supportive"],
    },
  ],
  conjecture: [
    {
      sentence: "Without hard data, we're just **guessing** about what caused the outage.",
      weakWord: "guessing",
      answer: "conjecture",
      distractors: ["speculation", "assumption", "hypothesis"],
    },
  ],
  consolidate: [
    {
      sentence: "We need to **combine** the three reports into a single document.",
      weakWord: "combine",
      answer: "consolidate",
      distractors: ["merge", "unify", "integrate"],
    },
  ],
  criterion: [
    {
      sentence: "The main **standard** for evaluation is whether the design meets user needs.",
      weakWord: "standard",
      answer: "criterion",
      distractors: ["measure", "benchmark", "requirement"],
    },
  ],
  crucial: [
    {
      sentence: "Getting user feedback at this stage is absolutely **important** to the project's success.",
      weakWord: "important",
      answer: "crucial",
      distractors: ["essential", "vital", "critical"],
    },
  ],
  cultivate: [
    {
      sentence: "Good leaders **build** a culture of trust within their teams.",
      weakWord: "build",
      answer: "cultivate",
      distractors: ["develop", "foster", "nurture"],
    },
  ],
  deduce: [
    {
      sentence: "From the evidence left behind, the detective was able to **figure out** what happened.",
      weakWord: "figure out",
      answer: "deduce",
      distractors: ["infer", "conclude", "determine"],
    },
  ],
  deference: [
    {
      sentence: "Junior staff often show **respect** to senior engineers, even when they disagree.",
      weakWord: "respect",
      answer: "deference",
      distractors: ["submission", "reverence", "regard"],
    },
  ],
  demarcate: [
    {
      sentence: "The contract should clearly **divide** the responsibilities of each team.",
      weakWord: "divide",
      answer: "demarcate",
      distractors: ["separate", "distinguish", "define"],
    },
  ],
  detrimental: [
    {
      sentence: "Excessive screen time can be **harmful** to children's development.",
      weakWord: "harmful",
      answer: "detrimental",
      distractors: ["damaging", "negative", "bad"],
    },
  ],
  devastated: [
    {
      sentence: "The team was completely **crushed** when the product launch was cancelled.",
      weakWord: "crushed",
      answer: "devastated",
      distractors: ["shattered", "heartbroken", "destroyed"],
    },
  ],
  dichotomy: [
    {
      sentence: "There's a clear **divide** between those who support remote work and those who prefer the office.",
      weakWord: "divide",
      answer: "dichotomy",
      distractors: ["contrast", "split", "conflict"],
    },
  ],
  diligent: [
    {
      sentence: "She is one of the most **hardworking** researchers in the department.",
      weakWord: "hardworking",
      answer: "diligent",
      distractors: ["dedicated", "thorough", "industrious"],
    },
  ],
  dimension: [
    {
      sentence: "We hadn't considered the ethical **aspect** of the project until last week.",
      weakWord: "aspect",
      answer: "dimension",
      distractors: ["factor", "angle", "element"],
    },
  ],
  diminish: [
    {
      sentence: "Constant interruptions **reduce** your ability to do deep work.",
      weakWord: "reduce",
      answer: "diminish",
      distractors: ["weaken", "undermine", "lower"],
    },
  ],
  disambiguate: [
    {
      sentence: "We need to **clarify** whether 'user' refers to the buyer or the end consumer.",
      weakWord: "clarify",
      answer: "disambiguate",
      distractors: ["specify", "define", "distinguish"],
    },
  ],
  discernment: [
    {
      sentence: "Hiring the right people requires good **judgment** about character, not just skills.",
      weakWord: "judgment",
      answer: "discernment",
      distractors: ["insight", "wisdom", "perception"],
    },
  ],
  discrepancy: [
    {
      sentence: "There's a **gap** between what the team reported and what the data shows.",
      weakWord: "gap",
      answer: "discrepancy",
      distractors: ["mismatch", "inconsistency", "difference"],
    },
  ],
  disenchanted: [
    {
      sentence: "After two years of broken promises, the staff grew **disillusioned** with management.",
      weakWord: "disillusioned",
      answer: "disenchanted",
      distractors: ["disappointed", "frustrated", "cynical"],
    },
  ],
  elaborate: [
    {
      sentence: "Could you **expand on** that point? I think there's more to unpack.",
      weakWord: "expand on",
      answer: "elaborate",
      distractors: ["explain", "clarify", "develop"],
    },
  ],
  elated: [
    {
      sentence: "The team was absolutely **thrilled** when they won the contract.",
      weakWord: "thrilled",
      answer: "elated",
      distractors: ["overjoyed", "ecstatic", "delighted"],
    },
  ],
  emphatic: [
    {
      sentence: "She was very **strong** in her refusal to compromise on the timeline.",
      weakWord: "strong",
      answer: "emphatic",
      distractors: ["forceful", "firm", "insistent"],
    },
  ],
  emulate: [
    {
      sentence: "Junior designers often try to **copy** the style of designers they admire.",
      weakWord: "copy",
      answer: "emulate",
      distractors: ["imitate", "mirror", "replicate"],
    },
  ],
  endeavor: [
    {
      sentence: "Starting a business is a challenging **effort** that requires real commitment.",
      weakWord: "effort",
      answer: "endeavor",
      distractors: ["undertaking", "pursuit", "venture"],
    },
  ],
  ephemeral: [
    {
      sentence: "Social media trends are **short-lived** — what's popular today is gone tomorrow.",
      weakWord: "short-lived",
      answer: "ephemeral",
      distractors: ["fleeting", "temporary", "transient"],
    },
  ],
  equanimity: [
    {
      sentence: "He handled the bad news with remarkable **calmness** and didn't miss a beat.",
      weakWord: "calmness",
      answer: "equanimity",
      distractors: ["composure", "serenity", "balance"],
    },
  ],
  erratic: [
    {
      sentence: "His **unpredictable** behavior made it hard for the team to plan around him.",
      weakWord: "unpredictable",
      answer: "erratic",
      distractors: ["inconsistent", "chaotic", "unstable"],
    },
  ],
  exasperated: [
    {
      sentence: "She let out a sigh, clearly **frustrated** by the third system failure that week.",
      weakWord: "frustrated",
      answer: "exasperated",
      distractors: ["annoyed", "irritated", "fed up"],
    },
  ],
  exceptional: [
    {
      sentence: "The team delivered an **outstanding** performance under extremely tight deadlines.",
      weakWord: "outstanding",
      answer: "exceptional",
      distractors: ["remarkable", "extraordinary", "excellent"],
    },
  ],
  expedient: [
    {
      sentence: "Cutting the testing phase might be **useful** short-term, but risky long-term.",
      weakWord: "useful",
      answer: "expedient",
      distractors: ["convenient", "practical", "efficient"],
    },
  ],
  explicit: [
    {
      sentence: "The guidelines need to be more **direct** so there's no room for misinterpretation.",
      weakWord: "direct",
      answer: "explicit",
      distractors: ["specific", "clear", "precise"],
    },
  ],
  exquisite: [
    {
      sentence: "The architect paid **perfect** attention to every detail in the building's design.",
      weakWord: "perfect",
      answer: "exquisite",
      distractors: ["flawless", "elegant", "refined"],
    },
  ],
  extrapolate: [
    {
      sentence: "Based on current growth, we can **predict** where the company will be in five years.",
      weakWord: "predict",
      answer: "extrapolate",
      distractors: ["estimate", "project", "forecast"],
    },
  ],
  facilitate: [
    {
      sentence: "The new platform will **help** cross-team collaboration and reduce email volume.",
      weakWord: "help",
      answer: "facilitate",
      distractors: ["enable", "support", "streamline"],
    },
  ],
  feasible: [
    {
      sentence: "Given the budget constraints, is a full redesign even **possible** by Q3?",
      weakWord: "possible",
      answer: "feasible",
      distractors: ["realistic", "achievable", "viable"],
    },
  ],
  formidable: [
    {
      sentence: "They're up against a **tough** competitor with decades of market experience.",
      weakWord: "tough",
      answer: "formidable",
      distractors: ["powerful", "imposing", "daunting"],
    },
  ],
  fortitude: [
    {
      sentence: "It takes real **strength** to keep going when everything is working against you.",
      weakWord: "strength",
      answer: "fortitude",
      distractors: ["courage", "resilience", "grit"],
    },
  ],
  fundamental: [
    {
      sentence: "Trust is a **basic** requirement for any productive working relationship.",
      weakWord: "basic",
      answer: "fundamental",
      distractors: ["essential", "core", "primary"],
    },
  ],
  implement: [
    {
      sentence: "The board voted to **put in place** the new expense policy starting next month.",
      weakWord: "put in place",
      answer: "implement",
      distractors: ["adopt", "introduce", "enforce"],
    },
  ],
  implicit: [
    {
      sentence: "There was an **understood** agreement that overtime wouldn't be compensated.",
      weakWord: "understood",
      answer: "implicit",
      distractors: ["implied", "assumed", "unspoken"],
    },
  ],
  inadvertent: [
    {
      sentence: "The data breach was **accidental** — no one intended to expose the files.",
      weakWord: "accidental",
      answer: "inadvertent",
      distractors: ["unintentional", "unplanned", "careless"],
    },
  ],
  indignant: [
    {
      sentence: "She was visibly **angry** when her idea was dismissed without explanation.",
      weakWord: "angry",
      answer: "indignant",
      distractors: ["offended", "outraged", "resentful"],
    },
  ],
  indispensable: [
    {
      sentence: "Her technical knowledge made her **essential** to every major product decision.",
      weakWord: "essential",
      answer: "indispensable",
      distractors: ["invaluable", "critical", "irreplaceable"],
    },
  ],
  ineffable: [
    {
      sentence: "The feeling of holding your newborn for the first time is almost **impossible to describe**.",
      weakWord: "impossible to describe",
      answer: "ineffable",
      distractors: ["indescribable", "overwhelming", "beyond words"],
    },
  ],
  inevitable: [
    {
      sentence: "Given the trend lines, consolidation in the industry seems **certain**.",
      weakWord: "certain",
      answer: "inevitable",
      distractors: ["unavoidable", "predictable", "guaranteed"],
    },
  ],
  ingenuity: [
    {
      sentence: "Solving this problem will take real **creativity** — there's no off-the-shelf fix.",
      weakWord: "creativity",
      answer: "ingenuity",
      distractors: ["cleverness", "innovation", "resourcefulness"],
    },
  ],
  inherent: [
    {
      sentence: "There is a **built-in** conflict of interest when executives set their own pay.",
      weakWord: "built-in",
      answer: "inherent",
      distractors: ["fundamental", "intrinsic", "natural"],
    },
  ],
  innovative: [
    {
      sentence: "The startup introduced a **fresh** approach to expense management that no one had tried before.",
      weakWord: "fresh",
      answer: "innovative",
      distractors: ["creative", "novel", "original"],
    },
  ],
  integrate: [
    {
      sentence: "We need to **combine** the new tool with the existing workflow smoothly.",
      weakWord: "combine",
      answer: "integrate",
      distractors: ["merge", "connect", "incorporate"],
    },
  ],
  interpolate: [
    {
      sentence: "We can **estimate** the missing data points from the values on either side.",
      weakWord: "estimate",
      answer: "interpolate",
      distractors: ["calculate", "infer", "fill in"],
    },
  ],
  intricate: [
    {
      sentence: "The supply chain is so **complex** that one delay can cascade through the whole system.",
      weakWord: "complex",
      answer: "intricate",
      distractors: ["complicated", "detailed", "elaborate"],
    },
  ],
  introspective: [
    {
      sentence: "After the setback, he became very **self-reflective** about his leadership style.",
      weakWord: "self-reflective",
      answer: "introspective",
      distractors: ["thoughtful", "contemplative", "inward-looking"],
    },
  ],
  juxtaposition: [
    {
      sentence: "The **contrast** between the luxury hotel and the poverty outside was jarring.",
      weakWord: "contrast",
      answer: "juxtaposition",
      distractors: ["comparison", "difference", "pairing"],
    },
  ],
  leverage: [
    {
      sentence: "We should **use** our existing customer relationships to open new markets.",
      weakWord: "use",
      answer: "leverage",
      distractors: ["exploit", "apply", "capitalize on"],
    },
  ],
  luminous: [
    {
      sentence: "The speaker had a **bright** presence that lit up the whole auditorium.",
      weakWord: "bright",
      answer: "luminous",
      distractors: ["radiant", "glowing", "brilliant"],
    },
  ],
  magnanimous: [
    {
      sentence: "After winning the debate, she was **generous** in acknowledging her opponent's points.",
      weakWord: "generous",
      answer: "magnanimous",
      distractors: ["gracious", "noble", "big-hearted"],
    },
  ],
  mechanism: [
    {
      sentence: "We need a clear **system** for escalating issues before they become crises.",
      weakWord: "system",
      answer: "mechanism",
      distractors: ["process", "procedure", "method"],
    },
  ],
  melancholy: [
    {
      sentence: "There was a quiet **sadness** in his voice when he talked about the old team.",
      weakWord: "sadness",
      answer: "melancholy",
      distractors: ["nostalgia", "sorrow", "wistfulness"],
    },
  ],
  metamorphosis: [
    {
      sentence: "The company underwent a complete **change** after the new CEO took over.",
      weakWord: "change",
      answer: "metamorphosis",
      distractors: ["transformation", "overhaul", "reinvention"],
    },
  ],
  methodical: [
    {
      sentence: "Her **systematic** approach to debugging saved the team hours of guesswork.",
      weakWord: "systematic",
      answer: "methodical",
      distractors: ["organized", "careful", "thorough"],
    },
  ],
  meticulous: [
    {
      sentence: "He was extremely **careful** about checking every number before submitting the report.",
      weakWord: "careful",
      answer: "meticulous",
      distractors: ["precise", "thorough", "detailed"],
    },
  ],
  nuance: [
    {
      sentence: "The translation lost a lot of the **subtlety** that made the original so powerful.",
      weakWord: "subtlety",
      answer: "nuance",
      distractors: ["detail", "depth", "complexity"],
    },
  ],
  paradigm: [
    {
      sentence: "Remote work has become the new **model** for how companies structure their teams.",
      weakWord: "model",
      answer: "paradigm",
      distractors: ["standard", "framework", "approach"],
    },
  ],
  paradox: [
    {
      sentence: "It's an interesting **contradiction** that more choices often lead to less satisfaction.",
      weakWord: "contradiction",
      answer: "paradox",
      distractors: ["irony", "puzzle", "anomaly"],
    },
  ],
  paramount: [
    {
      sentence: "User safety must remain **most important** throughout the design process.",
      weakWord: "most important",
      answer: "paramount",
      distractors: ["primary", "supreme", "essential"],
    },
  ],
  perceptive: [
    {
      sentence: "She made a very **sharp** observation about the power dynamics in the room.",
      weakWord: "sharp",
      answer: "perceptive",
      distractors: ["astute", "insightful", "observant"],
    },
  ],
  perspective: [
    {
      sentence: "Bringing in an outside consultant gave us a fresh **view** on the problem.",
      weakWord: "view",
      answer: "perspective",
      distractors: ["angle", "insight", "outlook"],
    },
  ],
  pertinent: [
    {
      sentence: "Please only include information that is **relevant** to the decision at hand.",
      weakWord: "relevant",
      answer: "pertinent",
      distractors: ["applicable", "related", "appropriate"],
    },
  ],
  pivotal: [
    {
      sentence: "This meeting is a **key** moment — the outcome will shape the next six months.",
      weakWord: "key",
      answer: "pivotal",
      distractors: ["critical", "decisive", "crucial"],
    },
  ],
  plausible: [
    {
      sentence: "That's a **believable** explanation, but we need to verify it with data.",
      weakWord: "believable",
      answer: "plausible",
      distractors: ["reasonable", "credible", "likely"],
    },
  ],
  pragmatism: [
    {
      sentence: "His **practicality** in negotiations meant he always found a workable compromise.",
      weakWord: "practicality",
      answer: "pragmatism",
      distractors: ["realism", "common sense", "rationality"],
    },
  ],
  precarious: [
    {
      sentence: "The startup is in a **risky** financial position after two quarters of losses.",
      weakWord: "risky",
      answer: "precarious",
      distractors: ["unstable", "fragile", "uncertain"],
    },
  ],
  prescient: [
    {
      sentence: "Her **forward-thinking** warnings about cybersecurity proved exactly right.",
      weakWord: "forward-thinking",
      answer: "prescient",
      distractors: ["foresighted", "visionary", "prophetic"],
    },
  ],
  prevalent: [
    {
      sentence: "Burnout has become remarkably **common** in high-pressure industries.",
      weakWord: "common",
      answer: "prevalent",
      distractors: ["widespread", "rampant", "pervasive"],
    },
  ],
  profound: [
    {
      sentence: "The experience had a **deep** impact on how she approached leadership.",
      weakWord: "deep",
      answer: "profound",
      distractors: ["significant", "lasting", "powerful"],
    },
  ],
  propensity: [
    {
      sentence: "He has a natural **tendency** to overcommit and then struggle to deliver.",
      weakWord: "tendency",
      answer: "propensity",
      distractors: ["inclination", "habit", "disposition"],
    },
  ],
  provisional: [
    {
      sentence: "The **temporary** budget was approved while the board reviewed the full proposal.",
      weakWord: "temporary",
      answer: "provisional",
      distractors: ["interim", "preliminary", "conditional"],
    },
  ],
  prudent: [
    {
      sentence: "It would be **wise** to build a cash reserve before expanding into new markets.",
      weakWord: "wise",
      answer: "prudent",
      distractors: ["sensible", "careful", "cautious"],
    },
  ],
  ramification: [
    {
      sentence: "The policy change has serious **consequences** that we haven't fully mapped out.",
      weakWord: "consequences",
      answer: "ramification",
      distractors: ["implication", "effect", "fallout"],
    },
  ],
  reconcile: [
    {
      sentence: "It's hard to **align** the team's need for speed with the client's need for perfection.",
      weakWord: "align",
      answer: "reconcile",
      distractors: ["balance", "resolve", "bridge"],
    },
  ],
  reinforce: [
    {
      sentence: "The data **supports** the hypothesis that early feedback improves outcomes.",
      weakWord: "supports",
      answer: "reinforces",
      distractors: ["confirms", "backs up", "strengthens"],
    },
  ],
  resilient: [
    {
      sentence: "A **strong** supply chain can absorb disruptions without breaking down.",
      weakWord: "strong",
      answer: "resilient",
      distractors: ["robust", "flexible", "durable"],
    },
  ],
  resolute: [
    {
      sentence: "Despite pushback from the board, she remained **firm** in her decision.",
      weakWord: "firm",
      answer: "resolute",
      distractors: ["determined", "steadfast", "unwavering"],
    },
  ],
  reverence: [
    {
      sentence: "He spoke about his mentor with deep **respect** and admiration.",
      weakWord: "respect",
      answer: "reverence",
      distractors: ["admiration", "awe", "honor"],
    },
  ],
  rigorous: [
    {
      sentence: "The study followed a very **strict** methodology to ensure reliable results.",
      weakWord: "strict",
      answer: "rigorous",
      distractors: ["thorough", "disciplined", "exacting"],
    },
  ],
  robust: [
    {
      sentence: "We need a **strong** testing framework that can handle edge cases.",
      weakWord: "strong",
      answer: "robust",
      distractors: ["solid", "resilient", "comprehensive"],
    },
  ],
  scrupulous: [
    {
      sentence: "The auditor was **careful** to verify every transaction independently.",
      weakWord: "careful",
      answer: "scrupulous",
      distractors: ["thorough", "meticulous", "conscientious"],
    },
  ],
  serendipity: [
    {
      sentence: "Their partnership began as a happy **accident** — they met at a cancelled flight gate.",
      weakWord: "accident",
      answer: "serendipity",
      distractors: ["coincidence", "chance", "fortune"],
    },
  ],
  serene: [
    {
      sentence: "The lake at dawn was completely **peaceful** — not a ripple on the surface.",
      weakWord: "peaceful",
      answer: "serene",
      distractors: ["calm", "tranquil", "still"],
    },
  ],
  significant: [
    {
      sentence: "The report showed a **big** improvement in customer satisfaction over six months.",
      weakWord: "big",
      answer: "significant",
      distractors: ["notable", "substantial", "meaningful"],
    },
  ],
  solace: [
    {
      sentence: "She found **comfort** in music during the most difficult period of her life.",
      weakWord: "comfort",
      answer: "solace",
      distractors: ["consolation", "relief", "peace"],
    },
  ],
  sporadic: [
    {
      sentence: "The Wi-Fi has been **irregular** all week — it drops out without warning.",
      weakWord: "irregular",
      answer: "sporadic",
      distractors: ["intermittent", "inconsistent", "unpredictable"],
    },
  ],
  stratify: [
    {
      sentence: "The research team decided to **divide** their sample by age group and income level.",
      weakWord: "divide",
      answer: "stratify",
      distractors: ["segment", "categorize", "sort"],
    },
  ],
  substantial: [
    {
      sentence: "The new contract represents a **large** increase in revenue for the quarter.",
      weakWord: "large",
      answer: "substantial",
      distractors: ["significant", "considerable", "major"],
    },
  ],
  succinct: [
    {
      sentence: "Her **brief** summary captured everything the board needed to know in two sentences.",
      weakWord: "brief",
      answer: "succinct",
      distractors: ["concise", "short", "tight"],
    },
  ],
  synthesize: [
    {
      sentence: "The analyst was able to **combine** insights from five different reports into one clear recommendation.",
      weakWord: "combine",
      answer: "synthesize",
      distractors: ["merge", "integrate", "compile"],
    },
  ],
  tangible: [
    {
      sentence: "We need **real** results, not just promising metrics.",
      weakWord: "real",
      answer: "tangible",
      distractors: ["concrete", "measurable", "actual"],
    },
  ],
  tenacity: [
    {
      sentence: "Her **persistence** through three rounds of investor rejections finally paid off.",
      weakWord: "persistence",
      answer: "tenacity",
      distractors: ["determination", "resilience", "grit"],
    },
  ],
  trajectory: [
    {
      sentence: "The company's growth **path** over the last three years points toward an IPO.",
      weakWord: "path",
      answer: "trajectory",
      distractors: ["trend", "direction", "arc"],
    },
  ],
  transcend: [
    {
      sentence: "Great design can **go beyond** its original purpose and become cultural.",
      weakWord: "go beyond",
      answer: "transcend",
      distractors: ["exceed", "surpass", "overcome"],
    },
  ],
  transform: [
    {
      sentence: "The new leadership completely **changed** how the company operated.",
      weakWord: "changed",
      answer: "transformed",
      distractors: ["overhauled", "restructured", "reshaped"],
    },
  ],
  undermine: [
    {
      sentence: "Constant last-minute changes can **damage** the team's confidence and momentum.",
      weakWord: "damage",
      answer: "undermine",
      distractors: ["weaken", "erode", "sabotage"],
    },
  ],
  unequivocal: [
    {
      sentence: "The CEO gave an **absolutely clear** answer: no layoffs before the end of the year.",
      weakWord: "absolutely clear",
      answer: "unequivocal",
      distractors: ["definitive", "explicit", "unambiguous"],
    },
  ],
  versatile: [
    {
      sentence: "She's a **flexible** team member who can move between design and development easily.",
      weakWord: "flexible",
      answer: "versatile",
      distractors: ["adaptable", "multifaceted", "capable"],
    },
  ],
};
