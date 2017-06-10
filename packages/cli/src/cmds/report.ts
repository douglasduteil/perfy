//

import { copyFactory, database, resolverFactory } from '@perfyjs/core';

import { log } from '../logger';

//

export const command = 'report';

export const desc = 'report the local perfy_db.json';

export interface IHandlerFactoryContext {
  database: typeof database;
  log: typeof log;
  resolve: (name: string) => string;
  copy: (from: string, to: string) => Promise<string[]>;
}

export const defaultHandlerFactoryOptions: IHandlerFactoryContext = {
  database,
  log,
  copy: copyFactory(),
  resolve: resolverFactory()
};

export function handlerFactory(_context: Partial<IHandlerFactoryContext>) {
  const context: IHandlerFactoryContext = {
    ...defaultHandlerFactoryOptions,
    ..._context
  };
  const { log, copy, resolve } = context;

  return async function handler(argv: any) {
    log.silly(command, argv);

    // const perfyDatabase = database(resolve(process.cwd(), 'perfy_db.json'));
    const reportorPath = resolve('web');

    const dest = 'perfy_report';
    return copy(reportorPath, dest)
    .catch((e) => {
      log.error(command, e);
    });
  };
}

export const handler = handlerFactory(defaultHandlerFactoryOptions);
