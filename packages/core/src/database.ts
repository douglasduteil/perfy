//

import * as debug from "debug";

import Lowdb = require("lowdb");

//

const log = debug("perfy:core:database");

//

export function database(fileName: string): Lowdb {
  log(database, fileName);

  return new Lowdb(fileName, {
    storage: require("lowdb/lib/storages/file-async"),
    writeOnChange: false,
  })
    .defaults({ suites: {} });
}
