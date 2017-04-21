//

import * as meow from "meow";

export function cli() {
  return meow(`
		Usage
		 $ perfy [config]

    Example
     $ perfy perf/perfy.config.js
  `);
}
