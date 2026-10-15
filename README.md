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


## How to update content

All the text, dates and pictures that change from year to year live in **`src/data/`**. You do not need to touch any component code. Edit the JSON file, save, and the site updates.

Things to know before you start:

- Text that appears in both languages is written as `{ "kn": "ಕನ್ನಡ", "en": "English" }`. Always fill in both.
- Dates are written as `"YYYY-MM-DD"`, for example `"2026-11-01"`.
- Images and videos go in the **`public/`** folder. In the JSON you write the path starting with `/`, without `public`. A file saved as `public/Events/rajyotsava.jpg` is written as `"/Events/rajyotsava.jpg"`.
- Use simple file names: lowercase, no spaces (`rajyotsava-2026.jpg`, not `Rajyotsava 2026.JPG`).
- Convert photos to WebP before using them, so pages stay fast: `python scripts/optimize-images.py public/Events/poster.jpg 1200` makes `public/Events/poster.webp`. Suggested widths: posters 1200, gallery 1600, team and respected photos 600, homepage photos 1920.
- Optional small copies make phones load faster: `"posterSmall"` (about 600px wide) for events, and `"imageSmall"` (about 960px wide) for homepage photos in `site.json`.
- After editing, run `npm test`. A check (`src/tests/ContentData.test.ts`) tells you if a date is wrong, a Kannada or English text is missing, or an image path doesn't exist.

| File | What it controls |
|---|---|
| `events.json` | Events page (upcoming and past) |
| `team.json` | Year-wise team on the Team page |
| `respected.json` | "Our Respected Members" at the top of the Team page |
| `blogs.json` | Videos on the Blogs page |
| `site.json` | Homepage photos and stats, contact email, Instagram, address, logos |

### Add a new event

1. Put the poster (and any gallery photos) in `public/Events/`.
2. Open `src/data/events.json` and add a new entry inside the `[ ... ]` list (copy an existing one and change it):

```json
{
  "id": "rajyotsava-2026",
  "date": "2026-11-01",
  "title": { "kn": "ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ 2026", "en": "Kannada Rajyotsava 2026" },
  "venue": { "kn": "ಎಂ.ಆರ್.ಡಿ. ಸಭಾಂಗಣ", "en": "MRD Auditorium" },
  "time": { "kn": "ಬೆಳಿಗ್ಗೆ 10:00", "en": "10:00 AM" },
  "description": { "kn": "…", "en": "…" },
  "poster": "/Events/rajyotsava-2026.webp",
  "posterSmall": "/Events/rajyotsava-2026-600.webp",
  "gallery": ["/Events/rajyotsava-2026-1.webp", "/Events/rajyotsava-2026-2.webp"],
  "registerLink": "https://forms.gle/..."
}
```

- `id` must be unique: lowercase words joined with `-`. It is also used in share links (`/events#rajyotsava-2026`).
- `venue`, `time`, `posterSmall`, `gallery` and `registerLink` are optional. Leave out any you don't have.
- You don't mark events as upcoming or past. That's worked out from the date. The year filter and the "X events" count also update automatically.

### Add a new year's team

1. Put the photos in `public/DomainHeads-<year>/` (for example `public/DomainHeads-2027/`), one file per person.
2. Open `src/data/team.json` and add a new year at the **top** of the list:

```json
{
  "year": 2027,
  "groups": [
    {
      "id": "club-heads",
      "title": { "kn": "ಕೂಟದ ಮುಖ್ಯಸ್ಥರು", "en": "Club Heads" },
      "large": true,
      "members": [
        {
          "id": "ch-2027-1",
          "name": { "kn": "ಹೆಸರು", "en": "Name" },
          "role": { "kn": "ಕೂಟದ ಮುಖ್ಯಸ್ಥರು", "en": "Club Head" },
          "photo": "/DomainHeads-2027/name.jpg",
          "linkedin": "https://www.linkedin.com/in/...",
          "instagram": "https://www.instagram.com/..."
        }
      ]
    },
    {
      "id": "domain-heads",
      "title": { "kn": "ವಿಭಾಗಗಳ ಮುಖ್ಯಸ್ಥರು", "en": "Domain Heads" },
      "members": [ ... ]
    }
  ]
}
```

- The year buttons on the Team page are made from this list. The newest year shows first and is selected by default.
- For domain heads, put their domain in `role` (for example `{ "kn": "ಐಟಿ", "en": "IT" }`).
- `linkedin` and `instagram` are optional. Until a real photo is ready, use `"/DomainHeads-2025-26/photo.webp"` (a placeholder icon).
- You can add more groups (for example "Members") the same way. `"large": true` makes that group's cards bigger.

### Add a blog video

1. Put the video in `public/` (for example `public/blogs/utsava-2026.mp4`). Keep videos short, and at 1080p rather than 4K, so they load fast.
2. Add an entry to `src/data/blogs.json`:

```json
{
  "id": "utsava-2026",
  "video": "/blogs/utsava-2026.mp4",
  "title": { "kn": "ಉತ್ಸವ 2026", "en": "Utsava 2026" },
  "event": { "kn": "ಉತ್ಸವ", "en": "Utsava" },
  "date": "2026-11-07",
  "orientation": "landscape"
}
```

- `orientation` is `"landscape"` for wide videos and `"portrait"` for phone-style reels.
- `event`, `date`, `description` and `poster` (a thumbnail image) are optional.

### Other content

- **`respected.json`**: the respected members, shown in the order listed. Each one has a `title` in both languages. `"inMemory": true` gives the gold memorial style. Photos go in `public/Respectives/`.
- **`site.json`**:
  - the homepage stats (`stats`)
  - the homepage background photos and captions (`heroSlides`; compressed images go in `public/Hero/slides/`)
  - email, Instagram handle and address (`contact`)
  - logos and the About photo (`images`)
- Button labels, headings and other interface wording are in `src/shared/i18n/translations.ts`.
