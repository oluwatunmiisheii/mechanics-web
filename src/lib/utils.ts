import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export class APIError extends Error {
  readonly statusCode: number;
  readonly message: string;
  readonly errors: Record<string, string>[];

  constructor(statusCode: number, message: string, errors: Record<string, string>[] = []) {
    super(message)
    this.statusCode = statusCode
    this.message = message
    this.errors = Array.isArray(errors) ? errors : []
  }
}
