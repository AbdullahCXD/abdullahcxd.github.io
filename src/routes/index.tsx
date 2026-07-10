import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [{ property: "og:url", content: "/" }],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const projects = [
  {
    id: "001",
    name: "RefineryCore",
    note: "Unified plugin framework — commands, storage, packet utils.",
    stack: "Java / Paper API",
  },
  {
    id: "002",
    name: "Discord_Bridge_Bot",
    note: "Two-way chat + moderation link between Discord and Minecraft.",
    stack: "TypeScript / discord.js",
  },
  {
    id: "003",
    name: "Async_Command_Manager",
    note: "Non-blocking command dispatcher with cooldowns & permissions.",
    stack: "Kotlin / Coroutines",
  },
  {
    id: "004",
    name: "Server_Config_Presets",
    note: "Battle-tested configs for competitive SMP & minigame servers.",
    stack: "YAML / Bash",
  },
];

const services = [
  {
    n: "01",
    title: "Minecraft Plugin Development",
    body: "Custom Paper/Spigot/Velocity plugins tuned for high tick budgets and 500+ concurrent players.",
  },
  {
    n: "02",
    title: "Bot & Automation Configuration",
    body: "Discord and game-server bots — moderation, verification, economy, and admin tooling.",
  },
  {
    n: "03",
    title: "Server Ops & Config",
    body: "Proxy setup, permission trees, database wiring, and performance triage for growing communities.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body selection:bg-foreground selection:text-background">
      {/* Hero */}
      <header className="border-b border-foreground/10 px-6 py-12 lg:px-12 lg:py-20 animate-entry">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <h1 className="font-display text-7xl lg:text-[12rem] leading-[0.8] tracking-tighter font-bold">
            ABDULLAH
            <span className="inline-block w-[0.55em] h-[0.85em] align-baseline translate-y-[0.05em] bg-foreground ml-2 cursor-blink" />
          </h1>
          <div className="max-w-xs space-y-4">
            <p className="font-display text-xs uppercase tracking-widest text-ink-muted/60">
              [ IDENTITY — 00 ]
            </p>
            <p className="text-xl leading-snug text-pretty">
              IT student & developer building high-performance systems for{" "}
              <span className="underline decoration-1 underline-offset-4">
                RefineryTeam
              </span>
              .
            </p>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12">
        {/* Sidebar */}
        <aside className="lg:col-span-3 lg:border-r border-foreground/10 p-6 lg:p-12 space-y-12 animate-entry">
          <section className="space-y-3">
            <h3 className="font-display text-[10px] uppercase tracking-[0.2em] text-ink-muted/60">
              Availability
            </h3>
            <div className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-foreground/40 animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-foreground" />
              </span>
              <p className="text-sm font-medium">Open for configuration work</p>
            </div>
            <p className="text-sm text-ink-muted/80 leading-relaxed">
              Accepting Minecraft server development and Discord / game-server
              bot configuration commissions.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-display text-[10px] uppercase tracking-[0.2em] text-ink-muted/60">
              System Status
            </h3>
            <dl className="font-display text-[10px] space-y-1">
              {[
                ["UPTIME", "99.9%"],
                ["LOCATION", "Remote / EU"],
                ["ROLE", "Dev @ RefineryTeam"],
                ["STUDY", "B.Sc. IT — Y2"],
                ["VERSION", "2026.07"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-foreground/5 py-1">
                  <dt className="text-ink-muted/60">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <nav className="space-y-2 font-display text-[10px] uppercase tracking-[0.2em]">
            <h3 className="text-ink-muted/60">Index</h3>
            {[
              ["#featured", "→ Featured"],
              ["#services", "→ What I do"],
              ["#work", "→ Work registry"],
              ["#contact", "→ Contact"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="block hover:translate-x-1 transition-transform"
              >
                {label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <div className="lg:col-span-9 p-6 lg:p-12 space-y-24 animate-entry">
          {/* Featured */}
          <section id="featured" className="space-y-10 scroll-mt-8">
            <div className="space-y-6">
              <span className="font-display text-xs px-2 py-1 bg-foreground text-background inline-block tracking-widest">
                FEATURED — 01
              </span>
              <h2 className="font-display text-4xl lg:text-6xl tracking-tight leading-[0.95] text-balance">
                Abdullah —<br />a developer wired for systems that hold up.
              </h2>
            </div>

            <BlueprintDiagram />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <p className="text-lg leading-relaxed text-pretty">
                IT student by day, plugin author and server tinkerer the rest
                of the time. I write Java, Kotlin and TypeScript for
                Minecraft networks and Discord bots — quiet, well-behaved
                code that survives a full house on a Friday night. I ship
                with RefineryTeam and take on solo commissions on the side.
              </p>
              <ul className="font-display text-xs space-y-3 pt-2">
                {[
                  ["STACK", "Java · Kotlin · TS · SQL"],
                  ["FOCUS", "Plugins · Bots · Server ops"],
                  ["ROLE", "Dev @ RefineryTeam"],
                  ["STUDY", "B.Sc. IT — year 2"],
                  ["STATUS", "Open for commissions"],
                ].map(([k, v]) => (
                  <li
                    key={k}
                    className="flex items-center gap-4 text-ink-muted/60 border-b border-foreground/5 pb-2"
                  >
                    <span className="w-16">{k}</span>
                    <span className="text-foreground">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Services */}
          <section id="services" className="pt-12 border-t border-foreground/10 space-y-8 scroll-mt-8">
            <h3 className="font-display text-[10px] uppercase tracking-[0.2em] text-ink-muted/60">
              What I do
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
              {services.map((s) => (
                <article key={s.n} className="space-y-3 border-t border-foreground pt-4">
                  <p className="font-display text-xs text-ink-muted/60">{s.n}</p>
                  <h4 className="font-display text-lg leading-tight">{s.title}</h4>
                  <p className="text-sm text-ink-muted/80 leading-relaxed">{s.body}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Work registry */}
          <section id="work" className="pt-12 border-t border-foreground/10 scroll-mt-8">
            <h3 className="font-display text-[10px] uppercase tracking-[0.2em] text-ink-muted/60 mb-6">
              Work registry
            </h3>
            <ul>
              {projects.map((p) => (
                <li key={p.id}>
                  <a
                    href="#contact"
                    className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-6 py-5 border-b border-foreground/10 hover:bg-paper-alt px-2 -mx-2 transition-colors"
                  >
                    <span className="font-display text-xs text-ink-muted/50 tabular-nums">
                      {p.id}
                    </span>
                    <div className="min-w-0">
                      <div className="font-display text-lg leading-tight">{p.name}</div>
                      <div className="text-sm text-ink-muted/70">{p.note}</div>
                    </div>
                    <span className="font-display text-[10px] uppercase tracking-widest text-ink-muted/50 group-hover:text-foreground transition-colors whitespace-nowrap">
                      {p.stack} <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Availability callout */}
          <section
            id="hire"
            className="border border-foreground p-6 lg:p-10 flex flex-col lg:flex-row gap-8 lg:items-end justify-between"
          >
            <div className="max-w-xl space-y-4">
              <p className="font-display text-[10px] uppercase tracking-[0.2em] text-ink-muted/60">
                Notice — 2026
              </p>
              <h3 className="font-display text-2xl lg:text-3xl leading-tight text-balance">
                Currently taking on Minecraft server dev and bot configuration
                gigs — solo or alongside your team.
              </h3>
            </div>
            <a
              href="mailto:contact@abdullahcxd.is-a.dev"
              className="font-display text-sm uppercase tracking-widest bg-foreground text-background px-5 py-3 hover:bg-ink-muted transition-colors whitespace-nowrap"
            >
              Start a brief →
            </a>
          </section>
        </div>
      </main>

      {/* Colophon */}
      <footer
        id="contact"
        className="border-t border-foreground bg-foreground text-background p-6 lg:p-12 scroll-mt-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <div className="space-y-8">
            <h2 className="font-display text-3xl tracking-tighter">
              CONTACT — INITIATE
            </h2>
            <div className="space-y-2">
              <a
                href="mailto:contact@abdullahcxd.is-a.dev"
                className="block font-display text-xl lg:text-3xl hover:underline underline-offset-8 transition-all break-all"
              >
                contact@abdullahcxd.is-a.dev
              </a>
              <a
                href="https://abdullahcxd.is-a.dev"
                className="block font-display text-lg opacity-60 hover:opacity-100 transition-opacity"
              >
                abdullahcxd.is-a.dev
              </a>
            </div>
          </div>
          <div className="lg:text-right space-y-4">
            <p className="font-display text-[10px] uppercase tracking-[0.3em] opacity-40">
              Colophon / MMXXVI
            </p>
            <p className="text-xs max-w-xs lg:ml-auto leading-relaxed opacity-60">
              Set in JetBrains Mono and Work Sans. Built for the persistence of
              code and the clarity of paper. Handwritten, then hand-typed.
            </p>
            <p className="font-display text-[10px] uppercase tracking-[0.3em] opacity-40">
              © Abdullah · RefineryTeam
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/**
 * Hand-drafted blueprint of the RefineryCore system.
 * Uses SVG so we get precise typographic placement, dashed hand-drawn
 * connectors, coordinate ticks, and margin annotations — a real engineering
 * sketch rather than an ASCII box.
 */
function BlueprintDiagram() {
  return (
    <figure className="relative w-full bg-paper-alt border border-foreground/15">
      {/* corner ticks */}
      <span className="absolute top-0 left-0 w-3 h-px bg-foreground" />
      <span className="absolute top-0 left-0 w-px h-3 bg-foreground" />
      <span className="absolute top-0 right-0 w-3 h-px bg-foreground" />
      <span className="absolute top-0 right-0 w-px h-3 bg-foreground" />
      <span className="absolute bottom-0 left-0 w-3 h-px bg-foreground" />
      <span className="absolute bottom-0 left-0 w-px h-3 bg-foreground" />
      <span className="absolute bottom-0 right-0 w-3 h-px bg-foreground" />
      <span className="absolute bottom-0 right-0 w-px h-3 bg-foreground" />

      {/* title strip */}
      <div className="flex items-center justify-between border-b border-foreground/20 px-4 py-2 font-display text-[10px] uppercase tracking-[0.2em] text-ink-muted">
        <span>fig. 01 — abdullah · operating map</span>
        <span className="hidden sm:inline">scale 1 : 1 · rev. 07</span>
        <span>drawn by A.</span>
      </div>

      <svg
        viewBox="0 0 800 460"
        role="img"
        aria-label="Operating map of Abdullah: inputs from university, RefineryTeam, and client briefs flow into a central node, which fans out into plugins, bots, and shipped servers."
        className="block w-full h-auto text-foreground"
      >
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeOpacity="0.06" strokeWidth="0.5" />
          </pattern>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
          </marker>
        </defs>

        {/* subtle grid */}
        <rect width="800" height="460" fill="url(#grid)" />

        {/* margin ruler ticks along the top */}
        <g stroke="currentColor" strokeOpacity="0.35">
          {Array.from({ length: 17 }).map((_, i) => (
            <line key={i} x1={40 + i * 45} y1={0} x2={40 + i * 45} y2={i % 4 === 0 ? 10 : 5} strokeWidth={0.7} />
          ))}
        </g>
        <g fontFamily="var(--font-display)" fontSize="8" fill="currentColor" fillOpacity="0.35">
          {[0, 4, 8, 12, 16].map((i) => (
            <text key={i} x={40 + i * 45} y={22} textAnchor="middle">{i.toString().padStart(2, "0")}</text>
          ))}
        </g>

        {/* left column: inputs */}
        <g fontFamily="var(--font-display)" fontSize="11" fill="currentColor">
          {[
            { y: 90, label: "university", note: "01 · IT · year 2" },
            { y: 190, label: "refineryteam", note: "02 · daily driver" },
            { y: 290, label: "client briefs", note: "03 · commissions" },
          ].map((n) => (
            <g key={n.label}>
              <rect x={60} y={n.y - 20} width={150} height={40} fill="none" stroke="currentColor" />
              <text x={70} y={n.y - 4} letterSpacing="1">{n.label.toUpperCase()}</text>
              <text x={70} y={n.y + 12} fontSize="9" fillOpacity="0.55">{n.note}</text>
            </g>
          ))}
        </g>

        {/* center: refinery core */}
        <g>
          <rect x={340} y={170} width={140} height={100} fill="var(--foreground)" />
          <text x={410} y={210} textAnchor="middle" fill="var(--background)" fontFamily="var(--font-display)" fontSize="13" letterSpacing="1.5">ABDULLAH</text>
          <text x={410} y={228} textAnchor="middle" fill="var(--background)" fontFamily="var(--font-display)" fontSize="13" letterSpacing="1.5">/DEV</text>
          <text x={410} y={252} textAnchor="middle" fill="var(--background)" fontFamily="var(--font-display)" fontSize="9" fillOpacity="0.55" letterSpacing="1.5">student · builder</text>
          {/* diagonal hatch cue */}
          <line x1={340} y1={170} x2={480} y2={170 - 6} stroke="currentColor" strokeWidth="0.5" />
          <line x1={340} y1={270} x2={480} y2={270 + 6} stroke="currentColor" strokeWidth="0.5" />
        </g>

        {/* right column: outputs */}
        <g fontFamily="var(--font-display)" fontSize="11" fill="currentColor">
          {[
            { y: 90, label: "plugins", note: "α · jvm" },
            { y: 190, label: "bots", note: "β · discord + game" },
            { y: 290, label: "live servers", note: "γ · players on", filled: true },
          ].map((n) => (
            <g key={n.label}>
              {n.filled ? (
                <rect x={590} y={n.y - 20} width={150} height={40} fill="currentColor" fillOpacity="0.08" stroke="currentColor" />
              ) : (
                <rect x={590} y={n.y - 20} width={150} height={40} fill="none" stroke="currentColor" />
              )}
              <text x={600} y={n.y - 4} letterSpacing="1">{n.label.toUpperCase()}</text>
              <text x={600} y={n.y + 12} fontSize="9" fillOpacity="0.55">{n.note}</text>
            </g>
          ))}
        </g>

        {/* connectors in (dashed = async, solid = sync) */}
        <g stroke="currentColor" fill="none" markerEnd="url(#arrow)">
          <path d="M 210 90 C 280 90, 300 180, 340 200" strokeWidth="1" />
          <path d="M 210 190 L 340 220" strokeWidth="1" strokeDasharray="4 3" />
          <path d="M 210 290 C 280 290, 300 250, 340 240" strokeWidth="1" strokeDasharray="4 3" />
        </g>

        {/* connectors out */}
        <g stroke="currentColor" fill="none" markerEnd="url(#arrow)">
          <path d="M 480 200 C 540 200, 540 110, 590 100" strokeWidth="1" />
          <path d="M 480 220 L 590 210" strokeWidth="1.4" />
          <path d="M 480 240 C 540 240, 540 290, 590 300" strokeWidth="1" strokeDasharray="4 3" />
        </g>

        {/* margin annotations */}
        <g fontFamily="var(--font-display)" fontSize="9" fill="currentColor" fillOpacity="0.55">
          <line x1={410} y1={280} x2={410} y2={370} stroke="currentColor" strokeOpacity="0.35" />
          <text x={415} y={340} letterSpacing="0.5">↑ ships weekly</text>
          <line x1={210} y1={140} x2={270} y2={140} stroke="currentColor" strokeOpacity="0.35" strokeDasharray="2 2" />
          <text x={215} y={135} letterSpacing="0.5">— async —</text>

          {/* handwritten-ish note */}
          <text x={540} y={410} fontStyle="italic" fillOpacity="0.7" fontFamily="var(--font-body)" fontSize="11">
            "build small. keep it running."
          </text>
          <path d="M 540 415 L 730 415" stroke="currentColor" strokeOpacity="0.4" strokeWidth="0.5" />
        </g>

        {/* legend */}
        <g fontFamily="var(--font-display)" fontSize="9" fill="currentColor" fillOpacity="0.6">
          <text x={60} y={410} letterSpacing="1">LEGEND</text>
          <line x1={60} y1={425} x2={100} y2={425} stroke="currentColor" />
          <text x={108} y={428}>sync</text>
          <line x1={150} y1={425} x2={190} y2={425} stroke="currentColor" strokeDasharray="4 3" />
          <text x={198} y={428}>async</text>
          <rect x={250} y={419} width={12} height={12} fill="currentColor" />
          <text x={268} y={428}>core</text>
        </g>
      </svg>
    </figure>
  );
}
