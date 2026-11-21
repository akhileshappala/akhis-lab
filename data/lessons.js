// FDE Course — Module 1 lessons (Days 1-15) + the full 90-day roadmap.
// Source: FDE Course Bible + Lesson Packs Days 1-15. Add future lessons as data here.
export const LESSONS = [
        {
          day: 1, title: "What is a Forward Deployed Engineer?",
          hook: "A support manager has 4,000 open tickets and 3 agents. She doesn't need a chatbot. She needs an FDE.",
          concept: "A software engineer builds the product the company planned; a consultant advises and leaves a slide deck. An FDE is deployed forward — inside the customer's world — discovers the real workflow, builds a working solution, deploys it in production, and owns the result. The loop never changes: Discover → Prototype → Deploy → Measure → Expand. Then set up Python + VS Code and write your first program — not “hello world”, but a number a manager can act on.",
          nodes: [["Discover","sit with the agents"],["Prototype","48-hour build"],["Deploy","runs every morning"],["Measure","wait time drops"],["Expand","refunds next"]],
          steps: [
            { n: 0, cap: "Discover: urgent billing tickets hide in the queue for two days before anyone sees them.", metric: "4,000 tickets · 3 agents" },
            { n: 1, cap: "Prototype: a small Python tool reads the tickets and flags the urgent ones.", metric: "built in 48 hours" },
            { n: 2, cap: "Deploy: it runs every morning before the team logs in — no one has to remember it.", metric: "live in their workflow" },
            { n: 3, cap: "Measure: urgent ticket wait time falls from two days to twenty minutes.", metric: "2 days → 20 min" },
            { n: 4, cap: "Expand: the manager asks for the same treatment for refunds. Trust earned, scope grows.", metric: "1,333 tickets per agent" }
          ],
          code: "# hello_customer.py — Day 1, FDE Course\ncustomer_name = \"Acme Support\"\ntotal_tickets = 4000\nagents = 3\n\ntickets_per_agent = total_tickets / agents\n\nprint(f\"Customer: {customer_name}\")\nprint(f\"Open tickets: {total_tickets}\")\nprint(f\"Agents: {agents}\")\nprint(f\"Tickets each agent must clear today: {tickets_per_agent:.0f}\")",
          output: "Customer: Acme Support\nOpen tickets: 4000\nAgents: 3\nTickets each agent must clear today: 1333",
          mistake: "Learning tools in isolation — Python for a month, then AI for a month, never touching a customer problem. FDEs learn backwards from the problem, which is why every lesson starts with a customer, not a definition.",
          fde: "In FDE interviews they roleplay exactly this: a customer describes a vague problem and they watch whether you ask questions or jump to code. Train the question habit from Day 1.",
          assign: "Install Python and run the file. Change it to 5 agents and 6,000 tickets and run it again (answer: 1,200 each). Then write down one workflow in your life where the stated problem is probably not the real problem."
        },
        {
          day: 2, title: "Python Variables & Data Types",
          hook: "A support agent writes a ticket on a sticky note. A computer stores it in a variable. Same job — one of them scales to 4,000 tickets.",
          concept: "A variable is a labelled box holding one value, and the value has a type. Four types carry this whole course: str (text), int (whole number), float (decimal), bool (True/False). Python infers the type from the value. An f-string prints a variable inside a sentence — the trick behind every log line and demo output you'll ever write. The deep idea: code stays still, data flows through it.",
          nodes: [["ticket_id","int · 1042"],["customer","str · Acme"],["priority","int · 9"],["message","str · text"],["is_urgent","bool · True"]],
          steps: [
            { n: 0, cap: "The ID is an int — a number you can sort, count and search by.", metric: "ticket_id = 1042" },
            { n: 1, cap: "The customer name is a string — text in quotes, for humans to read.", metric: "customer = \"Acme Support\"" },
            { n: 2, cap: "Priority is an int on purpose: tomorrow we compare it to a threshold, and you can't compare a word.", metric: "priority = 9" },
            { n: 3, cap: "The message is a string — the raw words the customer actually wrote.", metric: "message = \"Billing charged twice\"" },
            { n: 4, cap: "Urgency is a bool — a yes/no the program can branch on.", metric: "is_urgent = True" }
          ],
          code: "# ticket.py — Day 2, FDE Course\nticket_id = 1042            # int\ncustomer = \"Acme Support\"   # str\npriority = 9                # int — a number, so we can compare it later\nmessage = \"Billing charged twice\"  # str\nis_urgent = True            # bool\n\nprint(f\"Ticket #{ticket_id} | {customer} | Priority {priority} | Urgent: {is_urgent}\")\nprint(f\"Message: {message}\")",
          output: "Ticket #1042 | Acme Support | Priority 9 | Urgent: True\nMessage: Billing charged twice",
          mistake: "Storing everything as a string because it prints nicely. A priority stored as the text '9' cannot be compared — in text order '9' is bigger than '10', which silently misroutes tickets. A wrong type is a wrong decision hiding in your code.",
          fde: "Nobody on a customer call says “we need a string”. They say “this ticket says urgent but nobody acted”. Your job is the translation: which field, which type, which rule. That translation is the FDE skill.",
          assign: "Create ticket.py and run it. Add a second ticket of your own — different customer, priority 3, not urgent — and print both. Decide: which type stores a refund amount, and why? (A float — money has decimals.)"
        },
        {
          day: 3, title: "If / Else & Loops — Automate Boring Decisions",
          hook: "Three agents, 4,000 tickets, and one rule everyone knows: priority above 8 means handle it today. So why is a human still checking every ticket by hand?",
          concept: "An if statement is a question with a yes branch and a no branch. A for loop runs the same check on every item in a list, without writing it out 4,000 times. List + loop + if is the engine of almost every automation an FDE ships in week one: the list holds the tickets, the loop does the work, the if makes the decision — and once the rule is written down, it's testable and runs in milliseconds.",
          nodes: [["4 tickets","the list"],["Loop","each ticket, in turn"],["priority > 8?","the if"],["Flagged","handle today"],["Skipped","waits its turn"]],
          steps: [
            { n: 0, cap: "Four tickets arrive with priorities 9, 4, 10 and 7.", metric: "tickets = [9, 4, 10, 7]" },
            { n: 1, cap: "The loop picks up one ticket at a time — the same code path for every one.", metric: "for ticket in tickets:" },
            { n: 2, cap: "Ticket 1042, priority 9: greater than 8, so it passes the if.", metric: "9 > 8 ✓" },
            { n: 3, cap: "Tickets 1042 and 1044 get flagged — exactly 2 of 4.", metric: "urgent: 2 of 4" },
            { n: 4, cap: "Priorities 4 and 7 fail the test and wait. The rule never gets tired or distracted.", metric: "runs in milliseconds on 4,000" }
          ],
          code: "# flag_urgent.py — Day 3, FDE Course\ntickets = [\n    {\"id\": 1042, \"priority\": 9},\n    {\"id\": 1043, \"priority\": 4},\n    {\"id\": 1044, \"priority\": 10},\n    {\"id\": 1045, \"priority\": 7},\n]\n\nurgent = []\nfor ticket in tickets:\n    if ticket[\"priority\"] > 8:\n        urgent.append(ticket)\n\nprint(f\"Urgent tickets: {len(urgent)} of {len(tickets)}\")\nfor ticket in urgent:\n    print(f\"  FLAG Ticket #{ticket['id']} (priority {ticket['priority']}) — handle today\")",
          output: "Urgent tickets: 2 of 4\n  FLAG Ticket #1042 (priority 9) — handle today\n  FLAG Ticket #1044 (priority 10) — handle today",
          mistake: "Writing the same if statement four times, once per ticket — or hard-coding ticket IDs into the rule. The day a fifth ticket arrives, that code breaks. If your code gets longer when the customer gets busier, you wrote it wrong.",
          fde: "Listen for sentences that start with “we always…” and “every morning someone…”. That's an automation hiding in plain sight, and naming it in the meeting is how an FDE earns trust in the first hour.",
          assign: "Run the code. Add a second rule inside the same loop: priority 10 prints “ESCALATE to manager”. Then name one boring decision in your own day that is really a list, a loop and an if."
        },
        {
          day: 4, title: "Functions — Write Code a Team Can Reuse",
          hook: "The same ticket-sorting logic, copied into five files, by three people, in two slightly different versions. That is how a demo dies the week after you leave.",
          concept: "A function is a named, reusable block: def, a name, inputs in parentheses, and a return value. Write the logic once and call it a hundred times; change it in one place and the morning report, the dashboard and the alert all change together. A one-line docstring says what it does so the next person can trust it without reading it. Rule: if you write the same logic twice, it belongs in a function.",
          nodes: [["Ticket text","input"],["lower()","normalise"],["Keyword check","billing? access?"],["Category","returned"],["Report · Dashboard · Alert","one rule, everywhere"]],
          steps: [
            { n: 0, cap: "A raw message comes in, exactly as the customer typed it.", metric: "\"I was charged twice\"" },
            { n: 1, cap: "Lowercase first — “Billing” and “billing” must match the same rule.", metric: "text = text.lower()" },
            { n: 2, cap: "Keywords are checked in order: money words, then access words, else general.", metric: "charged → billing" },
            { n: 3, cap: "The function returns one word — it doesn't print. The caller decides what to do with it.", metric: "return \"billing\"" },
            { n: 4, cap: "The same function serves the report, the dashboard and the alert. One place to change the rule.", metric: "called 100×, written 1×" }
          ],
          code: "# classify.py — Day 4, FDE Course\ndef classify_ticket(text):\n    \"\"\"Return 'billing', 'access', or 'general' for one ticket message.\"\"\"\n    text = text.lower()\n    if \"refund\" in text or \"charged\" in text or \"billing\" in text:\n        return \"billing\"\n    if \"login\" in text or \"password\" in text:\n        return \"access\"\n    return \"general\"\n\nmessages = [\n    \"I was charged twice\",\n    \"Can't login to my account\",\n    \"How do I change my plan?\",\n]\n\nfor message in messages:\n    print(f\"{message} -> {classify_ticket(message)}\")",
          output: "I was charged twice -> billing\nCan't login to my account -> access\nHow do I change my plan? -> general",
          mistake: "A function that prints instead of returning. It looks fine on screen and is useless everywhere else — you can't test it, reuse its answer, or put it in a report. Return the answer; let the caller decide what to print.",
          fde: "In a demo, reuse is a selling point: “This classifier runs in your report, your dashboard and your alerts — one rule, one place to change it” is a sentence a manager remembers.",
          assign: "Run the code. Add a fourth category — “refund” — for tickets mentioning “refund” or “money back”, and test it on three sentences of your own. Name one piece of logic you've written twice in your life."
        },
        {
          day: 5, title: "OOP Part 1 — Classes & Objects",
          hook: "By now a ticket is five loose variables floating around your code. Lose track of one, and the ticket falls apart. There is a better container — and every real system is built from it.",
          concept: "A class is a blueprint; an object is the thing built from it. The __init__ method runs when you create an object and fills in its fields. A method is a function that belongs to the object, so ticket.summary() already knows its own data — you never pass the pieces separately again. One ticket, one object, everything it needs inside it: the idea behind every model, API resource and agent tool in this course.",
          nodes: [["class Ticket","the blueprint"],["__init__","fills the fields"],["Ticket(1043, 10, …)","the object"],["summary()","its behaviour"],["is_urgent()","its judgement"]],
          steps: [
            { n: 0, cap: "The class declares what every ticket has: id, priority, message.", metric: "class Ticket:" },
            { n: 1, cap: "__init__ runs at creation and stores the fields on the object itself.", metric: "self.priority = priority" },
            { n: 2, cap: "Two objects from one blueprint: #1042 (P4) and #1043 (P10).", metric: "2 tickets, 1 class" },
            { n: 3, cap: "summary() formats the ticket's own data — no loose variables passed in.", metric: "\"#1043 (P10): Charged twice\"" },
            { n: 4, cap: "is_urgent() carries Day 3's rule inside the object: priority > 8.", metric: "P10 → Urgent: True" }
          ],
          code: "# ticket_class.py — Day 5, FDE Course\nclass Ticket:\n    \"\"\"One support ticket: id, priority, message — and its own behaviour.\"\"\"\n\n    def __init__(self, ticket_id, priority, message):\n        self.ticket_id = ticket_id\n        self.priority = priority\n        self.message = message\n\n    def summary(self):\n        return f\"#{self.ticket_id} (P{self.priority}): {self.message}\"\n\n    def is_urgent(self):\n        return self.priority > 8\n\nticket_a = Ticket(1042, 4, \"How do I change my plan?\")\nticket_b = Ticket(1043, 10, \"Charged twice\")\n\nprint(ticket_a.summary(), \"| Urgent:\", ticket_a.is_urgent())\nprint(ticket_b.summary(), \"| Urgent:\", ticket_b.is_urgent())",
          output: "#1042 (P4): How do I change my plan? | Urgent: False\n#1043 (P10): Charged twice | Urgent: True",
          mistake: "A class with no behaviour — a box that only holds data while all the logic still lives outside in loose functions. That's a dictionary with extra steps. Put the behaviour that belongs to a ticket on the ticket itself.",
          fde: "When a customer describes their world — tickets, customers, orders, refunds — they are handing you the classes. Listen for the nouns. A demo built from the customer's own nouns is a demo they recognise instantly.",
          assign: "Run the code. Add a Customer class (name, plan: free/pro), give Ticket a customer field, and print a summary that includes the customer name. List three nouns from your own job that would make good classes."
        },
        {
          day: 6, title: "OOP Part 2 — Inheritance & Composition",
          hook: "An urgent ticket is a ticket — but with a 2-hour deadline. Do you copy the whole Ticket class and add one line? That copy is the start of every codebase that becomes unfixable.",
          concept: "Inheritance is an “is a” relationship: an UrgentTicket is a Ticket, so it inherits everything and adds only the SLA — super().__init__ reuses the parent's setup. Composition is a “has a” relationship: a SupportDesk has tickets, holding a list of them and managing the collection. Rule of thumb: inherit for a special kind of a thing, compose for a thing made of other things — and when in doubt, compose; it breaks less often.",
          nodes: [["Ticket","the parent"],["UrgentTicket","IS A ticket + SLA"],["SupportDesk","the container"],["add_ticket()","HAS tickets"],["urgent_count()","asks the collection"]],
          steps: [
            { n: 0, cap: "Ticket already works: fields, summary(), the lot. Don't copy it.", metric: "class Ticket" },
            { n: 1, cap: "UrgentTicket inherits everything and adds exactly one thing: a 2-hour SLA.", metric: "sla_hours = 2" },
            { n: 2, cap: "SupportDesk doesn't inherit from Ticket — it holds a list of tickets. Composition.", metric: "self.tickets = []" },
            { n: 3, cap: "A normal ticket and an urgent ticket both go on the same desk.", metric: "2 tickets added" },
            { n: 4, cap: "The desk counts urgent tickets by asking each one what it is — it never reaches inside them.", metric: "Urgent tickets on the desk: 1" }
          ],
          code: "# support_desk.py — Day 6, FDE Course\nclass Ticket:\n    def __init__(self, ticket_id, priority, message):\n        self.ticket_id, self.priority, self.message = ticket_id, priority, message\n\n    def summary(self):\n        return f\"#{self.ticket_id} (P{self.priority}): {self.message}\"\n\nclass UrgentTicket(Ticket):\n    \"\"\"An UrgentTicket IS A Ticket — plus a 2-hour SLA.\"\"\"\n    def __init__(self, ticket_id, priority, message):\n        super().__init__(ticket_id, priority, message)\n        self.sla_hours = 2\n\nclass SupportDesk:\n    \"\"\"A SupportDesk HAS tickets — it holds a collection of them.\"\"\"\n    def __init__(self):\n        self.tickets = []\n\n    def add_ticket(self, ticket):\n        self.tickets.append(ticket)\n\n    def urgent_count(self):\n        return sum(1 for t in self.tickets if isinstance(t, UrgentTicket))\n\ndesk = SupportDesk()\ndesk.add_ticket(Ticket(1042, 4, \"How do I change my plan?\"))\ndesk.add_ticket(UrgentTicket(1043, 10, \"Charged twice\"))\n\nprint(desk.tickets[0].summary())\nprint(\"Urgent tickets on the desk:\", desk.urgent_count())",
          output: "#1042 (P4): How do I change my plan?\nUrgent tickets on the desk: 1",
          mistake: "Inheriting everything: a SupportDesk that inherits from list, a hierarchy five levels deep where changing one class breaks four others. If you can't say the “is a” sentence out loud and have it sound true, don't inherit.",
          fde: "In discovery calls, listen for “is a” and “has a” in the customer's own words. “A refund is a kind of ticket” — inheritance. “A customer has many tickets” — composition. Mapping their words to classes, live, shows you understood their business.",
          assign: "Run the code. Add all_summaries() to SupportDesk — every ticket's summary in one list — and print it. Then write down one “is a” and one “has a” from your own world."
        },
        {
          day: 7, title: "DSA Basics — Big O, Lists & Dictionaries",
          hook: "Your ticket search works perfectly — on 200 tickets. On a million, the same code takes a thousand times longer. The difference is not the computer. It is the data structure.",
          concept: "Big O is a promise about how work grows. O(1) is constant — the same effort at 10 items or 10 million; that's a dictionary lookup by key. O(n) grows with the data — scanning a list item by item. A list is ordered and simple but finding means scanning; a dict is a key-value map that jumps straight to the value. When you choose a container, you choose how your system behaves at scale — and customers notice scale before features.",
          nodes: [["200,000 tickets","the data"],["List scan","checks one by one"],["O(n)","work grows"],["Dict lookup","jumps by key"],["O(1)","stays flat"]],
          steps: [
            { n: 0, cap: "The same 200,000 ticket IDs live in a list and in a dict. We hunt for the last one: 199,999.", metric: "target = 199,999" },
            { n: 1, cap: "The list has no shortcut — it checks items until it finds the match.", metric: "scanning…" },
            { n: 2, cap: "Measured: the scan takes about 2 milliseconds — and doubles every time the data doubles.", metric: "list: ~0.0019s" },
            { n: 3, cap: "The dict uses the key like an address and goes straight there. No scanning.", metric: "dict: ~0.000002s" },
            { n: 4, cap: "Roughly 1,000× faster — and the gap grows with the data. Build the dict once; every lookup after is a jump.", metric: "~1000× faster" }
          ],
          code: "# big_o_demo.py — Day 7, FDE Course\nimport time\n\ntickets_list = list(range(200_000))\ntickets_dict = {i: f\"Ticket {i}\" for i in range(200_000)}\ntarget = 199_999\n\nstart = time.perf_counter()\nfound_in_list = target in tickets_list\nlist_time = time.perf_counter() - start\n\nstart = time.perf_counter()\nfound_in_dict = target in tickets_dict\ndict_time = time.perf_counter() - start\n\nprint(f\"List scan:   {list_time:.4f}s | found: {found_in_list}\")\nprint(f\"Dict lookup: {dict_time:.6f}s | found: {found_in_dict}\")\nprint(\"Rule: look up by ID? Use a dict, not a list.\")",
          output: "List scan:   0.0019s | found: True\nDict lookup: 0.000002s | found: True\nRule: look up by ID? Use a dict, not a list.",
          mistake: "Memorising Big O as interview trivia, then writing O(n) lookups inside a loop — a scan inside a scan — until a dashboard that worked in testing times out in front of a customer. Every time you write “for item in list, if it matches”, ask whether a dict answers it in one step.",
          fde: "“It gets slow when we have a lot of data” is the most common complaint an FDE hears — and the fix is often not a bigger server, it's a better container, a cache, or an index. Naming that in the first meeting is worth more than any feature list.",
          assign: "Run the code. Time the same search with the target at the start of the list (ID 0) and at the end — and be able to explain why the list time changes and the dict time doesn't. Rewrite Day 3's flagging loop with tickets in a dict keyed by ID."
        },
        {
          day: 8, title: "Stacks, Queues & Searching",
          hook: "Three agents, a line of waiting tickets, and one furious customer who arrived last but shouts loudest. Who gets helped first — and who decides?",
          concept: "A queue is first-in, first-out (FIFO) — like a real line; Python's collections.deque is built for it, with append on one end and popleft on the other. A stack is last-in, first-out (LIFO) — a pile of plates, and exactly what “undo” is: the last action is the first reversed. And if data is sorted, binary search finds one item in a million in about 20 steps by halving the search space. The structure you pick is the behaviour your customer experiences.",
          nodes: [["Tickets arrive","1042 · 1043 · 1044"],["Queue (deque)","FIFO"],["popleft()","oldest served first"],["Stack","LIFO"],["Undo","last action reversed"]],
          steps: [
            { n: 0, cap: "Three tickets join the line in order: 1042, then 1043, then 1044.", metric: "queue = [1042, 1043, 1044]" },
            { n: 1, cap: "A queue's rule is fairness: first in, first out. Nobody jumps the line.", metric: "FIFO" },
            { n: 2, cap: "The agent takes 1042 — the ticket that has waited longest. 1043 and 1044 keep their order.", metric: "Next up: 1042" },
            { n: 3, cap: "Different job, different structure: an agent's actions pile up on a stack.", metric: "LIFO" },
            { n: 4, cap: "Undo pops the most recent action first — “Added refund note” goes before the older reply.", metric: "pop() → last in, first out" }
          ],
          code: "# support_queue.py — Day 8, FDE Course\nfrom collections import deque\n\n# QUEUE: first come, first served (FIFO)\nqueue = deque()\nfor ticket_id in [1042, 1043, 1044]:\n    queue.append(ticket_id)\n\nprint(\"Next up:\", queue.popleft(), \"| Waiting:\", list(queue))\n\n# STACK: last in, first out (LIFO) — this is how Undo works\nundo_stack = []\nundo_stack.append(\"Typed reply to #1042\")\nundo_stack.append(\"Added refund note\")\nprint(\"Undo removes first:\", undo_stack.pop())\nprint(\"Still on the stack:\", undo_stack)",
          output: "Next up: 1042 | Waiting: [1043, 1044]\nUndo removes first: Added refund note\nStill on the stack: ['Typed reply to #1042']",
          mistake: "Using a plain list as a queue and calling pop(0) — removing from the front shifts every other item, so it gets slower as the queue grows. Use a deque for a queue, a list for a stack, and write the priority rule down before you code it.",
          fde: "In a customer workshop, draw the queue on a whiteboard before writing code. “Oldest first, urgent jumps the queue by a written rule” — if the customer agrees to that sentence, the code is easy. If they won't agree, no code will save you.",
          assign: "Run the code. Add an urgent lane: a second deque, serving one urgent ticket before each normal one; test with 2 urgent + 3 normal tickets and note the service order. Find one queue in your life that is secretly a stack."
        },
        {
          day: 9, title: "Git & GitHub — The Workflow Every FDE Team Uses",
          hook: "You change one line at 11pm, the demo breaks at 9am, and nobody — including you — remembers what the code looked like yesterday. That is a Git problem.",
          concept: "Git is a save-point system for code. A repository is the project folder Git watches. A commit is a save point with a message saying what changed and why. A branch is a parallel copy where you try something risky without touching the working version. A pull request says: review my branch, then merge it into main. That loop — branch, commit, PR, merge — is how every professional team moves code without breaking what already works.",
          nodes: [["main","always demo-ready"],["branch","fix-login-demo"],["commit","save point + message"],["Pull Request","review"],["merge","back into main"]],
          steps: [
            { n: 0, cap: "main holds the working ticket desk — the version you could demo at any second.", metric: "git init -b main" },
            { n: 1, cap: "The risky change gets its own branch. main is untouched while you experiment.", metric: "git checkout -b fix-login-demo" },
            { n: 2, cap: "The fix is committed on the branch only, with a message that says what and why.", metric: "\"Fix login demo timeout\"" },
            { n: 3, cap: "A pull request is the review gate: here's my branch, check it before it lands.", metric: "PR = review, then merge" },
            { n: 4, cap: "Merged — and the history shows exactly what happened. One command returns to any save point.", metric: "3 commits, fully traceable" }
          ],
          code: "git init -b main\ngit config user.email \"you@example.com\"\ngit config user.name \"Your Name\"\ngit add .\ngit commit -m \"Initial commit\"\ngit checkout -b fix-login-demo\n# ...make one small change...\ngit commit -am \"Fix login demo timeout\"\ngit checkout main\ngit merge --no-ff fix-login-demo -m \"Merge PR: fix login demo\"\ngit log --oneline\ngit branch -a",
          output: "038665d Merge PR: fix login demo\naff267f Initial commit\nfbc4a61 Fix login demo timeout\n\nbranches: fix-login-demo, * main",
          mistake: "Committing everything in one giant commit called “final final v2” — if the message doesn't say what changed, the history is useless. Second mistake: working directly on main for a customer demo. Main is sacred; experiments live on branches.",
          fde: "On a customer project, your Git history is your credibility. A team that can read your commits trusts your changes; a team that can't, reviews everything twice.",
          assign: "Turn your course folder into a repo and make your first commit. Create a branch, change one line, commit it, merge it back. Write down the one line of your own code you'd most hate to lose."
        },
        {
          day: 10, title: "Linux Essentials — Every Deployment Uses These",
          hook: "The demo is down, the customer is on the call, and the server is a black screen with a blinking cursor. Ten commands decide whether you fix it in two minutes or panic for an hour.",
          concept: "Linux runs almost every server, and the terminal is how you talk to it. Navigate with cd / ls / pwd. Read with cat, search with grep. Watch processes with ps. Ask a server a question with curl. Protect files with chmod. And SSH is the idea underneath it all: a secure terminal on a faraway server, as if you were sitting at it. Logs first, fix second, proof third.",
          nodes: [["SSH in","the black screen"],["ls / cd","where am I?"],["grep ERROR","read the log"],["ps","what's running?"],["curl","ask the server"],["chmod 600","lock it down"]],
          steps: [
            { n: 0, cap: "You're on the customer's server with nothing but a cursor. Don't panic — look.", metric: "SSH = remote terminal" },
            { n: 1, cap: "Orient first: where am I, what's here? The log file is the witness.", metric: "app.log" },
            { n: 2, cap: "grep counts and shows the evidence: the payment service failed twice, timeout after 30s.", metric: "grep -c ERROR → 2" },
            { n: 3, cap: "ps shows what's actually running — is the process alive, stuck, or gone?", metric: "ps aux" },
            { n: 4, cap: "curl asks the homepage and gets a 200 — the web server is alive; the payment service is the problem.", metric: "curl → 200" },
            { n: 5, cap: "chmod 600 locks the log so only its owner can read it. Secrets stay secret.", metric: "-rw------- owner only" }
          ],
          code: "grep -c ERROR app.log        # -> 2\ngrep ERROR app.log           # -> ERROR payment service failed: timeout after 30s  (x2)\ngrep -i \"payment\" app.log | wc -l   # -> 2\nps aux | head -5\ncurl -s -o /dev/null -w \"%{http_code}\\n\" https://example.com   # -> 200\nchmod 600 app.log\nls -l app.log                # -> -rw-------  (owner read/write only)",
          output: "2\nERROR payment service failed: timeout after 30s\nERROR payment service failed: timeout after 30s\n200\n-rw------- app.log",
          mistake: "Restarting the whole server first and asking questions later — a restart hides the evidence in the logs. Second mistake: chmod 777 to make an error go away. It also gives everyone your secrets.",
          fde: "In a customer deployment, the first thing a good FDE does is not fix — it is look. Logs first, then the fix, then proof it worked. That calm order is what the room remembers.",
          assign: "Create a small log file and find its ERROR lines with grep. Run ps and find one process. curl a real site and read its status code. Write down one error message you've seen and what you think it meant."
        },
        {
          day: 11, title: "HTTP Deep Dive — How the Web Actually Talks",
          hook: "Every button on the internet is a question, and every page is an answer with a number on it. Learn to read those numbers and you will never be confused by a broken website again.",
          concept: "HTTP is a conversation. A request has a method (GET = fetch, POST = create), a path like /tickets, and headers — small labels such as Content-Type. A response has a status code and a body, usually JSON shaped like the Python dicts you already know. The families tell the story: 2xx worked (200 OK, 201 Created), 4xx the request was wrong (401 login required, 404 not found), 5xx the server broke (500).",
          nodes: [["Client","asks a question"],["Request","GET /tickets"],["Server","your code answers"],["Status","200 · 401 · 404 · 500"],["Body","JSON back"]],
          steps: [
            { n: 0, cap: "Every click is a request leaving the client — a browser, an app, or curl.", metric: "click → request" },
            { n: 1, cap: "The request carries a method and a path: GET /tickets means “fetch the ticket list”.", metric: "GET /tickets" },
            { n: 2, cap: "The server routes it: /tickets exists, /admin needs a login, /boom crashes on purpose.", metric: "one server, five answers" },
            { n: 3, cap: "The status code says whose fault it is: 200 fine, 401 log in, 404 wrong address, 500 server broke.", metric: "2xx ✓ · 4xx you · 5xx server" },
            { n: 4, cap: "The body is JSON — data shaped like a Python dict, ready for the client to use.", metric: "Content-Type: application/json" }
          ],
          code: "# http_demo.py — Day 11, FDE Course (stdlib only)\nimport json\nfrom http.server import BaseHTTPRequestHandler, HTTPServer\n\nTICKETS = [{\"id\": 1042, \"customer\": \"Acme Support\", \"priority\": 9,\n            \"message\": \"Billing charged twice\"}]\n\nclass Handler(BaseHTTPRequestHandler):\n    def _send(self, code, obj):\n        body = json.dumps(obj).encode()\n        self.send_response(code)\n        self.send_header(\"Content-Type\", \"application/json\")\n        self.send_header(\"Content-Length\", str(len(body)))\n        self.end_headers()\n        self.wfile.write(body)\n\n    def do_GET(self):\n        if self.path == \"/tickets\":\n            self._send(200, TICKETS)\n        elif self.path == \"/tickets/1042\":\n            self._send(200, TICKETS[0])\n        elif self.path == \"/admin\":\n            self._send(401, {\"error\": \"login required\"})\n        elif self.path == \"/boom\":\n            self._send(500, {\"error\": \"server blew up\"})\n        else:\n            self._send(404, {\"error\": \"not found\"})\n\n    def log_message(self, *args):\n        pass\n\nif __name__ == \"__main__\":\n    HTTPServer((\"127.0.0.1\", 8000), Handler).serve_forever()",
          output: "GET /tickets      -> 200\nGET /tickets/1042 -> 200\nGET /admin        -> 401\nGET /boom         -> 500\nGET /nope         -> 404",
          mistake: "Treating every error as “the website is down”. A 404 is your mistake — wrong address. A 401 is a login problem. A 500 is the server's problem, and no amount of refreshing fixes it. Read the code before you react.",
          fde: "“The API is broken” is not a diagnosis. “It returns 401 on /admin and 200 on /tickets, so auth works and that route needs a login” is. Precision is what makes a room trust you.",
          assign: "Run the server and curl all five paths. Add your own path that returns 200 with your name in it. Recall the strangest status code you've ever seen in real life."
        },
        {
          day: 12, title: "REST APIs — Design an API a Customer Can Understand",
          hook: "A customer team wants to use your ticket tool from their own software. If your API looks like a junk drawer, they will quietly stop using it. Design it like a map instead.",
          concept: "REST is a set of manners for APIs. Resources are nouns, not verbs: /tickets, not /getTickets. The method says what you're doing — GET reads, POST creates, PATCH updates, DELETE removes. The path names the thing: /tickets lists all, /tickets/1042 names one. The status code reports honestly: 200 worked, 201 created, 404 doesn't exist. And the body is always the same shape, so the customer's code never has to guess.",
          nodes: [["GET /tickets","read the list"],["GET /tickets/1042","read one"],["POST /tickets","create"],["201 Created","id 1043 assigned"],["GET again","two tickets"]],
          steps: [
            { n: 0, cap: "Read the collection: one path, the whole list, same shape every time.", metric: "GET /tickets → 200" },
            { n: 1, cap: "Read one resource by naming it in the path — a URL you can say out loud on a call.", metric: "GET /tickets/1042 → 200" },
            { n: 2, cap: "Create by POSTing the same JSON shape: Globex, priority 4, password reset.", metric: "POST /tickets" },
            { n: 3, cap: "The server answers 201 Created and hands the ticket back with its new id: 1043.", metric: "201 · id 1043" },
            { n: 4, cap: "Read again — two tickets. Same shape in, same shape out, honest status codes. That's the whole contract.", metric: "list grew 1 → 2" }
          ],
          code: "curl -s http://127.0.0.1:8000/tickets\n# -> [{\"id\": 1042, \"customer\": \"Acme Support\", \"priority\": 9, \"message\": \"Billing charged twice\"}]\n\ncurl -s -X POST -H 'Content-Type: application/json' \\\n  -d '{\"customer\":\"Globex\",\"priority\":4,\"message\":\"Password reset\"}' \\\n  http://127.0.0.1:8000/tickets\n# -> {\"customer\": \"Globex\", \"priority\": 4, \"message\": \"Password reset\", \"id\": 1043}  (201 Created)\n\ncurl -s http://127.0.0.1:8000/tickets\n# -> both tickets, ids 1042 and 1043",
          output: "[{\"id\": 1042, \"customer\": \"Acme Support\", \"priority\": 9, \"message\": \"Billing charged twice\"}, {\"customer\": \"Globex\", \"priority\": 4, \"message\": \"Password reset\", \"id\": 1043}]",
          mistake: "Inventing a new endpoint for every action — /createTicket, /deleteTicketPlease, /ticketUpdate2. The method already says the action; the path only names the thing. Second mistake: a different shape for the same resource on different endpoints. That's how integrations rot.",
          fde: "In a demo, walk the API out loud before showing code: “here is the list, here is one ticket, here is how you create one.” If a non-technical customer can follow it, the design is right.",
          assign: "POST a ticket of your own and read it back with GET. On paper, design the endpoints for customers — /customers and /customers/{id}. Name one API you've used that felt well designed, and why."
        },
        {
          day: 13, title: "SQL Basics — Ask a Database Questions",
          hook: "Four thousand tickets in a list is a pile. Four thousand tickets in a database is a question away from an answer — if you know how to ask.",
          concept: "SQL is the language of asking. A table is a spreadsheet with rules; related tables link by an id. SELECT picks columns, WHERE filters rows, JOIN connects tables on the shared id, GROUP BY bundles rows so you can COUNT them, and ORDER BY + LIMIT ranks the answer — the top five, not all four thousand. Four verbs answer almost any question a customer asks about their own data, and the database does the filtering, not your Python.",
          nodes: [["customers","3 rows"],["tickets","6 rows"],["JOIN","on customer_id"],["GROUP BY + COUNT","rank them"],["WHERE priority > 8","the urgent four"]],
          steps: [
            { n: 0, cap: "Customers live in their own table: Acme, Globex, Initech.", metric: "customers: 3" },
            { n: 1, cap: "Tickets live in theirs — each carrying the id of its customer.", metric: "tickets: 6" },
            { n: 2, cap: "JOIN stitches the tables together on the shared id, so a ticket can say its customer's name.", metric: "ON cu.id = t.customer_id" },
            { n: 3, cap: "GROUP BY + COUNT answers “who has the most tickets?” — Acme 3, Globex 2, Initech 1.", metric: "top: Acme · 3" },
            { n: 4, cap: "WHERE filters instead: priority above 8 returns exactly four urgent tickets. The question is the program.", metric: "urgent: 1042, 1044, 1046, 1047" }
          ],
          code: "# tickets_db.py — Day 13, FDE Course\nimport sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nconn.executescript(\"\"\"\nCREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE tickets (id INTEGER, customer_id INTEGER, priority INTEGER);\nINSERT INTO customers VALUES (1, 'Acme'), (2, 'Globex'), (3, 'Initech');\nINSERT INTO tickets VALUES\n  (1042, 1, 9), (1043, 1, 4), (1044, 2, 10),\n  (1045, 2, 7), (1046, 1, 10), (1047, 3, 9);\n\"\"\")\n\nprint(\"Top customers by ticket count:\")\nfor row in conn.execute(\"\"\"\n    SELECT cu.name, COUNT(*) AS n\n    FROM tickets t JOIN customers cu ON cu.id = t.customer_id\n    GROUP BY cu.name ORDER BY n DESC LIMIT 5\n\"\"\"):\n    print(\" \", row)\n\nprint(\"Urgent tickets (priority > 8):\")\nfor row in conn.execute(\"SELECT * FROM tickets WHERE priority > 8\"):\n    print(\" \", row)",
          output: "Top customers by ticket count:\n  ('Acme', 3)\n  ('Globex', 2)\n  ('Initech', 1)\nUrgent tickets (priority > 8):\n  (1042, 1, 9)\n  (1044, 2, 10)\n  (1046, 1, 10)\n  (1047, 3, 9)",
          mistake: "Pulling the whole table into Python and filtering there — the database is built to filter, let it. Second mistake: a query with no WHERE on a big table. It works on six rows and melts on six million.",
          fde: "In a customer meeting, the person who can answer “which customer is struggling most?” in ten seconds — live, from the data — is the person the room listens to.",
          assign: "Run the script and reproduce both answers. Write one query of your own: tickets for one customer, ordered by priority. Name one question you'd ask your own data if it lived in a database."
        },
        {
          day: 14, title: "Testing with pytest — Prove It Before the Demo",
          hook: "You tell a customer the ticket classifier works. They paste in an empty ticket — and it crashes, live, in front of the room. A ten-line test would have caught it yesterday.",
          concept: "A test is a claim you can re-run. An assert says “this must be true”. A test function checks one behaviour — one input, one expected output. pytest finds your test functions, runs them all, and reports pass or fail in plain words. The habit is the point: every time the code changes, the tests re-run, and the empty-ticket crash can never sneak back in.",
          nodes: [["classify_ticket","Day 4's function"],["4 test cases","one per behaviour"],["assert","this must be true"],["pytest","runs them all"],["4 passed","proof, not a claim"]],
          steps: [
            { n: 0, cap: "The classifier from Day 4 is back — now with the empty-text guard Day 14 adds.", metric: "empty → \"needs-info\"" },
            { n: 1, cap: "Four tests: billing words, login words, empty text, unknown question.", metric: "4 behaviours" },
            { n: 2, cap: "Each test is an assert — an expected output the code must match, exactly.", metric: "assert result == expected" },
            { n: 3, cap: "pytest discovers and runs every test function in the file, in order.", metric: "pytest -q" },
            { n: 4, cap: "Four dots, four passed, 0.01 seconds. Break the empty case on purpose and one goes red — that's the test earning its keep.", metric: "4 passed in 0.01s" }
          ],
          code: "# test_classify.py — Day 14, FDE Course\n# Install once:  pip install pytest\n# Run:  pytest test_classify.py -q\n\ndef classify_ticket(text):\n    if not text or not text.strip():\n        return \"needs-info\"\n    t = text.lower()\n    if \"refund\" in t or \"charged twice\" in t or \"billing\" in t:\n        return \"billing\"\n    if \"password\" in t or \"login\" in t or \"cannot log in\" in t:\n        return \"access\"\n    return \"general\"\n\ndef test_billing_keyword():\n    assert classify_ticket(\"Billing charged twice\") == \"billing\"\n\ndef test_access_keyword():\n    assert classify_ticket(\"Cannot log in\") == \"access\"\n\ndef test_empty_text_needs_info():\n    assert classify_ticket(\"\") == \"needs-info\"\n    assert classify_ticket(\"   \") == \"needs-info\"\n\ndef test_unknown_is_general():\n    assert classify_ticket(\"How do I export a report?\") == \"general\"",
          output: "....                                                                     [100%]\n4 passed in 0.01s",
          mistake: "Testing only the happy path — the perfect ticket, the perfect input. Real customers send empty fields, typos and copy-pasted junk. Test the empty case first; it's the one that embarrasses you live. And if a test only prints without asserting, it's a demo, not a test.",
          fde: "In a customer demo, “we tested it” is a sentence; a green test run is proof. FDEs ship proof, because the customer's trust is the product.",
          assign: "Install pytest and run the four tests green. Break the empty-text case on purpose, watch it go red, then fix it. Name one edge case from your own life a test should catch."
        },
        {
          day: 15, title: "PROJECT — Customer Discovery + Ticket Analyzer CLI",
          hook: "Fifteen days ago you printed one number. Tonight you walk into a customer, ask the right questions, and hand them a tool that reads their tickets and tells them what to do first.",
          concept: "Customer discovery is asking until the real problem appears — five questions carry it: the last ticket that went wrong, the daily volume and who touches it, what “urgent” means here, what a miss costs, and which number would change. The answers are the specification. Then the build: a CLI that loads a ticket file, classifies every ticket with Day 4's function, flags the urgent ones, and prints a summary a manager reads in ten seconds. Module 1 was never fifteen topics — it was one tool, built one piece at a time.",
          nodes: [["5 questions","discovery first"],["tickets.json","6 real tickets"],["classify","Day 4's function"],["counts","by category"],["HANDLE TODAY","the urgent two"]],
          steps: [
            { n: 0, cap: "Discovery before code: five questions, answers written down — they become the spec.", metric: "ask until the real problem appears" },
            { n: 1, cap: "The CLI loads six tickets from a JSON file — including one empty ticket, the Day 14 trap.", metric: "Loaded 6 tickets" },
            { n: 2, cap: "Every ticket passes through classify_ticket — the same function from Day 4, reused untouched.", metric: "billing 2 · access 1 · general 2 · needs-info 1" },
            { n: 3, cap: "Counts by category give the manager the shape of the whole queue at a glance.", metric: "one Counter, zero manual tallying" },
            { n: 4, cap: "Urgent (priority > 8): exactly two — #1042 Acme and #1044 Initech. Monday morning, decided.", metric: "Urgent: 2" }
          ],
          code: "# ticket_analyzer.py — Day 15, FDE Course\nimport json, sys\nfrom collections import Counter\n\ndef classify_ticket(text):\n    if not text or not text.strip():\n        return \"needs-info\"\n    t = text.lower()\n    if \"refund\" in t or \"charged twice\" in t or \"billing\" in t:\n        return \"billing\"\n    if \"password\" in t or \"login\" in t:\n        return \"access\"\n    return \"general\"\n\ndef main(path):\n    tickets = json.load(open(path))\n    for t in tickets:\n        t[\"category\"] = classify_ticket(t[\"message\"])\n        t[\"urgent\"] = t[\"priority\"] > 8\n    counts = Counter(t[\"category\"] for t in tickets)\n    urgent = [t for t in tickets if t[\"urgent\"]]\n    print(f\"Loaded {len(tickets)} tickets\")\n    for cat, n in counts.items():\n        print(f\"  {cat}: {n}\")\n    print(f\"Urgent (priority > 8): {len(urgent)}\")\n    for t in urgent:\n        print(f\"  HANDLE TODAY: #{t['id']} {t['customer']} — {t['message']}\")\n\nif __name__ == \"__main__\":\n    main(sys.argv[1])",
          output: "Loaded 6 tickets\n  billing: 2\n  access: 1\n  general: 2\n  needs-info: 1\nUrgent (priority > 8): 2\n  HANDLE TODAY: #1042 Acme Support — Billing charged twice\n  HANDLE TODAY: #1044 Initech — Refund not received",
          mistake: "Building before discovering — shipping a classifier for a customer whose real problem is that nobody reads the queue at all. The tool was right; the problem was wrong. Ask the five questions first, every time. Second mistake: a CLI only you can run — if a manager can't run it from one command, it's a script, not a product.",
          fde: "This is the lesson to show people: a working tool, a Git history, tests, and a demo story — a customer, a problem, a number that changed. That's a portfolio piece, not homework.",
          assign: "Thirty minutes this time: run the CLI on the six tickets, add three of your own, run it again. Interview one real person with the five discovery questions about any messy workflow they have. Note your Module 1 win — the one concept that finally clicked."
        }
      ];

      /* ============================ DATA: ROADMAP ============================ */;

export const MODULES = [
        { name: "Module 2 — Backend Engineering", range: "DAYS 16–30", items: ["FastAPI in 15 Minutes","Routes, Requests & Responses","Pydantic — Stop Bad Data","PostgreSQL + Python","CRUD Complete","Authentication — JWT Login","Authorization & RBAC","Webhooks","Async Python","Docker — Ship It Anywhere","API Integrations","Error Handling & Logging","File Uploads & Background Tasks","PROJECT: Multi-User Support Desk API","PROJECT DEMO + Deploy It Live"] },
        { name: "Module 3 — LLM Engineering", range: "DAYS 31–45", items: ["Tokens & Context Window","Your First LLM API Call","Prompt Engineering, the FDE Way","Structured Outputs — JSON, Not Poetry","Function / Tool Calling Basics","Embeddings — Meaning as Numbers","Vector Databases in Practice","RAG — The Full Pipeline","Chunking — Why RAG Fails","Reranking & Hybrid Search","Context Management","Hallucinations — Detect & Reduce","Cost & Latency","PROJECT: RAG Chatbot","PROJECT DEMO: Like a Customer Demo"] },
        { name: "Module 4 — Agent Engineering", range: "DAYS 46–60", items: ["What Is an AI Agent? (Loop, Not Magic)","Tool Calling Deep Dive","Agent Loops & ReAct","Workflow Orchestration","MCP — One Protocol for Any Tool","Agent State & Memory","Human-in-the-Loop","Agent Evals","Guardrails","Failure Recovery","Multi-Agent Systems","Building With an Agent Framework","Observability — Trace Every Step","PROJECT: Autonomous Support Agent","PROJECT DEMO + Eval Report"] },
        { name: "Module 5 — Production & Cloud", range: "DAYS 61–75", items: ["AWS Core — EC2, S3, IAM","Deploy a FastAPI + LLM App","Docker Compose","CI/CD With GitHub Actions","IAM & Least Privilege","Secrets Management","Logging That Helps at 2 AM","Monitoring & Alerts","Load Testing","Cost Optimization","Caching & Redis","Migrations & Backups","API Security Essentials (OWASP)","PROJECT: Support Agent to Production","PROJECT: Incident Simulation"] },
        { name: "Module 6 — Enterprise & FDE Career", range: "DAYS 76–90", items: ["Requirements Engineering","Process Mapping — As-Is vs To-Be","Solution Architecture","System Design for FDE Interviews","Rapid Prototyping — Demo in 48 Hours","Enterprise Integrations — SSO, CRM","Security Reviews","Data Privacy & PII","ROI Measurement","Documentation People Actually Read","Customer Demos That Win","Objections & Scope Creep","FDE Interview Prep — Rounds Decoded","Portfolio & Resume — 90 Days Into Proof","CAPSTONE DEMO DAY"] }
      ];
