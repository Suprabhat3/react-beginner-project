# Quotes Listing Application

A React + TypeScript + Vite app that fetches paginated quotes from a public quotes API and displays them in a clean, readable interface.

## What this app does

- Fetches quotes from `https://api.freeapi.app/api/v1/public/quotes`
- Parses the paginated API wrapper response
- Shows the API metadata in a dashboard section
- Renders quote cards with the full data payload
- Provides a "Copy quote" button for each quote
- Uses Tailwind CSS for responsive styling
- Avoids purple tones and uses calm slate, sky, emerald, and amber accents instead

## Features

### API response handling

The application processes the JSON response into a typed structure and uses the returned fields:

- `statusCode`
- `data.page`
- `data.limit`
- `data.totalPages`
- `data.previousPage`
- `data.nextPage`
- `data.totalItems`
- `data.currentPageItems`
- `data.data` (the quote list)
- `message`
- `success`

### Quote card UI

Each quote card includes:

- quote text
- author name
- author slug
- quote length
- tags
- quote ID
- added date
- modified date
- copy button

The quote cards use a soft gradient background, subtle border shadows, and tag badges for readability.

### Pagination

Pagination buttons allow navigating through the available pages returned by the API.

### Copy interaction

A `Copy quote` button copies the quote text to the clipboard and temporarily shows a `Copied` state.

## File structure

- `src/App.tsx` — main application logic and UI
- `src/index.css` — Tailwind global styling and base page styles
- `vite.config.ts` — Vite configuration with the Tailwind plugin
- `package.json` — project dependencies and scripts

## How to run

From the `quotes-listing-application` folder:

```bash
pnpm install
pnpm dev
```

Then open the URL shown by Vite in your browser.

## Notes

- The app uses React `useEffect` to fetch quotes on mount.
- Quote cards render the most important fields first and group metadata clearly.
- The UI is intentionally designed to feel modern without dark or purple-heavy accents.
