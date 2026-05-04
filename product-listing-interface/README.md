# Product Listing Interface

A modern, responsive product listing application built with React, TypeScript, and Vite. Fetches and displays products in an elegant card-based grid layout with real-time details including pricing, ratings, and inventory status.

## 📋 Features

- **Dynamic Product Fetching** — Retrieves products from a free API with automatic pagination support
- **Responsive Grid Layout** — Adapts seamlessly from mobile to desktop (1-4 columns)
- **Product Cards** — Each card displays:
  - Product thumbnail image
  - Title and description
  - Category badge
  - Star rating
  - Original and discounted pricing
  - Discount percentage badge
  - Stock status with color-coded indicators
  - Brand information
- **Loading State** — Animated spinner during API fetch
- **Error Handling** — User-friendly error messages with fallback UI
- **Image Fallback** — Graceful handling of broken image links
- **Smooth Animations** — Hover effects and transitions for better UX
- **Type-Safe** — Full TypeScript support with strict typing

## 🛠️ Tech Stack

- **React 18** — UI framework
- **TypeScript** — Type safety
- **Vite** — Lightning-fast build tool
- **Tailwind CSS** — Utility-first styling
- **ESLint** — Code quality

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone or navigate to the project directory:
```bash
cd product-listing-interface
```

2. Install dependencies:
```bash
pnpm install
```

### Development

Start the development server with hot module replacement (HMR):

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

### Build

Create a production-ready build:

```bash
pnpm build
```

Preview the build locally:

```bash
pnpm preview
```

## 📁 Project Structure

```
src/
├── App.tsx              # Main component with product fetching and display logic
├── main.tsx             # React app entry point
├── index.css            # Global styles
├── assets/              # Static assets
├── components/          # Reusable components (future expansion)
└── services/            # API calls and utilities
```

## 🔌 API Integration

The application fetches products from:

```
https://api.freeapi.app/api/v1/public/randomproducts
```

### Response Structure

```typescript
{
  statusCode: number
  data: {
    page: number
    limit: number
    totalPages: number
    previousPage: boolean
    nextPage: boolean
    totalItems: number
    currentPageItems: number
    data: Product[]
  }
  message: string
  success: boolean
}
```

## 🎨 Styling

The project uses **Tailwind CSS** for styling. All colors follow the design system:
- Primary: Emerald (green)
- Neutral: Gray
- Status: Green, Amber, Red

### Custom Classes

- `line-clamp-2` — Truncates text to 2 lines with ellipsis
- `group-hover:scale-105` — Image zoom on card hover
- `transition-shadow` — Smooth shadow transitions

## 💡 Key Implementation Details

### State Management

- **products**: Stores fetched product array
- **loading**: Loading state during API call
- **error**: Error messages for failed requests

### Error Handling

The app gracefully handles:
- Network errors
- Failed API responses
- Missing or broken product images

### Image Loading

Images use an `onError` handler to fall back to a placeholder when broken links are encountered.

## 🐛 Troubleshooting

### Images Not Loading

If product images fail to load (404 errors), the app automatically displays a placeholder image. This is handled by the `onError` handler in the image tag.

### Build Issues

Clear cache and reinstall if experiencing build problems:

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## 📦 Dependencies

Key packages:
- `react` — UI framework
- `typescript` — Type system
- `tailwindcss` — CSS framework
- `vite` — Build tool

## 📈 Future Enhancements

- Search and filter functionality
- Product sorting (price, rating, etc.)
- Shopping cart integration
- Product detail modal
- Pagination controls
- Favorites/wishlist feature
- User authentication

## 📝 License

This project is part of a React beginner learning project.
