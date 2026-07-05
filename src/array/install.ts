export * from './chunk/install';
export * from './difference/install';
export * from './forItem/install';
export * from './forItemReverse/install';
export * from './groupBy/install';
export * from './intersection/install';
export * from './partition/install';
export * from './pluck/install';
export * from './query/install';
export * from './unique/install';
export * from './unzip/install';
export * from './window/install';
export * from './zip/install';

import { installChunk } from './chunk/install';
import { installDifference } from './difference/install';
import { installForItems } from './forItem/install';
import { installForItemsReverse } from './forItemReverse/install';
import { installGroupBy } from './groupBy/install';
import { installIntersection } from './intersection/install';
import { installPartition } from './partition/install';
import { installPluck } from './pluck/install';
import { installQuery } from './query/install';
import { installUnique } from './unique/install';
import { installUnzip } from './unzip/install';
import { installWindow } from './window/install';
import { installZip } from './zip/install';

export function installArrayExtensions() {
  installChunk();
  installDifference();
  installForItems();
  installForItemsReverse();
  installGroupBy();
  installIntersection();
  installPartition();
  installPluck();
  installQuery();
  installUnique();
  installUnzip();
  installWindow();
  installZip();
}
