export * from './slugify/install';

import { installSlugify } from './slugify/install';

export function installStringExtensions() {
  installSlugify();
}
