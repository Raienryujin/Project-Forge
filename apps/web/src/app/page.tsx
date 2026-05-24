// ============================================================================
// Project Forge — Golden Path Landing Page
// ============================================================================

export const metadata = {
  title: "Project Forge | Enterprise Monorepo Template",
  description:
    "Project Forge is a production-grade monorepo launchpad for full-stack projects built on ASP.NET Core 8 and Next.js.",
};

// ── Sub-components ─────────────────────────────────────────────────────────

function StatusBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
      {label}
    </span>
  );
}

type StackCardProps = {
  icon: string;
  title: string;
  description: string;
  path: string;
};

function StackCard({ icon, title, description, path }: StackCardProps) {
  return (
    <div className="group relative flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10">
      {/* Subtle gradient hover glow */}
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-violet-500/5 to-transparent" />

      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>
      <p className="text-sm leading-relaxed text-zinc-400">{description}</p>
      <code className="mt-auto rounded-md bg-black/40 px-2.5 py-1 font-mono text-xs text-zinc-500">
        {path}
      </code>
    </div>
  );
}

type PipelineBadgeProps = {
  job: string;
  trigger: string;
  color: string;
};

function PipelineBadge({ job, trigger, color }: PipelineBadgeProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 px-4 py-3">
      <span className={`font-mono text-xs font-medium ${color}`}>{job}</span>
      <span className="text-xs text-zinc-500">{trigger}</span>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function Home() {
  const stack: StackCardProps[] = [
    {
      icon: "⚙️",
      title: "ASP.NET Core 8 Minimal API",
      description:
        "High-throughput backend with stripped console loggers, Kestrel connection tuning, CORS, and a /health probe.",
      path: "apps/api/",
    },
    {
      icon: "⚛️",
      title: "Next.js 14 — App Router",
      description:
        "TypeScript, Tailwind CSS, ESLint, and src/ directory layout. Server components by default.",
      path: "apps/web/",
    },
    {
      icon: "📦",
      title: "Shared Packages",
      description:
        "Co-located UI library, shared TypeScript types, and unified ESLint/Prettier configs.",
      path: "packages/",
    },
    {
      icon: "🔄",
      title: "Path-Filtered CI",
      description:
        "GitHub Actions builds only what changed. Separate build-api and build-web jobs with a ci-gate aggregator.",
      path: ".github/workflows/ci.yml",
    },
  ];

  const pipeline: PipelineBadgeProps[] = [
    { job: "build-api", trigger: "apps/api/**", color: "text-violet-400" },
    { job: "build-web", trigger: "apps/web/**", color: "text-sky-400" },
    { job: "ci-gate",   trigger: "always()",    color: "text-emerald-400" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      {/* ── Background grid ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Radial glow ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative mx-auto max-w-4xl px-6 py-24 sm:py-32">

        {/* Hero */}
        <section className="mb-20 flex flex-col items-center text-center">
          <StatusBadge label="Monorepo Activated" />

          <h1 className="mt-8 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Project{" "}
            <span className="bg-gradient-to-r from-violet-400 to-sky-400 bg-clip-text text-transparent">
              Forge
            </span>
          </h1>

          <p className="mt-4 text-base font-mono font-medium tracking-widest text-zinc-500 uppercase">
            Enterprise Monorepo Template
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400">
            A production-grade Golden Path for atomic full-stack commits.
            Ship a cross-cutting feature — API, UI, and shared types — in a
            single PR, a single review, a single merge.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {[".NET 8", "Next.js 14", "TypeScript", "Tailwind CSS", "GitHub Actions"].map(
              (tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-zinc-300"
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </section>

        {/* Stack cards */}
        <section className="mb-20" aria-labelledby="stack-heading">
          <h2
            id="stack-heading"
            className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-500"
          >
            Stack Overview
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {stack.map((card) => (
              <StackCard key={card.path} {...card} />
            ))}
          </div>
        </section>

        {/* CI Pipeline */}
        <section className="mb-20" aria-labelledby="ci-heading">
          <h2
            id="ci-heading"
            className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-500"
          >
            CI Pipeline
          </h2>
          <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-4">
            {pipeline.map((p) => (
              <PipelineBadge key={p.job} {...p} />
            ))}
          </div>
        </section>

        {/* Quick-start */}
        <section aria-labelledby="quickstart-heading">
          <h2
            id="quickstart-heading"
            className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-500"
          >
            Quick Start
          </h2>
          <div className="overflow-hidden rounded-xl border border-white/10 bg-black/60">
            {/* Fake terminal chrome */}
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <span className="h-3 w-3 rounded-full bg-green-500/70" />
              <span className="ml-3 font-mono text-xs text-zinc-500">bash</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed text-zinc-300">
              <code>{`# Clone your new project from this template
gh repo create my-app --template <your-username>/ProjectForge --private --clone

# Start the API
cd apps/api && dotnet run

# Start the frontend (new terminal)
cd apps/web && npm run dev`}</code>
            </pre>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 border-t border-white/10 pt-8 text-center">
          <p className="text-xs text-zinc-600">
            Project Forge — Enterprise Monorepo Template &mdash; MIT License
          </p>
        </footer>
      </div>
    </main>
  );
}
