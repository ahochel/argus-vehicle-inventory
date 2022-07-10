import { Router } from 'express';
import {
  createVehicle,
  deleteVehicle,
  getAllVehicles,
  updateVehicle,
} from '../controllers/vehicle';

const vehicleRoutes = (): Router => {
  return Router()
    .get('/', getAllVehicles)
    .post('/', createVehicle)
    .patch('/:vehicleId', updateVehicle)
    .delete('/:vehicleId', deleteVehicle);
};

export default vehicleRoutes;
