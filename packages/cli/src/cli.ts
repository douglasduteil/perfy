//

import * as yargs from "yargs";

import {
  ServeCommand,
} from "./commands";

export const cli = yargs
  .command(new ServeCommand())
  .demandCommand(1)
  .help()
;
