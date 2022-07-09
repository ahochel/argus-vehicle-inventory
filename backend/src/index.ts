import express, { Application, Request, Response } from 'express';

// Boot express
const app: Application = express();
const port = 3333;

// Application routing
app.use('/', (req: Request, res: Response) => {
  res.status(200).send({ data: 'Hello world!' });
});

// Start server
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
