import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (
  date: Date | string,
  showTime: boolean = true,
  timeZone?: string
) => {
  if (new Date(date).toString() == "Invalid Date") return date;
  const newDate = timeZone ? date + "Z" : date;
  const value = new Date(newDate);
  return showTime
    ? value.toLocaleString("en-GB", { timeZone })
    : value.toLocaleDateString("en-GB", { timeZone });
};
