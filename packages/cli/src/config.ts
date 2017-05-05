//

import * as path from "path";

import * as debug from "debug";
import { defaults } from "lodash";

const log = debug("perfy:config");

export interface ICliConfig {
  pattern: string;
  reportsFolder: string;
}
export function resolveConfig(argv: {config: string, reportsFolder?: string}) {
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
