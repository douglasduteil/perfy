//

import { resolve } from 'path';

import { database, update } from '@perfyjs/core';

import { log } from '../logger';

//

export const command = 'report';

export const desc = 'report the local perfy_db.json';

export async function handler(argv: any) {
  log.silly(command, argv);

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
}
