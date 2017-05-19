//

import { dirname, resolve } from 'path';

import { database } from '@perfyjs/core';

import { log } from '../logger';

//

export const command = 'serve';

export const desc = 'Explore the result';

export function handler(argv: any) {
  log.silly(command, argv);

  const perfyReporterWeb = dirname(
    require.resolve('@perfyjs/reporter-web')
  );

  const root = resolve(perfyReporterWeb, 'dist');
  const perfyDatabase = database(resolve(process.cwd(), 'perfy_db.json'));

  // Dynamic imports
  const server = require('../server');
  server.start({
    database: perfyDatabase,
    root
  });
}
