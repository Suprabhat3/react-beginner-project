import { cn } from '../lib/utils';
import type { Player } from '../utils/gameLogic';

interface SquareProps {
  value: Player;
  onClick: () => void;
  isWinningSquare?: boolean;
  disabled?: boolean;
}

export function Square({ value, onClick, isWinningSquare, disabled }: SquareProps) {
  return (
    <button
      className={cn(
        'h-24 w-24 sm:h-32 sm:w-32 bg-white text-5xl sm:text-7xl font-black flex items-center justify-center',
        'neo-border neo-shadow cursor-pointer',
        'hover:bg-[#f0f0f0]',
        'focus:outline-none focus:ring-4 focus:ring-[#32A2EC]',
        isWinningSquare && 'bg-[#2ECC71] hover:bg-[#2ECC71]', // Green for winning squares
        disabled && !isWinningSquare && 'cursor-default hover:bg-white',
        value === 'X' ? 'text-[#E14942]' : 'text-[#32A2EC]'
      )}
      onClick={onClick}
      disabled={disabled}
      aria-label={value ? `Square occupied by ${value}` : 'Empty square'}
    >
      {value && (
        <span className="animate-in zoom-in duration-200">
          {value}
        </span>
      )}
    </button>
  );
}
