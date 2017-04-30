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

export interface IDBFile {
  suites: {
    [id: string]: {
      [timestamp: string]: {
        stats: {
          [stateName: string]: {
            average: number;
            derivation: number;
          },
        },
      },
    },
  };
}

const log = debug("@perfyjs/core");
const globAsync = pify(glob);
const readFileAsync = pify(readFile);

//

export function foo() {
  return "bar";
}

export async function updateJsonDataTableFromFiles(
  pattern: string,
  options = { cwd: process.cwd() },
) {
  options = defaults(options, {
    cwd: process.cwd(),
  });

  const [reportFiles, db] = await Promise.all([
    loadCurrentReports(pattern, options),
    loadDB("perfy_db.json"),
  ]);

  log("reportFiles.length", reportFiles.length);
  log("db", db.get("suites").value());
  log("has long-execution-time-d10-i10", db.has("suites['long-execution-time-d10-i10']['1492906176969']").value());

  const unrecoredReportFiles = reportFiles
    .map((filename) => ({
      filename: resolve(options.cwd, filename),
      ...fileNameToIdTimestamp(filename),
    }))
    .filter(({id, timestamp}) =>
      // in not already in the database
      !db.has(`suites["${id}"]["${timestamp}"]`).value(),
    );

  log("unrecoredReportFiles.length", unrecoredReportFiles.length);

  const inMemryDbUpdates = unrecoredReportFiles
    .map(async ({id, timestamp, filename}) => {
      log(`read ${filename}`);
      const jsonContent = await readFileAsync(filename);
      const suiteIdPath = `suites["${id}"]`;
      if (!db.has(suiteIdPath).value()) {
        log("createing ", suiteIdPath);
        db.set(suiteIdPath, {}).value();
      }
      log(`set ${suiteIdPath}["${timestamp}"]`);
      db.set(`${suiteIdPath}["${timestamp}"]`, JSON.parse(jsonContent))
        .value();
    });

  await Promise.all(inMemryDbUpdates);

  await db.write();

  log("written");
}

function loadCurrentReports(pattern: string, options?: {cwd: string}): Promise<string[]> {
  return globAsync(pattern, options);
   // .then(structureFilePath);
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
