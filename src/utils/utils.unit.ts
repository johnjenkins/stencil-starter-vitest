import { describe, it, expect } from 'vitest';
import { format, clamp, pluralize, capitalize, truncate } from './utils';

describe('utils', () => {
  describe('format', () => {
    it('returns empty string when no arguments', () => {
      expect(format()).toBe('');
    });

    it('returns first name only', () => {
      expect(format('John')).toBe('John');
    });

    it('returns first and middle name', () => {
      expect(format('John', 'Q')).toBe('John Q');
    });

    it('returns first and last name', () => {
      expect(format('John', undefined, 'Doe')).toBe('John Doe');
    });

    it('returns full name with all parts', () => {
      expect(format('John', 'Q', 'Doe')).toBe('John Q Doe');
    });

    it('handles empty strings', () => {
      expect(format('', '', '')).toBe('');
    });

    it('handles undefined values', () => {
      expect(format(undefined, undefined, undefined)).toBe('');
    });

    it('handles middle name with empty first', () => {
      expect(format('', 'Middle', '')).toBe(' Middle');
    });
  });

  describe('clamp', () => {
    it('returns value when within range', () => {
      expect(clamp(5, 0, 10)).toBe(5);
    });

    it('returns min when value is below', () => {
      expect(clamp(-5, 0, 10)).toBe(0);
    });

    it('returns max when value is above', () => {
      expect(clamp(15, 0, 10)).toBe(10);
    });

    it('returns min when value equals min', () => {
      expect(clamp(0, 0, 10)).toBe(0);
    });

    it('returns max when value equals max', () => {
      expect(clamp(10, 0, 10)).toBe(10);
    });

    it('works with negative ranges', () => {
      expect(clamp(-5, -10, -1)).toBe(-5);
    });

    it('works with decimal values', () => {
      expect(clamp(0.5, 0, 1)).toBe(0.5);
    });

    it('clamps decimal below min', () => {
      expect(clamp(-0.1, 0, 1)).toBe(0);
    });
  });

  describe('pluralize', () => {
    it('returns singular for count of 1', () => {
      expect(pluralize(1, 'item', 'items')).toBe('item');
    });

    it('returns plural for count of 0', () => {
      expect(pluralize(0, 'item', 'items')).toBe('items');
    });

    it('returns plural for count greater than 1', () => {
      expect(pluralize(5, 'item', 'items')).toBe('items');
    });

    it('returns plural for negative counts', () => {
      expect(pluralize(-1, 'item', 'items')).toBe('items');
    });

    it('works with irregular plurals', () => {
      expect(pluralize(1, 'child', 'children')).toBe('child');
      expect(pluralize(2, 'child', 'children')).toBe('children');
    });

    it('works with same singular and plural', () => {
      expect(pluralize(1, 'sheep', 'sheep')).toBe('sheep');
      expect(pluralize(5, 'sheep', 'sheep')).toBe('sheep');
    });
  });

  describe('capitalize', () => {
    it('capitalizes lowercase word', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('handles already capitalized word', () => {
      expect(capitalize('Hello')).toBe('Hello');
    });

    it('lowercases rest of string', () => {
      expect(capitalize('hELLO')).toBe('Hello');
    });

    it('handles single character', () => {
      expect(capitalize('a')).toBe('A');
    });

    it('returns empty string for empty input', () => {
      expect(capitalize('')).toBe('');
    });

    it('handles all uppercase', () => {
      expect(capitalize('WORLD')).toBe('World');
    });

    it('handles strings with spaces', () => {
      expect(capitalize('hello world')).toBe('Hello world');
    });

    it('handles numbers at start', () => {
      expect(capitalize('123abc')).toBe('123abc');
    });
  });

  describe('truncate', () => {
    it('returns original string if shorter than max', () => {
      expect(truncate('hello', 10)).toBe('hello');
    });

    it('returns original string if equal to max', () => {
      expect(truncate('hello', 5)).toBe('hello');
    });

    it('truncates and adds default suffix', () => {
      expect(truncate('hello world', 8)).toBe('hello...');
    });

    it('uses custom suffix', () => {
      expect(truncate('hello world', 8, '…')).toBe('hello w…');
    });

    it('handles empty string', () => {
      expect(truncate('', 10)).toBe('');
    });

    it('handles undefined input', () => {
      expect(truncate(undefined as any, 10)).toBe('');
    });

    it('handles null input', () => {
      expect(truncate(null as any, 10)).toBe('');
    });

    it('handles very short max length', () => {
      expect(truncate('hello', 3)).toBe('...');
    });

    it('handles empty suffix', () => {
      expect(truncate('hello world', 5, '')).toBe('hello');
    });
  });
});
