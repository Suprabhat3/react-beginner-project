import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Plus, Trash2, ListTodo, Maximize, Minimize } from 'lucide-react';
import { cn, formatTime } from '../lib/utils';

interface Task {
  id: string;
  name: string;
  accumulatedTime: number; // in milliseconds
  createdAt: number;
}

export function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('stopwatch-tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [newTaskName, setNewTaskName] = useState('');

  const timerRef = useRef<number | null>(null);
  const lastTickRef = useRef<number | null>(null);
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

  // Save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('stopwatch-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (isRunning) {
      lastTickRef.current = Date.now();
      timerRef.current = window.setInterval(() => {
        const now = Date.now();
        const delta = now - (lastTickRef.current || now);
        lastTickRef.current = now;
        
        setTime((prevTime) => prevTime + delta);

        if (activeTaskId) {
          setTasks((prevTasks) => 
            prevTasks.map(t => t.id === activeTaskId ? { ...t, accumulatedTime: t.accumulatedTime + delta } : t)
          );
        }
      }, 10); // Update every 10ms for smooth ms tracking
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
  }, [isRunning, activeTaskId]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskName.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      name: newTaskName.trim(),
      accumulatedTime: 0,
      createdAt: Date.now()
    };
    setTasks([...tasks, newTask]);
    setNewTaskName('');
    // Automatically select the newly created task if none is selected
    if (!activeTaskId) {
      setActiveTaskId(newTask.id);
    }
  };

  const handleDeleteTask = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeTaskId === id) {
      setActiveTaskId(null);
      if (isRunning) setIsRunning(false);
    }
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleSelectTask = (id: string) => {
    if (activeTaskId === id) {
      setActiveTaskId(null); // Deselect
    } else {
      setActiveTaskId(id);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Stopwatch Display */}
      <div 
        ref={displayRef} 
        className={cn(
          "clay-panel p-12 w-full flex flex-col items-center justify-center relative overflow-hidden group transition-all duration-300",
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
        
        {activeTaskId && !isFullscreen && (
          <div className="absolute top-6 left-6 flex items-center gap-2 text-[var(--primary)] font-medium text-sm bg-[var(--color-primary-light)] px-3 py-1 rounded-full dark:bg-opacity-20">
            <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
            Tracking: {tasks.find(t => t.id === activeTaskId)?.name}
          </div>
        )}
        
        {activeTaskId && isFullscreen && (
          <div className="absolute top-6 left-6 flex items-center gap-3 text-[var(--text-h)] font-bold text-xl px-4 py-2">
            <span className="w-3 h-3 rounded-full bg-[var(--primary)] animate-pulse" />
            {tasks.find(t => t.id === activeTaskId)?.name}
          </div>
        )}
        
        <div className={cn(
          "font-mono font-bold tracking-tighter text-[var(--text)] drop-shadow-sm mb-10 z-10 transition-all duration-300",
          isFullscreen ? "text-[15vw]" : "text-7xl md:text-8xl"
        )}>
          {formatTime(time)}
        </div>

        <div className="flex items-center gap-8 z-10 mt-4">
          <button
            onClick={handleReset}
            className="clay-btn w-16 h-16 rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--primary)] active:text-[var(--primary)]"
            aria-label="Reset stopwatch"
          >
            <Square size={20} fill="currentColor" />
          </button>
          
          <button
            onClick={handleStartPause}
            className="clay-btn-primary w-24 h-24 rounded-full flex items-center justify-center"
            aria-label={isRunning ? 'Pause stopwatch' : 'Start stopwatch'}
          >
            {isRunning ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" className="ml-2" />}
          </button>
        </div>
      </div>

      {/* Lab / Task Tracking System */}
      <div className="clay-panel p-8 w-full flex flex-col">
        <div className="flex items-center gap-2 mb-6 text-[var(--text-h)]">
          <ListTodo size={24} className="text-[var(--primary)]" />
          <h2 className="text-xl font-bold !mb-0">Task Tracking Lab</h2>
        </div>

        <form onSubmit={handleAddTask} className="flex gap-4 mb-8">
          <input
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="What are you working on?"
            className="flex-1 bg-[var(--background)] border-none rounded-2xl px-5 py-4 text-[var(--text)] font-semibold shadow-inner focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 transition-all placeholder:text-[var(--text-muted)] placeholder:font-normal"
          />
          <button
            type="submit"
            disabled={!newTaskName.trim()}
            className="clay-btn-primary px-6 rounded-2xl font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={22} />
            <span className="hidden sm:inline">Add Task</span>
          </button>
        </form>

        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          {tasks.length === 0 ? (
            <div className="text-center py-8 text-[var(--text-muted)] text-sm border-2 border-dashed border-[var(--border)] rounded-xl">
              No tasks created yet. Add one to track time!
            </div>
          ) : (
            tasks.map(task => (
              <div
                key={task.id}
                onClick={() => handleSelectTask(task.id)}
                className={cn(
                  "group flex items-center justify-between p-5 rounded-2xl cursor-pointer transition-all mb-3",
                  activeTaskId === task.id 
                    ? "clay-btn-primary" 
                    : "clay-btn hover:-translate-y-1"
                )}
              >
                <div className="flex flex-col gap-1 overflow-hidden">
                  <span className={cn(
                    "font-bold text-lg truncate transition-colors",
                    activeTaskId === task.id ? "text-white" : "text-[var(--text)]"
                  )}>
                    {task.name}
                  </span>
                  <span className={cn(
                    "text-sm font-mono font-bold opacity-80",
                    activeTaskId === task.id ? "text-white" : "text-[var(--text-muted)]"
                  )}>
                    {formatTime(task.accumulatedTime)} total
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  {activeTaskId === task.id && isRunning && (
                    <div className="flex gap-1.5 mr-2">
                      <span className="w-1.5 h-4 bg-white rounded-full animate-[bounce_1s_infinite] delay-75" />
                      <span className="w-1.5 h-4 bg-white rounded-full animate-[bounce_1s_infinite] delay-150" />
                      <span className="w-1.5 h-4 bg-white rounded-full animate-[bounce_1s_infinite] delay-300" />
                    </div>
                  )}
                  <button
                    onClick={(e) => handleDeleteTask(task.id, e)}
                    className={cn(
                      "p-2 rounded-xl transition-all opacity-0 group-hover:opacity-100",
                      activeTaskId === task.id ? "text-white/70 hover:text-white hover:bg-white/20" : "text-[var(--text-muted)] hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                    )}
                    aria-label="Delete task"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
