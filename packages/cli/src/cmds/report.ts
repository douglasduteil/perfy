//

import * as debug from "debug";
// import * as yargs from "yargs";

import {} from "../config";

//

const log = debug("perfy:cmds:report");

//

export const command = "report";

export const desc = "report the local perfy_db.json";

export function handler(argv: any) {
  log(argv);
}
