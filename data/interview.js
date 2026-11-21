// Interview prep: FDE rounds, numbers to know cold, roleplay prompts, flashcards.
// Flashcards drawn from FDE Module 1 + the 27 system design concepts.
export const FLASHCARDS = [
        ["List or dict for looking up a ticket by ID?", "Dict. A list scan is O(n) — it grows with the data; a dict lookup is O(1) and stays flat. Day 7 measured ~1,000× difference at 200k items."],
        ["401 vs 404 vs 500 — whose fault is it?", "401: you're not logged in. 404: the address doesn't exist (your mistake). 500: the server broke (their problem — refreshing won't fix it). Day 11."],
        ["Why does a URL shortener cache first?", "Reads dwarf writes — ~400 reads/sec vs ~40 writes/sec. A 10× read/write gap means the winning move is serving reads from cache and replicas, not optimising writes."],
        ["What does 99.9% uptime actually allow?", "8 hours 46 minutes of downtime per year. That's why replication matters, and why each extra “nine” is a business decision with a price tag."],
        ["Queue or stack for a support line? Undo?", "Queue (FIFO) for the support line — first come, first served, use a deque. Stack (LIFO) for undo — the last action is the first reversed. Day 8."],
        ["State CAP in one honest sentence.", "When the network partitions (and it will), you must choose: stay consistent or stay available. You can't promise both during a partition."],
        ["Walk me through RAG.", "Chunk documents → embed the chunks → store in a vector DB → retrieve the most similar chunks for a question → put them in the prompt → generate an answer with sources. Days 36–38."],
        ["How do you cut an LLM workflow's cost ~70%?", "Cache repeated answers, route simple work to smaller models, and control what's in the context window — tokens are money. Day 43."],
        ["What's an agent, stripped of the magic?", "A loop: perceive → decide → act → observe, with tools it can call and a stop condition. No stop condition is how you get an agent that loops forever. Days 46–48."],
        ["A refund agent the customer can trust — how?", "Human-in-the-loop: refunds over $100 pause for a human click (Day 52), every step is traced (Day 58), and a 30-case eval suite runs before every release (Day 53)."],
        ["Design rule: /getTickets or GET /tickets?", "GET /tickets. Resources are nouns; the method carries the action. Same shape in, same shape out, honest status codes. Day 12."],
        ["The demo server is down and the customer is on the call. First move?", "Look, don't restart. Read the log (grep ERROR), check processes (ps), probe with curl — a restart destroys the evidence. Day 10."]
      ];

      /* ============================ DATA: PROJECTS ============================ */;

export const ROUNDS = [
  {
    name: "1 · Coding round",
    body: "Practical, not puzzle theatre: data structures at production scale (list vs dict is the classic), clean functions, and tests. Days 7, 8 and 14 of the course are this round in disguise — Big O as a habit, the right container, and proving it works."
  },
  {
    name: "2 · System design round",
    body: "Design out loud: clarify the problem, put numbers on it, draw components, then defend the trade-offs. Day 79's drill — design an AI triage system for 1M tickets/day — is the template. The 27 concepts on the System Design tab are your vocabulary."
  },
  {
    name: "3 · Customer roleplay",
    body: "They play a vague customer (“we need a chatbot”) and watch whether you ask questions or jump to code. The winning move is Day 15's discovery: five questions until the real problem appears, then a 48-hour prototype plan (Day 80) and an ROI line (Day 84)."
  }
];

export const NUMBERS = [
  ["99.9% uptime", "Still means 8h 46m of downtime a year — that's why you replicate, and why “three nines” is a business decision, not a brag."],
  ["400 vs 40 /sec", "A URL shortener's reads vs writes. A 10× read/write gap is the entire argument for caching first and replicating reads."],
  ["O(1) vs O(n)", "Dict lookup stays flat at 10 or 10 million items; a list scan on 200k items measured ~1,000× slower than the dict jump (Day 7)."],
  ["~20 steps", "Binary search finds one item in a million sorted items in about 20 halvings — sorted data gets searched, unsorted data gets scanned."],
  ["2 days → 20 min", "Urgent-ticket wait time in the Day 1 story after the FDE loop ran: discover, prototype, deploy, measure, expand. Your template ROI sentence."]
];

export const ROLEPLAY = [
  "“We need a chatbot for our support team.” — Ask five questions before you propose anything. What is the real bottleneck?",
  "“Our dashboard is too slow.” — Clarify: slow for whom, how many users, which numbers would prove you fixed it?",
  "“Can it also do billing?” — Handle scope creep without saying just “no”: park it, price it, tie it to the ROI of the current phase.",
  "“Your demo broke yesterday.” — Failure recovery live: what did you trace, what did you learn, what changes before the next demo?"
];
