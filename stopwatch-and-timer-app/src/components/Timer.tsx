import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, ChevronUp, ChevronDown, BellRing, Maximize, Minimize } from 'lucide-react';
import { cn, formatTime } from '../lib/utils';

export function Timer() {
  // Input states
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  // Timer states
  const [timeRemaining, setTimeRemaining] = useState(300000); // 5 mins in ms
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const timerRef = useRef<number | null>(null);
  const lastTickRef = useRef<number | null>(null);
  const totalTimeRef = useRef<number>(300000);
  const displayRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === displayRef.current);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      displayRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Sync inputs to total time when not running and not finished
  useEffect(() => {
    if (!isRunning && !isFinished) {
      const ms = (hours * 3600 + minutes * 60 + seconds) * 1000;
      setTimeRemaining(ms);
      totalTimeRef.current = ms;
    }
  }, [hours, minutes, seconds, isRunning, isFinished]);

  useEffect(() => {
    if (isRunning) {
      lastTickRef.current = Date.now();
      timerRef.current = window.setInterval(() => {
        const now = Date.now();
        const delta = now - (lastTickRef.current || now);
        lastTickRef.current = now;
        
        setTimeRemaining((prev) => {
          const next = prev - delta;
          if (next <= 0) {
            setIsRunning(false);
            setIsFinished(true);
            return 0;
          }
          return next;
        });
      }, 50); // 50ms interval for countdown is fine
    } else {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  const handleStartPause = () => {
    if (isFinished) {
      // Reset first if finished
      setIsFinished(false);
      setTimeRemaining(totalTimeRef.current);
      setIsRunning(true);
      return;
    }
    
    if (timeRemaining > 0) {
      setIsRunning(!isRunning);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsFinished(false);
    setTimeRemaining(totalTimeRef.current);
  };

  const adjustTime = (type: 'h' | 'm' | 's', amount: number) => {
    if (isRunning) return;
    
    setIsFinished(false);
    
    if (type === 'h') {
      setHours(Math.max(0, Math.min(99, hours + amount)));
    } else if (type === 'm') {
      let newMins = minutes + amount;
      if (newMins > 59) newMins = 59;
      if (newMins < 0) newMins = 0;
      setMinutes(newMins);
    } else if (type === 's') {
      let newSecs = seconds + amount;
      if (newSecs > 59) newSecs = 59;
      if (newSecs < 0) newSecs = 0;
      setSeconds(newSecs);
    }
  };

  const progress = totalTimeRef.current > 0 
    ? ((totalTimeRef.current - timeRemaining) / totalTimeRef.current) * 100 
    : 0;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Timer Display */}
      <div 
        ref={displayRef}
        className={cn(
          "clay-panel p-12 w-full flex flex-col items-center justify-center relative overflow-hidden group transition-all duration-500",
          isFinished ? "bg-rose-500/10 border-rose-500/50" : "",
          isFullscreen ? "h-screen w-screen max-w-none rounded-none border-none m-0" : ""
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-transparent opacity-5" />
        
        <button
          onClick={toggleFullscreen}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center clay-btn rounded-full text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 z-20"
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
        </button>
        
        {/* Progress bar background */}
        <div className="absolute bottom-0 left-0 h-1.5 bg-[var(--primary)]/20 w-full" />
        <div 
          className={cn(
            "absolute bottom-0 left-0 h-1.5 bg-[var(--primary)] transition-all duration-100 ease-linear",
            isFinished && "bg-rose-500 animate-pulse"
          )}
          style={{ width: `${progress}%` }} 
        />

        {isFinished ? (
          <div className="flex flex-col items-center justify-center h-32 mb-10 text-rose-500 animate-bounce">
            <BellRing size={isFullscreen ? 120 : 64} />
            <h3 className={cn("font-bold mt-4", isFullscreen ? "text-5xl" : "text-2xl")}>Time's Up!</h3>
          </div>
        ) : (
          <div className={cn(
            "font-mono font-bold tracking-tighter text-[var(--text)] drop-shadow-sm mb-10 z-10 transition-all duration-300",
            isFullscreen ? "text-[15vw]" : "text-7xl md:text-8xl"
          )}>
            {formatTime(timeRemaining)}
          </div>
        )}

        <div className="flex items-center gap-8 z-10 mt-4">
          <button
            onClick={handleReset}
            className="clay-btn w-16 h-16 rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--primary)] active:text-[var(--primary)]"
            aria-label="Reset timer"
          >
            <Square size={20} fill="currentColor" />
          </button>
          
          <button
            onClick={handleStartPause}
            className={cn(
              "w-24 h-24 rounded-full flex items-center justify-center text-white transition-all",
              isFinished 
                ? "clay-btn bg-rose-500 text-white" 
                : "clay-btn-primary"
            )}
            aria-label={isRunning ? 'Pause timer' : 'Start timer'}
          >
            {isRunning ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" className="ml-2" />}
          </button>
        </div>
      </div>

      {/* Timer Controls */}
      <div className="clay-panel p-8 w-full">
        <h2 className="text-xl font-bold mb-6 text-center text-[var(--text-h)]">Set Timer Duration</h2>
        
        <div className="flex justify-center items-center gap-4 sm:gap-8">
          {/* Hours */}
          <div className="flex flex-col items-center gap-3">
            <button 
              onClick={() => adjustTime('h', 1)} 
              disabled={isRunning}
              className="clay-btn p-3 rounded-2xl text-[var(--text-muted)] hover:text-[var(--primary)] disabled:opacity-50"
            >
              <ChevronUp size={24} />
            </button>
            <div className="text-4xl font-mono font-extrabold bg-[var(--background)] border-none w-24 h-24 flex items-center justify-center rounded-3xl shadow-inner text-[var(--text)]">
              {hours.toString().padStart(2, '0')}
            </div>
            <button 
              onClick={() => adjustTime('h', -1)} 
              disabled={isRunning}
              className="clay-btn p-3 rounded-2xl text-[var(--text-muted)] hover:text-[var(--primary)] disabled:opacity-50"
            >
              <ChevronDown size={24} />
            </button>
            <span className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider mt-2">Hours</span>
          </div>

          <div className="text-3xl font-bold pb-8 text-[var(--border)]">:</div>

          {/* Minutes */}
          <div className="flex flex-col items-center gap-3">
            <button 
              onClick={() => adjustTime('m', 1)} 
              disabled={isRunning}
              className="clay-btn p-3 rounded-2xl text-[var(--text-muted)] hover:text-[var(--primary)] disabled:opacity-50"
            >
              <ChevronUp size={24} />
            </button>
            <div className="text-4xl font-mono font-extrabold bg-[var(--background)] border-none w-24 h-24 flex items-center justify-center rounded-3xl shadow-inner text-[var(--text)]">
              {minutes.toString().padStart(2, '0')}
            </div>
            <button 
              onClick={() => adjustTime('m', -1)} 
              disabled={isRunning}
              className="clay-btn p-3 rounded-2xl text-[var(--text-muted)] hover:text-[var(--primary)] disabled:opacity-50"
            >
              <ChevronDown size={24} />
            </button>
            <span className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider mt-2">Mins</span>
          </div>

          <div className="text-3xl font-bold pb-8 text-[var(--border)]">:</div>

          {/* Seconds */}
          <div className="flex flex-col items-center gap-3">
            <button 
              onClick={() => adjustTime('s', 1)} 
              disabled={isRunning}
              className="clay-btn p-3 rounded-2xl text-[var(--text-muted)] hover:text-[var(--primary)] disabled:opacity-50"
            >
              <ChevronUp size={24} />
            </button>
            <div className="text-4xl font-mono font-extrabold bg-[var(--background)] border-none w-24 h-24 flex items-center justify-center rounded-3xl shadow-inner text-[var(--text)]">
              {seconds.toString().padStart(2, '0')}
            </div>
            <button 
              onClick={() => adjustTime('s', -1)} 
              disabled={isRunning}
              className="clay-btn p-3 rounded-2xl text-[var(--text-muted)] hover:text-[var(--primary)] disabled:opacity-50"
            >
              <ChevronDown size={24} />
            </button>
            <span className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider mt-2">Secs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
