# Stopwatch & Timer App (Kilomorphism UI)

**Live Demo:** [https://suprabhat-stopwatch.vercel.app/](https://suprabhat-stopwatch.vercel.app/)

A sleek, interactive Stopwatch and Timer application built with React. This project explores the **Kilomorphism** (Skeuomorphic/Neumorphic inspired) design trend, providing a highly tactile, physical-feeling interface with multiple distinct visual themes.

---

## ⏱️ Features

- **Stopwatch**: Accurately track elapsed time with start, stop, and reset functionalities.
- **Laps Tracking**: Record multiple lap times while the stopwatch is running, with a dedicated lap history view.
- **Timer (Countdown)**: Set a specific duration and watch the time count down to zero. Includes start, pause, and reset controls.
- **Kilomorphism UI**: A rich design aesthetic focusing on depth, realistic shadows, and tactile 3D-like buttons that react to user interaction.
- **Multiple Themes**: Dynamic theme switching (via `ThemeSelector`) that allows users to change the visual mood of the application on the fly.

---

## 🛠️ Technologies Used

- **React** (via Vite)
- **Tailwind CSS v4** for utility-first styling and theme management
- **Lucide React** for crisp, scalable icons
- **clsx** & **tailwind-merge** for dynamic class composition
- **TypeScript** for robust type safety

---

## 🧠 Implementation Highlights

### Component Architecture
The application is built using a modular component structure:
- **Core Display**: Components responsible for rendering the time accurately (handling milliseconds, seconds, minutes, and hours).
- **Controls**: Tactile button components styled with Kilomorphic shadows and active states to mimic real-world physical buttons.
- **ThemeSelector**: A component allowing users to toggle between different color schemes and shadow profiles seamlessly.

### State & Time Management
- React's `useState` and `useEffect` hooks are used extensively to manage the active state of the stopwatch and timer.
- Precise time calculations are implemented using `requestAnimationFrame` or `setInterval` combined with `Date.now()` to avoid drift issues common in JavaScript timing functions.

### Styling & Theming
The project heavily utilizes custom CSS properties and Tailwind utilities to achieve the Kilomorphism look. The interface relies on carefully layered `box-shadow` values to create the illusion of elements extruding from or sinking into the background, paired with dynamic color palettes controlled by the theme state.

---

## 🚀 Getting Started Locally

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Run the development server:**
   ```bash
   pnpm run dev
   ```

3. **Open the app:**
   Visit `http://localhost:5173` in your browser.
