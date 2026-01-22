import { describe, it, expect } from 'vitest';
import { format, clamp, pluralize, capitalize, truncate } from './utils';

describe('format', () => {
  it('returns empty string when no arguments', () => {
    expect(format()).toBe('');
  });

  it('returns full name with all parts', () => {
    expect(format('John', 'Q', 'Doe')).toBe('John Q Doe');
  });
});

describe('clamp', () => {
  it('returns value when within range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('clamps to min/max when outside range', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
  });
});

describe('pluralize', () => {
  it('returns singular for 1, plural otherwise', () => {
    expect(pluralize(1, 'item', 'items')).toBe('item');
    expect(pluralize(0, 'item', 'items')).toBe('items');
    expect(pluralize(5, 'item', 'items')).toBe('items');
  });
});

describe('capitalize', () => {
  it('capitalizes first letter and lowercases rest', () => {
    expect(capitalize('hELLO')).toBe('Hello');
  });

  it('returns empty string for empty input', () => {
    expect(capitalize('')).toBe('');
  });
});

describe('truncate', () => {
  it('returns original if shorter than max', () => {
    expect(truncate('hello', 10)).toBe('hello');
  });

  it('truncates with suffix when longer', () => {
    expect(truncate('hello world', 8)).toBe('hello...');
  });
});
