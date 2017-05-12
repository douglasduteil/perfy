//

import { dirname, resolve } from "path";

import * as debug from "debug";

import { database } from "@perfyjs/core";

//

const log = debug("perfy:cmds:serve");

//

export const command = "serve";

export const desc = "Explore the result";

export function handler(argv: any) {
  log(argv);

  const perfyReporterWeb = dirname(
    require.resolve("@perfyjs/reporter-web"),
  );

  const root = resolve(perfyReporterWeb, "dist");
  const perfyDatabase = database(resolve(process.cwd(), "perfy_db.json"));

  // Dynamic imports
  const server = require("../server");
  server.start({
    database: perfyDatabase,
    root,
  });
}
