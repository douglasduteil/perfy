//

import * as Debug from 'debug';
import { Container, inject, injectable } from 'inversify';
import { resolve } from 'path';
import * as yargs from 'yargs';

import { Database, ReporterCopy, ReporterResolver, update } from '@perfyjs/core';

import { cliContainer } from '../ioc_config';

//

const debug = Debug('@perfyjs/cli:update');

export const command = 'update';

export const desc = 'update the local perfy_db.json';

//

@injectable()
export class UpdateHandler {

  @inject(Database) database: Database;

  handle() {

    this.database.instanciate();

    const perfyDatabase = this.database.instance;

    const reportsFolder = './benchpress_reports';

    return update({
      database: perfyDatabase,
      cwd: process.cwd(),
      reportsFolder,
      pattern: '*.json'
    })
    .catch((e) => {
      debug(command, e);
    });
  }
}

export function handlerFactory(container: Container = new Container()) {
  debug('handlerFactory');

  container.bind(Database).toSelf();
  container.bind(Database.FILE_NAME).toConstantValue(
    resolve(process.cwd(), 'perfy_db.json')
  );
  container.bind(Database.LOWDB_OPTIONS).toConstantValue({});

  container.bind(ReporterCopy).toSelf();
  container.bind(ReporterResolver).toSelf();

  container.bind(UpdateHandler).toSelf();

  return function handlerFn(argv: yargs.Argv) {
    debug('handler', argv);

    const updateHandler = container.get(UpdateHandler);

    return updateHandler.handle();
  };
}

export const handler = handlerFactory(cliContainer);

/*
import { resolve } from 'path';

import { database, update } from '@perfyjs/core';

import { log } from '../logger';

import { rootContainer } from '../ioc_config';

//

export const command = 'update';

export const desc = 'update the local perfy_db.json';

export interface IHandlerFactoryContext {
  database: typeof database;
  log: typeof log;
  update: typeof update;
}

export const defaultHandlerFactoryOptions: IHandlerFactoryContext = {
  database,
  log,
  update
};

export function handlerFactory(_context: Partial<IHandlerFactoryContext>) {
  const context: IHandlerFactoryContext = {
    ...defaultHandlerFactoryOptions,
    ..._context
  };

  const { database, log, update } = context;

  return async function handler(argv: any) {
    log.trace(command, argv);

    const perfyDatabase = database(resolve(process.cwd(), 'perfy_db.json'));

    const reportsFolder = './benchpress_reports';

    return update({
      database: perfyDatabase,
      cwd: process.cwd(),
      reportsFolder,
      pattern: '*.json'
    })
    .catch((e) => {
      log.error(command, e);
    });
  };
}

export const handler = handlerFactory(defaultHandlerFactoryOptions);
*/
