# Random Cat Viewer

A React + TypeScript app that fetches a random cat from a public API and displays the image alongside breed details.

## Live Demo

https://cat-info-ui.vercel.app/

## Features

- Fetches a random cat from the public API on page load and on button click
- Displays key breed information (origin, life span, weight, temperament)
- Highlights boolean traits (indoor, lap cat, hypoallergenic) as quick badges
- Graceful loading and error handling with status messaging
- Responsive layout using Tailwind CSS with a light gradient hero

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Styling

## Implementation Notes

- **API**: `https://api.freeapi.app/api/v1/public/cats/cat/random`
- **Data model**: `CatData` and `CatResponse` TypeScript types in `src/App.tsx`
- **State management**: `cat`, `loading`, and `error` managed with React `useState`
- **Fetch flow**:
  - `fetchCat()` sets loading state and resets errors
  - Checks `response.ok` and validates `json.success` before updating UI
  - Errors are captured and surfaced to the user; `cat` is cleared on failure
- **Initial load**: `useEffect` calls `fetchCat()` once on mount

## Key Files

- `src/App.tsx` - Fetch logic, state handling, and UI markup
- `src/index.css` - Tailwind import and global styles

## Run Locally

```bash
npm install
npm run dev
```
