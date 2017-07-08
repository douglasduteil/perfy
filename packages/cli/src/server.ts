//

import * as history from 'connect-history-api-fallback';
import * as Debug from 'debug';
import * as express from 'express';
import {Server} from 'http';
import {omit} from 'lodash';
import {findAPortNotInUse} from 'portscanner';

//

const debug = Debug('@perfyjs/cli:server');

//

export async function start(options: any): Promise<Server> {

  const {
    root,
    database
  } = options;

  debug('start %j', root);

  const app = express();

  const suitesRouter = express.Router();
  suitesRouter.get('/:id.json', (req, res) => {
    const { id } = req.params;
    debug('get suite %s', id);
    const data = database.get('suites').get(id).value();

    if (!data) {
      res.status(404).send();
      return;
    }

    res.json(data);
  });

  const apiRouter = express.Router();
  apiRouter.use('/suites', suitesRouter);
  apiRouter.get('/suites.json', (_, res) => {
    debug('get all suites');
    res.json(database.get('suites').mapValues((suite: any) => omit(suite, ['cases'])).value());
  });

  app.use('/api', apiRouter);

  app.use(history());
  app.use(express.static(root));

  const port = await findAPortNotInUse(8080, 8080 + 1000);
  debug('port %s', port);

  return app.listen(port);
}
