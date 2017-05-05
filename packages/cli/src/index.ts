//

import * as path from "path";

import { updateJsonDataTableFromFiles } from "@perfyjs/core";
import { defaults } from "lodash";
import * as yargs from "yargs";

interface ICliConfig {
  pattern?: string;
  reportsFolder: string;
}

export default (argv: typeof process.argv): void => {
  const cli = yargs
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
    .command({
      command: "serve",
      describe: "Explore the result",
      handler: serveHandler,
    })
    //
    .command({
      command: "report",
      describe: "report the local perfy_db.json",
      handler: reportHandler,
    })
    //
    .demandCommand(1)
    .strict();

  cli.parse(argv);
};

function resolveConfig(argv: {config: string, reportsFolder?: string}) {
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
