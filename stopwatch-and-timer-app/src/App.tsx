import { useState, useEffect } from 'react';
import { ThemeSelector, type ThemeType } from './components/ThemeSelector';
import { Stopwatch } from './components/Stopwatch';
import { Timer } from './components/Timer';
import { Timer as TimerIcon, Clock } from 'lucide-react';
import { cn } from './lib/utils';

type Tab = 'stopwatch' | 'timer';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('stopwatch');
  const [theme, setTheme] = useState<ThemeType>('slate');
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Apply theme classes
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all previous themes
    root.classList.remove('theme-slate', 'theme-rose', 'theme-blue', 'theme-emerald', 'theme-violet', 'theme-amber', 'dark');
    
    // Add current theme and dark mode
    root.classList.add(`theme-${theme}`);
    if (isDark) {
      root.classList.add('dark');
    }
  }, [theme, isDark]);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      {/* Header & Navigation */}
      <header className="w-full p-6 flex flex-col md:flex-row justify-between items-center gap-6 z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl clay-btn-primary flex items-center justify-center text-white">
          <Clock size={28} />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-h)] !m-0 !text-left">
          Suprabhat's <span className="text-[var(--primary)]">StopWatch</span>
        </h1>
        </div>

        {/* Tab Navigation */}
        <div className="clay-panel p-2 flex gap-2">
          <button
            onClick={() => setActiveTab('stopwatch')}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all duration-300",
              activeTab === 'stopwatch' 
                ? "clay-btn-primary" 
                : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--border)]/50"
            )}
          >
            <Clock size={18} />
            Stopwatch
          </button>
          <button
            onClick={() => setActiveTab('timer')}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all duration-300",
              activeTab === 'timer' 
                ? "clay-btn-primary" 
                : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--border)]/50"
            )}
          >
            <TimerIcon size={18} />
            Timer
          </button>
        </div>

        <ThemeSelector 
          currentTheme={theme} 
          onThemeChange={setTheme} 
          isDark={isDark} 
          onToggleDark={() => setIsDark(!isDark)} 
        />
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 w-full max-w-5xl mx-auto z-10">
        {activeTab === 'stopwatch' ? <Stopwatch /> : <Timer />}
      </main>

      {/* Decorative background blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--primary)]/5 blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--primary)]/10 blur-3xl pointer-events-none -z-10" />
    </div>
  );
}

export default App;
