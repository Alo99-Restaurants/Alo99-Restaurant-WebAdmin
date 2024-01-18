import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combine and merge CSS classes from clsx and Tailwind CSS.
 *
 * @param {...ClassValue} args - CSS classes to combine and merge.
 * @returns {String} - Combined and merged CSS classes.
 * @example
 * cn(false && "text-red-500", "bg-blue-400", "font-bold")
 * → Return: "bg-blue-400", "font-bold"
 */
export function cn(...args) {
  /**
   * Use clsx to combine CSS classes
   * @see [clsx Documentation] (https://www.npmjs.com/package/clsx)
   * @example
   * clsx('foo', true && 'bar', 'baz');
   * → Return: 'foo bar baz'
   */
  const combinedClasses = clsx(args);

  /**
   * Use twMerge to merge Tailwind CSS classes
   * @see [clsx Documentation] (https://www.npmjs.com/package/clsx)
   * @example
   * twMerge('px-2 py-1 bg-red hover:bg-dark-red', 'p-3 bg-[#B91C1C]')
   * → Return: 'hover:bg-dark-red p-3 bg-[#B91C1C]'
   */
  const tailwindClasses = twMerge(combinedClasses);

  return tailwindClasses;
}

export function stringifyData(array) {
  if( typeof window === 'undefined') return;

  const jsonString = JSON.stringify(array);
  return jsonString;
}

export function unescapeStringData(escapedString) {
  if (typeof window === 'undefined') return;

  var removeString = escapedString.replace(/\\"/g, '"');
  const originalString = JSONParse(removeString);

  return originalString;
}

export function JSONParse(jsonString) {
  try {
    if (typeof window !== 'undefined') {
      return JSON.parse(jsonString);
    }
    return {};
  } catch (error) {
    return {};
  }
}