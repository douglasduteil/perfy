//

import { resolve } from "path";

import * as debug from "debug";

import { database, update } from "@perfyjs/core";

//

const log = debug("perfy:cmds:report");

//

export const command = "report";

export const desc = "report the local perfy_db.json";

export function handler(argv: any) {
  log(argv);

  const perfyDatabase = database(resolve(process.cwd(), "perfy_db.json"));

  const reportsFolder = "./benchpress_reports";

  update({
    database: perfyDatabase,
    cwd: process.cwd(),
    reportsFolder,
    pattern: '*.json'
  })
  .catch(console.error);
}
