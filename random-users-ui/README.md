# Random Users UI

A React + Tailwind interface that consumes the FreeAPI Random Users endpoint and displays profiles in a warm, earthy layout (no purple or blue accents).

## Live Demo

https://random-user-ui-app.vercel.app/

## Preview

- Hero header with a profile snapshot summary.
- Responsive user cards with location, age, and contact details.
- Loading and error states handled gracefully.

## API

Endpoint used in this project:

https://api.freeapi.app/api/v1/public/randomusers

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS (via @tailwindcss/vite)

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the dev server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

## Project Structure

```text
src/
  App.tsx        # Fetches API data and renders the UI
  index.css      # Tailwind setup + theme tokens
  main.tsx       # App entry point
```

## Notes

- The UI favors warm neutrals (sand, espresso, russet, coral) to avoid blue/purple.
- API responses are validated for expected array structures before rendering.
