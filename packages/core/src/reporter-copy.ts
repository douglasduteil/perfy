//

import * as Debug from 'debug';
import * as fse from 'fs-extra';
import { inject, injectable, optional } from 'inversify';

//

const debug = Debug('DatabaseDump');

//

@injectable()
export class ReporterCopy {

  static COPY_FS = Symbol('COPY_FN');

  //

  constructor(
    @inject(ReporterCopy.COPY_FS)
    @optional()
    private fs = fse
  ) {
    debug('new');
  }

  copy(from: string, to: string) {
    debug('copy', from, to);

    return Promise.all([
      this.fs.copy(from, to)
    ]);
  }
}
