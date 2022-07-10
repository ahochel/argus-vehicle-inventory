import type { Request, Response } from 'express';
import VehicleModel from '../models/vehicle';

export const getAllVehicles = async (req: Request, res: Response) => {
  const allVehicles = await VehicleModel.find();

  res.json({ data: allVehicles });
};

export const createVehicle = async (req: Request, res: Response) => {
  const { vehicleName, carType } = req.body;

  const newVehicle = new VehicleModel({
    vehicleName,
    carType,
  });

  await newVehicle.save();

  res.json({ data: newVehicle });
};

export const updateVehicle = async (req: Request, res: Response) => {
  const { vehicleId } = req.params;
  const { vehicleName, carType } = req.body;

  const updatedVehicle = await VehicleModel.findOneAndUpdate(
    { _id: vehicleId },
    { vehicleName, carType },
    { new: true, runValidators: true }
  );

  res.json({ data: updatedVehicle });
};

export const deleteVehicle = async (req: Request, res: Response) => {
  const { vehicleId } = req.params;

  const removedVehicle = await VehicleModel.findOneAndRemove({
    _id: vehicleId,
  });

  res.json({ data: removedVehicle });
};
