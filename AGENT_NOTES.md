# LakshyaOS engineering notes

## Decisions

- npm workspaces keep the web app, API, and shared types in one lightweight monorepo.
- PostgreSQL and Prisma are owned by the Nest API. No database credentials are exposed to Next.js.
- UUID primary keys make future service boundaries and public registration IDs simpler.
- Registration creation must eventually run inside a database transaction that locks/checks event capacity; the unique `(userId, eventId)` constraint is a final duplicate-registration safeguard.
- Payment data stores provider references and status only. Card data must never be persisted.

## Assumptions

- Local development uses Docker PostgreSQL 16 or any compatible PostgreSQL 16+ instance.
- The root `.env` is documentation-friendly; Prisma reads `apps/api/.env` when invoked in that package.

## Unresolved / deferred

- Authentication provider and institution identity-verification requirements.
- Razorpay account/webhook setup, refund model, and payment reconciliation policy.
- Event capacity semantics for waitlists and team registrations.
- Role assignment workflow for admins and coordinators.
- JWT revocation / refresh-token policy. Current logout is stateless client token disposal.

## Conventions

- Use strict TypeScript and explicit DTO validation at API boundaries.
- Keep controllers thin; domain services own business rules.
- Add Prisma migrations rather than editing production schema manually.
- Public UI should retain LakshyaOS branding even when individual events use a themed treatment.
