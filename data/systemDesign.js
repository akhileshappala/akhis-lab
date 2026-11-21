// System design: the 27 concepts in five groups + the request-flow player.
// Source: System-Design-Concepts-Reference.md (Prateek Singhal reel checklist, 2026-10-15).
export const SD_GROUPS = [
        { name: "Foundations", items: [
          ["DNS", "Turns names into IP addresses", "Your request can't start until a name resolves. Trade-off: caching DNS answers is fast but stale records linger — TTL is the dial."],
          ["Networking", "How machines actually talk: TCP, HTTP, sockets", "Reliability vs speed lives here — TCP guarantees delivery, UDP trades guarantees for raw speed."],
          ["APIs", "The contract between systems", "A clean contract (nouns, methods, honest status codes — Day 12) lets strangers build on you; a sloppy one rots integrations."],
          ["Latency", "Time for one round trip", "Physics sets the floor: distance = delay. You fight latency with placement (CDN, regions), not hope."],
          ["Scalability", "Handling growth without a rewrite", "Design so load can grow 10× by adding capacity, not by redesigning. The question is always: what breaks first?"],
          ["Scaling", "Vertical (bigger machine) vs horizontal (more machines)", "Vertical is simple but has a ceiling; horizontal scales far but demands statelessness and coordination."],
          ["Availability", "The system is up when users need it", "99.9% still allows 8h 46m down a year. Every extra nine costs exponentially more — it's a business decision."]
        ]},
        { name: "Data", items: [
          ["Databases", "Where truth lives — SQL vs NoSQL", "SQL gives structure and joins; NoSQL gives flexible scale. Pick by access pattern, not fashion."],
          ["Indexing", "A shortcut map into your data", "Indexes make reads fast (Day 7's dict, at database scale) but slow writes and cost storage. Index what you query."],
          ["Replication", "Copies of data on multiple machines", "Survives failures and spreads reads — but copies can disagree, so you choose how fresh a read must be."],
          ["Sharding", "Splitting one dataset across machines by a key", "Each shard stays small and fast; cross-shard queries and rebalancing become your new problems."],
          ["Partitioning", "Dividing data into pieces (by range, hash, list)", "The parent idea of sharding — the partition key decides your hotspots, so choose it from real access patterns."],
          ["Consistency", "Do all readers see the same truth?", "Strong consistency is simple to reason about and slower; eventual consistency is fast and demands careful design."],
          ["CAP theorem", "During a network partition: consistency or availability — pick one", "Partitions will happen. CAP forces the honest conversation about which failure your users can tolerate."],
          ["Federation", "Splitting databases by function", "Users DB, products DB, orders DB — each scales independently, but joins across them become application work."]
        ]},
        { name: "Performance", items: [
          ["Caching", "Keep hot answers close and reuse them", "The single biggest speed lever — and stale data is the price. Cache what's read-heavy and slow-changing."],
          ["Cache invalidation", "Knowing when a cached answer is lying", "Famously one of the hard problems: TTLs are simple but approximate; event-based invalidation is exact but complex."],
          ["CDN", "Copies of content at the edge, near users", "Static media served from 30ms away instead of 300ms. Useless for personalised data — perfect for everything else."],
          ["Load balancing", "Spread requests across many servers", "Round-robin is simple; least-connections is smarter. The balancer itself must never be the single point of failure."],
          ["Proxy", "A middleman that forwards requests", "Forward proxies protect clients; reverse proxies protect and optimise servers — TLS, caching, routing in one place."]
        ]},
        { name: "Async & Architecture", items: [
          ["Queues", "Work waits in line instead of blocking", "Decouple producers from consumers (Day 8's FIFO at system scale) — spikes get absorbed, work gets done in order."],
          ["Backpressure", "Pushing back when a system is full", "Without it, overload cascades into total failure. Shedding or slowing load early beats crashing late."],
          ["Microservices", "Many small services instead of one monolith", "Independent deploys and scaling — paid for with network complexity, distributed debugging, and data consistency work."],
          ["Serialization", "Turning objects into bytes (JSON, Protobuf)", "JSON is human-readable and bulky; binary formats are compact and fast but opaque. The wire format is a contract."]
        ]},
        { name: "Trust & Operations", items: [
          ["Security", "Auth, authz, and defence in depth", "Day 21–22 at system scale: verify identity, grant least privilege, and assume any single layer can fail."],
          ["Encryption", "Data unreadable without the key — in transit and at rest", "TLS everywhere is table stakes; the real design work is key management and knowing what must never be logged."],
          ["Monitoring", "Metrics, logs and alerts that tell you before customers do", "Day 68's rule: if the customer reports it first, your monitoring failed. Alert on symptoms, not noise."]
        ]}
      ];

export const SD_PLAYER = {
        nodes: [["You","tap / click"],["DNS","name → address"],["CDN","edge copy?"],["Load balancer","pick a server"],["App server","your code"],["Cache","hot answer?"],["Database","the truth"]],
        steps: [
          { n: 0, cap: "A tap becomes a request. Everything after this is the system earning its keep in milliseconds.", metric: "t = 0ms" },
          { n: 1, cap: "DNS resolves the name to an address — cached answers make this nearly free.", metric: "~10–30ms" },
          { n: 2, cap: "Static content (images, video, JS) is served from a CDN edge near the user and never travels further.", metric: "edge hit: ~30ms" },
          { n: 3, cap: "Dynamic requests reach a load balancer, which picks a healthy app server — no single machine takes the whole crowd.", metric: "spread across N servers" },
          { n: 4, cap: "The app server runs your logic — auth, rules, the response shape (Days 11–12, at scale).", metric: "your code runs here" },
          { n: 5, cap: "Before touching the database, check the cache: a hit answers in ~40ms instead of ~4s.", metric: "cache hit ≈ 100× faster" },
          { n: 6, cap: "Cache miss? The database answers from indexed, replicated storage — then the result is cached for the next user.", metric: "the expensive path, taken rarely" }
        ]
      };
