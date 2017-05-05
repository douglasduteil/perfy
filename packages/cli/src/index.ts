//

import * as debug from "debug";
import * as yargs from "yargs";
/*
import * as path from "path";

import { updateJsonDataTableFromFiles } from "@perfyjs/core";
import { defaults } from "lodash";

interface ICliConfig {
  pattern: string;
  reportsFolder: string;
}*/

const log = debug("perfy:cli");

export default (): void => {
  log("run");
  return yargs
    .help("help")
    .alias("help", "h")
    //
    .version()
    .alias("version", "v")
    //
    .options({
      config: {
        defaultDescription: "webpack.config.js or webpackfile.js",
        describe: "Path to the config file",
        group: "Config options:",
        requiresArg: true,
        type: "string",
      },
    })
    //
    .commandDir("cmds")
    .demandCommand(1)
    .strict()
    .argv;
};
/*
function resolveConfig(argv: {config: string, reportsFolder?: string}) {
  log("resolveConfig");
  const configFile: string = argv.config || process.env.npm_package_config_perfy_config;
  const configDescendants: any[] = [argv];
  const config: any = {};

  if (configFile) {
    configDescendants.unshift(
      require(path.resolve(process.cwd(), configFile)).config,
    );
  }

  defaults(config, ...configDescendants);

  configDescendants.push({
    reportsFolder: path.resolve(process.cwd(), config.reportsFolder),
  });

  defaults(config, ...configDescendants);

  return config as ICliConfig;
}

function errorHandler(error: Error) {
  console.error(error);
}

async function reportHandler(argv: {config: string}) {
  log("reportHandler");
  const config = resolveConfig(argv);

  try {
    await updateJsonDataTableFromFiles(config.pattern, {
      cwd: config.reportsFolder,
    });
  } catch (e) {
    errorHandler(e);
  }
}

function serveHandler(argv: {config: string}) {
  log("serveHandler");
  const config = resolveConfig(argv);
  console.log(config);

  const liveServer = require("live-server");

  const reporterWeb = path.dirname(
    require.resolve("@perfyjs/reporter-web"),
  );

  liveServer.start({
    root: path.resolve(reporterWeb, "dist"),
    watch: path.resolve(process.cwd()),
    middleware: [],
  });
}
*/
