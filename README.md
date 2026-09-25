# LakshyaOS

LakshyaOS is the foundation for a modern college-festival platform. This first iteration establishes the public web shell, API foundation, and an MVP PostgreSQL schema; it intentionally does not implement authentication, payments, or registration flows.

## Architecture

```
apps/
  web/       Next.js public application
  api/       NestJS REST API and Prisma client
packages/
  shared/    cross-application TypeScript domain types
```

The web and API are independently runnable. The API owns database access; browser clients must never connect to PostgreSQL directly.

## Setup

1. Install Node.js 22+ and Docker Desktop (optional but recommended for PostgreSQL).
2. Copy `.env.example` to `.env` and `apps/api/.env.example` to `apps/api/.env`.
3. Run `npm install` from the repository root.
4. Start PostgreSQL with `docker compose up -d postgres` (or provide an equivalent `DATABASE_URL`).
5. Generate Prisma Client: `npm run db:generate`.
6. Create the initial database migration: `npm run db:migrate -- --name init`.

## Development commands

Run these in separate terminals:

```bash
npm run dev:web   # http://localhost:3000
npm run dev:api   # http://localhost:4000/api/health
```

Other useful commands: `npm run typecheck`, `npm run test`, `npm run build`, `npm run db:generate`, and `npm run db:migrate`.

## Environment variables

`DATABASE_URL` is server-only and required by Prisma. `PORT` (default `4000`) configures the API. `CORS_ORIGIN` (default `http://localhost:3000`) limits browser access to the API. `NEXT_PUBLIC_API_URL` is safe for the browser and identifies the API base URL. Do not commit real credentials.

## MVP schema

The initial schema supports departments, public events, announcements, sponsors, gallery items, and the core future registration relationship: users, registrations, payments, and attendance. Constraints prevent duplicate event registrations and duplicate attendance records. Authentication and payment-provider integration are intentionally deferred.

## Status

Phase 2 provides student JWT authentication, editable authenticated profiles, and read-only public events. Authentication uses bcrypt password hashes and a JWT signed with `JWT_SECRET`; public signup always creates a `STUDENT`. Stateless logout is client-side token disposal; token revocation is intentionally deferred.

### API endpoints

- `POST /api/auth/signup`, `POST /api/auth/login`, `POST /api/auth/logout`
- `GET /api/auth/me`, `GET/PATCH /api/profile` (Bearer JWT required)
- `GET /api/events` (optional `category`, `department`, `flagship`, `search`, `upcoming`, `page`, `limit`)
- `GET /api/events/:slug`

The next milestone should add event administration and the registration workflow with transactional capacity checks.
