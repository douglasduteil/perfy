
import * as yargs from 'yargs';

export function yargsParser() {
  return yargs
    .help('help')
    .alias('help', 'h')
    //
    .version()
    .alias('version', 'v')
    //
    .options({
      config: {
        defaultDescription: 'webpack.config.js or webpackfile.js',
        describe: 'Path to the config file',
        group: 'Config options:',
        requiresArg: true,
        type: 'string'
      }
    })
    //
    .commandDir('cmds')
    .demandCommand(1)
    .strict()
    .parse
  ;
}
