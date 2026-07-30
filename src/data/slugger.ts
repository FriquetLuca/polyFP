import { slugify } from '../string/slugify/index.js';

export class Slugger {
  private seen: Record<string, number> = {};

  /**
   * Slugify a string to be URL-safe and unique
   * @param text The input heading text
   * @returns A slug string
   */
  slug(text: string): string {
    // Normalize, lowercase, and replace unsafe characters
    const slug = slugify(text);

    // Ensure uniqueness
    const count = this.seen[slug] || 0;
    this.seen[slug] = count + 1;

    return count === 0 ? slug : `${slug}-${count}`;
  }

  /**
   * Reset all previously seen slugs
   */
  reset() {
    this.seen = {};
  }
}

export const slugger = () => new Slugger();
