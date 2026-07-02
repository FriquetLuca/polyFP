export * from './chain/install';
export * from './deepFreeze/install';
export * from './deepMerge/install';
export * from './deepUnfreeze/install';
export * from './getHash/install';
export * from './isClass/install';
export * from './isEqual/install';
export * from './isPlainObject/install';
export * from './omit/install';
export * from './pick/install';
export * from './select/install';

import { installChain } from './chain/install';
import { installDeepFreeze } from './deepFreeze/install';
import { installDeepMerge } from './deepMerge/install';
import { installDeepUnfreeze } from './deepUnfreeze/install';
import { installGetHash } from './getHash/install';
import { installIsClass } from './isClass/install';
import { installIsEqual } from './isEqual/install';
import { installIsPlainObject } from './isPlainObject/install';
import { installOmit } from './omit/install';
import { installPick } from './pick/install';
import { installSelect } from './select/install';

export function installObjectExtensions() {
  installChain();
  installDeepFreeze();
  installDeepMerge();
  installDeepUnfreeze();
  installGetHash();
  installIsClass();
  installIsEqual();
  installIsPlainObject();
  installOmit();
  installPick();
  installSelect();
}
