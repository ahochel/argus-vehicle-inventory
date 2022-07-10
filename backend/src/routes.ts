import { Router } from 'express';
import vehicleRoutes from './routes/vehicle';

const routes = () =>
  Router()
    .get('/', (req, res) => {
      res.json({ status: 'OK' });
    })
    .use('/vehicle', vehicleRoutes());

export default routes;
