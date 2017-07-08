//
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
