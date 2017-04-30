//

import { readFile } from "fs";
import { resolve } from "path";

import * as debug from "debug";
import * as glob from "glob";
// import { forEach, mapValues, omitBy } from "lodash";
import { defaults } from "lodash";
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

  const inMemryDbUpdates = unrecoredReportFiles
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
        db.set(suiteIdPath, {}).value();
      }

      log(`set ${suiteIdPath}["${timestamp}"]`);
      return db
        .set(`${suiteIdPath}["${timestamp}"]`, JSON.parse(jsonContent))
        .value();
    });

  await Promise.all(inMemryDbUpdates);

  await db.write();

  log("written");

}

//

export function diff(db: Lowdb, reportFileList: string[]) {
  const NotInTheDatatable = (fileanem: string) => {
    const filePath = fileNameToPath(fileanem);
    return !db.has(filePath).value();
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

function fileNameToPath(filename: string) {
  const {id, timestamp} = fileNameToIdTimestamp(filename);
  return `suites['${id}']['${timestamp}']`;
}

function loadDB(fileName: string): Lowdb {
  return new Lowdb(fileName, {
    storage: require("lowdb/lib/storages/file-async"),
    writeOnChange: false,
  })
    .defaults({ suites: {} });
}
