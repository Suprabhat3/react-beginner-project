import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges tailwind classes using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats milliseconds into HH:MM:SS.ms format
 */
export function formatTime(ms: number) {
  const date = new Date(ms);
  const hours = Math.floor(ms / 3600000);
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  const milliseconds = Math.floor(date.getUTCMilliseconds() / 10);

  const pad = (num: number, size = 2) => num.toString().padStart(size, '0');

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
  }
  return `${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
}
