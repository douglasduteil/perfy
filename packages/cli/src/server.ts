//

import * as history from "connect-history-api-fallback";
import * as debug from "debug";
import * as express from "express";
import {Server} from "http";
import {findAPortNotInUse} from "portscanner";
import {omit} from "lodash";

const log = debug("perfy:server");

export async function start(options: any): Promise<Server> {

  const {
    root,
    database,
  } = options;

  log("start %j", root);

  const app = express();

  const suitesRouter = express.Router();
  suitesRouter.get("/:id.json", (req, res) => {
    const { id } = req.params;
    log("get suite %s", id);
    const data = database.get("suites").get(id).value();

    if (!data) {
      res.status(404).send();
      return;
    }

    res.json(data);
  });

  const apiRouter = express.Router();
  apiRouter.use("/suites", suitesRouter);
  apiRouter.get("/suites.json", (_, res) => {
    log("get all suites");
    res.json(database.get("suites").mapValues((suite: any) => omit(suite, ['cases'])).value());
  });

  app.use("/api", apiRouter);

  app.use(history());
  app.use(express.static(root));

  const port = await findAPortNotInUse(8080, 8080 + 1000);
  log("port %s", port);

  return app.listen(port);
}
