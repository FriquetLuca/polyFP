import { describe, expect, it } from 'vitest';
import { camelCase } from './camelCase/index.js';

describe('camelCase', () => {
  it('handles empty string', () => {
    expect(camelCase('')).toBe('');
  });

  it('handles single word', () => {
    expect(camelCase('hello')).toBe('hello');
    expect(camelCase('HELLO')).toBe('hello');
  });

  it('handles spaces', () => {
    expect(camelCase('hello world')).toBe('helloWorld');
    expect(camelCase('Hello World')).toBe('helloWorld');
    expect(camelCase('HELLO WORLD')).toBe('helloWorld');
  });

  it('handles multiple spaces', () => {
    expect(camelCase('  hello   world  ')).toBe('helloWorld');
  });

  it('handles snake_case', () => {
    expect(camelCase('hello_world')).toBe('helloWorld');
    expect(camelCase('__hello__world__')).toBe('helloWorld');
  });

  it('handles kebab-case', () => {
    expect(camelCase('hello-world')).toBe('helloWorld');
    expect(camelCase('--hello--world--')).toBe('helloWorld');
  });

  it('handles PascalCase', () => {
    expect(camelCase('HelloWorld')).toBe('helloWorld');
  });

  it('handles camelCase', () => {
    expect(camelCase('helloWorld')).toBe('helloWorld');
  });

  it('handles acronyms', () => {
    expect(camelCase('HTTP_SERVER')).toBe('httpServer');
    expect(camelCase('XML_HTTP_REQUEST')).toBe('xmlHttpRequest');
  });

  it('handles numbers', () => {
    expect(camelCase('version_2_file')).toBe('version2File');
    expect(camelCase('user 123 name')).toBe('user123Name');
  });

  it('handles mixed separators', () => {
    expect(camelCase('hello-world_test value')).toBe('helloWorldTestValue');
  });
});
