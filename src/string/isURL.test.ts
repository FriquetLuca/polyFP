import { describe, expect, it } from 'vitest';
import { isURL } from './isURL';

describe('isURL', () => {
  describe('valid URLs', () => {
    it.each([
      'https://example.com',
      'http://example.com',
      'ftp://example.com/file.txt',
      'custom-scheme://example.com',
      'example.com',
      'www.example.com',
      'example.com/path/to/resource',
      'https://example.com/path?q=test',
      'https://example.com/path#section',
      'https://example.com/path?q=test#section',
      'http://user:password@example.com',
      'http://localhost',
      'http://localhost:3000',
      'http://127.0.0.1',
      'http://127.0.0.1:8080/api',
      'http://[::1]',
      'http://[2001:db8::1]:8080',
      'https://sub.domain.example.com',
      'https://example.co.uk',
      'http://[2001:0db8:85a3:0000:0000:8a2e:0370:7334]/',
      'http://[2001:db8::1]/',
      'http://[::ffff:192.168.0.1]/',
      'http://[2001:db8::192.168.0.1]/',
      'http://[fe80::1%eth0]/',
    ])('accepts %s', (value) => {
      expect(isURL(value)).toBe(true);
    });
  });

  describe('invalid URLs', () => {
    it.each([
      '',
      ' ',
      'hello world',
      'example',
      '.com',
      'example.',
      'http://',
      'https://',
      '://example.com',
      'http//example.com',
      'example..com',
      '-example.com',
      'example-.com',
      'http://-example.com',
      'http://example.com:abc',
      'http://example.com:99999',
      'http://256.256.256.256',
      'http://[invalid-ipv6]',
      'http://example .com',
      'https://example.com/path with spaces',
      'http://2001:db8::1/',
      'http://[1:2:3:4:5:6:7:8:9]/',
      'http://[2001::db8::1]/',
      'http://[2001:db8:g123::]/',
      'http://[192.168.1.1]/',
    ])('rejects %s', (value) => {
      expect(isURL(value)).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('handles URLs with very long paths', () => {
      const value = `https://example.com/${'a'.repeat(1000)}`;

      expect(isURL(value)).toBe(true);
    });

    it('handles custom protocols', () => {
      expect(isURL('myapp://open/settings')).toBe(true);
    });

    it('handles URLs without protocol', () => {
      expect(isURL('example.com/path')).toBe(true);
    });
  });
});
