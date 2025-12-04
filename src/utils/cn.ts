import { clsx, type ClassValue } from 'clsx';

/**
 * Utility function for merging class names
 * Uses clsx for conditional class names
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
