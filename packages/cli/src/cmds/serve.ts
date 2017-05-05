//

import {dirname, resolve} from "path";

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
  /*
  return
  const middleware = [
    proxyApiRoute("/api", databaseFile),
    history(),
  ];

  liveServer.start({
    logLevel: 2,
    open: true,
    middleware,
    root: resolve(reporterWeb, "dist"),
    watch: databaseFile,
  });*/
}
/*
function proxyApiRoute(
  req: IncomingMessage,
  res: ServerResponse,
  next: (err?: Error) => void,
) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    return next();
  }

  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ a: 1 }));
}
*/
