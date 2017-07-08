//

import { join } from 'path';

import Lowdb = require('lowdb');
import * as Debug from 'debug';
import * as fse from 'fs-extra';
import { inject, injectable } from 'inversify';
import { omit } from 'lodash';

import { IPerfySuite } from '@perfyjs/types';

//

const debug = Debug('DatabaseDump');

//

@injectable()
export class DatabaseDump {
  static SUITE_INDEX_FILE_NAME = Symbol('SUITE_INDEX_FILE_NAME');

  static COPY_FS = Symbol('COPY_FN');

  //

  @inject(DatabaseDump.COPY_FS)
  private fse: typeof fse;

  constructor(
    private suiteIndexFileName = 'suites.json'
  ) {
    debug('new');
  }

  dump(database: Lowdb, destination: string) {
    const suiteIndex = join(destination, this.suiteIndexFileName);
    const suites = database.get('suites') as any;
    const suiteIndexData = suites
      .mapValues((suite: any) => omit(suite, ['cases']))
      .value();

    const suiteFolder = join(destination, 'suites');
    const writeAllSuites: Array<Promise<void>> = suites.map(
      (suite: IPerfySuite, suiteName: string) => this.fse.writeJson(
        join(suiteFolder, `${suiteName}.json`),
        suite
      )
    ).value();

    return Promise.all([
      this.fse.writeJson(suiteIndex, suiteIndexData),
      ...writeAllSuites
    ]);
  }
}
