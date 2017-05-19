//

import * as debug from 'debug';

import Lowdb = require('lowdb');

import { IDatabase } from './typings';

//

const log = debug('perfy:core:database');
const defaultLowdbOptions: Lowdb.Options = {
  storage: require('lowdb/lib/storages/file-async.js'),
  writeOnChange: false
};

//

export function database(
  fileName: string,
  lowdbOptions = defaultLowdbOptions
)  {
  log(database, fileName);

  return new Lowdb(fileName, lowdbOptions)
    .defaults<IDatabase>({ suites: {} });
}
