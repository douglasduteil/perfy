//
/*
import { resolve } from 'path';

import { database, ReporterResolver } from '@perfyjs/core';

import { log } from '../logger';

import { rootContainer } from '../ioc_config';

//

export const command = 'serve';

export const desc = 'Explore the result';

export function handler(argv: any) {
  log.trace(command, argv);

  const resolveReporter = ReporterResolver.factory();
  const root = resolveReporter('web');
  const perfyDatabase = database(resolve(process.cwd(), 'perfy_db.json'));

  // Dynamic imports
  const server = require('../server');
  server.start({
    database: perfyDatabase,
    root
  });
}
*/
