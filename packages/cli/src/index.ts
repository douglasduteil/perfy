//

import * as meow from "meow";

export function run() {
  const cli = meow(`
		Usage
		 $ perfy [config]

    Example
     $ perfy perf/perfy.config.js
  `);

  return cli;
}
