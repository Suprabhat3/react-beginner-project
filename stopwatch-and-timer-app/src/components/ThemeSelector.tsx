import { Check, Moon, Sun } from 'lucide-react';
import { cn } from '../lib/utils';

export type ThemeType = 'slate' | 'rose' | 'blue' | 'emerald' | 'violet' | 'amber';

interface ThemeSelectorProps {
  currentTheme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
  isDark: boolean;
  onToggleDark: () => void;
}

const themes: { name: ThemeType; color: string; label: string }[] = [
  { name: 'slate', color: 'bg-slate-500', label: 'Slate' },
  { name: 'rose', color: 'bg-rose-500', label: 'Rose' },
  { name: 'blue', color: 'bg-blue-500', label: 'Blue' },
  { name: 'emerald', color: 'bg-emerald-500', label: 'Emerald' },
  { name: 'violet', color: 'bg-violet-500', label: 'Violet' },
  { name: 'amber', color: 'bg-amber-500', label: 'Amber' },
];

export function ThemeSelector({ currentTheme, onThemeChange, isDark, onToggleDark }: ThemeSelectorProps) {
  return (
    <div className="flex items-center gap-4 clay-panel px-5 py-3 rounded-full">
      <div className="flex gap-2">
        {themes.map((theme) => (
          <button
            key={theme.name}
            onClick={() => onThemeChange(theme.name)}
            title={theme.label}
            className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center transition-transform hover:scale-110",
              theme.color,
              currentTheme === theme.name ? "ring-2 ring-offset-2 ring-[var(--primary)] ring-offset-[var(--background)]" : ""
            )}
            aria-label={`Select ${theme.label} theme`}
          >
            {currentTheme === theme.name && <Check size={14} className="text-white" />}
          </button>
        ))}
      </div>
      
      <div className="w-px h-6 bg-[var(--border)] mx-1" />
      
      <button
        onClick={onToggleDark}
        className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors p-1 rounded-full"
        title="Toggle dark mode"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  );
}
