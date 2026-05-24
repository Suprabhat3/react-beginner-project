export type Player = 'X' | 'O' | null;

export interface WinDetails {
  winner: Player;
  winningLine: number[] | null;
  isDraw: boolean;
}

export function calculateWinner(board: Player[]): WinDetails {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // cols
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], winningLine: lines[i], isDraw: false };
    }
  }

  const isDraw = board.every((square) => square !== null);

  return { winner: null, winningLine: null, isDraw };
}
