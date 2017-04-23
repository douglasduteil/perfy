//

import * as yargs from "yargs";

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
    .demandCommand(1)
    .strict();

  cli.parse(argv);
};

function serveHandler(argv: {config: string}) {
  argv = Object.assign({},
    argv,
    {
      config: argv.config || process.env.npm_package_config_perfy_config,
    },
  );

  console.log(argv);
  console.log(
    "@perfyjs/reporter-web",
    require.resolve("@perfyjs/reporter-web"),
  );
}
