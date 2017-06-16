
import { dirname, resolve as resolvePath } from 'path';

import { silentLog } from './silent-log';
export const context = {
  log: silentLog,
  resolveFn: require.resolve
};

export const factory = ({log, resolveFn} = context) => (name: string) => {
  log.silly('@perfy/core', 'resolve', name);

  const reporterPath = dirname(
    resolveFn(`@perfyjs/reporter-${name}`)
  );
  log.silly('@perfy/core', 'reporterPath', reporterPath);

  return resolvePath(reporterPath, 'dist');
};

export const resolve = factory();
