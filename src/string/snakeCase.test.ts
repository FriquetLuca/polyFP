import { describe, expect, it } from 'vitest';
import { snakeCase } from './snakeCase/index';

describe('snakeCase', () => {
  it('handles empty string', () => {
    expect(snakeCase('')).toBe('');
  });

  it('handles single word', () => {
    expect(snakeCase('hello')).toBe('hello');
    expect(snakeCase('HELLO')).toBe('hello');
  });

  it('handles spaces', () => {
    expect(snakeCase('hello world')).toBe('hello_world');
    expect(snakeCase('Hello World')).toBe('hello_world');
  });

  it('handles multiple spaces', () => {
    expect(snakeCase('  hello   world  ')).toBe('hello_world');
  });

  it('handles camelCase', () => {
    expect(snakeCase('helloWorld')).toBe('hello_world');
    expect(snakeCase('myVariableName')).toBe('my_variable_name');
  });

  it('handles PascalCase', () => {
    expect(snakeCase('HelloWorld')).toBe('hello_world');
    expect(snakeCase('MyVariableName')).toBe('my_variable_name');
  });

  it('handles snake_case', () => {
    expect(snakeCase('hello_world')).toBe('hello_world');
    expect(snakeCase('__hello__world__')).toBe('hello_world');
  });

  it('handles kebab-case', () => {
    expect(snakeCase('hello-world')).toBe('hello_world');
    expect(snakeCase('--hello--world--')).toBe('hello_world');
  });

  it('handles acronyms', () => {
    expect(snakeCase('HTTPServer')).toBe('http_server');
    expect(snakeCase('XMLHttpRequest')).toBe('xml_http_request');
    expect(snakeCase('parseJSONFile')).toBe('parse_json_file');
  });

  it('handles numbers', () => {
    expect(snakeCase('Version2File')).toBe('version2_file');
    expect(snakeCase('user123Name')).toBe('user123_name');
  });

  it('handles mixed separators', () => {
    expect(snakeCase('hello-world_test Value')).toBe('hello_world_test_value');
  });
});
