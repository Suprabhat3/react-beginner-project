import { useState } from 'react';
import { Square } from './Square';
import { GameStatus } from './GameStatus';
import { calculateWinner, type Player } from '../utils/gameLogic';

export function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);

  const { winner, winningLine, isDraw } = calculateWinner(board);

  const handleSquareClick = (index: number) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <div className="mb-12 text-center">
        <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter mb-4 inline-block bg-[#F2CA19] px-6 py-2 neo-border neo-shadow transform -rotate-2">
          Tic Tac Toe
        </h1>
      </div>

      <GameStatus 
        winner={winner} 
        isDraw={isDraw} 
        isXNext={isXNext} 
        onReset={handleReset} 
      />

      <div className="grid grid-cols-3 gap-3 sm:gap-4 p-4 sm:p-6 bg-[#1E1E1E] neo-border neo-shadow">
        {board.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => handleSquareClick(index)}
            isWinningSquare={winningLine?.includes(index)}
            disabled={!!winner || !!value}
          />
        ))}
      </div>
      
      {/* Reset button outside if game is not over yet, for convenience */}
      {!winner && !isDraw && (
        <button
          onClick={handleReset}
          className="mt-12 px-6 py-2 bg-white text-black font-bold uppercase tracking-widest neo-border neo-shadow hover:bg-[#EAE6DF] active:translate-y-1"
        >
          Reset Game
        </button>
      )}
    </div>
  );
}
