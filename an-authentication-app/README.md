# Authentication App

A simple authentication-based application built with React, TypeScript, and Tailwind CSS using the FreeAPI Authentication Module.

## Live Demo

https://01-react-authentication.vercel.app/

## Features

- User registration with username, email, password, and role
- User login with session-based authentication
- User profile display showing username, email, role, and user ID
- Logout functionality
- Loading states during API requests
- Success and error message handling
- Form validation with lowercase username conversion

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling

## Project Structure

```
src/
├── components/
│   ├── Login.tsx       # Login form component
│   ├── Register.tsx    # Registration form component
│   └── Dashboard.tsx   # User profile/dashboard component
├── context/
│   └── AuthContext.tsx # Authentication state management
├── services/
│   └── api.ts          # API service layer
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## API Endpoints

All endpoints are proxied through Vite dev server to avoid CORS issues.

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/users/register` | POST | Register new user |
| `/api/v1/users/login` | POST | Login user |
| `/api/v1/users/logout` | POST | Logout user |
| `/api/v1/users/current-user` | GET | Get current user details |

## Implementation Details

### API Service (`src/services/api.ts`)

Handles all HTTP requests to the FreeAPI endpoints:
- Uses `credentials: "include"` for cookie-based session management
- Extracts validation errors from API error responses
- Provides typed interfaces for all payloads and responses

### Authentication Context (`src/context/AuthContext.tsx`)

Manages global authentication state:
- `user` - Current logged-in user data
- `loading` - Loading state for API calls
- `error` - Error messages from failed requests
- `login()` - Authenticates user and fetches profile
- `register()` - Creates new user account
- `logout()` - Ends user session
- `clearError()` - Resets error state

### Components

**Login.tsx**
- Username and password form
- Shows success/error messages
- Converts username to lowercase before submission
- Link to switch to registration

**Register.tsx**
- Username, email, password, and role form
- Validates and submits user data
- Converts username to lowercase
- Link to switch to login

**Dashboard.tsx**
- Displays user profile information
- Shows avatar initials, username, email, role, and ID
- Logout button with loading state

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

## CORS Configuration

The Vite dev server is configured to proxy `/api/*` requests to `https://api.freeapi.app` to bypass CORS restrictions during development. See `vite.config.ts`:

```ts
server: {
  proxy: {
    "/api": {
      target: "https://api.freeapi.app",
      changeOrigin: true,
    },
  },
}
```

## UI Design

- Clean, minimal design using stone/neutral grays
- Emerald accent for login actions
- Amber accent for registration actions
- No blue or purple colors as per design requirements
- Responsive layout with centered forms
