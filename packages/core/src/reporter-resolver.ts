//

import { dirname, resolve as resolvePath } from 'path';

import * as Debug from 'debug';
import { inject, injectable, optional } from 'inversify';

//

const debug = Debug('DatabaseDump');

//

@injectable()
export class ReporterResolver {
  constructor(
    @inject(require.resolve)
    @optional()
    private resolveFn = require.resolve
  ) {
    debug('new');
  }

  resolve(name: string) {
    debug('resolve', name);

    const reporterPath = dirname(
      this.resolveFn(`@perfyjs/reporter-${name}`)
    );
    debug('reporterPath', reporterPath);

    return resolvePath(reporterPath, 'dist');
  }
}
