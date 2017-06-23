//

import { inject, injectable } from 'inversify';
import Lowdb = require('lowdb');
import * as t from 'tcomb';

import { Logger } from './logger';
import { IDatabase } from './typings';

//

const defaultLowdbOptions: Lowdb.Options = {
  storage: require('lowdb/lib/storages/file-async.js'),
  writeOnChange: false
};

//

export function database(
  fileName: string,
  lowdbOptions = defaultLowdbOptions
)  {
  // log(database, fileName);

  return new Lowdb(fileName, lowdbOptions)
    .defaults<IDatabase>({ suites: {} });
}

@injectable()
export class Database {
  static FILE_NAME = Symbol('FILE_NAME');
  static LOWDB_OPTIONS = Symbol('LOWDB_OPTIONS');

  //

  @inject(Database.FILE_NAME)
  private filename: string;

  @inject(Database.LOWDB_OPTIONS)
  private lowdbOptions: Lowdb.Options;

  //

  private _instance: Lowdb;
  private log: Logger;

  constructor(
    // required on instanciation
    logger: Logger
  ) {
    this.log = logger.newItem('Database');
    this.log.silly('new');
  }

  instanciate() {
    this.log.silly('init');
    this._instance = new Lowdb(
      this.filename,
      this.lowdbOptions
    )
    .defaults<IDatabase>({ suites: {} });
  }
  get instance() {
    this.log.silly('instance');

    t.assert(Boolean(this._instance), 'No database instance found');

    return this._instance;
  }
}
