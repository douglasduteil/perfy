//

import * as fse from 'fs-extra';

import { silentLog } from './silent-log';

//

export const context = {
  log: silentLog,
  copyFn: fse.copy
};

export const factory = ({log, copyFn} = context) => (from: string, to: string) => {
  log.silly('@perfy/core', 'copy', from, to);

  return Promise.all([
    copyFn(from, to)
  ]);
};

export const copy = factory();
