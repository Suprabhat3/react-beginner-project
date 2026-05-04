# Meals Listing Interface

An earthy-themed meals browser built with React, TypeScript, and Vite. The app fetches paginated meals from the public meals API and presents each recipe in a clean card layout with a detailed modal for instructions and ingredients.

## Live Demo

https://meal-listing-six.vercel.app/

## Features

- Paginated meals grid with animated entry
- Recipe detail modal with ingredients, instructions, tags, and source links
- Responsive, warm-toned UI design (no blue or purple palette)

## API Response Shape

The app expects the paginated shape below (example from the API):

```json
{
  "statusCode": 200,
  "data": {
    "page": 1,
    "limit": 12,
    "totalPages": 25,
    "previousPage": false,
    "nextPage": true,
    "totalItems": 293,
    "currentPageItems": 12,
    "data": [
      {
        "idMeal": "52785",
        "strMeal": "Dal fry",
        "strCategory": "Vegetarian",
        "strArea": "Indian",
        "strInstructions": "...",
        "strMealThumb": "https://...",
        "strTags": "Curry,Vegetarian",
        "strYoutube": "https://...",
        "strIngredient1": "Toor dal",
        "strMeasure1": "1 cup"
      }
    ]
  },
  "message": "Meals fetched successfully",
  "success": true
}
```

## Implementation Overview

### Data Fetching

- API requests live in [src/services/api.ts](src/services/api.ts).
- `fetchMeals(page, limit)` calls the public endpoint and returns `{ items, meta }`.
- Pagination metadata (`page`, `totalPages`, `totalItems`, etc.) is stored in local state for the pager.

### Main Layout

- [src/App.tsx](src/App.tsx) manages loading, error, and pagination states.
- The hero section displays total items and current page from API metadata.
- The layout is wrapped by the `app-shell` container to apply the warm background.

### Meals Grid

- [src/components/MealsList.tsx](src/components/MealsList.tsx) renders the responsive grid.
- Each card is rendered by [src/components/MealCard.tsx](src/components/MealCard.tsx).
- Cards animate in with a small staggered delay.

### Recipe Modal

- Clicking "View recipe" opens a modal with:
  - hero image and title
  - category and area tags
  - tags list (from `strTags`)
  - ingredients assembled from `strIngredient1..20` + `strMeasure1..20`
  - instructions and optional source/video links
- Modal styling lives in [src/App.css](src/App.css).

## Styling

- Global palette and typography live in [src/index.css](src/index.css).
- App layout and component styling live in [src/App.css](src/App.css).
- The UI uses a warm, earthy palette with serif headings and clean sans body text.

## Scripts

```bash
pnpm install
pnpm dev
```
