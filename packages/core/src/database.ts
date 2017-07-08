//

import { inject, injectable } from 'inversify';
import Lowdb = require('lowdb');
import * as Debug from 'debug';
import * as t from 'tcomb';

import { IDatabase } from './typings';

//

const debug = Debug('DatabaseDump');

//

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

  constructor() {
    debug('new');
  }

  instanciate() {
    debug('init');
    this._instance = new Lowdb(
      this.filename,
      this.lowdbOptions
    )
    .defaults<IDatabase>({ suites: {} });
  }
  get instance() {
    debug('instance');

    t.assert(Boolean(this._instance), 'No database instance found');

    return this._instance;
  }
}
