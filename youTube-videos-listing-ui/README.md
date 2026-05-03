# YouTube Videos Listing UI

A YouTube-style video listing interface built with React, TypeScript, and Tailwind CSS using the FreeAPI YouTube Videos API.

## Features

- Fetches and displays YouTube videos in a responsive grid layout
- Video cards with thumbnail, title, channel name, view count, and upload time
- Video duration overlay on thumbnails
- **Embedded video player** - Videos play directly in the app using YouTube iframe embed
- Play button overlay on video cards on hover
- Search functionality to filter videos by title or channel name
- Loading state while fetching videos
- Error handling for failed API requests
- Close video player with Escape key or clicking outside

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling

## Project Structure

```
src/
├── services/
│   └── api.ts          # API service layer with types and helper functions
├── App.tsx             # Main app component with VideoCard
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## API Endpoint

```
GET https://api.freeapi.app/api/v1/public/youtube/videos
```

Returns a paginated list of YouTube videos with details including:
- Video ID and title
- Channel information
- Thumbnails (multiple resolutions)
- View, like, and comment counts
- Duration
- Publish date

## Implementation Details

### API Service (`src/services/api.ts`)

Handles API requests and provides:
- `fetchVideos()` - Fetches video list from API
- `formatViewCount()` - Formats view counts (e.g., 1.5M, 25K)
- `formatDuration()` - Converts ISO 8601 duration to readable format (e.g., 12:34)
- `timeAgo()` - Converts date to relative time (e.g., "2 weeks ago")
- TypeScript interfaces for all API response types

### Components

**VideoCard**
- Displays video thumbnail with duration overlay
- Play button overlay on hover
- Shows channel avatar with first letter
- Video title (2-line clamp)
- Channel name
- View count and relative upload time
- Hover effects on thumbnail and title
- Click to open embedded video player

**VideoPlayerModal**
- Full-screen modal with YouTube iframe embed
- Autoplay video when opened
- Video title, channel info, and description
- Close with Escape key or click outside
- Prevents body scroll when open

**Header**
- YouTube logo and branding
- Search input with real-time filtering

### Features

**Search**
- Filters videos by title or channel name
- Real-time filtering as user types
- Shows "No videos found" message when no results

**Responsive Grid**
- 1 column on mobile
- 2 columns on small screens
- 3 columns on large screens
- 4 columns on extra-large screens

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

## UI Design

- Clean YouTube-inspired design
- Rose/amber accent colors
- Stone/neutral base colors
- No blue or purple colors as per design requirements
- Responsive layout with video grid
- Smooth hover transitions on video cards
