//

import { readFile } from "fs";
import { resolve } from "path";

import { sortedIndex } from "lodash";
import * as debug from "debug";
import * as glob from "glob";
import * as pify from "pify";
import * as t from "tcomb";

import Lowdb = require("lowdb");
import sentenceCase = require("sentence-case");
import paramCase = require("param-case");

//

const log = debug("perfy:core:update");
const globAsync = pify(glob);
const readFileAsync = pify(readFile);

//

export interface UpdateOptionType {
  cwd: string;
  database: Lowdb;
  pattern: string;
  reportsFolder: string;
}

//

export async function update (
  options: UpdateOptionType,
) {
  log('update')

  t.struct<UpdateOptionType>({
    cwd: t.maybe(t.String),
    database: t.irreducible<Lowdb>('LowdbType', (x) => x.__wrapped__ && x.__chain__),
    pattern: t.String,
    reportsFolder: t.String,
  }, 'UpdateOptionType')(options)

  const cwd = resolve(options.cwd, options.reportsFolder);

  const [reportFiles, db] = await Promise.all([
    listReportFiles(options.pattern, {cwd}),
    options.database,
  ]);

  const unrecoredReportFiles = diff(db, reportFiles);

  log("unrecoredReportFiles.length", unrecoredReportFiles.length);

  await updateDatatable(db, unrecoredReportFiles, {cwd});

  log("written");

}

export async function updateDatatable(
  db: Lowdb,
  newRecordsFiles: string[],
  options: {cwd: string},
  ) {
    log("updateDatatable");

    const inMemryDbUpdates = newRecordsFiles
    .map((filename) => ({
      ...fileNameToIdTimestamp(filename),
      filename: resolve(options.cwd, filename),
    }))
    .map(async ({id, params, timestamp, filename}) => {
      log(`read ${filename}`);
      log(`> id : ${id}`);
      log(`> timestamp : ${timestamp}`);

      const jsonContent = await readFileAsync(filename);
      const suiteIdPath = `suites["${id}"]`;
      const casesPath = `${suiteIdPath}.cases`;
      const paramsStr = paramCase(params);

      if (!db.has(suiteIdPath).value()) {
        log("creating ", suiteIdPath);
        // Force create the path as an Object
        // Lodash#set is creating it as an array :(
        db.set(suiteIdPath, {
          cases: [],
          name: sentenceCase(suiteIdPath),
        }).value();
      }

      let iterations = db.get(casesPath).find({id: paramsStr}).value();

      if (!iterations) {
        log("creating ", `${casesPath}["${paramsStr}"]`);

        db.get(casesPath)
          .push({
            id: paramsStr,
            iterations: [],
          }).value();
      }

      log(`set ${casesPath}["${paramsStr}"].iterations["${timestamp}"]`);
      iterations = db.get(casesPath).find({id: paramsStr}).value();

      const latestTimestamp = (data: {timestamp: number}) => data.timestamp;
      const recordIndex = sortedIndex(iterations as any[], latestTimestamp);
      return (db as any)
        .get(casesPath)
        .find({id: paramsStr})
        .get('iterations')
        .splice(recordIndex, 0, {timestamp, ...JSON.parse(jsonContent)})
        .value();
    });

    await Promise.all(inMemryDbUpdates);

    await db.write();
}

function listReportFiles(pattern: string, options?: {cwd: string}): Promise<string[]> {
  log('listReportFiles', pattern, options)
  return globAsync(pattern, options);
}

export function diff(db: Lowdb, reportFileList: string[]) {
  log('diff')
  const NotInTheDatatable = (filename: string) => {
    const {id, params, timestamp} = fileNameToIdTimestamp(filename);
    const paramsStr = paramCase(params);
    return !(db as any)
      .get(`suites["${id}"].cases`)
      .find({id: paramsStr})
      .get('iterations')
      .some({ timestamp }).value();
  };

  return reportFileList
    .filter(NotInTheDatatable);
}

function fileNameToIdTimestamp(filename: string) {
  const [, id = "", params = "", timestamp = ""] = filename.match(/([^?]+)[?]?([^_]+)?_(.*).json/) || [];
  return {id, params, timestamp};
}
