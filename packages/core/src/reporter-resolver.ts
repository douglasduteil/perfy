//

import { dirname, resolve as resolvePath } from 'path';

import { inject, injectable } from 'inversify';

import { Logger } from './logger';
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

@injectable()
export class ReporterResolver {

  static MODULE_RESOLVER = Symbol('MODULE_RESOLVER');

  //

  @inject(ReporterResolver.MODULE_RESOLVER)
  private moduleResolver: {resolve: typeof require.resolve};

  //
  private log: Logger;

  constructor(
    // required on instanciation
    logger: Logger
  ) {
    this.log = logger.newItem('ReporterResolver');
    this.log.silly('new');
  }

  resolve(name: string) {
    this.log.silly('resolve', name);

    const reporterPath = dirname(
      this.moduleResolver.resolve(`@perfyjs/reporter-${name}`)
    );
    this.log.silly('reporterPath', reporterPath);

    return resolvePath(reporterPath, 'dist');
  }
}
