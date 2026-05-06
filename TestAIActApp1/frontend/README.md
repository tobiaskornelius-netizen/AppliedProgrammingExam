# AI Act Compliance App — Frontend

Angular 21 frontend for the EU AI Act Compliance application.
Submitted as part of the Applied Programming exam.

## Tech stack

- Angular 21 (standalone components)
- TypeScript
- Tailwind CSS
- Vitest for unit tests

## Running locally

1. Make sure the backend is running on `localhost:5129`
2. Install dependencies: `npm install`
3. Start dev server: `ng serve`
4. Open `http://localhost:4200`

## Project structure

- `src/app/components` — 9 standalone components (admin dashboard, tool list, report, survey management, etc.)
- `src/app/services` — 7 services wrapping backend endpoints
- `src/app/config` — questionnaire configuration mapped to EU AI Act articles
- `src/app/guards` — route guard separating admin and user views

## Known limitations

- No server-side authentication — the admin/user distinction is enforced client-side only via a route guard. A production version would use JWT bearer tokens.
- Single-tenant — company id is hardcoded via a backend constant (`Constants.CurrentCompanyId`).
- Limited unit test coverage — the focus was on EU AI Act domain logic and full-stack integration.