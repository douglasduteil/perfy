//

import * as history from "connect-history-api-fallback";
import * as debug from "debug";
import * as express from "express";
import {Server} from "http";
import {findAPortNotInUse} from "portscanner";

const log = debug("perfy:server");

export async function start(options: any): Promise<Server> {

  const {
    root,
    database,
  } = options;

  log("start %j", root);

  const app = express();

  const apiRouter = express.Router();
  const suitesRouter = express.Router();

  suitesRouter.get("/", (_, res) => {
    log("get all suites");
    res.json(database.get("suites").value());
  });

  suitesRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    log("get suite %s", id);
    const data = database.get("suites").get(id).value();

    if (!data) {
      res.status(404).send();
      return;
    }

    res.json(data);
  });

  apiRouter.use("/suites", suitesRouter);

  app.use("/api", apiRouter);

  app.use(history());
  app.use(express.static(root));

  const port = await findAPortNotInUse(8080, 8080 + 1000);
  log("port %s", port);

  return app.listen(port);
}
