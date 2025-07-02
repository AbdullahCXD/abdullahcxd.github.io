import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createRedirect(link: string) {
  return (..._: any[]) => {
    window.location.replace(link);
  }
}