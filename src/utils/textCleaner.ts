/**
 * Utility functions for cleaning hidden UTF-8 characters from text
 */

export interface CleanTextOptions {
  removeZeroWidth?: boolean;
  removeControlChars?: boolean;
  removeNonPrintable?: boolean;
  removeInvisible?: boolean;
  preserveWhitespace?: boolean;
}

export interface CleanTextResult {
  cleanedText: string;
  originalLength: number;
  cleanedLength: number;
  removedCount: number;
  removedChars: string[];
}

/**
 * Clean text by removing various types of hidden/invisible characters
 */
export function cleanText(text: string, options: CleanTextOptions = {}): CleanTextResult {
  const {
    removeZeroWidth = true,
    removeControlChars = true,
    removeNonPrintable = true,
    removeInvisible = true,
    preserveWhitespace = true
  } = options;

  let cleanedText = text;
  const removedChars: string[] = [];
  const originalLength = text.length;

  // Remove zero-width characters
  if (removeZeroWidth) {
    const zeroWidthPattern = /[\u200B-\u200D\uFEFF\u2060\u180E]/g;
    const zeroWidthMatches = cleanedText.match(zeroWidthPattern);
    if (zeroWidthMatches) {
      removedChars.push(...zeroWidthMatches);
    }
    cleanedText = cleanedText.replace(zeroWidthPattern, '');
  }

  // Remove invisible Unicode characters
  if (removeInvisible) {
    const invisiblePattern = /[\u2000-\u200F\u2028-\u202F\u205F-\u206F\u3000\u3164]/g;
    const invisibleMatches = cleanedText.match(invisiblePattern);
    if (invisibleMatches) {
      removedChars.push(...invisibleMatches);
    }
    cleanedText = cleanedText.replace(invisiblePattern, '');
  }

  // Remove control characters (but preserve common whitespace if requested)
  if (removeControlChars) {
    const controlPattern = preserveWhitespace 
      ? /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g
      : /[\x00-\x1F\x7F-\x9F]/g;
    const controlMatches = cleanedText.match(controlPattern);
    if (controlMatches) {
      removedChars.push(...controlMatches);
    }
    cleanedText = cleanedText.replace(controlPattern, '');
  }

  // Remove line feeds and carriage returns if not preserving whitespace
  if (!preserveWhitespace) {
    const lineBreakPattern = /[\r\n]/g;
    const lineBreakMatches = cleanedText.match(lineBreakPattern);
    if (lineBreakMatches) {
      removedChars.push(...lineBreakMatches);
    }
    cleanedText = cleanedText.replace(lineBreakPattern, ' ');
  }

  // Remove non-printable characters
  if (removeNonPrintable) {
    const nonPrintablePattern = /[\uFFF0-\uFFFF]/g;
    const nonPrintableMatches = cleanedText.match(nonPrintablePattern);
    if (nonPrintableMatches) {
      removedChars.push(...nonPrintableMatches);
    }
    cleanedText = cleanedText.replace(nonPrintablePattern, '');
  }

  const cleanedLength = cleanedText.length;
  const removedCount = originalLength - cleanedLength;

  return {
    cleanedText,
    originalLength,
    cleanedLength,
    removedCount,
    removedChars: [...new Set(removedChars)] // Remove duplicates
  };
}

/**
 * Get a human-readable description of what was cleaned
 */
export function getCleanDescription(result: CleanTextResult): string {
  const { originalLength, cleanedLength, removedCount, removedChars } = result;
  
  if (removedCount === 0) {
    return 'No hidden characters found';
  }

  const uniqueChars = removedChars.length;
  const charTypes = getCharacterTypes(removedChars);
  
  let description = `Removed ${removedCount} hidden character${removedCount === 1 ? '' : 's'}`;
  
  if (uniqueChars > 0) {
    description += ` (${uniqueChars} unique type${uniqueChars === 1 ? '' : 's'})`;
  }
  
  if (charTypes.length > 0) {
    description += `: ${charTypes.join(', ')}`;
  }

  return description;
}

/**
 * Categorize removed characters by type
 */
function getCharacterTypes(chars: string[]): string[] {
  const types: string[] = [];
  const charSet = new Set(chars);

  // Check for zero-width characters
  if (chars.some(c => /[\u200B-\u200D\uFEFF\u2060\u180E]/.test(c))) {
    types.push('zero-width');
  }

  // Check for invisible characters
  if (chars.some(c => /[\u2000-\u200F\u2028-\u202F\u205F-\u206F\u3000\u3164]/.test(c))) {
    types.push('invisible');
  }

  // Check for control characters
  if (chars.some(c => /[\x00-\x1F\x7F-\x9F]/.test(c))) {
    types.push('control');
  }

  // Check for non-printable characters
  if (chars.some(c => /[\uFFF0-\uFFFF]/.test(c))) {
    types.push('non-printable');
  }

  return types;
}

/**
 * Quick clean function with sensible defaults
 */
export function quickClean(text: string): string {
  return cleanText(text).cleanedText;
}
