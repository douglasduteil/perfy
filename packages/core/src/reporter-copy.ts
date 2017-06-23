//

import * as fse from 'fs-extra';

import { inject, injectable } from 'inversify';

import { Logger } from './logger';
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

@injectable()
export class ReporterCopy {

  static COPY_FS = Symbol('COPY_FN');

  //

  @inject(ReporterCopy.COPY_FS)
  private fse: typeof fse;

  //

  private log: Logger;
  constructor(
    // required on instanciation
    logger: Logger
  ) {
    this.log = logger.newItem('ReporterCopy');
    this.log.silly('new');
  }

  copy(from: string, to: string) {
    this.log.silly('copy', from, to);

    return Promise.all([
      this.fse.copy(from, to)
    ]);
  }
}
