import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import routes from './routes';
import establishDbConnection from './utils/establishDbConnection';

const initApp = async () => {
  const app: Application = express();
  const port = process.env.PORT;

  app.use(
    helmet({
      // FIXME: Disable only required entries
      contentSecurityPolicy: false,
    })
  );
  app.use(cors());
  app.use(express.json());

  // Serve static files on production build because of Heroku's free plan limitation to 1 container
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/api', routes());

  if (!(await establishDbConnection())) {
    process.exit(1);
  }

  // eslint-disable-next-line no-console
  app.listen(port, () => console.log(`Server is listening on port ${port}!`));
};

initApp();
