'use strict';

const chalk = require('chalk');
const portScanner = require('portscanner');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const { default: webpackConfig } = require('./webpack.config');

const isCalledDirectly = require.main === module;

if (isCalledDirectly) {
  launchServer()
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
} else {
  exports.launchServer = launchServer;
}

//

function launchServer({ defaultPort, config} = {}) {
  defaultPort = defaultPort || 4200;
  config = config || webpackConfig;

  return Promise.resolve()
    .then(() => findPortServerPort(defaultPort))
    .then((port) => {
      const app = newWebpackDevServer(config)
      return listen(app, port)
        .then((server) => {
          const { address, port } = server.address();
          const host = address === '127.0.0.1' ? 'localhost' : address;
          console.log(`\nProject is running at ${chalk.yellow(`http://${host}:${port}`)}`);
          return { server };
        })
    })
}

function findPortServerPort(port) {
  return portScanner.findAPortNotInUse(port, port + 1000);
}

function newWebpackDevServer(config) {
  const compiler = webpack(config);
  const devServerOptions = {
stats: {
        colors: true,
        chunks: false,
        'errors-only': true
    }
};
  return new webpackDevServer(compiler, devServerOptions);
}

function listen(app, port, host = 'localhost') {
  return new Promise((resolve, reject) => {
    const server = app.listen(
      port,
      host,
      (err, ...args) => err ? reject(err) : resolve(server)
    );
  });
}
