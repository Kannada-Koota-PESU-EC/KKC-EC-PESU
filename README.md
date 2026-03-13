# Kannada Koota Website

Website for PES University Kannada Koota. The project highlights Kannada culture, events, team members, and community information in a modern React frontend.

## About PESU Kannada Koota

PESU Kannada Koota is a student community at PES University focused on promoting Kannada language and culture through events, outreach, and creative activities.

## Features

- Home page with hero and club overview.
- Event listing with upcoming/past grouping and galleries.
- Team page with year-wise club/domain heads.
- Blogs/media page.
- Contact information page.
- UPI donation flow components (scanner + manual fallback).

## Tech Stack

- Frontend: React + Vite + TypeScript
- UI: Tailwind CSS + shadcn/ui components
- Routing: React Router
- State/Utilities: React Query, Radix UI, Lucide icons
- Testing: Jest + Testing Library

## Project Structure

The codebase follows a feature-based structure to keep domain logic and UI close together:

```text
config/               # Tooling config files (eslint, jest, vite, tsconfig refs)
src/
	app/                 # App shell and top-level pages (router entry, not-found)
	features/            # Feature modules (home, events, team, contact, blogs, upis)
		<feature>/
			components/      # Feature-specific UI pieces
			data/            # Feature-specific static data/models
			pages/           # Feature page components
	shared/              # Reusable cross-feature modules
		components/
			layout/          # Navbar, Footer
			ui/              # shadcn/ui primitives
		hooks/             # Shared hooks
		lib/               # Shared utilities
	tests/               # Unit/integration tests
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

