# Elite Portfolio Platform

A premium personal-brand and lead-generation platform built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4.

## Current delivery

The first product slice is complete: a production-ready, responsive home experience with an accessible mobile menu, motion system, interactive hero scene, conversion paths, selected-work cards, capability modules, proof points, and an enquiry CTA.

## Run locally

1. Copy `.env.example` to `.env.local` and provide values as integrations are enabled.
2. Run `npm install`.
3. Run `npm run dev`.
4. Visit `http://localhost:3000`.

For a production check, run `npm run typecheck` and `npm run build`.

## Personalise

Before deployment, update the identity, email, navigation, sample project content, and service copy in `src/config/site.ts`. This is deliberately centralized so brand changes never require component edits.

## Architecture

```
src/
├── app/                 # App Router routes, metadata, global styles
├── components/
│   ├── home/            # Home-specific composed sections
│   ├── layout/          # Shared shell and navigation
│   └── ui/              # Reusable interaction primitives
├── config/              # Typed product and brand configuration
└── lib/                 # Framework-agnostic utilities
```

## Planned platform slices

1. Home experience — complete
2. Supabase, Prisma, database schema, typed data access, and seeded portfolio content
3. Dynamic project index and case-study routes with search, filtering, and pagination
4. Services, blog, pricing, resources, about, and contact workflows
5. Authentication, role-based admin dashboard, media management, and analytics
6. Hardening: SEO artifacts, RSS, PWA, security headers, rate limiting, monitoring, and deployment automation

Each slice is designed to retain a clean boundary so the system can scale without rewriting the foundation.
