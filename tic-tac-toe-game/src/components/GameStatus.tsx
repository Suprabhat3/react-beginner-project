import { Trophy, RefreshCw } from 'lucide-react';
import type { Player } from '../utils/gameLogic';
import { cn } from '../lib/utils';

interface GameStatusProps {
  winner: Player;
  isDraw: boolean;
  isXNext: boolean;
  onReset: () => void;
}

export function GameStatus({ winner, isDraw, isXNext, onReset }: GameStatusProps) {
  return (
    <div className="flex flex-col items-center gap-6 mb-8 w-full max-w-md">
      <div 
        className={cn(
          "w-full p-4 neo-border neo-shadow bg-white text-center flex items-center justify-center gap-3",
          winner ? "bg-[#F2CA19]" : isDraw ? "bg-[#FF90E8]" : ""
        )}
      >
        {winner ? (
          <>
            <Trophy className="w-8 h-8" />
            <h2 className="text-2xl font-black uppercase tracking-widest">
              Winner: <span className={winner === 'X' ? 'text-[#E14942]' : 'text-[#32A2EC]'}>{winner}</span>
            </h2>
          </>
        ) : isDraw ? (
          <h2 className="text-2xl font-black uppercase tracking-widest">
            It's a Draw!
          </h2>
        ) : (
          <h2 className="text-2xl font-black uppercase tracking-widest flex items-center gap-2">
            Turn: 
            <span className={cn(
              "inline-block px-3 py-1 border-2 border-black bg-[#EAE6DF]",
              isXNext ? 'text-[#E14942]' : 'text-[#32A2EC]'
            )}>
              {isXNext ? 'X' : 'O'}
            </span>
          </h2>
        )}
      </div>

      {(winner || isDraw) && (
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 bg-[#32A2EC] text-white text-xl font-bold uppercase tracking-wider neo-border neo-shadow hover:bg-[#2582c2] active:bg-[#1a6296]"
        >
          <RefreshCw className="w-6 h-6" />
          Play Again
        </button>
      )}
    </div>
  );
}
