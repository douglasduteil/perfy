//

import { resolve } from 'path';
import { Container, injectable, inject } from 'inversify';
import * as Debug from 'debug';
import * as yargs from 'yargs';

import { Database, ReporterCopy, ReporterResolver } from '@perfyjs/core';

import { cliContainer } from '../ioc_config';

//

const debug = Debug('@perfyjs/cli:report');

export const command = 'report';

export const desc = 'report the local perfy_db.json';

//

@injectable()
export class ReportHandler {

  @inject(Database) database: Database;
  @inject(ReporterCopy) reporterCopy: ReporterCopy;
  @inject(ReporterResolver) reporterResolver: ReporterResolver;

  handle() {
    const dest = 'perfy_report';
    const reportorPath = this.reporterResolver.resolve('web');

    this.database.instanciate();

    return this.reporterCopy.copy(reportorPath, dest)
    .catch((e) => {
      debug('\n', e);
    });
  }
}

//

/*
export interface IHandlerFactoryContext {
  copy: (from: string, to: string) => Promise<void[]>;
  database: typeof database;
  log: typeof log;
  resolve: (name: string) => string;
}

export const defaultHandlerFactoryOptions: IHandlerFactoryContext = {
  copy: ReporterCopy.factory(),
  database,
  log,
  resolve: ReporterResolver.factory()
};

export function handlerFactory(_context: Partial<IHandlerFactoryContext>) {
  const context: IHandlerFactoryContext = {
    ...defaultHandlerFactoryOptions,
    ..._context
  };
  const { log, copy, resolve } = context;

  return async function handler(argv: any) {
    log.trace(command, argv);

    // const perfyDatabase = database(resolve(process.cwd(), 'perfy_db.json'));
    const reportorPath = resolve('web');

    const dest = 'perfy_report';
    return copy(reportorPath, dest)
    .catch((e) => {
      log.error(command, e);
    });
  };
}
*/

/*
const defaultContainer = (container = rootContainer) => {

  container.bind(Database.FILE_NAME).toConstantValue(
    resolve(process.cwd(), 'perfy_db.json')
  );

  container.bind(Database.LOWDB_OPTIONS).toConstantValue({});

  return container;
};*/

export function handlerFactory(container: Container = new Container()) {
  debug('handlerFactory');

  container.bind(Database).toSelf();
  container.bind(Database.FILE_NAME).toConstantValue(
    resolve(process.cwd(), 'perfy_db.json')
  );
  container.bind(Database.LOWDB_OPTIONS).toConstantValue({});

  container.bind(ReporterCopy).toSelf();
  container.bind(ReporterResolver).toSelf();

  container.bind(ReportHandler).toSelf();

  return function handler (argv: yargs.Argv) {
    debug('handler', argv);

    const reportHandler = container.get(ReportHandler);

    return reportHandler.handle();
  };
}

export const handler = handlerFactory(cliContainer);
