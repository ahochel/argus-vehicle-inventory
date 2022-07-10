import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import routes from './routes';
import establishDbConnection from './utils/establishDbConnection';

const initApp = async () => {
  const app: Application = express();
  const port = 3333;

  app.use(helmet());
  app.use(express.json());

  app.use('/api', routes());
  app.get('/', (req: Request, res: Response) => {
    res.status(200).send({ data: 'Hello world!' });
  });

  if (!(await establishDbConnection())) {
    process.exit(1);
  }

  // eslint-disable-next-line no-console
  app.listen(port, () => console.log(`Server is listening on port ${port}!`));
};

initApp();
