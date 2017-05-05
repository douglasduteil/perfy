//

import Lowdb = require("lowdb");

//

export function database(fileName: string): Lowdb {
  return new Lowdb(fileName, {
    storage: require("lowdb/lib/storages/file-async"),
    writeOnChange: false,
  })
    .defaults({ suites: {} });
}
