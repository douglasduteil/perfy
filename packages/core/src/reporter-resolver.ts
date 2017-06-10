
import { dirname, resolve } from 'path';

import { coreContext } from './context';
import { silentLog } from './silent-log';
/*
export function resolverFactory(
  resolveFn = require.resolve,
  context?: typeof coreContext
) {
  const _context = {
    ...coreContext,
    ...context
  };

  const {log} = _context;

  log.silly('@perfy/core', 'resolverFactory');
*/
export const context = {
  log: silentLog,
  resolveFn: require.resolve
};

export const resolverFactory = ({log, resolveFn} = context) => (name: string) => {
  log.silly('@perfy/core', 'resolve', name);

  const reporterPath = dirname(
    resolveFn(`@perfyjs/reporter-${name}`)
  );
  log.silly('@perfy/core', 'reporterPath', reporterPath);

  const reporterFilesPath = resolve(reporterPath, 'dist');

  return reporterFilesPath;
};

export const resolve = resolverFactory();
