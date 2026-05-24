# Premium Neo-Brutalism Tic Tac Toe Game

**Live Demo:** [https://tic-tac-toe-sup.vercel.app/](https://tic-tac-toe-sup.vercel.app/)

A classic Tic Tac Toe game built with React, but designed with a modern, bold **Neo-Brutalism** aesthetic. This project showcases component structure, state management, game logic, and complex styling using Tailwind CSS.

---

## 🎨 Features

- **3x3 Game Board**: Classic grid for Tic Tac Toe.
- **Two-Player Turn System**: Alternates between Player 'X' and Player 'O'.
- **Winner Detection**: Automatically detects when a player gets 3 in a row (horizontally, vertically, or diagonally) and highlights the winning combination.
- **Draw Detection**: Recognizes when all squares are filled without a winner.
- **Reset Game**: Option to restart the match at any time or after the game concludes.
- **Neo-Brutalism UI**: Features bold saturated colors, thick black borders, hard drop-shadows that shift on hover/active states, and clear visual feedback for current turns and results.

---

## 🛠️ Technologies Used

- **React** (via Vite)
- **Tailwind CSS v4** for styling
- **Lucide React** for icons
- **clsx** & **tailwind-merge** for clean utility class merging
- **TypeScript** for static type checking

---

## 🧠 Implementation Details

### Component Structure
The UI is broken down into modular, reusable React components:
- `TicTacToe.tsx`: The main container component that manages the game state, handles square clicks, and resets the board.
- `GameStatus.tsx`: A dynamic banner that displays the current turn, announces the winner, or declares a draw.
- `Square.tsx`: An individual button representing a cell on the board, styled dynamically based on its state (X, O, or part of a winning line).

### State Management
The game relies on two primary pieces of state via React's `useState` hook:
- `board`: An array of 9 elements representing the grid cells (storing `'X'`, `'O'`, or `null`).
- `isXNext`: A boolean that tracks whose turn it is.

### Game Logic
The core logic resides in `utils/gameLogic.ts`. The `calculateWinner` function checks the board array against all 8 possible winning lines (3 horizontal, 3 vertical, 2 diagonal). It returns the winner, the indices of the winning line for UI highlighting, and a boolean indicating if the game resulted in a draw.

### Styling Approach
The **Neo-Brutalism** theme was implemented globally via `index.css` using native CSS variables for colors and shadows. Tailwind utility classes were combined with custom classes (`.neo-border`, `.neo-shadow`) to apply thick borders and shifting hard shadows to interactive elements, giving the game a tactile, premium feel.

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
