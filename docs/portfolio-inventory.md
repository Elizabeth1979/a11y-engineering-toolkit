# Accessibility Portfolio Inventory

This file maps the accessibility engineering portfolio into the A11y Engineering Toolkit. Each entry lists the repo's role, its fit inside the toolkit, and its current maturity.

## Core rule

If a repo, tool, workflow, or research asset is primarily about accessibility engineering, it belongs in this toolkit as one of these:

- module
- integration
- prompt or skill
- reference implementation
- training content
- research input

## Maturity legend

- **Production** — in active use, stable API, published or deployed
- **Active** — maintained and iterating, may not yet be 1.0
- **WIP** — in-progress, not yet recommended for external use
- **Educational** — workshop or reference content, not a shipped tool
- **Historical** — earlier exploration, preserved as reference; not actively maintained

## Current toolkit home

- `a11y-engineering-toolkit` — umbrella repo for shared accessibility engineering modules
- Current live modules:
  - A11y Audit Panel
  - A11y UX Widget

## Core portfolio

These eight repos are the active public-facing body of work.

### 1. Core engineering modules

- `a11y-engineering-toolkit` — **Production**
  - Role: umbrella repo — audit panel, UX widget, docs site
  - Toolkit fit: this repo
- `a11y-expert-mcp` — **v0.1.0 · Active**
  - Role: MCP server giving AI assistants accessibility expertise (4 tools, 33 ARIA patterns)
  - Toolkit fit: code review, ARIA guidance, implementation patterns
  - Repo shape: stays a separate linked module repo for now
  - Source of ARIA patterns: [`a11y-skills`](https://github.com/Elizabeth1979/a11y-skills) (see note below)
- `a11y-skills` — **Active (canonical source)**
  - Role: reusable accessibility instruction files (skills / prompts) — 33 ARIA patterns
  - Toolkit fit: canonical source for `a11y-expert-mcp` and other AI integrations
  - Repo shape: stays a separate linked shared repo
- `screen-reader-cli` — **Production**
  - Role: CLI for screen-reader-driven testing — scan, live SR, audit, test generation (Virtual Screen Reader + Playwright)
  - Toolkit fit: complementary to `a11y-expert-mcp` (runtime testing vs. static guidance)
- `clip-to-ticket` — **v1.5.0 · Production**
  - Role: screenshot/recording → WCAG-compliant ticket pipeline
  - Toolkit fit: issue creation workflow module
- `sr-visualizer` — **WIP**
  - Role: screen reader simulation in the browser with AI fix suggestions
  - Toolkit fit: advanced testing / education module
- `visua11y` — **WIP**
  - Role: browser extension — AI-assisted accessibility helper
  - Toolkit fit: browser-side tooling and feature source

### 2. Training and reference content

- `a11y-for-feds-intro` — **Educational**
  - Role: developer workshop with visual simulations (165 slides)
  - Toolkit fit: training pack / education module

## a11y-skills as canonical source

`a11y-skills` is the community-maintained source of truth for the ARIA pattern instruction files. `a11y-expert-mcp` consumes from it — the `.instructions.md` files are identical in both repos today. A future GitHub Action will auto-sync on release.

## Historical / earlier work

Preserved as reference or reference implementations. Not actively maintained; not part of the current portfolio surface.

- `accessibility-validator` — WCAG 2.1 AA validation engine exploration
- `a11y-first-ext` — early accessibility-first browser extension
- `accessible-search` — accessible component implementation / demo
- `wcag-alt-generator` — alt-text generation utility
- `alt-generation-claude` — AI-assisted alt generation prototype
- `a11y-interactions` — Coding Accessible Interactions workshop materials
- `a11y-html-aria` — Semantic HTML + ARIA workshop materials
- `a11y-memory-game` — accessible example app

## Adjacent

- `e11i-garden` — digital garden with accessibility and web engineering writing. Public knowledge surface, not a toolkit module.

## First architecture decision

1. Keep `a11y-expert-mcp` as its own repo and link it as a toolkit module repo
2. Keep `a11y-skills` as its own repo and link it as the canonical skills source
3. Move nothing until there is a concrete benefit like shared release flow, shared tests, or reduced duplication

Reason: separate working repos are cheaper to maintain than forced consolidation.

## Standard mapping model

Each imported portfolio item should be classified as one primary type:

- `module` — code shipped from this repo
- `reference` — code kept as an example to learn from
- `workflow` — prompt, skill, CLI flow, CI flow
- `docs` — educational or implementation guidance
- `research` — input for future modules

## What this means operationally

The toolkit should become the source of truth for shared accessibility engineering assets. That includes:

- embeddable browser tools
- MCP and AI-assistant integrations
- validation and CI workflows
- designer/developer prompt packs
- reusable accessibility docs
- demo/reference implementations

It does not mean every old repo must be physically merged right now. Some items can stay as external references first, then be extracted or rebuilt inside this repo when useful.
