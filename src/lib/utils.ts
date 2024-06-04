import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function wait(ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const maskEmail = (email: string) => {
  const [localPart, domain] = email.split('@');
  const localPartLength = localPart.length;
  const numToMask = Math.floor(localPartLength / 2);
  const maskedLocalPart = localPart.slice(0, localPartLength - numToMask) + '*'.repeat(numToMask);
  const maskedEmail = maskedLocalPart + '@' + domain;
  return maskedEmail;
}