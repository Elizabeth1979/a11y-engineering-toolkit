# Accessibility Portfolio Inventory

This file maps Elli's accessibility-related portfolio work into the A11y Engineering Toolkit.

## Core rule

If a repo, tool, workflow, or research asset is primarily about accessibility engineering, it belongs in this toolkit as one of these:

- module
- integration
- prompt or skill
- reference implementation
- training content
- research input

## Current toolkit home

- `a11y-engineering-toolkit` — umbrella repo for shared accessibility engineering modules
- Current live modules:
  - A11y Audit Panel
  - A11y UX Widget

## Portfolio items now in toolkit scope

### 1. Core engineering modules

- `a11y-expert-mcp`
  - Role: MCP module for AI assistants
  - Toolkit fit: code review, ARIA guidance, implementation patterns
  - Repo shape: stays a separate linked module repo for now
- `a11y-skills`
  - Role: reusable accessibility skills/prompts
  - Toolkit fit: designer and developer workflows
  - Repo shape: stays a separate linked shared repo for now
- `accessibility-validator`
  - Role: validation engine / rules input
  - Toolkit fit: CLI or CI audit module candidate
- `clip-to-ticket`
  - Role: issue creation pipeline
  - Toolkit fit: screenshot-to-ticket workflow module
- `sr-visualizer`
  - Role: screen reader simulation and issue explanation
  - Toolkit fit: advanced testing / education module
- `visua11y`
  - Role: browser accessibility helper
  - Toolkit fit: browser-side tooling patterns and feature source
- `a11y-first-ext`
  - Role: accessibility-first browser extension
  - Toolkit fit: extension distribution path for toolkit features
- `accessible-search`
  - Role: accessible component implementation
  - Toolkit fit: reference component or demo module
- `wcag-alt-generator`
  - Role: alt-text generation utility
  - Toolkit fit: media accessibility helper module
- `alt-generation-claude`
  - Role: AI-assisted alt generation
  - Toolkit fit: AI accessibility prompt/module candidate

### 2. Training and reference content

- `a11y-for-feds-intro`
  - Role: workshop material
  - Toolkit fit: training pack / education module
- `a11y-interactions`
  - Role: accessible interaction workshop materials
  - Toolkit fit: developer education content
- `a11y-html-aria`
  - Role: semantic HTML and ARIA workshop materials
  - Toolkit fit: developer education content
- `a11y-memory-game`
  - Role: accessible example app
  - Toolkit fit: demo/reference implementation

### 3. Adjacent but not core modules

- `e11i-garden`
  - Role: digital garden with accessibility and web engineering writing
  - Toolkit fit: documentation and public knowledge surface, not a toolkit module
- `Melio Conversational UI (MVP)`
  - Role: accessibility-oriented product application
  - Toolkit fit: downstream product use case, not a base module
- `A11y App`
  - Role: product/research stream for adaptive UI
  - Toolkit fit: future product and research input

## First architecture decision

1. Keep `a11y-expert-mcp` as its own repo and link it as a toolkit module repo
2. Keep `a11y-skills` as its own repo and link it as a shared workflow repo
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

The toolkit should become the source of truth for shared accessibility engineering assets.

That includes:

- embeddable browser tools
- MCP and AI-assistant integrations
- validation and CI workflows
- designer/developer prompt packs
- reusable accessibility docs
- demo/reference implementations

It does not mean every old repo must be physically merged right now. Some items can stay as external references first, then be extracted or rebuilt inside this repo when useful.
