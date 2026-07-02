export * from './chunk/install';
export * from './difference/install';
export * from './groupBy/install';
export * from './intersection/install';
export * from './partition/install';
export * from './pluck/install';
export * from './unique/install';
export * from './zip/install';

import { installChunk } from './chunk/install';
import { installDifference } from './difference/install';
import { installGroupBy } from './groupBy/install';
import { installIntersection } from './intersection/install';
import { installPartition } from './partition/install';
import { installPluck } from './pluck/install';
import { installUnique } from './unique/install';
import { installZip } from './zip/install';

export function installArrayExtensions() {
  installChunk();
  installDifference();
  installGroupBy();
  installIntersection();
  installPartition();
  installPluck();
  installUnique();
  installZip();
}
