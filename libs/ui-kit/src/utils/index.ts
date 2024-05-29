import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitial = (name: string): string => {
  return name.charAt(0).toUpperCase();
};

export const getRandomColor = (): string => {
  const colors = [
    'bg-red-200 text-red-600',
    'bg-green-200 text-green-600',
    'bg-blue-200 text-blue-600',
    'bg-yellow-200 text-yellow-600',
    'bg-purple-200 text-purple-600',
    'bg-pink-200 text-pink-600',
    'bg-indigo-200 text-indigo-600',
    'bg-teal-200 text-teal-600',
    'bg-orange-200 text-orange-600',
    'bg-gray-200 text-gray-600',
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
