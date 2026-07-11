export * from './chain/install';
export * from './clone/install';
export * from './deepFreeze/install';
export * from './deepMerge/install';
export * from './deepUnfreeze/install';
export * from './getHash/install';
export * from './invert/install';
export * from './isClass/install';
export * from './isEqual/install';
export * from './isPlainObject/install';
export * from './omit/install';
export * from './pick/install';
export * from './renameKeys/install';
export * from './select/install';
export * from './shallowClone/install';

import { installChain } from './chain/install';
import { installClone } from './clone/install';
import { installDeepFreeze } from './deepFreeze/install';
import { installDeepMerge } from './deepMerge/install';
import { installDeepUnfreeze } from './deepUnfreeze/install';
import { installGetHash } from './getHash/install';
import { installInvert } from './invert/install';
import { installIsClass } from './isClass/install';
import { installIsEqual } from './isEqual/install';
import { installIsPlainObject } from './isPlainObject/install';
import { installOmit } from './omit/install';
import { installPick } from './pick/install';
import { installRenameKeys } from './renameKeys/install';
import { installSelect } from './select/install';
import { installShallowClone } from './shallowClone/install';

export function installObjectExtensions() {
  installChain();
  installClone();
  installDeepFreeze();
  installDeepMerge();
  installDeepUnfreeze();
  installGetHash();
  installInvert();
  installIsClass();
  installIsEqual();
  installIsPlainObject();
  installOmit();
  installPick();
  installRenameKeys();
  installSelect();
  installShallowClone();
}
