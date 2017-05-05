//

import { readFile } from "fs";
import { resolve } from "path";

import * as debug from "debug";
import * as glob from "glob";
// import { forEach, mapValues, omitBy } from "lodash";
import { defaults, sortedIndex } from "lodash";
import Lowdb = require("lowdb");
import * as pify from "pify";

//

const log = debug("@perfyjs/core");
const globAsync = pify(glob);
const readFileAsync = pify(readFile);

//

export async function updateJsonDataTableFromFiles(
  pattern: string,
  options = { cwd: process.cwd() },
) {
  options = defaults(options, {
    cwd: process.cwd(),
  });

  const [reportFiles, db] = await Promise.all([
    listReportFiles(pattern, options),
    loadDB("perfy_db.json"),
  ]);

  const unrecoredReportFiles = diff(db, reportFiles);

  log("unrecoredReportFiles.length", unrecoredReportFiles.length);

  updateDatatable(db, unrecoredReportFiles, options);

  log("written");

}

//

export async function updateDatatable(
  db: Lowdb,
  newRecordsFiles: string[],
  options: {cwd: string},
  ) {
    log("updateDatatable");

    const inMemryDbUpdates = newRecordsFiles
    .map((filename) => ({
      filename: resolve(options.cwd, filename),
      ...fileNameToIdTimestamp(filename),
    }))
    .map(async ({id, timestamp, filename}) => {
      log(`read ${filename}`);
      const jsonContent = await readFileAsync(filename);
      const suiteIdPath = `suites["${id}"]`;

      if (!db.has(suiteIdPath).value()) {
        log("createing ", suiteIdPath);
        // Force create the path as an Object
        // Lodash#set is creating it as an array :(
        db.set(suiteIdPath, []).value();
      }
      log(`set ${suiteIdPath}["${timestamp}"]`);
      const idRecords  = db.get(suiteIdPath).value();
      const latestTimestamp = (data: {timestamp: number}) => data.timestamp;
      const recordIndex = sortedIndex(idRecords as any[], latestTimestamp);
      return (db as any)
        .get(suiteIdPath)
        .splice(recordIndex, 0, {timestamp, ...JSON.parse(jsonContent)})
        .value();
    });

    await Promise.all(inMemryDbUpdates);

    await db.write();
}

export function diff(db: Lowdb, reportFileList: string[]) {
  const NotInTheDatatable = (filename: string) => {
    const {id, timestamp} = fileNameToIdTimestamp(filename);
    return !(db as any).get(`suites["${id}"]`).some({ timestamp }).value();
  };

  return reportFileList
    .filter(NotInTheDatatable);
}

function listReportFiles(pattern: string, options?: {cwd: string}): Promise<string[]> {
  return globAsync(pattern, options);
}

function fileNameToIdTimestamp(filename: string) {
  const [, id = "", timestamp = ""] = filename.match(/(.*)_(.*).json/) || [];
  return {id, timestamp};
}

function loadDB(fileName: string): Lowdb {
  return new Lowdb(fileName, {
    storage: require("lowdb/lib/storages/file-async"),
    writeOnChange: false,
  })
    .defaults({ suites: {} });
}
