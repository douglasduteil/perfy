//

import { resolve } from 'path';

import { database, resolverFactory } from '@perfyjs/core';

import { log } from '../logger';

//

export const command = 'serve';

export const desc = 'Explore the result';

export function handler(argv: any) {
  log.silly(command, argv);

  const resolveReporter = resolverFactory();
  const root = resolveReporter('web');
  const perfyDatabase = database(resolve(process.cwd(), 'perfy_db.json'));

  // Dynamic imports
  const server = require('../server');
  server.start({
    database: perfyDatabase,
    root
  });
}
